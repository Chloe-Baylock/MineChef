const LOAD_POSTS = 'posts/LOAD_POSTS';
const MAKE_POST = 'posts/MAKE_POST';
const EDIT_POST = 'posts/EDIT_POST';
const DELETE_POST = 'posts/DELETE_POST';

const loadPosts = posts => ({
  type: LOAD_POSTS,
  payload: posts,
})

const makePost = post => ({
  type: MAKE_POST,
  payload: post,
})

const editPost = post => ({
  type: EDIT_POST,
  payload: post,
})

const deletePost = post => ({
  type: DELETE_POST,
  payload: post,
})

export const getAllPosts = () => async dispatch => {
  const response = await fetch('/api/posts');
  if (response.ok) {
    const posts = await response.json();
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

export const updatePost = (id, title, content) => async dispatch => {
  const response = await fetch(`/api/posts/${id}/edit`, {
    method: "PUT",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({title, content}),
  })
  
  if (response.ok) {
    const data = await response.json();
    dispatch(editPost(data));
    return data;
  } else return 'response is not okay'
}

export const destroyPost = post => async dispatch => {
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
    case EDIT_POST:
      return {...state, [action.payload.id]: action.payload};
    case DELETE_POST:
      const deleting = {...state};
      delete deleting[action.payload.id];
      return deleting;
    default:
      return state;
  }
}