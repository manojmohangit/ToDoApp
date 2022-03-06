import { useNavigate, Link } from "react-router-dom";
import { useAuthDispatch, logout, useAuthState } from '../Context'
import React from 'react';

function Navbar() {

    const navigate = useNavigate();
    const dispatch = useAuthDispatch() // read dispatch method from context
    const {token} = useAuthState() //read user details from context
    
    const handleLogout = () => {
        logout(dispatch) //call the logout action
        navigate('/');
    }
    
    if(token) {
        return (
            <>
                <nav>
                    <ul>
                        <li><Link to="/todo/">To Do</Link></li>
                        <li><Link to="/profile/">Profile</Link></li>
                        <li><a href="/" onClick={handleLogout}>Logout</a></li>
                    </ul>
                </nav>
            </>
        )
    }

    return (
        <>
            <nav>
                <ul>
                    <li><Link to="/login/">Login</Link></li>
                    <li><Link to="/register/">Register</Link></li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar;