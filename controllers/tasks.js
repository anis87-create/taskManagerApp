const Task = require('../models/Task');
const Notification = require('../models/Notification');
const {validationResult} = require('express-validator');

exports.createTask = async (req, res) => {
    const arr = validationResult(req).array();
    const errors =  arr.map(error => ({
       msg: error.msg,
       params: error.path
    }));
    
    if(errors.length>0){
        return res.status(400).json({errors})
    }
    try {
        delete req.body._id;
        let task = await Task.findOne({title: req.body.title});
        if(task){
            return res.status(400).json({msg:'task already exist'});
        }
         task = new Task({
            ...req.body
        });

        await task.save();
        const notification = new Notification({
            userId: req.body.owner,
            taskId: task.id,
            type:'task_assigned',
            message:'a new task  has been created!'
        });
        await notification.save();
        
 
        res.status(201).json({msg:'Task added and notification created!!'})
    } catch (error) {
        res.status(400).json({error});
    }
}

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        if (!tasks.length) {
            return res.status(404).json({ message: 'No tasks found' });
        }
        res.status(200).json(tasks);
    } catch (error) {
        console.log(error)        res.status(400).json({ error: error.message });
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
        res.status(200).json({msg:'Task deleted!!!'});
    } catch (error) {
        res.status(400).json({error});
    }
}