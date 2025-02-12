const Task = require('../models/Task');
const checkProjectOwnerShip = async (req, res, next) => {
    const {id} = req.params;
    const task =  await Task.findById(id);


    
    if(project?.owner.toString()=== req.user.id || req.user.role === 'admin'){
       return next();
    }

    return res.status(403).json({ message: "denies access!" });
}

module.exports = checkProjectOwnerShip;