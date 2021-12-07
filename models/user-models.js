const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: String,
        googleId: String,
        userType: {
            type: String,
            default:null,
        },
        thumbnail: String,
    }
);

const User = mongoose.model('user',userSchema);

module.exports = User;