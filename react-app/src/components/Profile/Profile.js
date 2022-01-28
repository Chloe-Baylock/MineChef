import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditProfile from './EditProfile';
import './Profile.css'
import { CogIcon, PencilIcon, UserCircleIcon } from "@heroicons/react/solid";
import { postImage } from '../../store/session';
import EditDescription from './EditDescription';
import NewPost from '../Posts/NewPost';
import ShowPosts from '../Posts/ShowPosts';

function Profile(props) {

  const dispatch = useDispatch()

  const currentUser = useSelector(state => state.session.user)

  const [owner, setOwner] = useState(props.profileForId || 'profilePage')
  // const [userA, setUserA] = useState('')
  // const [pfp_url, setPfp_url] = useState('')
  const [editPopup, setEditPopup] = useState("Edit Profile");
  const [edit, setEdit] = useState("none");
  const [image, setImage] = useState(null);
  const [editDesc, setEditDesc] = useState('Edit');
  const [postPopup, setPostPopup] = useState(false);
  const [flicker, setFlicker] = useState(false)
  const inProfile = true;

  useEffect(() => {
    const fetchUser = async () => {
      if (owner.id || owner === 'profilePage' || +owner === currentUser.id) {
        // window.history.pushState('', window.title, '/profile');
        const response = await fetch(`/api/users/${currentUser.id}`);
        const gettingUser = await response.json();
        setOwner(gettingUser);
      } else {
        const response = await fetch(`/api/users/${+owner}`);
        const gettingUser = await response.json();
        setOwner(gettingUser);
      }
    }
    fetchUser()
  }, [dispatch, flicker])

  useEffect(() => {
    if (image) {
      const fetchImage = async () => {
        await dispatch(postImage(image));
        setFlicker(!flicker)
      }
      fetchImage()
    }
  }, [dispatch, image])



  const updateImage = e => {
    if (owner.id === currentUser.id) {
      const file = e.target.files[0];
      setImage(file);
    }
  };

  const showOrHide = (cName) => {
    if (owner.id === currentUser.id) return cName;
    else return `hide-${cName}`;
  }

  const stylePen = () => {
    if (owner.pfp_url === '') return {transform: "translate(100%, 100%)"}
    else return {transform: "translate(30px, -65px)"}
  }

  return (
    <>
      <div className='profile-page-grid'>
        <div className='grid-area-1'>
          <div></div>
          <div className='inner-grid-area-2'>
            <div className='white-area'>
              <div className={showOrHide('pfp-container')}
                onClick={() => {
                  let x = document.getElementById('testRun')
                  x.click();
                }}>
                <input
                  className={'filey-thing'}
                  id='testRun'
                  name='image'
                  type={showOrHide('file')}
                  accept="image/*"
                  onChange={updateImage}
                />
                {owner.pfp_url === '' && (
                  <UserCircleIcon className='user-circle-icon' />
                )}
                {owner.pfp_url !== '' && (
                  <img
                    className="pfp-image"
                    src={owner.pfp_url}
                    alt="pfp"
                  ></img>
                )}
                <PencilIcon className='pen-icon' style={stylePen()}/>
              </div>
              <div className='grid-1-username'>
                <h1>{owner.username}</h1>
              </div>
            </div>
          </div>
          <div></div>
        </div>

        <div className='grid-area-2'>
          <div className="info-container">
            <div className='edit-button-container'>
              <button
                className={showOrHide('edit-info-button')}
                onMouseDown={e => e.currentTarget.style.backgroundColor = 'rgb(140, 140, 140)'}
                onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgb(150, 150, 150)'}
                onMouseUp={e => e.currentTarget.style.backgroundColor = 'rgb(160, 160, 160)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgb(160, 160, 160)'}
                onClick={() => {
                  if (editPopup === "Edit Profile") {
                    setEditPopup("Cancel")
                    setEdit('none')
                  }
                  else setEditPopup("Edit Profile");
                }}
              ><CogIcon className='cog-icon' /></button>
            </div>
            <div className='popup-div'>
              <EditProfile
                trigger={editPopup}
                setTrigger={setEditPopup}
                edit={edit}
                setEdit={setEdit}
                flicker={flicker}
                setFlicker={setFlicker}
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
                flicker={flicker}
                setFlicker={setFlicker}
                owner={owner}
                setEditDesc={setEditDesc}
              />
              }
              {editDesc === 'Edit' && (
                <>
                  <p className='description-body'>
                    {owner.description || 'none'}
                  </p>
                </>
              )}
              <button
                className={showOrHide('edit-desc-button')}
                onClick={() => {
                  if (editDesc === 'Cancel') setEditDesc('Edit')
                  else setEditDesc('Cancel')
                }}
              >{editDesc}</button>
            </div>
          </div>
        </div>

        <div className='grid-area-4'>
          <div className='posts-div'>
            <h1>{owner.username}'s posts <button
              className={showOrHide('new-post-button')}
              onClick={() => setPostPopup(!postPopup)}
            >+</button>
            </h1>
            {postPopup && (
              <NewPost
                setPostPopup={setPostPopup}
                flicker={flicker}
                setFlicker={setFlicker}
              />)}
            <ShowPosts
              owner={owner}
              flicker={flicker}
              setFlicker={setFlicker}
              inProfile={inProfile}
            />
          </div>
        </div>
      </div>
    </>
  )
}
export default Profile;