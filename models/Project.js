const mongoose = require('mongoose');

const {Schema} = mongoose;


const ProjectSchema = Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    owner: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    members: [{type: mongoose.Schema.Types.ObjectId, ref:'User'}],
    status: {type: String, enum: ["pending",'in_progress','completed'] , default:'pending'},
}, {timeStamps: true});

module.exports = mongoose.model('project', ProjectSchema);