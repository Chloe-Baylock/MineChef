import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllPosts, destroyPost } from '../../store/posts';
import EditPost from './EditPost'

function ShowPosts(props) {

  const dispatch = useDispatch();

  const [posts, setPosts] = useState('')
  const [users, setUsers] = useState('')
  const [trigger, setTrigger] = useState(-2)
  const [editButton, setEditButton] = useState('Edit')

  const deletePost = async post => {
    await dispatch(destroyPost(post));
    props.setFlicker(!props.flicker)
  }

  useEffect(() => {
    const fetchData = async function () {
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
  }, [dispatch, props.flicker])

  const retEdit = post => {
    if (editButton.postId === post.id) return true
    else return false;
  }

  return (
    <>
      <ul>
        {posts && posts.map(post =>  (
          <li key={post.id}>{post.title}
            by {users.filter(user => user.id === post.author_id)[0].username}
            {+trigger === post.id && (
              <EditPost
                post={post}
                setEditButton={setEditButton}
                setTrigger={setTrigger}
                flicker={props.flicker}
                setFlicker={props.setFlicker}
              />)}
            <button id={post.id}
              onClick={e => {
                if (retEdit(post)) {
                  setEditButton('Edit')
                  setTrigger(-4);
                }
                else if (editButton === 'Edit') {
                  setEditButton({ postId: post.id })
                  setTrigger(e.target.id);
                }
                else {
                  setEditButton({ postId: post.id })
                  setTrigger(e.target.id);
                }
              }}
            >{retEdit(post) && 'Cancel' || 'Edit'}</button>
            <button
              onClick={() => deletePost(post)}
            >Delete</button></li>
        ))}
      </ul>
    </>
  )
}

export default ShowPosts;