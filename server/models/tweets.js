const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tweetSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        rquired: true
    },
    tweet: {
        type: String,
        required: true
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }]
});

const tweet = mongoose.model('tweets', tweetSchema);
module.exports = tweet;