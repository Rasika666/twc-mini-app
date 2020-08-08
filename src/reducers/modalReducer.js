import { MODAL_CLOSE, MODAL_OPEN, MODAL_CLOSE_CONFIRM, MODAL_OPEN_CONFIRM } from "../actions/type";

const initstate = {
  isOpen: false,
  text: "",
  isOpenConfirm: false
};

const modalReducer = (state = initstate, action) => {
  const { type, payload } = action;

  switch (type) {
    case MODAL_OPEN:
      return {
        ...state,
        isOpen: true,
        text: payload.text
      };

    case MODAL_CLOSE:
      return {
        ...state,
        isOpen: false,
      };

    case MODAL_OPEN_CONFIRM:
        return {
            ...state,
            isOpenConfirm: true,
            text: payload.text
        };

    case MODAL_CLOSE_CONFIRM:
        return {
            ...state,
            isOpenConfirm: false,
        };

    default:
      return state;
  }

  return state;
};

export default modalReducer;
