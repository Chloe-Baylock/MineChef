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

export const updateVote = (voteId, is_up) => async dispatch => {
  const response = await fetch('/api/votes/edit', {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 'voteId': voteId, 'is_up': is_up })
  })

  if (response.ok) {
    const data = await response.json();
    dispatch(editVote(data));
    return data;
  } else return 'response is not okay';
}

export const undoVote = (voteId) => async dispatch => {
  const response = await fetch('/api/votes/delete', {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 'voteId': voteId })
  })

  if (response.ok) {
    const data = await response.json();
    dispatch(deleteVote(data));
    return data;
  } else return 'response is not okay';
}

export default function votesReducer(state = {}, action) {
  switch (action.type) {
    case LOAD_VOTES:
      return {entries: action.payload.votes};
    case MAKE_VOTE:
      return { entries: [...state.entries, action.payload] };
      // { "entries": [...state.entries, action.review] };
    case EDIT_VOTE:
      for (let i = 0; i < state.entries.length; i++) {
        if (state.entries[i].id === action.payload.id) state.entries[i] = action.payload;
      }
      return state;
    case DELETE_VOTE:
      const deleting = { ...state };
      let entries = deleting.entries.filter(vote => vote.id !== action.payload.id)
      return { entries };
    default:
      return state;
  }
}