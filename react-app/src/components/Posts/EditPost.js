import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updatePost } from '../../store/posts';
import { CheckIcon, XIcon } from "@heroicons/react/solid";

function EditPost(props) {

  const dispatch = useDispatch();

  const [error, setError] = useState([]);
  const [title, setTitle] = useState(props.post.title)
  const [content, setContent] = useState(props.post.content)

  const editPost = async e => {
    e.preventDefault();

    if (content) {
      await dispatch(updatePost(props.post.id, title, content));
      props.setFlicker(!props.flicker);
      props.setTrigger(-5);
      props.setEditButton('Edit');
    } else {
      setError('Please enter content for your post.')
    }
  }

  const cancelFn = e => {
    e.preventDefault();
    props.setTrigger(-6);
    props.setEditButton('Edit');
  }

  const epCname = classN => {
    if (props.cName) return `${props.cName}${classN}`;
    else return `edit-post-${classN}`;
  }

  return (
    <div>
      <form onSubmit={editPost}>
        <div className={epCname('form-div')}>
          {error && (
            <p className='post-error-message2'>{error}</p>
          )}
          <input
            name='title'
            value={title}
            onChange={e => setTitle(e.target.value)}
          ></input>
          <textarea
            className='elevate'
            name='content'
            value={content}
            onChange={e => setContent(e.target.value)}
          ></textarea>
          <button className='check-button'>
            <CheckIcon className='check-icon' />
          </button>
          <button onClick={e => cancelFn(e)} className='x-button'><XIcon className='x-icon' /></button>
        </div>
      </form>
    </div>
  )
}

export default EditPost