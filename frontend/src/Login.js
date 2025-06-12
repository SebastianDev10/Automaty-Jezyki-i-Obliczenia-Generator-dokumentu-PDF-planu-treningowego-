import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login() {
    const [userData, setUserData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const [loginError, setLoginError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/token/', userData);
            if (response.data.error) {
                setLoginError(response.data.error);
            } else {
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                window.location.href = '/training-plans';
            }
        } catch (error) {
            console.error('Błąd logowania:', error);
            setLoginError('Niepoprawna nazwa użytkownika lub hasło');
        }
    };

    return (
        <div className="login-container">
            <div className="login-logo">
                <img src="/logo/gym_logo_transparent.png" alt="Fashionova" />
            </div>
            <div className="login-form">
            {loginError && <div className="login-error">{loginError}</div>}
                <h2>Login in to your account</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" onChange={handleChange} placeholder="Username" required />
                    <input type="password" name="password" onChange={handleChange} placeholder="Password" required />
                    <button type="submit">Login</button>
                    <p className="register-link">
                        Nie posiadasz jeszcze konta? 
                        <a href="/register"> Zarejestruj się</a> 
                </p>
                </form>
            </div>
        </div>
        
    );
}

export default Login;

