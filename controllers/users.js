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
        let user =await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({msg:'user already exist'});
        }
        if(errors.length>0){
            return res.status(400).json({errors})
        }
        const saltRound = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, saltRound);
        user = new User({
            ...req.body,
            avatar: req.file ? `/uploads/${req.file.filename}` : "",
            password: hashedPassword
        });
        await user.save();
        res.status(201).json({
           msg:'Account created!'
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
        const token =  generateToken(user.id, user.role);
        if(match){
            await res.status(200).json({user, token})
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

exports.currentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

         res.status(200).json(user);

    } catch (error) {
        console.log(error);
        
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

const generateToken = (id, role) => {
   const token = jwt.sign({id, role}, process.env.JWT_SECRET_KEY, {
    expiresIn:'30d'
   });
   return token;
};

