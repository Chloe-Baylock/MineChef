import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllPosts, destroyPost } from '../../store/posts';
function PostsPage() {

  const dispatch = useDispatch();

  const [ posts, setPosts ] = useState('')
  const [ users, setUsers ] = useState('')
  const [ flicker, setFlicker] = useState(false)

  const deletePost = async post => {
    console.log('deleting post', post.id)
    await dispatch(destroyPost(post));
    setFlicker(!flicker)
  }

  useEffect(() => {
    const fetchData = async function() {
      if (!users) {
        const response = await fetch('/api/users/');
        const data = await response.json();
        const setto = data.users
        setUsers(setto);
      }
      const allPosts = await dispatch(getAllPosts());
      setPosts(allPosts);
    }
    fetchData();
  }, [dispatch, flicker])


  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts && posts.map(post => (
          <li key={post.id}>{post.title} 
          by {users.filter(user => user.id === post.author_id)[0].username}
          <button
            onClick={() => deletePost(post)}>Delete</button></li>
        ))}
      </ul>
    </div>
  )
}

export default PostsPage;