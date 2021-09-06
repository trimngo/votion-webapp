import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import { Switch, Route, BrowserRouter as Router, Redirect} from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Delegation from './pages/delegation';
import Menu from './pages/menu';
import Footer from './components/footer';
import dropdown from './components/dropdown';
import Create from './pages/create';
import ForgotPass from './pages/forgotpass';
import Login from './pages/login';


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
