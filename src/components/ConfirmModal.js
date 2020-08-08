import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import {useDispatch, useSelector} from 'react-redux'

import {deleteDummyUser} from '../actions/dummyuserAction'
import {closeConfirmModal} from '../actions/modalAction'



function getModalStyle() {
  const top = 50 
  const left = 50 

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 700,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #fff',
    boxShadow: theme.shadows[5],
    paddingTop: 40,
    paddingBottom: 40,
    fontSize: 25,
    borderRadius: 20,
    textAlign:"center"
    
  },
}));

export default function ConfirmModal({ username, userId}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const dispatch = useDispatch()
  const authState = useSelector(state => state.auth)
  const modal =  useSelector(state => state.modal)


  const handleClose = (e) => { 
    closeConfirmModal(dispatch)
  };

  const onDelete = (e) => {
    console.log("user id", userId)
    deleteDummyUser(dispatch, authState, userId)
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
        <div className="modal--title">Do You Want To Delete The Dummy {username}?</div>
        <div className="modal--btn">
          <button onClick={(e)=>onDelete(e)} className="btn">Yes</button>
          <button onClick={(e)=>handleClose(e)} className="btn">No</button>
        </div>
    </div>
  );

  return (
    <div>
      <Modal
        open={modal.isOpenConfirm}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
