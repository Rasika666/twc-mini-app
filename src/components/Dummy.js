import React, {useState} from 'react'

import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import {useDispatch} from 'react-redux'


const useStylesDummy = makeStyles((theme) => ({
    root: {
      color: "#18363D",
      fontSize: '32px'
    },
    
  }));

  

function Dummy({name, email, pno, avatarURL, id, onSave, onDelete}) {
    const classes = useStylesDummy();

    const [edit, setEdit] = useState(false)
    const [editName, setEditName] = useState(name);
    const [editEmail, setEditEmail] = useState(email);
    const [editPno, setEditPno] = useState(pno);

    const dispatch = useDispatch()

    const onEdit = (e) => {
        setEdit(true);
    }

    

    return (
        
        <tr>
            <td><Avatar alt="Remy Sharp" src={avatarURL} /></td>
            <td>
                {edit ? (<TextField
                        onChange={(e)=>{setEditName(e.target.value)}} 
                        placeholder={editName} 
                        required={true} 
                        fullWidth={true} 
                        value={editName}
                        margin="normal"
                        autoFocus={true}/>): name
                }
            </td>
            <td>
            {edit ? (<TextField 
                        onChange={(e)=>{setEditEmail(e.target.value)}} 
                        placeholder={editEmail} 
                        required={true} 
                        fullWidth={true} 
                        value={editEmail}
                        margin="normal"
                        autoFocus={true}/>): email
            }
            </td>
            <td>
            {edit ? (<TextField
                        onChange={(e)=>{setEditPno(e.target.value)}} 
                        placeholder={editPno} 
                        required={true} 
                        fullWidth={true} 
                        value={editPno}
                        margin="normal"
                        autoFocus={true}/>): pno
            }
            </td>
            <td>
                {edit ? (<button className="btn" onClick={(e)=> onSave(id, editName, editEmail, editPno)}>save</button>) :
                (   <div>
                        <i onClick={(e)=>onEdit(e)}><EditIcon classes={classes}/></i>
                        <i onClick={(e)=>onDelete(id, editName)}><DeleteIcon classes={classes}/></i>
                    </div>
                    
                )
                
                }
                
            </td>
                           
        </tr>
        
    )
}

export default Dummy
