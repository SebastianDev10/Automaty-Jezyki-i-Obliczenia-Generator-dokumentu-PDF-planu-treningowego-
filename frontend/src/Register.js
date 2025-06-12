import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Register() {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const [registerError, setRegisterError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:8000/register/', userData);
            
            if (response.data.error) {
                setRegisterError(response.data.error);
            } else {
            window.location.href = '/login';
            }
        } catch (error) {
            setRegisterError('Użytkownik o tej nazwie już istnieje');
        }
    };

    return (
        <div className="login-container">
            <div className="login-logo">
                <img src="/logo/gym_logo_transparent.png" alt="Fashionova" />
            </div>
            <div className="login-form">
            {registerError && <div className="register-error">{registerError}</div>}
                <h2>Register for an account</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" onChange={handleChange} placeholder="Username" required />
                    <input type="email" name="email" onChange={handleChange} placeholder="Email" required />
                    <input type="password" name="password" onChange={handleChange} placeholder="Password" required />
                    <button type="submit">Register</button>
                    <p className="login-link">
                        Masz już konto? 
                        <a href="/login"> Zaloguj się tutaj</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Register;
