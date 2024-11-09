import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
    
    const [loading, setLoading] = useState(true);
    const [pending_newsletters, setPending_Newsletters] = useState([])
    const [error, setError] = useState(null);
    const [user, setUser ] = useState(null);

    useEffect(() => {
        const fetchpending_newsletters = async () => {
            try {
                const response = await axios.get('/api/pending_newsletters');
                setPending_Newsletters(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchpending_newsletters();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post('/api/login', { email, password });
            setUser (response.data.user_id); // store user ID or any other user data
            return response.data.message; // return success message
        } catch (err) {
            throw new Error(err.response.data.error); // throw error for handling in the component
        }
    };

    return (
        <ApiContext.Provider value={{ pending_newsletters, loading, error, login, user }}>
            {children}
        </ApiContext.Provider>
    )
}