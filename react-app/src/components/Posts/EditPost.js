import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updatePost } from '../../store/posts';
import { CheckIcon, XIcon } from "@heroicons/react/solid";

function EditPost(props) {

  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState(props.post.title)
  const [content, setContent] = useState(props.post.content)

  const editPost = async e => {
    e.preventDefault();
    const errArr = []

    content || errArr.push('Please enter the content for your post.')

    if (errArr.length) {
      setErrors(errArr);
      return 'unsuccessful';
    }
    else {
      await dispatch(updatePost(props.post.id, title, content));
      props.setFlicker(!props.flicker);
      props.setTrigger(-5);
      props.setEditButton('Edit');
    }
  }

  const cancelFn = e => {
    e.preventDefault();
    props.setTrigger(-6);
    props.setEditButton('Edit');
  }

  return (
    <>
      {errors.length > 0 && (
        <div className='errors-fill'>
          <p className='errors-for-edit-post'>{errors[0]}</p>
        </div>
      )}
      <form onSubmit={editPost}>
        <div className='edit-post-form-div'>
          <input
            name='title'
            value={title}
            onChange={e => setTitle(e.target.value)}
          ></input>
          <input
          className='elevate'
            name='content'
            value={content}
            onChange={e => setContent(e.target.value)}
          ></input>
          <button className='check-button'>
            <CheckIcon className='check-icon' />
          </button>
          <button onClick={e => cancelFn(e)} className='x-button'><XIcon className='x-icon' /></button>
        </div>
      </form>
    </>
  )
}

export default EditPost