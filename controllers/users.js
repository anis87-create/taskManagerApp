const User = require('../models/User');
const {validationResult} = require('express-validator');
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
        const user = new User({
            ...req.body,
            avatar: req.file ? `/uploads/${req.file.filename}` : ""
        });
        await user.save();
        res.status(200).json({msg:'Account created!'});
    } catch (error) {
        res.status(400).json({error});
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

exports.findOne = async (req, res) => {
    try {
        const user = await User.findOne({_id: req.params.id});
        res.json(user);
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