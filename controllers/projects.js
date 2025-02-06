const Project = require('../models/Project');

exports.createProject = async (req, res) => {
    try {
        delete req.body._id;
        const project = new Project({...req.body});
        await project.save();
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
       await Project.updateOne({_id: req.params.id}, {...req.body,_id: req.params.id });
       res.status(200).json({msg:'project updated!'})
    } catch (error) {
       res.status(400).json({error});
    }
}

exports.deleteProject = async(req, res) => {
    try {
        await Project.delete({_id: req.params.id});
        res.status(200).json({msg:'project deleted'})
    } catch (error) {
        res.status(400).json({error});
    }
}