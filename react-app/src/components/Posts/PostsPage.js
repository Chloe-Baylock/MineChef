import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllPosts, destroyPost } from '../../store/posts';
function PostsPage() {

  const dispatch = useDispatch();

  const [ posts, setPosts ] = useState('')
  const [ users, setUsers ] = useState('')
  const [ aa, setaa] = useState(true)

  const deletePost = post => {
    console.log('deleting post', post.id)
    dispatch(destroyPost(post));
    setaa(false)
  }

  useEffect(() => {
    const fetchData = async function() {
      const response = await fetch('/api/users/');
      const data = await response.json();
      const setto = data.users
      
      setUsers(setto);
      const allPosts = await dispatch(getAllPosts());
      setPosts(allPosts);
    }
    fetchData();
    setaa(true)
  }, [dispatch, aa])


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