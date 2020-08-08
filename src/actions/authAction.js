import { USER_LOADING, LOGIN_SUCCESS, USER_LOADED, LOGIN_FAIL } from "./type"


export const login = (dispatch, email, password) => {
    dispatch({
        type: USER_LOADING
    })

    fetch('/api/v1/auth/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(res => res.json())
    .then(data => {
        if(!data.err) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: data
            })
        }else {
            dispatch({
                type: LOGIN_FAIL,
                payload: data
            })
        }
        
    })
    .catch(err => {
        dispatch({
            type: LOGIN_FAIL
        })
    })
}

export const getUser = (dispatch, authstate) => {
    const headerobj = getTokenHeader(authstate)
    dispatch({
        type: USER_LOADING
    })
    fetch('/api/v1/auth/user',{
        method: 'GET',
        headers: headerobj
    })
    .then(res => res.json())
    .then(data => {
        if(!data.err) { //check there no err
            dispatch({
                type: USER_LOADED,
                payload: data
            })
        }
        
    })
    .catch(err => {
        dispatch({
            type: LOGIN_FAIL
        })
    })
    
}

export const getTokenHeader = (authState) => {
    
    //Get token from state
    const token = authState.token;
    
    //request header
    const headers = {
    // "Content-Type": "application/json"
    }
    
  
    //if token add to header config
    if (token) {
      headers["x-auth-token"] = token;
    }
    return headers;
};

