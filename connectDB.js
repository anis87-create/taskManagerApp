const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://aniscode87:admin@cluster0.wxlk4.mongodb.net/');
        console.log('connection to database successful !');
    } catch (error) {
        console.log('connection to databse failed!');
    }
}


module.exports = connectDB;