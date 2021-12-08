import React from 'react';
import { BrowserRouter, Switch, Route, NavLink,useHistory } from 'react-router-dom';
import RegisterUser from './components/RegisterUser';
import logo from './logo.svg';
import './App.css';
import { Redirect } from "react-router";

import Reply from './components/Reply';
import Login from './components/Login';
import AddTweet from './components/AddTweet';
import AllUsers from './components/AllUsers';

 
function App() {
let history =useHistory();
function logOut() {
if(sessionStorage.getItem('user-info')){
    alert('logged off successful');
    sessionStorage.clear();
}else{
    alert('already logged off');
}
}

  return (
    <div className="App">
      <BrowserRouter>
        <div>
         <div>
            <img src={logo} alt="logo image" width="100" height="100"/>
         </div>
          <div className="header">
            <NavLink activeClassName="active" to="/registerUser" className="App-link">Register</NavLink>
            <NavLink activeClassName="active" to="/login" className="App-link">Login</NavLink>
            <NavLink activeClassName="active" to="/addtweet" className="App-link">Tweets</NavLink>
            <NavLink activeClassName="active" to="/allUsers" className="App-link">All Users</NavLink>
            <NavLink activeClassName="active" to="/logOut" className="App-link" onClick={logOut}> LogOut</NavLink>
          </div>
          <div className="content">
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/registerUser" component={RegisterUser} />
              <Route path="/addtweet" component={AddTweet} />
              <Route path="/allUsers" component={AllUsers} />
              <Route path="/logOut">
                <Redirect to='/addtweet' />
              </Route>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}
 
export default App;
