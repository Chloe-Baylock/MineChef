import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Profile() {
    
    const [user, setUser] = useState({})
    const { userId } = useParams();

    useEffect(() => {
        if (!userId) {
            return;
        }
        (async () => {
            const response = await fetch(`/api/users/${userId}`);
            const user = await response.json();
            setUser(user);
          })()
    }, [userId])

    return (
        <p>{user.id}</p>
    )
}
export default Profile;