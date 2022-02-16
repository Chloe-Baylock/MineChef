const LOAD_FRIENDS = 'friends/LOAD_FRIENDS';
const SEND_FRIEND = 'friends/SEND_FRIEND';
const ACCEPT_FRIEND = 'friends/ACCEPT_FRIEND';
const DELETE_FRIEND = 'friends/DELETE_FRIEND';

const loadFriends = friends => ({
  type: LOAD_FRIENDS,
  payload: friends,
})

const sendFriend = friend => ({
  type: SEND_FRIEND,
  payload: friend,
})

const acceptFriend = friend => ({
  type: ACCEPT_FRIEND,
  payload: friend,
})

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

export const askFriend = (toUserId) => async dispatch => {
  const response = await fetch('/api/friends/send', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 'toUserId': toUserId })
  })
  if (response.ok) {
    const data = await response.json();
    dispatch(sendFriend(data));
    return data;
  }
}

export default function friendsReducer(state = {}, action) {
  switch (action.type) {
    case LOAD_FRIENDS:
      return action.payload.friends;
    case SEND_FRIEND:
      return { friends: action.payload, ...state }
    default:
      return state;
  }
}