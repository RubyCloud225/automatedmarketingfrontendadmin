import React, { useState, useContext } from 'react';
import { ApiContext } from './ApiContext';
import './SignUp.css';

const SignUpContainer = () => {
    const { signUp } = useContext(ApiContext);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    const validatePassword = (password) => {
        const minLength = 10;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        return password.length >= minLength && hasUpperCase && hasNumber;
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');
        if (!validatePassword(password)) {
            setError('Password must be at least 10 characters long, contain at least one uppercase letter and one number.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        try {
            const message = await signUp(email, password, name);
            alert(message);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="sign-up-container">
            <h2>Sign Up</h2>
            <form className="signup-form" onSubmit={handleSignUp}>
                <input type="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required className="signup-input"/>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="signup-input" />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="signup-input"/>
                <input type="password" placeholder= "Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="signup-input"/>
                <button type="submit" className="signup-button">Sign Up</button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default SignUpContainer;


