import {USER_LOADED,USER_LOADING,LOGIN_SUCCESS, LOGIN_FAIL, CLEAR_MSG} from '../actions/type'

const initstate = {
    isAuthenticate: null,
    isLoading: false,
    token: localStorage.getItem("token"),
    user: null,
    msg: null
}

const authReducer = (state = initstate, action) => {
    const {type, payload} = action

    switch(type) {
        
        case USER_LOADING: 
            return {
                ...state,
                isLoading: true
            }

        case USER_LOADED: 
            return {
                ...state, 
                isLoading: false,
                user: payload,
                isAuthenticate: true
            }

        case LOGIN_SUCCESS:
            localStorage.setItem("token", payload.token);
            return {
                ...state,
                isAuthenticate: true,
                isLoading: false,
                ...payload
            }

        case LOGIN_FAIL:
            localStorage.removeItem("token")
            return {
                ...state,
                isAuthenticate: false,
                isLoading: false,
                token: null,
                user: null,
                msg: payload.err
            }

        case CLEAR_MSG:
            return {
                ...state,
                msg: null
            }


        default: return state
    }

    return initstate

}

export default authReducer