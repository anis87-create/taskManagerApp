const {Schema, default: mongoose} = require('mongoose');

const TaskSchema = Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    priority: {type: String, required: true},
    status: {type: String, required: true},
}, {
    timestamps: true
});


module.exports = mongoose.model('Task', TaskSchema);