import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, useAuthState, useAuthDispatch } from '../../Context/index';

export default function Login(props) {
    const navigate = useNavigate();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const dispatch = useAuthDispatch();
    const { loading, errorMessage } = useAuthState();

    async function handleLogin(e) {
        e.preventDefault();

        const user = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        }

        try {
            let response = await loginUser(dispatch, user) // loginUser action makes the request and handles all the neccessary state changes
            if (!response.token) return
            navigate('/'); //navigate to dashboard on success
        } catch (error) {
            console.log(error)
        }
    }

    
    return (
        <div className="App">
            <form onSubmit={event => handleLogin(event)} id="form-login">
                <h2>Login Form</h2>
                {
                    errorMessage ? <p className="error">{errorMessage}</p> : null
                }
                <div className="form-group">
                    <label>Email Address</label>
                    <input type="text" ref={usernameRef} required/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" ref={passwordRef} required/>
                </div>
                <div className="form-group submit-button">
                    <button type="submit" className="login-submit" disabled={loading}>Login</button>
                </div>
            </form>
        </div>
    );
}