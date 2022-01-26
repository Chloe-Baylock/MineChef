const LOAD_POSTS = 'posts/LOAD_POSTS';

const loadPosts = posts => ({
  type: LOAD_POSTS,
  payload: posts,
})

export const getAllPosts = () => async dispatch => {
  const response = await fetch('/api/posts');

  if (response.ok) {
    const posts = response.json()
    dispatch(loadPosts(posts));
  }
}

export default function postsReducer(state = {}, action) {
  switch (action.type) {
    case LOAD_POSTS:
      return action.payload;
    default:
      return state;
  }
}