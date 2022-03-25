
import { GET_ARTICLES, SET_LOADING_STATUS } from "../Actions/actionTypes";

export const initial = {
  articles: [],
  loading: false,
};
export const articleReducer = (state = initial, action) => {
  if (action.type === SET_LOADING_STATUS) {
    return {
      ...state,
      loading: action.status,
    };
  }
  if (action.type === GET_ARTICLES) {
    return {
      ...state,
      articles: action.articles,
    };
  }
  return state;
};
