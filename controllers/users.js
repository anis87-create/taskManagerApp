const User = require('../models/User');
exports.register = async (req, res) => {
    try {
        delete req.body._id;
        console.log(req.body);
        
        const user = new User({...req.body});
        await user.save();
        res.status(200).json({msg:'Account created!'});
    } catch (error) {
        res.status(400).json({error});
    }
}

exports.update = async (req, res) => {
    try {
        await User.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id});
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