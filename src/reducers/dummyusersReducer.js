import {
  LOADING_DUMMYUSERS,
  DELETE_DUMMYUSER,
  UPDATE_DUMMYUER,
  GET_DUMMYUSERS,
  IS_OPEN_CONFIRM_MODAL,
  IS_OPEN_MODAL, 
  REDIRECT
} from "../actions/type";

const initstate = {
  dummyusers: [],
  isLoading: false,
  isOpenDoneModal: false,
  isOpenConfirmModal: false,
  redirect: false
};

const dummyusersReducer = (state = initstate, action) => {
  const { type, payload } = action;

  switch (type) {

    case IS_OPEN_CONFIRM_MODAL:
        return {
            ...state,
            isOpenConfirmModal: true,
        };

    case IS_OPEN_MODAL:
        return {
            ...state,
            isOpenDoneModal: true,
        };

    case LOADING_DUMMYUSERS:
      return {
        ...state,
        isLoading: true,
      };

    // done loading
    case GET_DUMMYUSERS:
      return {
        ...state,
        dummyusers: payload,
        isLoading: false,
      };

    case DELETE_DUMMYUSER:
      const copydummyuers = [...state.dummyusers].filter((obj) => obj._id !== payload._id);

      return {
        ...state,
        dummyusers: copydummyuers,
        isLoading: false,
        isOpenDoneModal: true,
        isOpenConfirmModal: false
      };

    case UPDATE_DUMMYUER:
      const copy = [...state.dummyusers];
      const index = copy.findIndex((obj) => obj._id === payload._id);
      copy[index].name = payload.name;
      copy[index].email = payload.email;
      copy[index].phoneNumber = payload.pno;
    
      return {
        ...state,
        isLoading: false,
        dummyusers: copy,
        isOpenDoneModal: true,
      };

    // case CREATE_DUMMYUSER: 
    //   return {
    //     ...state,
    //     redirect: true
    //   }

    case REDIRECT:
      return {
        ...state,
        redirect: payload
      }

    default:
      return state;
  }

  return state;
};

export default dummyusersReducer;
