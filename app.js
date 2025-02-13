const express = require('express');
const connectDB = require('./connectDB');
const app = express();
const tasksRoutes = require('./routes/tasks');
const userRoutes = require('./routes/users');
const projectRoutes = require('./routes/projects');
const notificationRoutes= require('./routes/notifications');
const cors = require('cors');
connectDB();
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use("/uploads", express.static("uploads"));
app.use('/api/tasks', tasksRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/notifications', notificationRoutes);

module.exports = app;