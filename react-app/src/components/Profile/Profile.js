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
  const [userA, setUserA] = useState('')
  const [pfp_url, setPfp_url] = useState('')
  const [editPopup, setEditPopup] = useState("Edit Profile");
  const [edit, setEdit] = useState("none");
  const [image, setImage] = useState(null);
  const [editDesc, setEditDesc] = useState('Edit');
  const [postPopup, setPostPopup] = useState(false);
  const [flicker, setFlicker] = useState(false)
  const inProfile = true;

  useEffect(() => {
    const fetchUser = async () => {
      console.log('currentUser is', currentUser)
      const response = await fetch(`/api/users/${currentUser.id}`);
      const gettingUser = await response.json();
      setUserA(gettingUser);
    }
    fetchUser()
    if (image) {
      const fetchImage = async () => {
        const url = await dispatch(postImage(image));
        setPfp_url(url);
      }
      fetchImage()
    } else {
      if (+owner === currentUser.id) {
        window.history.pushState('', window.title, '/profile');
      }
      if (owner === 'profilePage') {
        setOwner(currentUser);
      } else if (typeof ownerId === "Number") {
        const fetchData = async function () {
          const ownerId = owner;
          const response = await fetch(`/api/users/${ownerId}`);
          const setto = await response.json();
          setOwner(setto);
        }
        fetchData()
      }
    }
  }, [dispatch, flicker, image])

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
                {(pfp_url === '' && userA.pfp_url === '') && (
                  <UserCircleIcon className='user-circle-icon' />
                )}
                {(pfp_url !== '' || userA.pfp_url !== '') && (
                  <img
                    className="pfp-image"
                    src={pfp_url || userA.pfp_url}
                    alt="pfp"
                  ></img>
                )}
                <PencilIcon className="pen-icon" />
              </div>
              <div className='grid-1-username'>
                <h1>{userA.username}</h1>
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
                    {userA.description || 'none'}
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