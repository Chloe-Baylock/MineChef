import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllPosts } from '../../store/posts';

function PostsPage() {

  const dispatch = useDispatch();

  const [posts, setPosts] = useState({})

  useEffect(() => {
    (async () => {
      console.log('in use effect')
      let allPosts = await dispatch(getAllPosts())
      setPosts(allPosts);
    })()
  }, [dispatch])

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts && Object.keys(posts).map(postKey => (
          <li key={posts[`${postKey}`].id}>{posts[`${postKey}`].title}</li>
        ))}
      </ul>
    </div>
  )
}

export default PostsPage;