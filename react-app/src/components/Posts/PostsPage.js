import React, { useState } from 'react';
import ShowPosts from './ShowPosts'
import NewPost from './NewPost';
import { PlusIcon } from "@heroicons/react/solid";

function PostsPage() {

  const [postPopup, setPostPopup] = useState(false);
  const [flicker, setFlicker] = useState(false);

  return (
    <>
      <div className='full-below-nav'>
        <div className='space-fill' />
        <div className='container-div'>
          <div className='filled-div'>
            <div className='post-top-part'>
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
      </div>
    </>
  )
}

export default PostsPage;