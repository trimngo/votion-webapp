import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import { Switch, Route, BrowserRouter as Router, Redirect} from 'react-router-dom';
import Home from './pages/home';
import Voting from './pages/voting';
import About from './pages/about';
import Delegation from './pages/delegation';
import Menu from './pages/menu';
import Footer from './components/footer';
import dropdown from './components/dropdown';
import Create from './pages/create';
import ForgotPass from './pages/forgotpass';
import Login from './pages/login';
import Profile from './pages/profile';
import DisplayAvatar from './pages/displayavatar';
import Proposals from './pages/proposals';
import PrivateRoute from './components/privateroute';

const api_url = (process.env.NODE_ENV === 'production')?
  process.env.API_URL:'http://localhost:3000/' 

function NoMatch(){
  return(
    <div>No Match</div>
  );
}

function App() {
  const [user, setUser] = useState({})

  // not sure if user is used anywhere
  const handleLogin = (user) => {
    setUser(user)
  }

  return (
    <Router>  {/* might need to remove this since there is already a router in index.js*/}
      <Switch>
        <Redirect from="/" to="/login" exact />
        <Route path='/login' exact
          render={(props) => <Login {...props} handleLogin={handleLogin} />} />
        <Route path='/forgotpass' component={ForgotPass} />
        <Route path='/home' component={Home} />
        <PrivateRoute path='/voting/:id' component={Voting} />
        <Route path='/displayavatar' component={DisplayAvatar} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/proposals" component={Proposals} />
        <Route component={NoMatch}/>
      </Switch>
    </Router>
  );
}

export default App;
export {api_url};
