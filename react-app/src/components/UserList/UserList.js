import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './UserList.css';

function UserList() {
  const history = useHistory();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  const userComponents = users.map((user) => {
    return (
      <li className='user-list-li' key={user.id}>
        <button
          className='user-list-button-comp'
          onClick={() => history.push(`/users/${user.id}`)}
        >{user.username}</button>
      </li>
    );
  });

  return (
    <>
      <div className='user-list-full-below-nav'>
        <div className='user-list-space-fill' />
        <div className='user-list-container-div'>
          <div className='user-list-filled-div'>
            <div className='user-list-post-top-part'>
              <h1>User List: </h1>
            </div>
            <div className='user-list-centering-div'>
              <ul className='user-list-ul'>{userComponents}</ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserList;
