const LOAD_FRIENDS = 'friends/LOAD_FRIENDS';
const SEND_FRIEND = 'friends/SEND_FRIEND';
const ACCEPT_FRIEND = 'friends/ACCEPT_FRIEND';
const DELETE_FRIEND = 'friends/DELETE_FRIEND';

const filterThrough = (arr, action) => arr.filter(friend => friend.id !== action.payload.id)

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
    await dispatch(sendFriend(data));
    return data;
  }
}



export const destroyFriend = (sad_user) => async dispatch => {
  const response = await fetch('/api/friends/delete', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 'sad_user': sad_user })
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
      return { friends: action.payload, ...state };
    case DELETE_FRIEND:
      const deleting = { ...state };
      let z = {
        'all_from': filterThrough(deleting.all_from, action),
        'all_sent_to': filterThrough(deleting.all_sent_to, action)
      }
      // let z = { 'all_from': deleting.all_from, 'all_sent_to': deleting.all_sent_to.filter(friend => friend.id !== action.payload.id) };
      return z;
    default:
      return state;
  }
}