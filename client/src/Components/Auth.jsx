import React from 'react'
import "../StyleSheet/Auth.css"
import TwitterIcon from '@material-ui/icons/Twitter';
// import Button from '@material-ui/core/Button';



const Auth = () => {
    return (
        <div className="auth__style__container">
            <div className="poster__container"><TwitterIcon className="auth__icon" /></div>
            <div className="form__container">
                <form className="signup__form">
                    <h1>Sign Up</h1>
                    <label htmlFor="">Email:</label>
                    <input type="email" placeholder="Enter Email:"/>
                    <label htmlFor="">Password:</label>
                    <input type="password" placeholder="Enter Password:"/>
                    <button type="submit">Sign up</button>
                </form>
                <form action="" className="signin__form">
                    <h1>Sign In</h1>
                    <label htmlFor="">Email:</label>
                    <input type="email" placeholder="Enter Email:"/>
                    <label htmlFor="">Password:</label>
                    <input type="password" placeholder="Enter Password:"/>
                    <button type="submit">Log in </button>
                </form>
            </div>
        </div>
    )
}

export default Auth
