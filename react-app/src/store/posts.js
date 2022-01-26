const LOAD_POSTS = 'posts/LOAD_POSTS';
const MAKE_POST = 'posts/MAKE_POST'

const loadPosts = posts => ({
  type: LOAD_POSTS,
  payload: posts,
})

const makePost = post => ({
  type: MAKE_POST,
  payload: post
})

export const getAllPosts = () => async dispatch => {
  const response = await fetch('/api/posts');

  if (response.ok) {
    const posts = response.json()
    dispatch(loadPosts(posts));
  }
}

export const postPost = (title, content) => async dispatch => {
  console.log('in thunk')
  const response = await fetch('/api/posts/new', {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({title, content})
  });

  if (response.ok) {
    const post = await response.json()
    console.log('post is', post)
    dispatch(makePost(post))
  } else console.log('response not okay')
}


export default function postsReducer(state = {}, action) {
  switch (action.type) {
    case LOAD_POSTS:
      return action.payload;
    case MAKE_POST:
      return {posts: action.payload, ...state};
    default:
      return state;
  }
}