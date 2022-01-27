import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postPost } from '../../store/posts';

const NewPost = (props) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onPost = async e => {
    e.preventDefault();
    await dispatch(postPost(title, content));
    props.setFlicker(!props.flicker);
    props.setPostPopup(false);
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

export default NewPost