import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { getAllPosts, destroyPost } from '../../store/posts';
// import EditPost from './EditPost'
import ShowPosts from './ShowPosts'

function PostsPage() {

  // const dispatch = useDispatch();

  // const [posts, setPosts] = useState('')
  // const [users, setUsers] = useState('')
  // const [trigger, setTrigger] = useState(-2)
  // const [flicker, setFlicker] = useState(false)
  // const [editButton, setEditButton] = useState('Edit')

  // const deletePost = async post => {
  //   console.log('deleting post', post.id)
  //   await dispatch(destroyPost(post));
  //   setFlicker(!flicker)
  // }

  // useEffect(() => {
  //   const fetchData = async function () {
  //     if (!users) {
  //       const response = await fetch('/api/users/');
  //       const data = await response.json();
  //       const setto = data.users
  //       setUsers(setto);
  //     }
  //     const allPosts = await dispatch(getAllPosts());
  //     setPosts(allPosts);
  //   }
  //   fetchData();
  // }, [dispatch, flicker])

  // const retEdit = post => {
  //   if (editButton.postId === post.id) return true
  //   else return false;
  // }

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        <ShowPosts />
      </ul>
    </div>
  )
}

export default PostsPage;