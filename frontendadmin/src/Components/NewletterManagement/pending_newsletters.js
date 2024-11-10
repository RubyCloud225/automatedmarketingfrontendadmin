import React, { useEffect, useContext } from 'react';
import { ApiContext } from '../../apicontext';

const PendingNewsletters = () => {
    const { fetchpending_newsletters, pendingNewsletters, loading, error, approveNewsletter } = useContext(ApiContext);

    useEffect(() => {
        fetchpending_newsletters();
    }, [fetchpending_newsletters]);

    const handleApprove = async (newsletterId) => {
        try {
            await approveNewsletter(newsletterId);
            fetchpending_newsletters();
        } catch (err) {
            console.error(err.message);
        }
    };

    if (loading) return <p>Loading ...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Pending Newsletters</h2>
            {pendingNewsletters.length === 0 ? (
                <p>No pending newsletters</p>
            ) : (
                <ul>
                    {pendingNewsletters.map((newsletter) => (
                        <li key={newsletter.newsletterId}>
                            <h3>{newsletter.title}</h3>
                            <p>{newsletter.content}</p>
                            <button onClick={() => handleApprove(newsletter.id)}>Approve</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PendingNewsletters