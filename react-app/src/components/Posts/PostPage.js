import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllPosts } from '../../store/posts';
import { useParams } from 'react-router-dom';


function PostPage() {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const [posts, setPosts] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const allPosts = await dispatch(getAllPosts());
      setPosts(allPosts);
    }
    fetchData();
  }, [])

  return (
    <>
      {posts && posts.map(post => { if (post.id === +postId) return (
        <p>
          {post.content}
        </p>
      )})}
    </>
  )
}

export default PostPage;