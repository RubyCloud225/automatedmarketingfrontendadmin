import React, { useContext, useState } from 'react';
import { ApiContext } from './ApiContext';

const Newsletter = () => {
    const { members, sendNewsletter } = useContext(ApiContext);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [newsletterContent, setNewsletterContent] = useState('');

    const handleMemberSelect = (Id) => {
        setSelectedMembers(prev =>
            prev.includes(Id) ? prev.filter(memberId => memberId !== Id) : [...prev, Id]
        );
    };

    const handleSendNewsletter = () => {
        if (selectedMembers.length === 0) {
            alert('Please select at least one member to send the newsletter to.');
            return;
        }
        if (newsletterContent.trim() === '') {
            alert('Please enter newsletter content.');
            return;
        }

        sendNewsletter(selectedMembers, newsletterContent)
            .then(response => {
                alert(response.message);
                setSelectedMembers([]);
                setNewsletterContent('');
            });
    };

    return (
        <div>
            <h1>Send Newsletter</h1>
            <textarea value={newsletterContent} onChange={(e) => setNewsletterContent(e.target.value)} placeholder="Enter newsletter content" rows="4" cols="50" />
            <h2>Select Members</h2>
            <ul>{members.map(member => (<li key={member.Id}><label><input type="checkbox" checked={selectedMembers.includes(member.Id)} onChange={() => handleMemberSelect(member.Id)} />{member.name} - {member.email}</label></li>))}</ul>
            <button onClick={handleSendNewsletter}>Send Newsletter</button>
        </div>
    );
};

export default Newsletter;