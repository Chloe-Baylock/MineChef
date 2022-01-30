import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditProfile from './EditProfile';
import { CogIcon, PencilIcon, UserCircleIcon, PlusIcon } from "@heroicons/react/solid";
import { postImage } from '../../store/session';
import EditDescription from './EditDescription';
import NewPost from '../Posts/NewPost';
import ShowPosts from '../Posts/ShowPosts';
import './RealProfile.css'
// import './Profile.css'

function Profile(props) {

  const dispatch = useDispatch()

  const currentUser = useSelector(state => state.session.user)

  const [owner, setOwner] = useState(props.profileForId || 'profilePage')
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
        setFlicker(!flicker);
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
    if (owner.pfp_url === '') return { transform: "translate(100%, 100%)" }
    else return { transform: "translate(30px, -65px)" }
  }

  return (
    <>
      <div className='profile-full-below-nav'>
        <div className='profile-pro-desc-div'>
          <div className='profile-top-left'>
            <div className={showOrHide('profile-pfp-container')}
              onClick={() => {
                let x = document.getElementById('testRun')
                x.click();
              }}>
              <input
                className={'profile-filey-thing'}
                id='profile-testRun'
                name='image'
                type={showOrHide('file')}
                accept="image/*"
                onChange={updateImage}
              />
              {owner.pfp_url === '' && (
                <UserCircleIcon className='profile-user-circle-icon' />
              )}
              {owner.pfp_url !== '' && (
                <img
                  className="profile-pfp-image"
                  src={owner.pfp_url}
                  alt="pfp"
                ></img>
              )}
              <PencilIcon className='profile-pen-icon' style={stylePen()} />
            </div>
            <div className='profile-username'>
              <h1>{owner.username}</h1>
            </div>
          </div>


          <div className='profile-description-area'>
            <div className='profile-box-in-grid-3'>
              <div className='profile-description-flex'>
                <button
                  className='profile-button-comp'
                  id={showOrHide('profile-edit-desc-button')}
                  onClick={() => {
                    if (editDesc === 'Cancel') {
                      document.getElementById('profile-description-content-box').style.display = 'block'
                      setEditDesc('Edit')
                    } else {
                      document.getElementById('profile-description-content-box').style.display = 'none'
                      setEditDesc('Cancel')
                    }
                  }}
                >{editDesc}</button>
                <p className='profile-description-title'>
                  Description:
                </p>
                <div />
              </div>
              {editDesc === 'Cancel' && <EditDescription
                flicker={flicker}
                setFlicker={setFlicker}
                owner={owner}
                setEditDesc={setEditDesc}
              />
              }
              <div id='profile-description-content-box'>
                {editDesc === 'Edit' && (
                  <>
                    <p className='profile-description-body'>
                      {owner.description || 'none'}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>


        {/* <div className='profile-posts'>
          <div className='posts-div'>
            <h1>{owner.username}'s posts <button
              className={showOrHide('profile-new-post-button')}
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
        </div> */}

        {/* <div className='full-below-nav'> */}
          {/* <div className='space-fill' /> */}
          <div className='container-div'>
            <div className='filled-div'>
              <div className='profile-top-part'>
                <h1>Posts</h1>
                <button
                  id='plus-button'
                  className='button-comp'
                  onClick={() => {
                    setPostPopup(!postPopup)
                  }}
                >
                  <PlusIcon className='plus-icon' />
                </button>
              </div>
              <div className='centering-div'>
                {postPopup && (<NewPost
                  setPostPopup={setPostPopup}
                  flicker={flicker}
                  setFlicker={setFlicker}
                />)}
                <ul>
                  <ShowPosts
                    flicker={flicker}
                    setFlicker={setFlicker}
                  />
                </ul>
              </div>
            </div>
          </div>
        {/* </div> */}


        <div className="profile-info-container">
          <div className='edit-button-container'>
            <button
              className={showOrHide('edit-info-button')}
              onMouseDown={e => e.currentTarget.style.backgroundColor = 'rgb(90, 90, 90)'}
              onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgb(100, 100, 100)'}
              onMouseUp={e => e.currentTarget.style.backgroundColor = 'rgb(110, 110, 110)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgb(110, 110, 110)'}
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
    </>
  )
}
export default Profile;