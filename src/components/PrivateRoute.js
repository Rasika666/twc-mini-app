import React, {useEffect} from 'react'
import { Route, Redirect } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import Loading from 'react-loading-spinkit'
import {getUser} from '../actions/authAction'


function PrivateRoute({component: Component, ...rest}) {
    const authState = useSelector(state => state.auth)
    const dispatch = useDispatch();

    // useEffect(()=> {
    //     getUser(dispatch,authState);
    // },[])
  
    return (
        <Route {...rest}
            render = {props => {
                

                if(authState.isLoading) {
                    console.log("loading")
                    return (
                        <div style={{ height: '100vh', width: '100vw' }}>
                            <Loading show={true} color="#fff"/>
                        </div>
                    )
                }else if (!authState.isAuthenticate) {
                    console.log("redeirect")
                    return <Redirect to="/" />
                    
                }else {
                    console.log("awaa")
                    return <Component {...props} />;
                    
                }
            }}
        />
    )
}

export default PrivateRoute
