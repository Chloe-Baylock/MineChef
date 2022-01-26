import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { postPost } from '../../store/posts';

const PostPage = () => {
  const dispatch = useDispatch();

  const [author_id, setAuthor_id] = useState();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  const onPost = e => {
    e.preventDefault();
    console.log('posting');
    dispatch(postPost(title, content))
  }

  return (
    <div>
      <form onSubmit={onPost}>
        <div className='labels-class'>
          <label htmlFor='title'>Title </label>
          <label htmlFor='content'> Content </label>
        </div>
        <div className='inputs-class'>
          <input
            name='title'
            type='text'
            placeholder='Title'
            value={title}
            onChange={e => setTitle(e.target.value)}
          ></input>
          <input
            name='content'
            type='text'
            placeholder='Content'
            value={content}
            onChange={e => setContent(e.target.value)}
            ></input>
          <button>Submit</button>
        </div>
      </form>
    </div>
  )

}

export default PostPage