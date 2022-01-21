import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../../store/session';

const PostForm = () => {
  const [author_id, setAuthor_id] = useState();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  const onPost = async e => {
    e.preventDefault();
    // dispatch
  }

  return (
    <div>
      <form onSubmit={onPost}>
        <div className='labels-class'>
          <label htmlFor='title'>Title </label>
          <label htmlFor='title'> Content </label>
        </div>
        <div className='inputs-class'>
          <input
            name='title'
            type='text'
            placeholder='Title'
            value={title}
        </div>
      </form>
    </div>
  )

}