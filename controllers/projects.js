const Project = require('../models/Project');
const {validationResult} = require('express-validator');
exports.createProject = async (req, res) => {
    try {
        delete req.body._id;
        let project= Project.findOne({name: req.body.name});
        if(!project){
            return res.status(400).json({msg:'project already exist'})
        }
        project = new Project({
            ...req.body,
            avatar: req.file ? `/uploads/${req.file.filename}` : ""
        });
        await project.save();
        const arr = validationResult(req).array();
        const errors =  arr.map(error => ({
            msg: error.msg,
            params: error.path
            }));
        
        if(errors.length>0){
            return res.status(400).json({errors})
        }
        res.status(200).json({msg:'project created!'});
    } catch (error) {
        res.status(400).json({error});
    }
}

exports.getOneProject = async (req, res) => {
    try {
        const project = await Project.findOne({_id: req.params.id});
        res.status(200).json(project);
    } catch (error) {
        res.status(400).json({error});
    }
}

exports.getAllProjeccts = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(400).json({error});
    }
}


exports.updateProject = async (req, res) => {
    try {
       await Project.updateOne({_id: req.params.id}, {
        ...req.body,
        avatar: req.file ? `/uploads/${req.file.filename}` : "",
        _id: req.params.id 
    });
       res.status(200).json({msg:'project updated!'})
       const arr = validationResult(req).array();
       const errors =  arr.map(error => ({
        msg: error.msg,
        params: error.path
        }));
        
        if(errors.length>0){
            return res.status(400).json({errors})
       }
    } catch (error) {
       res.status(400).json({error});
    }
}

exports.deleteProject = async(req, res) => {
    try {
        await Project.deleteOne({_id: req.params.id});
        res.status(200).json({msg:'project deleted'})
    } catch (error) {
        res.status(400).json({error});
    }
}