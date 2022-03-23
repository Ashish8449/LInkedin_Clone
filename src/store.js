import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";

import { rootReducer } from './Reducer/index'
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export default store;