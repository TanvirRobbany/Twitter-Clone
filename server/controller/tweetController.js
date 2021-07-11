const USER = require('../models/user');
const TWEET = require('../models/tweets');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.tweetPost = async (req, res) => {
    const {user_id, tweet} = req.body;

    const newTweet = new TWEET({
        user: user_id,
        tweet,
    });

    await newTweet.save((err, tweet) => {
        if(err) {
            res.status(400).json({msg: 'Bad Request'});
        }
        else {
            res.status(200).json({tweet: tweet, msg: 'Tweet Successful'});
        }
    })
}

exports.tweetList = async (req, res) => {
    const {following} = req.body;
    await TWEET.find({user: {$in: following}}).populate("user").exec((err, tweets) => {
        if(!tweets) {
            res.status(200).json({msg: 'No Tweets Found'})
        }
        else if (err) {
            res.status(400).json({msg: 'Bad Request'})
        }
        else {
            res.status(200).json({tweets: tweets, msg: 'Tweets List Found'})
        }
    })
}

exports.tweetLikes = async (req, res) => {
    const {id, userId} = req.params;

    const tweet = await TWEET.findOne({_id: id});

    TWEET.updateOne({_id: id}, {$push: {likes: userId}}, (err, tweet) => {
        if(!tweet) {
            res.status(200).json({msg: 'No Tweets Found'})
        }
        else if (err) {
            res.status(400).json({msg: 'Bad Request'})
        }
        else {
            res.status(200).json({tweet: tweet, msg: 'Successfully Updated'})
        }
    })
}

exports.myTweets = async (req, res) => {
    const {id} = req.params;

    await TWEET.find({user: id}).populate("user").exec((err, tweets) => {
        if(!tweets) {
            res.status(200).json({msg: 'No Tweets Found'})
        }
        else if (err) {
            res.status(400).json({msg: 'Bad Request'})
        }
        else {
            res.status(200).json({tweets: tweets, msg: 'Tweets List Found'})
        }
    })
}

exports.deletTweet = async (req, res) => {
    const {id} = req.params;

    await TWEET.findByIdAndRemove({_id: id}).exec((err, tweet) => {
        if(!tweet) {
            res.status(200).json({msg: 'No Tweets Found'})
        }
        else if (err) {
            res.status(400).json({msg: 'Bad Request'})
        }
        else {
            res.status(200).json({tweet: tweet, msg: 'Tweet Deleted'})
        }
    })
}