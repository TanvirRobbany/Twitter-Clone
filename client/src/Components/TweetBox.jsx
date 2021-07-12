import React, {useState} from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { BASE_URL } from '../config/config';
import axios from 'axios';
import "../StyleSheet/TweetBox.css"

const TweetBox = () => {
    const userId = window.localStorage.getItem('uid');
    const userName = window.localStorage.getItem('uname');
    const [tweet, setTweet] = useState("");

    const accessToken = window.localStorage.getItem('token');

    const authAxios = axios.create({
        headers: {
            Authorization: accessToken,
        }
    })

    const handleTweet = async () => {
        const tweetObj = {
            user_id: userId,
            tweet: tweet
        };
        
        const res = await authAxios.post(`${BASE_URL}/api/tweet/post`, tweetObj)
        alert(res.data.msg);
        setTweet('');
    }
    return (
        <div className="tweetbox__container">
            <Avatar alt={userName} src="/static/images/avatar/1.jpg" />
            <div className="tweet__input">
                <input onChange={(e) => setTweet(e.target.value)} value={tweet} className="tweet__text" type="text" placeholder="What's happening?" />
                <div className="file__post">
                  
                    <Button variant="contained" className="tweet__post" onClick={handleTweet} disabled={tweet === ""}>
                        Tweet
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default TweetBox
