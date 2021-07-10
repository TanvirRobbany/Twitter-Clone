import React from 'react';
import "../StyleSheet/Home.css";
import SideBar from './SideBar/SideBar';
import HomeFeed from './HomeFeed';
import Follow from './Follow';

const Home = () => {
    return (
        <div className="home__container">
            <SideBar className="sidebar"/>
            <HomeFeed/>
            <Follow/>
        </div>
    )
}

export default Home
