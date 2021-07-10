import React from 'react';
import "../../StyleSheet/SideBarLayout.css"

const SideBarLayout = ({ Icon, text }) => {
    return (
        <div className="sidebar__layout">
            <Icon className="option__icon"/>
            <h4 className="option__title">{text}</h4>
        </div>
    )
}

export default SideBarLayout