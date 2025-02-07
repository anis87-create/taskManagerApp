const mongoose = require('mongoose');
const {Schema} = mongoose;


const UserSchema = Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    role: {type: String,
        enum: ["admin", "user"],
        default:"user"
    },
    avatar: {type: String}
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);

