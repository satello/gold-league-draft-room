import React, { Component } from 'react';

import '../styles/LoginPage.css';

import loginBg from '../images/login-background.jpg';
import logo from '../images/logo-big.png';
import googleSignInBtn from '../images/google-sign-in.png';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

class LoginPage extends Component {
    render() {
        return (
            <div className="login">
                <div className="login-box">
                    <div className="row">
                        <div className="col-sm-6 hidden-xs">
                            <img alt="consultant on laptop" className="login-bg" src={loginBg} />
                        </div>
                        <div className="col-sm-6 login-actions">
                            <img alt="consultation kit" className="login-logo" src={logo} />
                            <a className="login-btn" href={`${API_ENDPOINT}/google/auth`}>
                                <img alt="sign in with google" src={googleSignInBtn} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;