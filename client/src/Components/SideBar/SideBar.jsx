import React from 'react'
import "../../StyleSheet/SideBar.css"

import TwitterIcon from '@material-ui/icons/Twitter';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link, useHistory } from 'react-router-dom';


import SideBarLayout from './SideBarLayout';



const SideBar = () => {
    const history = useHistory()
    const handleClick = () => {
        window.localStorage.clear();
        history.push('/')
        window.location.reload();
    }
    return (
        <div className="sidebar__container">
            <TwitterIcon className="twitter__icon"/>
            <Link to="/home"><SideBarLayout Icon={HomeIcon} text={'Home'}/></Link>
            <Link to="/profile"><SideBarLayout Icon={AccountCircleIcon} text={'Profile'}/></Link>
            <Link to='/' onClick={handleClick}><SideBarLayout Icon={ExitToAppIcon} text={'Log Out'}/></Link>
            
        </div>
    )
}

export default SideBar