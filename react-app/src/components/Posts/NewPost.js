import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postPost } from '../../store/posts';

const NewPost = (props) => {
  const dispatch = useDispatch();

  const [error, setError] = useState('')
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onPost = async e => {
    e.preventDefault();
    if (content) {
      await dispatch(postPost(title, content));
      props.setFlicker(!props.flicker);
      props.setPostPopup(false);
    } else {
      setError('Please enter content for your post.')
    }
  }

  return (
    <div>
      {error && (
        <p className='post-error-message'>{error}</p>
      )}
      <form onSubmit={onPost}>
        <div className='labels-class'>
        </div>
        <div className='inputs-class'>
          <input
            name='title'
            type='text'
            placeholder='Title'
            value={title}
            onChange={e => setTitle(e.target.value)}
          ></input>
          <textarea
            name='content'
            placeholder='Content'
            value={content}
            onChange={e => setContent(e.target.value)}
            ></textarea>
          <button className='button-comp'>Submit</button>
        </div>
      </form>
    </div>
  )

}

export default NewPost