import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config/config';
import Avatar from '@material-ui/core/Avatar';
import "../StyleSheet/HomeFeed.css"

import TweetBox from './TweetBox';

const HomeFeed = () => {
    const [tweets, setTweets] = useState([]);
    const [mounted, setMounted] = useState(true);

    useEffect(() => {
        const loadTweets = async () => {
            const { data } = await axios.get(`${BASE_URL}/api/tweet/list`);
            if (mounted) {
                setTweets(data.tweets);
            }
        }
        loadTweets();
        // console.log("tweets===>", tweets)
        // return () => { setMounted(false) };
    }, [mounted, tweets]);
    return (
        <div className="home__feed__container">
            <h2 className="home__title">Home</h2>
            <TweetBox />
            <div className="divider"></div>
            {/* <div className="tweetsss"> */}
            {
                tweets && (
                    <div className="tweets">
                        {
                            tweets.map(tweet => {
                                return (
                                <div className="tweet__content">
                                    <div className="user__avatar">
                                        <Avatar alt={tweet.user.user_name} src="/static/images/avatar/1.jpg" />
                                    </div>
                                    <div className="tweet">
                                        <div className="user">
                                            <h3>{tweet.user.user_name}</h3>
                                            <h4>{`@${tweet.user.user_name.toLowerCase()}`}</h4>
                                        </div>
                                        <h4>{tweet.tweet}</h4>
                                    </div>
                                </div>)
                            })
                        }
                    </div>
                )
            }
            {/* </div> */}
        </div>
    )
}

export default HomeFeed
