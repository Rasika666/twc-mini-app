import React , {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import Loading from 'react-loading-spinkit'

import '../css/reset.css';
import '../css/welcome_up.css';

import {getUser} from '../actions/authAction'

import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

function WelCome() {

    const dispatch = useDispatch()
    const authState = useSelector(state => state.auth)

    // useEffect(()=> {
    //     getUser(dispatch, authState)
    // },[])

    return (

        <div className = "container">
            {
                authState.isLoading ? (
                    <div style={{ height: '100vh', width: '100vw' }}>
                        <Loading show={true} color="#fff"/>
                    </div>
                ) :  
                ( 

                    <>
                        {/* logo here */}
                        <Logo />
                        <main>
                        <div className="welcome-test">
                            <span>Welcome!</span> <p>This is where your dummy users will live.
                            Click the button below to add a new dummy.</p> 
                            {/* <button onClick={testClick}>click</button> */}
                            <Link to="/adduser"><button>Add You First Dummy</button></Link>
                        </div>
                        </main>
                        
                        </>   
                        
                
                    
                ) 
            } 
        </div>
        
        
    )
}

export default WelCome
