const USER = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signUp = async (req, res) => {
    const {name, email, password} = req.body;

    if (!name || !email || !password) {
        res.status(400).json({msg: "All Fields Are Required!"})
    }

    const user = await USER.findOne({user_email: email});
    if (user) {
        res.status(409).json({msg: "User Alreary Exits!"})
    }

    const salt = await bcrypt.genSalt(15);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new USER({
        user_name: name,
        user_email: email,
        password: hashedPassword
    });

    await newUser.save((err, user) => {
        if (err) {
            res.status(400).json({msg: 'Bad Requests'})
        }
        else {
            res.status(200).json({user: user, msg: 'Registered Successfully'})
        }
    })
}

exports.signIn = async (req, res) => {
    const {email, password} = req.body;
    let  validatedPassword;

    if (!email || !password) {
        res.status(400).json({msg: 'All Fields Are Rquired'});
    }

    const user = await USER.findOne({user_email: email});

    if (!user) {
        res.status(404).json({msg: 'Not Registered'});
    }
    else {
         validatedPassword = bcrypt.compare(password, user.password);
    }

    if (!validatedPassword) {
        res.status(400).json({msg: 'Invalid Credentials'})
    }

    const token = jwt.sign({id: user._id, name: user.user_name, auth: true}, process.env.jwt_secret);
    return res.status(200).json({token: token, msg: 'Successfully Logged In'})
}

exports.userList = async (req, res) => {
    await USER.find({}).exec((err, users) => {
        if(!users) {
            res.status(200).json({msg: 'No Tweets Found'})
        }
        else if (err) {
            res.status(400).json({msg: 'Bad Request'})
        }
        else {
            res.status(200).json({users: users, msg: 'Tweets List Found'})
        }
    })
}

exports.userFollow =  (req, res) => {
    const {follower_id, following_id} = req.body;
    console.log(follower_id, follower_id)

    USER.updateOne({_id: follower_id}, {$push: {following: following_id}}, async (err, follower) => {
        if(err) {
            res.status(400).json({msg: 'Bad Request'})
        }
        else {
             USER.updateOne({_id: following_id}, {$push: {followers: follower_id}}, (err, following) => {
                if(err) {
                    res.status(400).json({msg: 'Bad Request'})
                }
                else {
                    res.status(200).json({msg: 'Followed'})
                }
            })
        }
    })
}