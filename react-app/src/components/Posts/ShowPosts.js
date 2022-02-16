import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllPosts, destroyPost } from '../../store/posts';
import { getAllVotes, postVote} from '../../store/votes';
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import EditPost from './EditPost'

function ShowPosts(props) {

  const history = useHistory()

  const currentUser = useSelector(state => state.session.user)
  const dispatch = useDispatch();

  const [posts, setPosts] = useState('')
  const [users, setUsers] = useState('')
  const [trigger, setTrigger] = useState(-2)
  const [editButton, setEditButton] = useState('Edit')

  const deletePost = async post => {
    await dispatch(destroyPost(post));
    props.setFlicker(!props.flicker)
  }

  const createVote = async is_up => {
    await dispatch(postVote(is_up));
  }

  useEffect(() => {
    const fetchData = async function () {
      if (!users) {
        const response = await fetch('/api/users/');
        const data = await response.json();
        const setto = data.users
        setUsers(setto);
      } else {
        const allPosts = await dispatch(getAllPosts());
        setPosts(allPosts);
      }
    }
    fetchData();
  }, [dispatch, users, props.flicker])

  const retEdit = post => {
    if (editButton.postId === post.id) return true
    else return false;
  }

  const isRightUser = (post) => {
    if (currentUser.id === post.author_id) return 'user-owns-post'
    else return 'user-does-not-own-post';
  }

  const passedName = () => {
    if (props.inProfile) return 'profile-show-posts-'
    else return 'show-posts-'
  }

  return (
    <>
      <ul className='posts-ul'>
        {posts && posts.map(post => {
          if (props.inProfile && post.author_id !== props.owner.id) return '';
          else return (
            <div className='happy-div' key={post.id}>
                  <button
                    className='button-comp'
                    onClick={() => createVote(true)}
                  >up</button>
                  <button className='button-comp'>down</button>
              <li className='li-of-post'>
                <div>
                  {currentUser.id === post.author_id && (
                    <>
                      <p
                        className='post-component'
                        onClick={() => history.push(`/posts/${post.id}`)}
                      >{post.title}</p>
                    </>
                  )}
                  {currentUser.id === post.author_id || (
                    <p
                      className='unowned-post-component'
                      onClick={() => history.push(`/posts/${post.id}`)}
                    >{post.title}</p>
                  )}
                  {+trigger === post.id && (
                    <EditPost
                      cName={passedName()}
                      post={post}
                      setEditButton={setEditButton}
                      setTrigger={setTrigger}
                      flicker={props.flicker}
                      setFlicker={props.setFlicker}
                    />)}
                </div>
                <div className='edit-delete-post-buttons'>
                  <PencilIcon className={isRightUser(post)} id={post.id}
                    onClick={e => {
                      if (retEdit(post)) {
                        setEditButton('Edit')
                        setTrigger(-4);
                      }
                      else if (editButton === 'Edit') {
                        setEditButton({ postId: post.id })
                        setTrigger(e.currentTarget.id);
                      }
                      else {
                        setEditButton({ postId: post.id })
                        setTrigger(e.currentTarget.id);
                      }
                    }}
                  />
                  <TrashIcon className={isRightUser(post)}
                    onClick={() => deletePost(post)}
                  />
                </div>
              </li>
              {!props.inProfile && (
                <>
                  <p className='word-by'>by</p>
                  <p
                    className='author-component'
                    onClick={() => history.push(`/users/${post.author_id}`)}
                  >{
                      users.filter(user => user.id === post.author_id)[0].username}
                  </p>
                </>
              )}
            </div>
          )
        })}
        <p className='border-top'></p>
      </ul>
    </>
  )
}

export default ShowPosts;