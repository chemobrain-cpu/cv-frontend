import { LOGIN_USER } from "../action/userAppStorage";
import { GENERATE_CV } from "../action/userAppStorage";




const initialState = {
    userToken: '',
    user: null,
    cvData:null

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
                user: action.payload.user,
                cvData:action.payload
            }
        default:
            return state
    }

}

