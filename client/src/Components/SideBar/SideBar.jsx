import React from 'react'
import "../../StyleSheet/SideBar.css"

import TwitterIcon from '@material-ui/icons/Twitter';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import SideBarLayout from './SideBarLayout';



const SideBar = () => {
    return (
        <div className="sidebar__container">
            <TwitterIcon className="twitter__icon"/>
            <SideBarLayout Icon={HomeIcon} text={'Home'}/>
            <SideBarLayout Icon={AccountCircleIcon} text={'Profile'}/>
            <SideBarLayout Icon={ExitToAppIcon} text={'Log Out'}/>
        </div>
    )
}

export default SideBar