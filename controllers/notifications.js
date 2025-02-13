const Notification = require('../models/Notification');
exports.getNotifications = async (req, res, next) => {
    try {
        const notifications = await Notification.find();
        res.status(200).json(notifications);
    } catch (error) {
        res.status(400).josn({error});
    }
}

exports.createNotification = async(req, res, next) => {
    try {
        delete req.params._id;
        const notification = new Notification({...req.body});
        await notification.save();
        res.status(200).json({msg:'Notification created!'})
    } catch (error) {
        res.status(400).json({error});
    }
}

exports.markAsReaded = async (req, res, next) => {
    try {
       await Notification.updateOne({_id: req.params.id}, {_id:req.params.id, read: true});
       res.status(200).json({msg:'Notification is readed!'})
    } catch (error) {
        
    }
}