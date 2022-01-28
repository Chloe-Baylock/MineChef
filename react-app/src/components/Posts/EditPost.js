import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updatePost } from '../../store/posts';
import { CheckIcon, XIcon } from "@heroicons/react/solid";

function EditPost(props) {

  const dispatch = useDispatch();


  const [title, setTitle] = useState(props.post.title)
  const [content, setContent] = useState(props.post.content)

  const editPost = async e => {
    e.preventDefault();
    await dispatch(updatePost(props.post.id, title, content));
    props.setFlicker(!props.flicker);
    props.setTrigger(-5);
    props.setEditButton('Edit');
  }

  const cancelFn = e => {
    e.preventDefault();
    props.setTrigger(-6);
    props.setEditButton('Edit');
  }

  return (
    <>
      <form onSubmit={editPost}>
        <div className='edit-post-form-div'>
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
          <button className='check-button'>
            <CheckIcon className='check-icon' />
          </button>
          <button onClick={e => cancelFn(e)}className='x-button'><XIcon className='x-icon' /></button>
        </div>
      </form>
    </>
  )
}

export default EditPost