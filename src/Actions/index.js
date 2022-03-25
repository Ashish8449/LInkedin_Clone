import db, { auth, provider, storage } from "../fireBase";
import { GET_ARTICLES, SET_LOADING_STATUS, SET_USER } from "./actionTypes";

export const setUser = (payload) => ({
  type: SET_USER,
  user: payload,
});
export const setLoadingStatus = (payload) => ({
  type: SET_LOADING_STATUS,
  status: payload,
});

export const getArticles = (payload) => ({
  type: GET_ARTICLES,
  articles: payload,
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
    auth
      .signOut()
      .then(() => {
        dispatch(setUser(null));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
}

export function postArticlAPi(payload) {
  return (dispatch) => {
    dispatch(setLoadingStatus(true));
    if (payload.image !== "") {
      console.log(payload);
      const upload = storage
        .ref(`images/${payload.image.name}`)
        .put(payload.image);
      upload.on(
        `state_changed`,
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`progress ${progress}%`);
          console.log(snapshot.state);
          if (snapshot.state === "running") {
            console.log(`progress ${progress}%`);
          }
        },
        (error) => console.log(error),
        async () => {
          const downloadUrl = await upload.snapshot.ref.getDownloadURL();
          console.log(payload);
          db.collection("article").add({
            actor: {
              description: payload.user.email,
              title: payload.user.displayName,
              date: payload.timestamp,
              image: payload.user.photoURL,
            },
            video: payload.video,
            shardeImg: downloadUrl,
            comment: 0,
            description: payload.description,
          });
          dispatch(setLoadingStatus(false));
        }
      );
    } else if (payload.video) {
      db.collection("article").add({
        actor: {
          description: payload.user.email,
          title: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL,
        },
        video: payload.video,
        shardeImg: "",
        comment: 0,
        description: payload.description,
      });
      dispatch(setLoadingStatus(false));
    }
  };
}

export function getArticlesApi() {
  let payload;
  return (dispatch) => {
    db.collection("article")
      .orderBy("actor.date", "desc")
      .onSnapshot((snapshot) => {
        payload = snapshot.docs.map((doc) => doc.data());
        console.log(payload);
        dispatch(getArticles(payload));
      });
  };
}
