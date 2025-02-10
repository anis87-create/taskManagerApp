const User = require('../models/User');
const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.register = async (req, res) => {
    try {
        delete req.body._id;
        const arr = validationResult(req).array();
        const errors =  arr.map(error => ({
            msg: error.msg,
            params: error.path
        }));
        if(errors.length>0){
            return res.status(400).json({errors})
        }
        const saltRound = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, saltRound);
        const user = new User({
            ...req.body,
            avatar: req.file ? `/uploads/${req.file.filename}` : "",
            password: hashedPassword
        });
        await user.save();
        res.status(201).json({
            ...req.body,
            token: generateToken(user.id)
        });
    } catch (error) {
        res.status(400).json({error});
    }
}

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        const match = await bcrypt.compare(password, user.password);
        const token = await generateToken(user.id);
        if(match){
            res.status(200).json({
                ...req.body,
                token,
                msg: 'login with success!'})
        }else {
            res.status(400).json({msg: 'bad credentials!'});
        }
    } catch (error) {
        
    }
}

exports.update = async (req, res) => {
    try {
        const arr = validationResult(req).array();
        const errors =  arr.map(error => ({
            msg: error.msg,
            params: error.path
        }));
        if(errors.length>0){
            return res.status(400).json({errors})
        }
        await User.updateOne({_id: req.params.id}, {
            ...req.body,
            avatar: req.file ? `/uploads/${req.file.filename}` : "",
            _id: req.params.id});
        res.json({msg:'User Updated!'});
    } catch (error) {
        res.status(400).json({error});
    }
}

exports.authMe = async (req, res) => {
    try {
        const user = await User.findOne({_id: req.params.id});

        const {username, email} = user;
        console.log(user);
        
        const token = generateToken(user.id);
        res.status(200).json({
          username,
          email, 
          token
        });
    } catch (error) {
        res.status(400).json({error});
    }
}

exports.delete = async (req, res) => {
    try {
       await User.deleteOne({_id: req.params.id});
       res.json({msg:'User deleted!'});
    } catch (error) {
        res.status(400).json({error});
    }
}

exports.findAll = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
        
    } catch (error) {
        res.status(200).json({error});
    }
}

const generateToken = (id) => {
   return jwt.sign({id}, process.env.JWT_SECRET_KEY, {
    expiresIn:'30d'
   })
};

