import React, { useState } from 'react';
import ShowPosts from './ShowPosts'
import NewPost from './NewPost';
import { PlusIcon } from "@heroicons/react/solid";
import ButtonComp from '../ButtonComponent/ButtonComp';

function PostsPage() {

  const [postPopup, setPostPopup] = useState(false);
  const [flicker, setFlicker] = useState(false);

  return (
    <>
      <div className='space-fill'></div>
      <div className='container-div'>
        <div className='filled-div'>
          <div className='post-top-part'>
            <h1>Posts</h1>
            <button
              id='plus-button'
              className='button-comp'
              onClick={() => {
                console.log('clicked')
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
    </>
  )
}

export default PostsPage;