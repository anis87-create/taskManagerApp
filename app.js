const express = require('express');
const connectDB = require('./connectDB');
const app = express();
const tasksRoutes = require('./routes/tasks');
const userRoutes = require('./routes/users');
const projectRoutes = require('./routes/projects');
connectDB();
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/tasks', tasksRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);

module.exports = app;