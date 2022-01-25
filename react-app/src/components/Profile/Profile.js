import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditProfile from './EditProfile';
import './Profile.css'
import { UserCircleIcon, PencilIcon } from "@heroicons/react/solid";
import { editUser } from '../../store/session';
import { postImage } from '../../store/session';
import EditDescription from './EditDescription';

function Profile() {

  const dispatch = useDispatch()

  const currentUser = useSelector(state => state.session.user)
  const thePfp = useSelector(state => state.session.user.pfp_url)

  const [editPopup, setEditPopup] = useState("Edit Profile");
  const [edit, setEdit] = useState("none");
  const [pfp_url, setPfp_url] = useState(currentUser.pfp_url)
  const [image, setImage] = useState(null);
  const [editDesc, setEditDesc] = useState('Edit');

  useEffect(() => {
    if (image) {
      console.log('uploading...')
      dispatch(postImage(image));
    } else console.log('use effect but no effect')
  }, [image])

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <>
      <div className='profile-page-grid'>
        <div className='grid-area-1'>
          <div className='inner-grid-area-1'>
            <div className="pfp-container"
              onClick={() => {
                let x = document.getElementById('testRun')
                x.click();
              }}>
              <input
                className="filey-thing"
                id='testRun'
                name='image'
                type="file"
                accept="image/*"
                onChange={updateImage}
              />
              <img
                className="pfp-image"
                src={thePfp}
                alt="pfp"
              ></img>
              <PencilIcon className="pen-icon" />
            </div>
          </div>
          <div className='inner-grid-area-2'>
            <h1>{currentUser.username}</h1>
          </div>
          <div></div>
        </div>

        <div className='grid-area-2'>
          <div className="info-container">
            <div className='edit-button-container'>
              <button
                className="edit-info"
                onClick={(e) => {
                  if (editPopup === "Edit Profile") {
                    setEditPopup("Cancel")
                    setEdit('none')
                  }
                  else setEditPopup("Edit Profile");
                }}
              >{editPopup}</button>
            </div>
            <div className='popup-div'>
              <EditProfile
                trigger={editPopup}
                setTrigger={setEditPopup}
                edit={edit}
                setEdit={setEdit}
              />
            </div>
          </div>
        </div>
        <div className='grid-area-3'>
          <div className='box-in-grid-3'>
            <p className='description-title'>
              Description:
            </p>
            <div className='description-content-box'>
              {editDesc === 'Cancel' && <EditDescription
                currentUser={currentUser}
                setEditDesc={setEditDesc}
              />
              }
              {editDesc === 'Edit' && (
                <>
                  <p className='description-body'>
                    {currentUser.description || 'none'}
                  </p>
                </>
              )}
              <button onClick={() => {
                if (editDesc === 'Cancel') setEditDesc('Edit')
                else setEditDesc('Cancel')
              }}
              >{editDesc}</button>
            </div>
          </div>
        </div>

        <div className='posts-div'>
          <h1>Posts</h1>
        </div>
      </div>
    </>
  )
}
export default Profile;