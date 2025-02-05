const Task = require('../models/Task');
const {validationResult} = require('express-validator');
exports.createTask = async (req, res) => {
    try {
        delete req.body._id;
        const task = new Task({
            ...req.body
        });
        await task.save();
        res.status(201).json({msg:'Task added!!'})
    } catch (error) {
        res.status(400).json({error});
    }
}

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({error});
    }
}

exports.getTask = async (req, res) => {
    try {
        const task= await Task.findOne({_id: req.params.id});
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({error});
    }
}

exports.updateTask = async (req, res) => {
    try {
        await Task.updateOne({_id: req.params.id}, {...req.body, _id:req.params.id});
        res.status(200).json({msg: 'Task updated!'});
    } catch (error) {
        res.status(400).json({error});
    }
}

exports.deleteTask = async (req, res) => {
    try {
        await Task.deleteOne({_id: req.params.id});
        res.status(200).json({msg:'Task deleted'});
    } catch (error) {
        res.status(400).json({error});
    }
}