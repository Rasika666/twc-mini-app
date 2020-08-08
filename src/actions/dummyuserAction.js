import { GET_DUMMYUSERS, 
    LOADING_DUMMYUSERS, 
    UPDATE_DUMMYUER, 
    MODAL_OPEN ,
    DELETE_DUMMYUSER, 
    IS_OPEN_CONFIRM_MODAL, 
    IS_OPEN_MODAL, 
    REDIRECT} from "./type";

import {getTokenHeader} from '../actions/authAction'

export const getDummyUsers = (dispatch, authState) => {
  dispatch({
    type: LOADING_DUMMYUSERS,
  });

  fetch("/api/v1/dummyusers",{
    method: 'GET',
    headers: getTokenHeader(authState)
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: GET_DUMMYUSERS,
        payload: data,
      });
    })
    .catch((err) => console.log(err));
};

export const updateDummyUser = (dispatch, authState, id, name, email, pno) => {
  dispatch({
    type: LOADING_DUMMYUSERS,
  });

  const data = {
    name: name,
    email: email,
    phoneNumber: pno,
  };

  fetch(`/api/v1/dummyuser/${id}`, {
    method: "PATCH",
    headers: getTokenHeader(authState),
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: UPDATE_DUMMYUER,
        payload: {
          _id: id,
          name: name,
          email: email,
          pno: pno,
        }
      });
      console.log("awa here")
      dispatch({
          type: MODAL_OPEN,
          payload: {text: "Saved"}
      })
      
      
    })
    .catch((err) => console.log(err));
};

export const deleteDummyUser = (dispatch, authState, id) => {
    dispatch({
        type: LOADING_DUMMYUSERS,
      });
      console.log('id',id)
      fetch(`/api/v1/dummyuser/${id}`, {
        method: 'DELETE',
        headers: getTokenHeader(authState)
      })  
      .then(()=> {
        dispatch({
          type: DELETE_DUMMYUSER,
          payload: {
            _id: id
          }
        })
        
        dispatch({
            type: MODAL_OPEN, 
            payload: {
                text: "Deleted"
            }
        })
      })
      .catch((err) => console.log(err));
}

export const isopenmodalconfirm = (dispatch) => {
    dispatch({
        type: IS_OPEN_CONFIRM_MODAL
    })
}

export const isopenmodal = (dispatch) => {
    dispatch({
        type: IS_OPEN_MODAL
    })
}

export const createDummyUser = (dispatch, authstate, form, isredirect) => {
  const header = getTokenHeader(authstate)

  dispatch({
    type: LOADING_DUMMYUSERS
  })

  fetch('/api/v1/dummyuser',{
    method: 'POST',
    headers: header,
    body: form
  })
  .then(res => res.json())
  .then(data => {
    dispatch({
      type: REDIRECT,
      payload: isredirect
    })
  })
  .catch(err => console.log(err))

}
