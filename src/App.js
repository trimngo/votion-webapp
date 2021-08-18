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

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const hideMenu = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
        console.log('i resized');
      }
    };

    window.addEventListener('resize', hideMenu);

    return () => {
      window.removeEventListener('resize', hideMenu);
    };
  });

  return (
    <>
      <Navbar toggle={toggle} />
      <Dropdown isOpen={isOpen} toggle={toggle} />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/menu' component={Menu} />
        <Route path='/about' component={About} />
        <Route path='/delegation' component={Delegation} />
        <Route path='/create' component={Create} />
        <Route path='/forgotpass' component={Forgotpass} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
