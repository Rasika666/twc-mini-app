import React from 'react';

import { HashRouter as Router, Route, Switch } from "react-router-dom";

import Login from './pages/Login';
import WelCome from './pages/WelCome';
import AddUser from './pages/AddUser';
import Dummies from './pages/Dummies';

import PrivateRoute from './components/PrivateRoute'


function App() {
  return (
    
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Login} />
            <PrivateRoute exact path="/welcome" component={WelCome} />
            <PrivateRoute exact path="/adduser" component={AddUser} />
            <PrivateRoute exact path="/dummies" component={Dummies} />
          </Switch>
        </div>
      </Router>
    
    
  );
}

export default App;
