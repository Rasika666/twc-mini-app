import React, { useState, useEffect } from "react";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";
import Loading from 'react-loading-spinkit'
import { useDispatch, useSelector } from "react-redux";
import {Redirect } from "react-router-dom";

import '../css/reset.css';
import "../css/dashboard.css";

import Dummy from "../components/Dummy";
import ConfirmModal from "../components/ConfirmModal";
import DoneModal from "../components/DoneModal";

import { getDummyUsers, updateDummyUser, isopenmodalconfirm } from "../actions/dummyuserAction";
import {openConfirmModal} from '../actions/modalAction'
import {getUser} from '../actions/authAction'
import { REDIRECT } from "../actions/type";


function Dummies() {
  const [dummyUserId, setDummyUserId] = useState("");
  const [dummyUserName, setDummyUserName] = useState("");
  
  const dummyusers = useSelector((state) => state.dummyusers);
  const authState = useSelector(state => state.auth)
  const dispatch = useDispatch();

  const onDelete = (id, name) => {
      setDummyUserId(id)
      setDummyUserName(name)
      isopenmodalconfirm(dispatch)
      openConfirmModal(dispatch, name)
  };

  const onSave = (id,name, email, pno) => {

    updateDummyUser(dispatch, authState, id, name, email, pno)
  };

  //fetch initial data
  useEffect(() => {
      dispatch({
        type: REDIRECT,
        payload: false
      })
      getDummyUsers(dispatch, authState);
    
  }, []);

  const content = (
    <div className="container">
      <Logo />
      <main>
      <div className="table">
        <div className="table__header">
            <div className="table__name">Dummies</div>
            <Link to="/adduser">
              <button>Add New Dummy</button>
            </Link>
        </div>
        <div className="table_contain">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Dummy name</th>
              <th>email</th>
              <th>phone numner</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {!dummyusers.isLoading
              ? dummyusers.dummyusers.map((dummyuser) => {
                  return (
                    <Dummy
                      key={dummyuser._id}
                      name={dummyuser.name}
                      email={dummyuser.email}
                      pno={dummyuser.phoneNumber}
                      avatarURL={dummyuser.avatar}
                      onDelete={onDelete}
                      id={dummyuser._id}
                      onSave={onSave}
                    />
                  );
                })
              : null}
          </tbody>
        </table>
      </div>

      </div>

      
      </main>
    </div>
  );

  return (
    <>
      {dummyusers.isOpenConfirmModal ? (
        <ConfirmModal
          username={dummyUserName}
          userId={dummyUserId}
          dummyusers={dummyusers}
        />
      ) : null}

      {dummyusers.isOpenDoneModal ? (
        <DoneModal/>
      ) : null}
      {dummyusers.isLoading ? (
        <div style={{ height: '100vh', width: '100vw' }}>
          <Loading show={true} color="#fff"/>
        </div>
      ) : (
        content
      )}
    </>
  );
}

export default Dummies;
