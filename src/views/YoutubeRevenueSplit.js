import React, { Component, useEffect, useState } from "react";
import PropTypes from "prop-types";

import analytics from '../components/Analytics.js'

import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import Subarticle from "../components/Subarticle.js";
import Article from "../components/Article.js";
import Input from "../components/TextInput.js";

import GoogleLogin from 'react-google-login';
import Axios from "axios";

export default function YoutubeRevenueSplit(_user) {


  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setuser] = useState(null);



  const _handleSignInClick = () => {
    // Authenticate using via passport api in the backend
    // Open Twitter login page
    // Upon successful login, a cookie session will be stored in the client
    window.open("http://localhost:4000/auth/google", "_self");
  }


  useEffect(() => {
    // Fetch does not send cookies. So you should add credentials: 'include'
    fetch("http://localhost:4000/", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(response => {
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then(responseJson => {
        setAuthenticated(true);
        setuser(responseJson.user);
        setName(responseJson.user.name);
      })
      .catch(error => {
        setAuthenticated(false);
        setError("Failed to authenticate user");
      });
  });

  const _handleNotAuthenticated = () => {
    setAuthenticated(false);
  };

  return (
    <div>
      <a onClick={_handleSignInClick}>Login</a>
      <div>
        {!authenticated ? (
          <h1>Welcome!</h1>
        ) : (
          <div>
            <h1>You have logged in successfully!</h1>
            <h2>Welcome {name}!</h2>
          </div>
        )}
      </div>
    </div>
  );


}