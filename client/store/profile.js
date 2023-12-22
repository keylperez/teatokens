import axios from "axios";
/**
 * ACTION TYPES
 */
const GET_PROFILE = "GET_PROFILE";

/**
 * INITIAL STATE
 */
const profile = {};

/**
 * ACTION CREATORS
 */
const getProfile = (prof) => ({
  type: GET_PROFILE,
  prof,
});

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/auth/me", {
      headers: { authorization: localStorage.getItem("token") },
    });
    dispatch(getProfile(data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function (state = profile, action) {
  switch (action.type) {
    case GET_PROFILE:
      return { ...action.prof };
    default:
      return state;
  }
}
