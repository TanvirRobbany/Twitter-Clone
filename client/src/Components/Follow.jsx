import React, { useState, useEffect } from 'react';
import "../StyleSheet/Follow.css"
import { BASE_URL } from '../config/config'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import decode from 'jwt-decode';
import axios from 'axios';

const Follow = () => {
    const [users, setUsers] = useState([]);
    const [mounted, setMounted] = useState(true);
    let loggedInUserId = window.localStorage.getItem("uid");
    const authUser = decode(window.localStorage.getItem('token'));
    const accessToken = window.localStorage.getItem('token');

    const authAxios = axios.create({
        headers: {
            Authorization: accessToken,
        }
    })

    const handleFollow = async (id) => {
        const followObj = {
            follower_id: loggedInUserId,
            following_id: id
        }

        const res = await authAxios.put(`${BASE_URL}/api/auth/user/follow`, followObj);
        window.localStorage.setItem('token', res.data.token);
        setMounted(true);
        // loadUsers();
        window.location.reload();
    }

    const loadUsers = async () => {
        const { data } = await authAxios.get(`${BASE_URL}/api/auth/users`);
        if (mounted) {
            setUsers(data.users)
        }
    }
    useEffect(() => {
        loadUsers();
        return () => { setMounted(false) }
    }, [mounted]);

    return (
        <div>
            <div className="follow__container">
                <h2 className="title">Follow</h2>
            </div>
            {
                users && (
                    <div className="users">
                        {
                            users.map(user => {
                                if (user._id != authUser.user._id && !authUser.user.following.includes(user._id)){
                                    return (
                                        <div key={user._id} className="user__container">
                                            <div className="user__avatar">
                                                <Avatar alt={user.user_name} src="/static/images/avatar/1.jpg" />
                                            </div>
                                            <div className="user__info">
                                                <div className="user__name">
                                                    <h3>{user.user_name}</h3>
                                                    <h4>{`@${user.user_name.toLowerCase()}`}</h4>
                                                </div>
                                                <div className="actions">
                                                    <Button onClick={() => handleFollow(user._id)} variant="contained" className="follow__button">
                                                        Follow
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Follow
