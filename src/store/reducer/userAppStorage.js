import { LOGIN_USER } from "../action/userAppStorage";
import { GENERATE_CV, FETCH_CVS, UPDATE_USER } from "../action/userAppStorage";

const initialState = {
    userToken:'',
    user: null,
    cv: null,
    isCvAvailable: false,
    cvs:[]
}

export const userAuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                user: action.payload.user,
                userToken: action.payload.userToken,
            }
        case GENERATE_CV:
            return {
                ...state,
                cv: action.payload.cv,
                cvs:[...state.cvs,action.payload.cv],
                isCvAvailable: true
            }

        case FETCH_CVS:
            return {
                ...state,
                cvs:[...state.cvs,action.payload],

            }

        case UPDATE_USER:
            return {
                ...state,
                user:action.payload
            }

        default:
            return state
    }

}

