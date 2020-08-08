import React, {useState, useEffect} from 'react'

import '../css/reset.css';
import '../css/add.css'
import Logo from '../components/Logo';
import {Redirect } from "react-router-dom";

import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { makeStyles } from '@material-ui/core/styles';

import {createDummyUser} from '../actions/dummyuserAction'
import {getUser} from '../actions/authAction'

import {useDispatch, useSelector} from 'react-redux'
const useStyles = makeStyles((theme) => ({
    root: {
      color: "#18363D",
      fontSize: '64px'
    },
  }));



function AddUser() {

    const classes = useStyles();

    const [fname, setFname] = useState("");
    const [email, setEmail] = useState("");
    const [pno, setPno] = useState("");
    const [ppic, setPpic] = useState("");
    const [imgFile, setImgFile] = useState("");
    // const [submit, setSubmit] = useState(false)

    const dispatch = useDispatch()
    const authState = useSelector(state => state.auth)
    const dummyusersState = useSelector(state => state.dummyusers)

    const handleChange = event => {
        if(event.target.files[0]) {
            setPpic(event.target.files[0])
            setImgFile(URL.createObjectURL(event.target.files[0]))
        }

    } 

    const onSubmit = event => {
        event.preventDefault();
        
        const form = new FormData();
        form.append('name', fname);
        form.append('email', email);
        form.append('phoneNumber', pno);
        form.append('avatar', ppic);

        createDummyUser(dispatch, authState, form, true)

    }

    if(dummyusersState.redirect){
        return  <Redirect to="/dummies" />
    }
   

    return (
        <div className="container">
            
            {/* logo here */}
            <Logo />
            <main>
                <div className="form">
                    <div className="form__name">New Dummy</div>
                    <form onSubmit={onSubmit}>
                        <div className="form__group">
                            <label htmlFor="fname">full name</label> <br />
                            <input type="text" name="fname" id="fname" onChange={(e) => {setFname(e.target.value)}} value={fname} required/>
                        </div>
                        <div className="form__group">
                            <label htmlFor="email">email</label> <br />
                            <input type="email" name="email" id="email" onChange={(e) => {setEmail(e.target.value)}} value={email} required/>
                        </div>
                        <div className="form__group">
                            <label htmlFor="pno">phone number</label> <br />
                            <input type="tel" pattern="[0-9]{3}-[0-9]{7}" name="pno" id="pno" onChange={(e) => {setPno(e.target.value)}} value={pno} required/>
                            <small>Format: 077-6666666</small>
                        </div>
                        <div className="form__group form__group--file">
                            <label htmlFor="ppicc">profile picture</label> <br />
                            <input type="file" name="ppic" id="ppic" accept="image/*" onChange={handleChange} required/>
                            <div className="add-user--upload">
                                <label className="add-user--file" htmlFor="ppic">
                                    <p>attach you picture here </p>
                                    <i className="material-icons">
                                        <CameraAltIcon classes={classes}/>
                                    </i>
                                </label>
                                <img src={imgFile} alt="image preview"/>
                            </div>
                            
                        </div>
                        <div className="form__group">
                            <button type="submit">Add your first Dummy</button>
                        </div>
                            
                            
                    </form>
                </div>
            </main>
            
           
        </div>
    )
}

export default AddUser
