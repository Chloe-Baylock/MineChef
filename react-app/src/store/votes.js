const LOAD_VOTES = 'votes/LOAD_VOTES';
const MAKE_VOTE = 'votes/MAKE_VOTE';
const EDIT_VOTE = 'votes/EDIT_VOTE';
const DELETE_VOTE = 'votes/DELETE_VOTE';

const loadVotes = votes => ({
  type: LOAD_VOTES,
  payload: votes,
})

const makeVote = vote => ({
  type: MAKE_VOTE,
  payload: vote,
})

const editVote = vote => ({
  type: EDIT_VOTE,
  payload: vote,
})

const deleteVote = vote => ({
  type: DELETE_VOTE,
  payload: vote,
})

export const getAllVotes = () => async dispatch => {
  const response = await fetch('/api/votes');
  if (response.ok) {
    const votes = await response.json();
    dispatch(loadVotes(votes));
    return votes.votes;
  }
}

export const postVote = (postId, is_up) => async dispatch => {
  console.log('is up is', is_up)
  const response = await fetch('/api/votes/new', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 'postId': postId, 'is_up': is_up }),
  })

  if (response.ok) {
    const data = await response.json();
    dispatch(makeVote(data));
    return data;
  } else return 'response is not okay';

}


export default function votesReducer(state = {}, action) {
  switch (action.type) {
    case LOAD_VOTES:
      return action.payload.votes;
    case MAKE_VOTE:
      return { votes: action.payload, ...state }
    default:
      return state;
  }
}