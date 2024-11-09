import React, { useState, useContext } from 'react';
import ApiContext from './ApiContext';
import './LoginModal.css';

const LoginModel = () => {
    const { login } = useContext(ApiContext);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); //Reset error state
        try {
            const message = await login(email, password);
            alert(message); // Show  success message
            // Optionally redirect or perform additional actions after login
        } catch (err) {
            setError(err.message); // Update error state with error message
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <button type="submit">Login</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    )
}

export default LoginModel;