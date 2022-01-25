import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditProfile from './EditProfile';
import './Profile.css'
import { UserCircleIcon, PencilIcon } from "@heroicons/react/solid";
import { editUser } from '../../store/session';
import { postImage } from '../../store/session';

function Profile() {

  const dispatch = useDispatch()

  const currentUser = useSelector(state => state.session.user)
  const thePfp = useSelector(state => state.session.user.pfp_url)

  const [editPopup, setEditPopup] = useState("Edit Profile");
  const [edit, setEdit] = useState("none");
  const [pfp_url, setPfp_url] = useState(currentUser.pfp_url)
  const [image, setImage] = useState(null);

  // const uploadImage = () => {
  //   console.log('uploadImage...');
  //   // dispatch(editUser({ 'pfp_url': 'a' }))
  //   return 'nope';
  // }

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

  // const newImage = async (e) => {
  //   e.preventDefault();

  //   image || console.log("* Please upload an image.");

  //   if (image) {
  //     dispatch(postImage(image));
  //   }
  // }

  return (
    <>
      <div className="pfp-container">
        {/* <form onSubmit={newImage}> */}
          <input
            className="filey-thing"
            name='image'
            type="file"
            accept="image/*"
            onChange={updateImage}
          />
          {/* <button className='pfp-submit'>Submit</button> */}
          <img
            className="pfp-image"
            src={thePfp}
            alt="pfp"
          ></img>
          <PencilIcon className="pen-icon" />
        {/* </form> */}
      </div>

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
        {editPopup !== 'Cancel' && <div className='below-popup'>
          <p><strong>User Id:</strong> {currentUser.id}</p>
          <p><strong>Username:</strong> {currentUser.username}</p>
          <p><strong>Email:</strong> {currentUser.email}</p>
          <p><strong>password:</strong> {currentUser.password}</p>
          <p><strong>Profile Picture:</strong> {currentUser.pfp_url || 'none'}</p>
          <p><strong>Description:</strong> {currentUser.description || 'none'}</p>
        </div>}
      </div>
    </>
  )
}
export default Profile;