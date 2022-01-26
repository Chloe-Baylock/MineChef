import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postPost } from '../../store/posts';

const PostPage = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  const onPost = e => {
    e.preventDefault();
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