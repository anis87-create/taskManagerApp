const mongoose = require('mongoose');

const {Schema} = mongoose;


const TaskSchema = Schema({
    title: {type: String, required: true},
    description: {type: String},
    priority: {
        type: String,
        enum: ['Low','Medium', 'High'],
        default: 'Low'
    },
    status: {
        type: String,
        enum: ['To Do','In Progress','Completed'],
        default: 'To Do'
    }, 
    dueDate: {type: Date},
    tags: [
       {type: String}
    ],
    owner: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true}
}, {
    timestamps: true
});


module.exports = mongoose.model('Task', TaskSchema);