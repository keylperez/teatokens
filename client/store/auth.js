import axios from "axios";
import history from "../history";
import { getLocalCart, clearLocalCart, addToCart } from "../helper";

const TOKEN = "token";

/**
 * ACTION TYPES
 */
const SET_AUTH = "SET_AUTH";

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
  }
};

// persistent token
export const authenticate = (userInfo) => async (dispatch) => {
  try {
    const res = await axios.post(`/auth/${userInfo.formName}`, { ...userInfo });
    window.localStorage.setItem(TOKEN, res.data.token);
    if (userInfo.formName === "signup") {
      const localCart = getLocalCart();
      const isLocalCart = Array.isArray(localCart) && localCart.length;
      if (isLocalCart) {
        for (let i = 0; i < localCart.length; i++) {
          await addToCart(
            localCart[i].productId,
            localCart[i].numItems,
            res.data.id
          );
        }
      }
      clearLocalCart();
    }

    dispatch(me());
  } catch (authError) {
    return dispatch(setAuth({ error: authError }));
  }
};

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push("/login");
  return {
    type: SET_AUTH,
    auth: {},
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
