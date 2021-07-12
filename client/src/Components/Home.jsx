import React, { Fragment } from 'react';
import "../StyleSheet/Home.css";
import SideBar from './SideBar/SideBar';
import HomeFeed from './HomeFeed';
import Follow from './Follow';
import Profile from './Profile';
import UserProfile from './UserProfile';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';


const Home = () => {
    let authorization = window.localStorage.getItem('auth');
    if (!authorization) {
        return <Redirect to="/" />
    }

    return (
        <Router>
            <div className="home__container">
                <SideBar className="sidebar" />
                <Switch>
                    <Route exact path="/home" component={HomeFeed} />
                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/user-profile" component={UserProfile} />
                </Switch>
                <Follow />
            </div>
        </Router>
    )
}

export default Home
