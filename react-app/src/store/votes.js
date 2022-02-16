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

export const getVotes = () => async dispatch => {
  const response = await fetch('/api/votes');
  if (response.ok) {
    const votes = await response.json();
    dispatch(loadVotes(votes));
    return votes.votes;
  }
}


export default function votesReducer(state = {}, action) {
  switch (action.type) {
    case LOAD_VOTES:
      return action.payload.votes;
    default:
      return state;
  }
}