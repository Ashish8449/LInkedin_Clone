import { combineReducers } from "redux"
import { articleReducer } from "./articleReducer";
import { userReducer } from "./userReducer";


export const rootReducer = combineReducers({
    userState: userReducer,
    articeState: articleReducer

});
