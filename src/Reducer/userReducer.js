import { SET_USER } from "../Actions/actionTypes";

const inttialState = {
    user: null,

}
export const userReducer = (state = inttialState, action) => {
    if (action.type === SET_USER)
        return {
            ...state,
            user: action.user
        };



    return state;

}