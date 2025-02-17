const Task = require('../models/Task');
const checkTaskOwnerShip = async (req, res, next) => {
    const {id} = req.params;
    const task =  await Task.findById(id);


    
    if(task?.owner?.toString()=== req.user.id || req.user.role === 'admin'){
       return next();
    }

    return res.status(403).json({ message: "denied access!" });
}

module.exports = checkTaskOwnerShip;