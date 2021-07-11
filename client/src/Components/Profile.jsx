import React, { useState, useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar';
import decode from 'jwt-decode';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { BASE_URL } from '../config/config';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';



import "../StyleSheet/Profile.css"

const Profile = () => {
    let authorization = window.localStorage.getItem('auth');
    // console.log("authorization==>", authorization)

    const authUser = decode(window.localStorage.getItem('token'))
    const [tweets, setTweets] = useState([]);
    const [mounted, setMounted] = useState(true);
    // const authUser = decode(window.localStorage.getItem('token'));
    var userId = window.localStorage.getItem('uid')

    const handleLike = async (tweet) => {
        if (!tweet.likes.includes(userId)) {
            await axios.put(`${BASE_URL}/api/tweet/like/` + tweet._id + `/` + userId)
            setMounted(true);
        }
    }

    const handleDelete = async (id) => {
        await axios.delete(`${BASE_URL}/api/tweet/delete/` + id)
        setMounted(true);
    }

    useEffect(() => {
        const loadTweets = async () => {
            const listObj = {
                following: authUser.user.following,
            }
            const { data } = await axios.get(`${BASE_URL}/api/tweet/my-tweet/list/` + userId);
            if (mounted) {
                setTweets(data.tweets);
            }
        }
        loadTweets();
        // console.log("tweets===>", tweets)
        return () => { setMounted(false) };
    }, [mounted]);
    return (
        <div className="profile__container">
            <h2 className="profile__title">Profile</h2>
            <div className="profile__info">
                <Avatar alt="Samin" src="/static/images/avatar/1.jpg" />
                <h3>{authUser.name}</h3>
                <h4>{`@${authUser.name.toLowerCase()}`}</h4>
                <div className="follower">
                    <h2>{authUser.user.followers.length}</h2>
                    <h3>Follower</h3>
                </div>
                <div className="following">
                    <h2>{authUser.user.following.length}</h2>
                    <h3>Following</h3>
                </div>
            </div>
            <div className="divider"></div>
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
                                            <div className="likes">
                                                <FavoriteBorderIcon onClick={() => handleLike(tweet)} className="like__icon" />
                                                <div className="likes__count">{tweet.likes.length}</div>
                                                <Button onClick={() => handleDelete(tweet._id)} variant="contained" className="delete__button">
                                                    Delete
                                                </Button>
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

export default Profile
