const EDIT_PROFILE = 'session/EDIT_PROFILE';

const edit_profile = (user) => ({
  type: EDIT_PROFILE,
  payload: user
})

export const editProfile = (user, user_id) => async (dispatch) => {
  const response = await fetch(`/api/users/${user_id}`, {
    method: "PUT",
    headers: {"Content-Type": "appliction/json" },
    body: JSON.stringify({ user })
  })
  if (response.ok) {
    const data = await response.json();
    dispatch(edit_profile(data));
  }
  else {
    console.log('           *********resonse NOT ok')
    return "Error with response edit profile.";
  }
}