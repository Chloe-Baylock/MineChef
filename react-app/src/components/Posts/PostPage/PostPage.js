import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts, destroyPost } from '../../../store/posts';
import { useHistory, useParams } from 'react-router-dom';
import { PencilIcon, TrashIcon, ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/solid";
import { getAllVotes, postVote, updateVote, undoVote } from '../../../store/votes';

import EditPost from '../EditPost';
import './PostPage.css'

function PostPage() {
  const history = useHistory();
  const currentUser = useSelector(state => state.session.user)
  const votes = useSelector(state => state.votes.entries)

  const dispatch = useDispatch();
  const { postId } = useParams();
  const [post, setPost] = useState('');
  const [author, setAuthor] = useState('');
  const [trigger, setTrigger] = useState(-2)
  const [editButton, setEditButton] = useState('Edit')
  const [flicker, setFlicker] = useState(false)

  const [voteAct, setVoteAct] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const allPosts = await dispatch(getAllPosts());
      setPost(allPosts.filter(post => post.id === +postId)[0])
    }
    fetchData();
  }, [dispatch, postId, flicker])

  useEffect(() => {
    if (post) {
      (async () => {
        const response = await fetch('/api/users/');
        const allUsers = await response.json();
        setAuthor(allUsers.users.filter(user => post.author_id === user.id)[0]);
      })();
    }
  }, [post])

  useEffect(() => {
    const fetchVotes = async function () {
      await dispatch(getAllVotes());
    }
    fetchVotes();
  }, [])

  const filterVotes = (post, is_up) => {
    return votes?.filter(vote => vote.post_id === post.id && vote.is_up === is_up);
  }

  const handleVote = (post, is_up) => {
    let thisVote = votes?.filter(vote => post.id === vote.post_id && vote.voter_id === +currentUser.id)
    if (thisVote.length) {
      if (thisVote[0].is_up === is_up) destroyVote(thisVote[0].id);
      else if (thisVote[0].is_up === !is_up) changeVote(thisVote[0].id, is_up);
    }
    else createVote(post, is_up)
  }

  const voteByUser = (post, is_up) => {
    if (filterVotes(post, is_up)?.filter(vote => vote.voter_id === currentUser.id).length) return `${is_up}-vote-by-user`;
    else return 'no-vote-by-user';
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


  const deletePost = async post => {
    await dispatch(destroyPost(post));
    history.push('/profile');
  }

  const retEdit = post => {
    if (editButton.postId === post.id) return true
    else return false;
  }

  const isRightUser = (post) => {
    if (currentUser.id === post.author_id) return 'post-page-owner'
    else return 'post-page-not-owner';
  }

  return (
    <>
      <div className='post-page-below-nav'>
        <div className='post-page-centered-fill'>
          <div className='post-page-top-part'>
            <div className='post-page-top-line'>
              <p className='post-page-author-p'
                onClick={() => history.push(`/users/${author.id}`)}
              >{author.username}:</p>
              {+trigger > 0 && (
                <EditPost
                  post={post}
                  cName='post-page-'
                  setEditButton={setEditButton}
                  setTrigger={setTrigger}
                  flicker={flicker}
                  setFlicker={setFlicker}
                />
              )}
              <div className='post-page-edit-delete'>
                <PencilIcon
                  className={isRightUser(post)}
                  id='post-page-pencil'
                  onClick={() => {
                    if (retEdit(post)) {
                      setEditButton('Edit');
                      setTrigger(-4);
                    }
                    else if (editButton === 'Edit') {
                      setEditButton({ postId: post.id });
                      setTrigger(1);
                    }
                    else {
                      setEditButton({ postId: post.id });
                      setTrigger(1);
                    }
                  }}
                />
                <TrashIcon
                  className={isRightUser(post)}
                  id='post-page-delete'
                  onClick={() => deletePost(post)}
                />
              </div>
            </div>
            <div className='post-page-title-div'>
              <h1 className='post-page-title-h1'>
                {post.title}
              </h1>
              <div>
                <button
                  className={`button-comp ${voteByUser(post, true)}`}
                  onClick={() => handleVote(post, true)}
                ><ArrowUpIcon className='arrow-icon' /> {filterVotes(post, true)?.length}</button>
                <button
                  className={`button-comp ${voteByUser(post, false)}`}
                  onClick={() => handleVote(post, false)}
                ><ArrowDownIcon className='arrow-icon' /> {filterVotes(post, false)?.length}</button>
              </div>
            </div>
          </div>
          <p className='post-page-content'>
            {post.content}
          </p>
        </div>
      </div>
    </>
  )
}

export default PostPage;