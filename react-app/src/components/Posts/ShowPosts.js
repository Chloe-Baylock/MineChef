import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllPosts, destroyPost } from '../../store/posts';
import EditPost from './EditPost'

function ShowPosts(props) {

  const history = useHistory()

  const currentUser = useSelector(state => state.session.user)
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

  const isRightUser = (post) => {
    if (currentUser.id === post.author_id) return 'user-owns-post'
    else return 'user-does-not-own-post';
  }

  return (
    <>
      <ul>
        {posts && posts.map(post => {
          if (props.inProfile && post.author_id !== props.owner.id) return '';
          else return (
            <li className='li-of-post' key={post.id}>
              <p
                className='post-component'
                onClick={() => history.push(`/posts/${post.id}`)}
              >{post.title}</p>
              <p className='word-by'>by</p>
              <p
                className='author-component'
                onClick={() => history.push(`/users/${post.author_id}`)}
              >{
                  users.filter(user => user.id === post.author_id)[0].username}
              </p>
              {+trigger === post.id && (
                <EditPost
                  post={post}
                  setEditButton={setEditButton}
                  setTrigger={setTrigger}
                  flicker={props.flicker}
                  setFlicker={props.setFlicker}
                />)}
              <button className={isRightUser(post)} id={post.id}
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
              <button className={isRightUser(post)}
                onClick={() => deletePost(post)}
              >Delete</button></li>
          )
        })}
      </ul>
    </>
  )
}

export default ShowPosts;