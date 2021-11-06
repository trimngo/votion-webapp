// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import {api_url} from '../app';
import { Redirect, Route } from 'react-router-dom'
import React, {useState, useEffect} from 'react';


const PrivateRoute = ({ component: Component, ...rest }) => {

  const [auth, setAuth] = useState(false);
  const [isTokenValidated, setIsTokenValidated] = useState(false);

  useEffect(() => {
    // send jwt to API to see if it's valid
    let token = localStorage.getItem("token");
    if (token) {
      fetch(api_url+ '/is_token_valid', {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
      })
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        console.log(json)
        if (json.status === 'True') {
          setAuth(true);
        }
      })
      .catch((err) => {
        console.log(err)
        setAuth(false);
        localStorage.removeItem("token");
      })
      .then(() => setIsTokenValidated(true));
    } else {
       setIsTokenValidated(true); // in case there is no token
    }

  }, [])
  
  if (!isTokenValidated) return <div />; // or some kind of loading animation

  return (<Route {...rest}
    render={(props) => {
      return auth ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    }} />)
}

export default PrivateRoute