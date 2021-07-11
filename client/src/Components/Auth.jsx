import React from 'react'
import "../StyleSheet/Auth.css"
import TwitterIcon from '@material-ui/icons/Twitter';
import { BASE_URL } from '../config/config';
import axios from 'axios';
import decode from 'jwt-decode';
import { useHistory } from 'react-router-dom';
// import Button from '@material-ui/core/Button';



const Auth =  () => {
    const history = useHistory();
    const handleRegister = async (e) => {
        e.preventDefault();
        const formData = e.target;
        const signUp = {
            name: formData.name.value,
            email: formData.email.value,
            password: formData.password.value
        };

        const res = await axios.post(`${BASE_URL}/api/auth/signup`, signUp);
        console.log("resss===>", res)
        if (res.status === 200) {
            document.getElementById("reset__signup__form").reset();
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const formData = e.target;
        const signIn = {
            email: formData.email.value,
            password: formData.password.value
        };

        const res = await axios.post(`${BASE_URL}/api/auth/signin`, signIn);
        console.log("resss===>", res)
        if (res.status === 200) {
            console.log("token", decode(res.data.token));
            const decoded = decode(res.data.token);
            const uid = decoded.id;
            const auth = decoded.auth;
            window.localStorage.setItem('uid', uid);
            window.localStorage.setItem('auth', auth);
            document.getElementById("reset__signin__form").reset();
            history.push('/home')
        }
    }


    return (
        <div className="auth__style__container">
            <div className="poster__container"><TwitterIcon className="auth__icon" /></div>
            <div className="form__container">
                <form id="reset__signup__form" className="signup__form" onSubmit={handleRegister}>
                    <h1>Sign Up</h1>
                    <label htmlFor="name">User Name:</label>
                    <input type="text" name="name" placeholder="Enter User Name:" />
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" placeholder="Enter Email:" />
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" placeholder="Enter Password:" />
                    <button type="submit">Sign up</button>
                </form>
                <form id="reset__signin__form" className="signin__form" onSubmit={handleLogin}>
                    <h1>Sign In</h1>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" placeholder="Enter Email:" />
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" placeholder="Enter Password:" />
                    <button type="submit">Log in </button>
                </form>
            </div>
        </div>
    )
}

export default Auth
