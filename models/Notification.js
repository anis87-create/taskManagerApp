const {mongoose} = require('mongoose');

const {Schema} = mongoose;  

const NotificationShema = Schema({
    userId: {type: mongoose.Schema.Types.ObjectID, ref:'User'},
    taskId: {type: mongoose.Schema.Types.ObjectID, ref:'Task'},
    type: {type: String, enum: ['task_assigned','task_created', 'task_completed','task_deleted','reminder'], required: true},
    message: {type: String, required: true},
    read: {type: Boolean, default:'false'},
}, {
    timestamps: true
});


module.exports =  mongoose.model('notification', NotificationShema);
