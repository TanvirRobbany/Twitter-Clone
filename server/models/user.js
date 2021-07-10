const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    user_name: {
        type: String
    },
    user_email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    following: [
        {
            type: Schema.Types.ObjectId,
            reg: 'user'
        }
    ]
});

const user = mongoose.model('users', userSchema);
module.exports = user;