import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { Switch, Route } from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import Delegation from './pages/delegation';
import Menu from './pages/menu';
import Footer from './components/Footer';
import Dropdown from './components/Dropdown';
import Create from './pages/create';
import Forgotpass from './pages/forgotpass';
import Login from './pages/Login';


function App() {
  return (
    <>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/menu' component={Menu} />
        <Route path='/about' component={About} />
        <Route path='/delegation' component={Delegation} />
        <Route path='/create' component={Create} />
        <Route path='/forgotpass' component={Forgotpass} />
      </Switch>
    </>
  );
}

export default App;
