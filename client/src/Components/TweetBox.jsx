import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import "../StyleSheet/TweetBox.css"

const TweetBox = () => {
    return (
        <div className="tweetbox__container">
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <div className="tweet__input">
                <input className="tweet__text" type="text" placeholder="What's happening?" />
                <div className="file__post">
                  
                    <Button variant="contained" className="tweet__post">
                        Tweet
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default TweetBox
