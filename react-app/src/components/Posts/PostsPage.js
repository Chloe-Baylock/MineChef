import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllPosts, destroyPost } from '../../store/posts';
import EditPost from './EditPost'
function PostsPage() {

  const dispatch = useDispatch();

  const [posts, setPosts] = useState('')
  const [users, setUsers] = useState('')
  const [trigger, setTrigger] = useState(-2)
  const [flicker, setFlicker] = useState(false)
  const [editButton, setEditButton] = useState('Edit')

  const deletePost = async post => {
    console.log('deleting post', post.id)
    await dispatch(destroyPost(post));
    setFlicker(!flicker)
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
  }, [dispatch, flicker])

  // const retEdit = post => {
  //   if (editButton.postId === post.id) return 'Cancel'
  //   else return 'Edit';
  // }
  const retEdit = post => {
    if (editButton.postId === post.id) return true
    else return false;
  }

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts && posts.map(post =>  (
          <li key={post.id}>{post.title}
            by {users.filter(user => user.id === post.author_id)[0].username}
            {+trigger === post.id && (
              <EditPost
                post={post}
                setTrigger={setTrigger}
                flicker={flicker}
                setFlicker={setFlicker}
              />)}
            <button id={post.id}
              onClick={e => {
                console.log('post.id is', post.id)
                if (retEdit(post)) {
                  console.log('button read cancel now reads edit')
                  console.log(editButton)
                  setEditButton('Edit')
                  setTrigger(-4);
                }
                else if (editButton === 'Edit') {
                  console.log('case 2')
                  console.log(editButton)
                  setEditButton({ postId: post.id })
                  setTrigger(e.target.id);
                }
                else {
                  console.log('case 3 diff button reads cancel')
                  setEditButton({ postId: post.id })
                  setTrigger(e.target.id);
                }
              }}
            >{retEdit(post) && 'Cancel' || 'Edit'}</button>
            {/* >{retEdit(post)}</button> */}
            <button
              onClick={() => deletePost(post)}
            >Delete</button></li>
        ))}
      </ul>
    </div>
  )
}

export default PostsPage;