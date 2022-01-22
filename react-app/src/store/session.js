// constants
// const LOAD_USER = 'session/LOAD_USER'
const SET_USER = 'session/SET_USER';
const UPDATE_USER = 'session/EDIT_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const DELETE_USER = 'session/DELETE_USER';

// const loadUser = user => ({
//   type: LOAD_USER,
//   payload: user
// })

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})

const updateUser = (user_dict) => ({
  type: UPDATE_USER,
  payload: { user: user_dict },
})

const deleteUser = (user) => ({
  type: DELETE_USER,
  payload: user
})

const initialState = { user: null };

// export const getUser = () => async dispatch => {
//   const response = await fetch('/api/auth/')
//   if (response.ok) {
//     const data = await response.json()
//     dispatch(loadUser(data));
//   }
// }

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });


  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (username, email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}


// export const editUser = (username, email, password, description, pfp_url) => async dispatch => {
//   const response = await fetch('/api/users/profile', {
//     method: "PUT",
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       username,
//       email,
//       password,
//       description,
//       pfp_url,
//     })
//   })
//   if (response.ok) {
//     const user_dict = await response.json();
//     dispatch(updateUser(user_dict))
//   }
// }

export const editUser = (obj) => async dispatch => {
  const { username } = obj
  const response = await fetch('/api/users/profile', {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
    })
  })
  if (response.ok) {
    const user_dict = await response.json();
    dispatch(updateUser(user_dict))
  }
}

export const destroyUser = (user) => async dispatch => {
  const response = await fetch(`/api/users/${user.id}/delete`, {
    method: "DELETE"
  })
  if (response.ok) {
    const deleted_user = await response.json();
    dispatch(deleteUser(deleted_user))
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload }
    case UPDATE_USER:
      return action.payload
    case REMOVE_USER:
      return { user: null }
    case DELETE_USER:
      const deleting = {...state};
      delete deleting[action.payload.id]
      return deleting;
    default:
      return state;
  }
}
