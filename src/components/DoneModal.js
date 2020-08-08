import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {useSelector, useDispatch} from 'react-redux'
import {MODAL_CLOSE} from '../actions/type'

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

function DoneModal() {
    const classes = useStyles();

    const [modalStyle] = React.useState(getModalStyle);
  
    const modal = useSelector(state => state.modal)
    const dispatch = useDispatch()


  const handleClose = () => {
    dispatch({
      type: MODAL_CLOSE
    })
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
        <div className="modal--title">Your Dummy Has Successfully Been {modal.text}</div>
        <div className="modal--btn">
          <button onClick={handleClose} className="btn">Okay</button>
        </div>
    </div>
  );

  return (
    <div>
      <Modal
        open={modal.isOpen}
        onClose={handleClose}
      >
        {body}
      </Modal>
    </div>
  );
}

export default DoneModal
