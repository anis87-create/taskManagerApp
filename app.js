const express = require('express');
const connectDB = require('./connectDB');
const Task = require('./models/Task');
const app = express();
connectDB();
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.post('/api/tasks', async (req, res) => {
    delete req.body._id;
    const task = new Task({
        ...req.body
    });
    await task.save();
    res.status(201).json({msg:'Task added!!'})
});
app.get('/api/tasks',async (req,res) => {
    const tasks = await Task.find();
    try {
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({error});
    }
});

app.get('/api/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id });
        res.status(200).json(task);
    } catch (error) {
        res.status(404).json({error});
    }
});

app.put('/api/tasks/:id', async(req, res) => {
    try {
        await Task.updateOne({_id: req.params.id}, {...req.body, _id:req.params.id});
        res.status(200).json({msg:'Task updated!'});
    } catch (error) {
        res.status(401).json({error});
    }
})
module.exports = app;