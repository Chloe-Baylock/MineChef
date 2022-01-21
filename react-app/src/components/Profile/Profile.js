import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EditProfile from './EditProfile';
import './Profile.css'

function Profile() {

  const [user, setUser] = useState({})
  const { userId } = useParams();
  const [ editPopup, setEditPopup ] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/auth/`);
      const data = await response.json();
      console.log(            '******* data is', data);
    })()
  }, [])

  return (
    <>
      <div className="info-container">
        <EditProfile
          trigger={editPopup}
          setTrigger={setEditPopup}
        />
        <button
          className="edit-info"
          onClick={() => setEditPopup(!editPopup)}
        >Edit</button>
        <p><strong>User Id:</strong> {user.id}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>hashed_password:</strong> {user.hashed_password}</p>
        <p><strong>Profile Picture:</strong> {user.pfp_url || 'none'}</p>
        <p><strong>Description:</strong> {user.description || 'none'}</p>
      </div>
    </>
  )
}
export default Profile;