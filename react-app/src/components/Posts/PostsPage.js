import React, { useState } from 'react';
import ShowPosts from './ShowPosts'
import NewPost from './NewPost';
import { PlusIcon } from "@heroicons/react/solid";

function PostsPage() {

  const [postPopup, setPostPopup] = useState(false);
  const [flicker, setFlicker] = useState(false);

  return (
    <>
      {/* <img className='bg-image' src='https://minechef.s3.amazonaws.com/ce9b4922c9854a61a9cd3b3240039557.png' /> */}
      <div className='space-fill'></div>
      <div className='container-div'>
        <div className='filled-div'>
          <h1 className='post-h1-class'>Posts <PlusIcon className='plus-circle-icon' onClick={() => setPostPopup(!postPopup)}/></h1>
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
    </>
  )
}

export default PostsPage;