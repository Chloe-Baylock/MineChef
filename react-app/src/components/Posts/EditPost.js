import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updatePost } from '../../store/posts';

function EditPost(props) {

  const dispatch = useDispatch();

  
  const [ title, setTitle ] = useState(props.post.title)
  const [ content, setContent ] = useState(props.post.content)

  const editPost = async e => {
    e.preventDefault();
    console.log('editing post', props.post.id);
    await dispatch(updatePost(props.post.id, title, content));
    props.setFlicker(!props.flicker);
    props.setTrigger(-5);
  }

  return (
    <>
      <form onSubmit={editPost}>
        <label htmlFor='title'></label>
        <label htmlFor='content'></label>
        <input
          name='title'
          value={title}
          onChange={e => setTitle(e.target.value)}
        ></input>
        <input
          name='content'
          value={content}
          onChange={e => setContent(e.target.value)}
        ></input>
        <button>Submit Edit</button>
      </form>
    </>
  )
}

export default EditPost