import React, { useState, useEffect } from 'react';

function PostsPage() {

  const [posts, setPosts] = useState({})

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/posts`);
      const allPosts = await response.json();
      setPosts(allPosts);
    })()
  }, [])

  const postsKeys = Object.keys(posts);

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {postsKeys && postsKeys.map(postKey => (
          <li key={'posts[`${postKey}`].id'}>{posts[`${postKey}`].title}</li>
        ))}
      </ul>
    </div>
  )
}

export default PostsPage;