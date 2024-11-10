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

    const signUp = async (email, password, name) => {
        try {
            const response = await axios.post('/signup', { email, password, name });
            setUser(response.data.user_id);
            return response.data.message;
        } catch (err) {
            throw new Error(err.response.data.error);
        }
    };

    const approveNewsletter = async (newsletterId) => {
        try {
            const response = await axios.post('/api/approve_newsletter/', {newsletterId});
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'Error approving newsletter');
        }
    }

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
        <ApiContext.Provider value={{ pending_newsletters, approveNewsletter, signUp, loading, error, login, user }}>
            {children}
        </ApiContext.Provider>
    )
}