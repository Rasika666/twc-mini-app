import React, {useState} from 'react'
import {login} from '../actions/authAction'
import {Redirect } from "react-router-dom";

import {useSelector, useDispatch} from 'react-redux'

// import Alert from '@material-ui/lab/Alert';
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import logo from '../img/logo-new.png'
import '../css/reset.css';
import '../css/login_up.css'


const useStyles = makeStyles({
    myclass: {
        fontSize: 20
    },
    cookieAlert: {
      "& .MuiAlert-icon": {
        fontSize: 50
      }
    }
  });


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props}/>;
}
  

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [open, setOpen] = React.useState(false);
    const loginState = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const classes = useStyles();

    const onSubmit = (e) => {
        e.preventDefault()

        login(dispatch, email, password)
        setOpen(true)
    }

  
    

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setEmail("");
        setPassword("");
        setOpen(false);
    };

    if(loginState.isAuthenticate) {
        return  <Redirect to="/welcome" />
    }

  return (
    <div className="main">
        <div className="form">
            <div className="form__title">
                <h1>Hi there,</h1>
                <div className="form__para">
                    Welcome to our <span>test product</span>
                </div>
            </div>

            <div className="form__form-body">
                <form onSubmit={onSubmit} method="post">
                   
                    <input type="text" 
                        id="email" 
                        name="name"  
                        placeholder="email"  
                        className="form__form-body__input input" 
                        onChange={(e) => setEmail(e.target.value)}
                        value = {email}
                        required />
                    
                    
                    <input type="password" 
                        id="password" 
                        name="password"  
                        placeholder="password"  
                        className="form__form-body__input input"  
                        onChange = {(e) => setPassword(e.target.value)}
                        value = {password}
                        required />
                
                       
                    <button className="form__form-body__button" type="submit">login</button>
                </form>
            </div>
            
        </div> 

        <div className="app-name">
            
            <div className="app-name__logo">
                <img src={logo} alt="logo" />
            </div>
            <div className="app-name__projectname">
                test <span>Project</span>
            </div>
        
            
            {loginState.msg ? (
                
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} >
                        <Alert onClose={handleClose} severity="info">
                            {loginState.msg} 
                        </Alert>
                </Snackbar>
            ): null}
            
            
        </div>


    </div>
  )
}

export default Login

