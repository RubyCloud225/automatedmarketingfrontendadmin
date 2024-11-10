import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
    
    const [loading, setLoading] = useState(true);
    const [pending_newsletters, setPending_Newsletters] = useState([])
    const [error, setError] = useState(null);
    const [members, setMembers] = useState([]);
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

    useEffect(() => {
        fetch('/api/members')
            .then(response => response.json())
            .then(data => setMembers(data))
            .catch(error => console.error('Error fetching members:', error));
    }, []);

    const sendNewsletter = (memberIds, newsletterContent) => {
        return fetch('/api/send-newsletter', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ memberIds: memberIds, newsletter_Content: newsletterContent }),
        })
        .then(response => response.json())
        .catch(error => console.error('Error sending newsletter:', error));
    };

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

    const createNewsletter = async (title, content) => {
        try {
            const response = await axios.post('/api/create_newsletter/', {title, content});
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'Error creating newsletter');
        }
    };

    const generateNewsletter = async (prompt) => {
        setLoading(true);
        try {
            const response = await axios.post('/api/generate_newsletter/', {prompt});
            return response.data;
        } catch (err) {
            setError(err.message);
            throw new Error(err.message);
        } finally {
            setLoading(false);
        }
    };

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
        <ApiContext.Provider value={{ members, sendNewsletter, pending_newsletters, generateNewsletter, approveNewsletter, signUp, loading, error, login, user, createNewsletter }}>
            {children}
        </ApiContext.Provider>
    )
}