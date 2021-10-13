// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import { Redirect, Route } from 'react-router-dom'
import React, {useState, useEffect} from 'react';


const PrivateRoute = ({ component: Component, ...rest }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null)
  useEffect( () => {
    const token = localStorage.getItem("token")

    if(token){
      fetch(`http://localhost:3000/is_token_valid`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(resp => resp.json())
      .then(data => {
          console.log(data)
          setIsLoggedIn(true)})
    }
    else{
      setIsLoggedIn(false)
    }

  }, [])

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default PrivateRoute