import { auth, provider } from "../fireBase";
import { SET_USER } from "./actionTypes";
export const setUser = (payload) => ({
  type: SET_USER,
  user: payload,
});
export function signInApi() {
  return (dispatch) => {
    auth
      .signInWithPopup(provider)
      .then(function (payload) {
        console.log(payload);
        dispatch(setUser(payload.user));
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(error.code);
        console.log(error.message);
      });
  };
}
export function getUserAuth() {
  return (dispatch) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setUser(user));
      }
    });
  };
}

export function singOutApi() {
  return (dispatch) => {
    auth.signOut()
      .then(() => {
        dispatch(setUser(null));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
}
