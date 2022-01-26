import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllPosts } from '../../store/posts';
function PostsPage() {

  const dispatch = useDispatch();

  const [ posts, setPosts ] = useState('')
  const [ users, setUsers ] = useState('')

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const data = await response.json();
      const setto = data.users

      setUsers(setto);
      const allPosts = await dispatch(getAllPosts());
      setPosts(allPosts);
    }
    fetchData();
  }, [dispatch])

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts && posts.map(post => (
          <li key={post.id}>{post.title} by {users.filter(user => user.id === post.author_id)[0].username}</li>
        ))}
      </ul>
    </div>
  )
}

export default PostsPage;