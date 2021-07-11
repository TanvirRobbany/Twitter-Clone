import React, {useState, useEffect} from 'react'
import Avatar from '@material-ui/core/Avatar';
import decode from 'jwt-decode';
import axios from 'axios';
import { BASE_URL } from '../config/config';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';



import "../StyleSheet/Profile.css"

const UserProfile = () => {
    // let authorization = window.localStorage.getItem('auth');
    // console.log("authorization==>", authorization)
    console.log(window.localStorage.getItem('user'))
    
    const user = decode(window.localStorage.getItem('userToken'))
    console.log("user===>",user)
    const [tweets, setTweets] = useState([]);
    const [mounted, setMounted] = useState(true);
    // const user = decode(window.localStorage.getItem('token'));
    var userId = user._id;

    const handleLike = async (tweet) => {
        if(!tweet.likes.includes(userId)){
            await axios.put(`${BASE_URL}/api/tweet/like/`+tweet._id+`/`+userId)
            setMounted(true);
        }
    }

    useEffect(() => {
        const loadTweets = async () => {
            // const listObj = {
            //     following: .user.following,
            // }
            const { data } = await axios.get(`${BASE_URL}/api/tweet/my-tweet/list/`+userId);
            if (mounted) {
                setTweets(data.tweets);
            }
        }
        loadTweets();
        // console.log("tweets===>", tweets)
        return () => { setMounted(false) };
    }, [mounted, tweets]);
    return (
        <div className="profile__container">
            <h2 className="profile__title">User Profile</h2>
            <div className="profile__info">
                <Avatar alt="Samin" src="/static/images/avatar/1.jpg" />
                <h3>{user.user_name}</h3>
                <h4>{`@${user.user_name.toLowerCase()}`}</h4>
                <div className="follower">
                    <h2>{user.followers.length}</h2>
                    <h3>Follower</h3>
                </div>
                <div className="following">
                    <h2>{user.following.length}</h2>
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

export default UserProfile

