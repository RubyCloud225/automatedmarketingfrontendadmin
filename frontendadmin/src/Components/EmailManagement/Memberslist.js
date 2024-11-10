import React, { useContext } from 'react';
import { ApiContext } from './ApiContext';

const MembersList = () => {
    const { members } = useContext(ApiContext);

    return (
        <div>
            <h1>Members List</h1>
            <ul>
                {members.map(member => (
                    <li key={member.memberid}>
                        <strong>{member.name}</strong>: {member.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MembersList;