const mongoose = require('mongoose');
const {Schema} = mongoose;


const UserSchema = Schema({
    username: {type: String},
    password: {type: String, required: true},
    email: {type: String, required: true},
    role: {type: String,
        enum: ["admin", "user"],
        default:"user"
    },
    avatar: {type: String},
    mode: {
        type: String,
        enum: ["Task","Project"],
        default:'Task'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);

