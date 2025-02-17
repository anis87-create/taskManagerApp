const {Schema, default: mongoose, Mongoose} = require('mongoose');

const TaskSchema = Schema({
    title: {type: String, required: true},
    description: {type: String},
    priority: {
        type: String,
        enum: ['low','medium', 'high'],
        default: 'low'
    },
    status: {
        type: String,
        enum: ['to-do','in-progress','done','canceled'],
        default: 'to-do'
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