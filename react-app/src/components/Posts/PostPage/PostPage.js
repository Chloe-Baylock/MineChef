import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts, destroyPost } from '../../../store/posts';
import { useHistory, useParams } from 'react-router-dom';
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import EditPost from '../EditPost';
import './PostPage.css'

function PostPage() {
  const history = useHistory();
  const currentUser = useSelector(state => state.session.user)

  const dispatch = useDispatch();
  const { postId } = useParams();
  const [post, setPost] = useState('');
  const [author, setAuthor] = useState('');
  const [trigger, setTrigger] = useState(-2)
  const [editButton, setEditButton] = useState('Edit')
  const [flicker, setFlicker] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const allPosts = await dispatch(getAllPosts());
      setPost(allPosts.filter(post => post.id === +postId)[0])
    }
    fetchData();
  }, [dispatch, postId, flicker])

  useEffect(() => {
    if (post) {
      (async () => {
        const response = await fetch('/api/users/');
        const allUsers = await response.json();
        setAuthor(allUsers.users.filter(user => post.author_id === user.id)[0]);
      })();
    }
  }, [post])


  const deletePost = async post => {
    await dispatch(destroyPost(post));
    history.push('/profile');
  }

  const retEdit = post => {
    if (editButton.postId === post.id) return true
    else return false;
  }

  const isRightUser = (post) => {
    if (currentUser.id === post.author_id) return 'post-page-owner'
    else return 'post-page-not-owner';
  }

  return (
    <>
      <div className='post-page-below-nav'>
        <div className='post-page-centered-fill'>
          <div className='post-page-top-part'>
            <div className='post-page-edit-delete'>
              <PencilIcon
                className={isRightUser(post)}
                id='post-page-pencil'
                onClick={e => {
                  if (retEdit(post)) {
                    setEditButton('Edit');
                    setTrigger(-4);
                  }
                  else if (editButton === 'Edit') {
                    setEditButton({ postId: post.id });
                    setTrigger(1);
                  }
                  else {
                    setEditButton({ postId: post.id });
                    setTrigger(1);
                  }
                }}
              />
              <TrashIcon
                className={isRightUser(post)}
                id='post-page-delete'
                onClick={() => deletePost(post)}
              />
            </div>
            {+trigger > 0 && (
              <EditPost
                post={post}
                setEditButton={setEditButton}
                setTrigger={setTrigger}
                flicker={flicker}
                setFlicker={setFlicker}
              />
            )}
            <p
              className='post-page-author-p'
              onClick={() => history.push(`/users/${author.id}`)}
            >{author.username}:</p>
            <h1 className='post-page-title-h1'>
              {post.title}
            </h1>
          </div>
          <p className='post-page-content'>
            {post.content}
          </p>
        </div>
      </div>
    </>
  )
}

export default PostPage;