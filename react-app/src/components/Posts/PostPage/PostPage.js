import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllPosts } from '../../../store/posts';
import { useHistory, useParams } from 'react-router-dom';
import './PostPage.css'

function PostPage() {
  const history = useHistory();

  const dispatch = useDispatch();
  const { postId } = useParams();
  const [post, setPost] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const allPosts = await dispatch(getAllPosts());
      setPost(allPosts.filter(post => post.id === +postId)[0])
    }
    fetchData();
  }, [dispatch, postId])

  useEffect(() => {
    if (post) {
      (async () => {
        const response = await fetch('/api/users/');
        const allUsers = await response.json();
        setAuthor(allUsers.users.filter(user => post.author_id === user.id)[0]);
      })();
    }
  }, [post])

  return (
    <>
      <div className='post-page-below-nav'>
        <div className='post-page-centered-fill'>
          <div className='post-page-top-part'>
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