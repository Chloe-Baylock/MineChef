const LOAD_POSTS = 'posts/LOAD_POSTS';
const MAKE_POST = 'posts/MAKE_POST';

const DELETE_POST = 'posts/DELETE_POST';

const loadPosts = posts => ({
  type: LOAD_POSTS,
  payload: posts,
})

const makePost = post => ({
  type: MAKE_POST,
  payload: post,
})

const deletePost = post => ({
  type: DELETE_POST,
  payload: post,
})

export const getAllPosts = () => async dispatch => {
  const response = await fetch('/api/posts');
  console.log('get all posts thunk')
  console.log('response is', response.ok)
  if (response.ok) {
    const posts = await response.json()
    console.log('posts is', posts)
    dispatch(loadPosts(posts));
    return posts.posts;
  }
}

export const postPost = (title, content) => async dispatch => {
  const response = await fetch('/api/posts/new', {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({title, content})
  });

  if (response.ok) {
    const post = await response.json();
    dispatch(makePost(post));
    return post;
  } else return 'response not okay';
}



export const destroyPost = (post) => async dispatch => {
  const response = await fetch(`/api/posts/${post.id}/delete`, {
    method: "DELETE"
  })

  if (response.ok) {
    const data = await response.json();
    dispatch(deletePost(data));
    return data;
  } else return 'response not okay';

}


export default function postsReducer(state = {}, action) {
  switch (action.type) {
    case LOAD_POSTS:
      return action.payload.posts;
    case MAKE_POST:
      return {posts: action.payload, ...state};
    case DELETE_POST:
      const deletedPost = action.payload;
      const removedState = state.filter(post => post.id !== deletedPost.id)
      return {...removedState};
    default:
      return state;
  }
}