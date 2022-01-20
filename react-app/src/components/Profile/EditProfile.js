import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Profile.css'

function EditProfile(props) {

    const [user, setUser] = useState({})
    const { userId } = useParams();

    const handleEdit = (e) => {
      e.preventDefault();
      console.log('handleEdit')
      // more here
    }

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

    // const handleEdit = () => {
    //     return 'a'
    // }

    return props.trigger? (
        <>
            <button
              onClick={() => props.setTrigger(false)}
            >Cancel</button>
            <form>
              <button
                className="submit-edit"
                type='submit'
                onClick={() => handleEdit}
              >Submit</button>
            </form>
            {/* <div className="info-container">
                <button
                    className="edit-info"
                    onClick={setEditPopup(true)}
                    >Edit</button>
                <p><strong>User Id:</strong> {user.id}</p>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Profile Picture:</strong> {user.pfp_url || 'none'}</p>
                <p><strong>Description:</strong> {user.description || 'none'}</p>
            </div> */}
        </>
    ) : (
      ""
    )
}
export default EditProfile;