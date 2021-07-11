import React from 'react';
import "../StyleSheet/Home.css";
import SideBar from './SideBar/SideBar';
import HomeFeed from './HomeFeed';
import Follow from './Follow';
// import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import {  Redirect } from 'react-router-dom';


const Home = () => {
    let authorization = window.localStorage.getItem('auth');
    // console.log("authorization==>", authorization)
    if (!authorization) {
        return <Redirect to="/"/>
    }

    return (
        <div className="home__container">
            <SideBar className="sidebar"/>
            <HomeFeed/>
            <Follow/>
        </div>
    )
}

export default Home
