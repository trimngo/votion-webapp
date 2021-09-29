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
import UploadAvatar from './pages/uploadavatar';
import DisplayAvatar from './pages/displayavatar';
import PrivateRoute from './components/privateroute';

const url = (process.env.NODE_ENV === 'production')? 
  'https://kraken-api.herokuapp.com/':'http://localhost:3000/' 


function NoMatch(){
  return(
    <div>No Match</div>
  );
}

function App() {
  const [user, setUser] = useState({})

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
        {/* <Route path='/uploadavatar' component={UploadAvatar} /> */}
        <Route path='/displayavatar' component={DisplayAvatar} />
        <PrivateRoute path="/uploadavatar" component={UploadAvatar} />
        <Route component={NoMatch}/>
      </Switch>
    </Router>
  );
}

export default App;
export {url};
