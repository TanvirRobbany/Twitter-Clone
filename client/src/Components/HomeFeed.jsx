import React from 'react';
import "../StyleSheet/HomeFeed.css"

import TweetBox from './TweetBox';

const HomeFeed = () => {
    return (
        <div className="home__feed__container">
            <h2 className="home__title">Home</h2>
            <TweetBox/>
            <div className="divider"></div>
        </div>
    )
}

export default HomeFeed
