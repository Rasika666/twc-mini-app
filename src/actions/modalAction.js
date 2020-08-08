import {MODAL_OPEN, MODAL_CLOSE, MODAL_CLOSE_CONFIRM, MODAL_OPEN_CONFIRM} from './type'

export const openDoneModal = (dispatch, text) => {
    dispatch({
        type: MODAL_OPEN, 
        payload: {
            text: text
        }
    })
}

export const closeDoneModal = (dispatch, text) => {
    dispatch({
        type: MODAL_CLOSE
    })
}

export const closeConfirmModal = (dispatch) => {
    dispatch({
        type: MODAL_CLOSE_CONFIRM,
    })
}

export const openConfirmModal = (dispatch, text) => {
    dispatch({
        type: MODAL_OPEN_CONFIRM,
        payload: {
            text: text
        }
    })
}