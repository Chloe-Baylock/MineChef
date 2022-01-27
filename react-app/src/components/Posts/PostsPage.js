import React, { useState } from 'react';
import ShowPosts from './ShowPosts'
import NewPost from './NewPost';

function PostsPage() {

  const [postPopup, setPostPopup] = useState(false);
  const [flicker, setFlicker] = useState(false);

  return (
    <div>
      <h1>Posts <button onClick={() => setPostPopup(!postPopup)}>+</button></h1>
      {postPopup && (<NewPost
        setPostPopup={setPostPopup}
        setFlicker={setFlicker}
      />)}
      <ul>
        <ShowPosts
          flicker={flicker}
          setFlicker={setFlicker}
        />
      </ul>
    </div>
  )
}

export default PostsPage;