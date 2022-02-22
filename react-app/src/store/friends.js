const LOAD_FRIENDS = 'friends/LOAD_FRIENDS';
const SEND_FRIEND = 'friends/SEND_FRIEND';
// const ACCEPT_FRIEND = 'friends/ACCEPT_FRIEND';
const DELETE_FRIEND = 'friends/DELETE_FRIEND';

const filterThrough = (arr, action) => arr.filter(friend => friend.id !== action.payload.id);

const loadFriends = friends => ({
  type: LOAD_FRIENDS,
  payload: friends,
})

const sendFriend = friend => ({
  type: SEND_FRIEND,
  payload: friend,
})

// const acceptFriend = friend => ({
//   type: ACCEPT_FRIEND,
//   payload: friend,
// })

const deleteFriend = friend => ({
  type: DELETE_FRIEND,
  payload: friend,
})

export const getMyFriends = () => async dispatch => {
  const response = await fetch('/api/friends');
  if (response.ok) {
    const friends = await response.json();
    await dispatch(loadFriends(friends));
    return friends.friends;
  }
}

export const askFriend = (toUserId, incoming) => async dispatch => {
  const response = await fetch('/api/friends/send', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ toUserId, incoming })
  })
  if (response.ok) {
    const data = await response.json();
    await dispatch(sendFriend(data));
    return data;
  }
}



export const destroyFriend = obj => async dispatch => {
  const response = await fetch('/api/friends/delete', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 'obj': obj })
  })
  if (response.ok) {
    const data = await response.json();
    await dispatch(deleteFriend(data));
    return data;
  }
}

export default function friendsReducer(state = {}, action) {
  switch (action.type) {
    case LOAD_FRIENDS:
      return action.payload.friends;
    case SEND_FRIEND:
      if (action.payload.true) {
        state.all_from = state.all_from.filter(from => from.id !== action.payload.true.id);
        state.true_friends.push(action.payload.true);
      } else state.all_sent_to.push(action.payload);
      return state;
    case DELETE_FRIEND:
      const deleting = { ...state };
      let z = {
        'all_from': filterThrough(deleting.all_from, action),
        'all_sent_to': filterThrough(deleting.all_sent_to, action),
        'true_friends': filterThrough(deleting.true_friends, action)
      }
      return z;
    default:
      return state;
  }
}