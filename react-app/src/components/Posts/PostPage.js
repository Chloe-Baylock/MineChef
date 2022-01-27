import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllPosts } from '../../store/posts';
import { useParams } from 'react-router-dom';


function PostPage() {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const [post, setPost] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const allPosts = await dispatch(getAllPosts());
      setPost(allPosts.filter(post => post.id === +postId)[0])
    }
    fetchData();
  }, [dispatch])

  return (
    <>
      <p>
        {post.content}
      </p>
    </>
  )
}

export default PostPage;