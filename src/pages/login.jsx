import { Link } from "react-router-dom";
import React, {useState, useEffect} from 'react';
import {api_url} from '../app';
import votion_logo from '../images/votion_logo.png';
/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ]
  }
  ```
*/

import { GoogleLogin } from 'react-google-login';


const responseGoogle = (response) => {
  console.log(response);
}

export default function Login(props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  console.log('ENV:'+ JSON.stringify(process.env))

  const handleEmailChange = (evt) => {
      setEmail(evt.target.value)
  }

  const handlePasswordChange = (evt) => {
      setPassword(evt.target.value)
  }
  const handleSubmit = (evt) => {
    evt.preventDefault()
    fetch(api_url + 'authenticate', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            "name": email,
            "password":password
        })
    })
    .then(resp => resp.json())
    .then(data => {
        localStorage.setItem("token", data.auth_token)
        localStorage.setItem("id", data.id)
        props.handleLogin(data.user)
        return data;
    })
    .then(data => console.log(data))
    .then( () => {
      if(props.location?.state?.from?.pathname !==undefined && props.location.state.from.pathname ) 
        props.history.push(props.location.state.from.pathname)
      else
        props.history.push("/home")
    })

  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-20 w-auto"
          src={votion_logo}
          alt="Workflow"
        />
        <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900">Votion!</h2>
        <p className="mt-2 text-center text-sm text-gray-600 max-w">
          Sign into your account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  required
                  value={email}
                  onChange={handleEmailChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={handlePasswordChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
              <Link to='/forgotpass' className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
              </Link>
              </div>
            </div>

            <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
            <GoogleLogin
              clientId="920203040736-vml0j3cbl9k09veqrodstud9ab0e5pcl.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />

            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}
