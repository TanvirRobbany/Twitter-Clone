import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config/config';
import Avatar from '@material-ui/core/Avatar';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import decode from 'jwt-decode';
import jwt from 'jsonwebtoken';
import {Link} from 'react-router-dom';

import "../StyleSheet/HomeFeed.css"

import TweetBox from './TweetBox';

const HomeFeed = () => {
    const [tweets, setTweets] = useState([]);
    const [mounted, setMounted] = useState(true);
    const authUser = decode(window.localStorage.getItem('token'));
    const accessToken = window.localStorage.getItem('token');

    const authAxios = axios.create({
        headers: {
            Authorization: accessToken,
        }
    })

    const handleLike = async (tweet) => {
        const userId = window.localStorage.getItem('uid')
        if(!tweet.likes.includes(userId)){
            await authAxios.put(`${BASE_URL}/api/tweet/like/`+tweet._id+`/`+userId)
            setMounted(true);
        }
    }

    const handleUser = (user) => {
        const userToken = jwt.sign(user, "secret");

        window.localStorage.setItem('userToken', userToken)
    }

    const loadTweets = async () => {
        const listObj = {
            following: authUser.user.following,
        }
        const { data } = await authAxios.post(`${BASE_URL}/api/tweet/list`, listObj);
        if (mounted) {
            setTweets(data.tweets);
        }
    }

    useEffect(() => {
        loadTweets();
        return () => { setMounted(false) };
    }, [mounted, tweets]);

    return (
        <div className="home__feed__container">
            <h2 className="home__title">Home</h2>
            <TweetBox />
            <div className="divider"></div>
            {
                tweets && (
                    <div className="tweets">
                        {
                            tweets.map(tweet => {
                                return (
                                <div key={tweet._id} className="tweet__content">
                                    <div className="user__avatar">
                                        <Avatar alt={tweet.user.user_name} src="/static/images/avatar/1.jpg" />
                                    </div>
                                    <div className="tweet">
                                        <div className="user">
                                            <Link to="/user-profile" onClick={()=> handleUser(tweet.user)}><h3>{tweet.user.user_name}</h3></Link>
                                            <h4>{`@${tweet.user.user_name.toLowerCase()}`}</h4>
                                        </div>
                                        <h4>{tweet.tweet}</h4>
                                        <div className="likes">
                                        <FavoriteBorderIcon onClick={() => handleLike(tweet)} className="like__icon"/>
                                        <div className="likes__count">{tweet.likes.length}</div>
                                        </div>
                                    </div>
                                </div>)
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}

export default HomeFeed
