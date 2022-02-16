import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllPosts, destroyPost } from '../../store/posts';
import { getAllVotes, postVote, updateVote, undoVote } from '../../store/votes';
import { PencilIcon, TrashIcon, ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/solid";
import EditPost from './EditPost'

function ShowPosts(props) {

  const history = useHistory()

  const currentUser = useSelector(state => state.session.user)
  const dispatch = useDispatch();

  const [posts, setPosts] = useState('')
  const [votes, setVotes] = useState([])
  const [voteAct, setVoteAct] = useState(false)
  const [users, setUsers] = useState('')
  const [trigger, setTrigger] = useState(-2)
  const [editButton, setEditButton] = useState('Edit')

  const deletePost = async post => {
    await dispatch(destroyPost(post));
    props.setFlicker(!props.flicker)
  }

  const handleVote = (post, is_up) => {
      let thisVote = votes.filter(vote => post.id === vote.post_id && vote.voter_id === +currentUser.id)
      if (thisVote.length) {
        if (thisVote[0].is_up === is_up) destroyVote(thisVote[0].id);     
        else if (thisVote[0].is_up === !is_up) changeVote(thisVote[0].id, is_up);
      }
      else createVote(post, is_up)
  }

  const createVote = async (post, is_up) => {
    await dispatch(postVote(post.id, is_up));
    setVoteAct(!voteAct);
  }

  const changeVote = async (voteId, is_up) => {
    await dispatch(updateVote(voteId, is_up))
    setVoteAct(!voteAct);
  }

  const destroyVote = async (voteId) => {
    await dispatch(undoVote(voteId));
    setVoteAct(!voteAct);
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

  useEffect(() => {
    const fetchVotes = async function () {
      let votes = await dispatch(getAllVotes());
      setVotes(votes);
    }
    fetchVotes();
  }, [voteAct])

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

  const filterVotes = (post, is_up) => {
    return votes.filter(vote => vote.post_id === post.id && vote.is_up === is_up);
  }

  const voteByUser = (post, is_up) => {
    if (filterVotes(post, is_up).filter(vote => vote.voter_id === currentUser.id).length) return `${is_up}-vote-by-user`;
    else return 'no-vote-by-user';
  }

  return (
    <>
      <ul className='posts-ul'>
        {posts && posts.map(post => {
          if (props.inProfile && post.author_id !== props.owner.id) return '';
          else return (
            <div className='happy-div' key={post.id}>
              <button
                className={`button-comp ${voteByUser(post, true)}`}
                onClick={() => handleVote(post, true)}
              ><ArrowUpIcon className='arrow-icon' /> {filterVotes(post, true).length}</button>
              <button
                className={`button-comp ${voteByUser(post, false)}`}
                onClick={() => handleVote(post, false)}
              ><ArrowDownIcon className='arrow-icon' /> {filterVotes(post, false).length}</button>
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