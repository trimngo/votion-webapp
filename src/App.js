import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { Switch, Route, BrowserRouter as Router, Redirect} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/about';
import Delegation from './pages/delegation';
import Menu from './pages/menu';
import Footer from './components/Footer';
import Dropdown from './components/Dropdown';
import Create from './pages/create';
import ForgotPass from './pages/ForgotPass';
import Login from './pages/Login';


function NoMatch(){
  return(
    <div>No Match</div>
  );
}

function App() {
  return (
    <Router>
      <Switch>
        <Redirect from="/" to="/login" exact />
        <Route path='/login' exact component={Login} />
        <Route path='/forgotpass' component={ForgotPass} />
        <Route path='/home' component={Home} />
        <Route component={NoMatch}/>
      </Switch>
    </Router>
  );
}

export default App;
