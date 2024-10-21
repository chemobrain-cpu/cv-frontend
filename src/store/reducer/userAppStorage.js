import { LOGIN_USER } from "../action/userAppStorage";
import { GENERATE_EDUCATIONCV, GENERATE_JOBCV, GENERATE_CV3 } from "../action/userAppStorage";



const initialState = {
    userToken: '',
    user: null,
    cvJobData: null,
    cvEducationData: null,
    cvData3: null,
    isCvAvailable: false
}






export const userAuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                user: action.payload.user,
                userToken: action.payload.userToken,
            }

        case GENERATE_JOBCV:
            return {
                ...state,
                cvJobData: action.payload,
                isCvAvailable: true
            }


        case GENERATE_EDUCATIONCV:
            return {
                ...state,
                cvEducationData: action.payload,
                isCvAvailable: true
            }


        case GENERATE_CV3:
            return {
                ...state,
                cvData3: action.payload,
                isCvAvailable: true
            }




        default:
            return state
    }

}

