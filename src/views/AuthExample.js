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

export default function AuthExample(_user) {


  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setuser] = useState(null);
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");


  const _handleSignInGoogle = () => {
    // Authenticate using via passport api in the backend
    // Open Twitter login page
    // Upon successful login, a cookie session will be stored in the client
    window.open("http://localhost:4000/auth/google", "_self");
  }

  useEffect(() => {
    // Fetch does not send cookies. So you should add credentials: 'include'
    _logOn();
  }, []);

  function _logOn() {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/auth",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Access-Control-Allow-Credentials": true
      }
    }).then(response => {
      if (response.status === 200) {
        return response.data;
      }
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
  }

  function _handleRegister() {
    Axios({
      method: "POST",
      data: {
        username: registerUsername,
        password: registerPassword,
      },
      withCredentials: true,
      url: "http://localhost:4000/auth/register",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Access-Control-Allow-Credentials": true
      }
    }).then((res) => console.log(res));
  };

  function _handleSignInLocal() {
    Axios({
      method: "POST",
      data: {
        username: registerUsername,
        password: registerPassword,
      },
      withCredentials: true,
      url: "http://localhost:4000/auth/login",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Access-Control-Allow-Credentials": true
      }
    }).then((res) => {
      console.log(res)
      _logOn();
    });
  };

  function _handleSignOut() {
    Axios({
      method: "GET",
      data: {},
      withCredentials: true,
      url: "http://localhost:4000/auth/logoff",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Access-Control-Allow-Credentials": true
      }
    }).then((res) => {
      _logOn();
    }).catch((err) => {
      _logOn();
    });
  };



  return (

    <div className="bg-background bg-fixed min-h-screen flex flex-col">
        <Navbar />
      <main className="flex-grow">

        <Article
          title="Authentication Example"
          subtitle=""
        >

          <Subarticle
            subtitle=""
          >
            <h3 className="text-xl text-center pb-4">
              {!authenticated ? (
                <h1>Welcome!</h1>
              ) : (
                <div>
                  Logged in as: {name}
                </div>
              )}
            </h3>

            <div className="w-2/4 mx-auto h-16 pb-4">
              <Input
                id={"Entry Name"}
                label={"Entry Name"}
                handleChange={(e) => setRegisterUsername(e)}
              />
            </div>

            <div className="w-2/4 mx-auto h-16 pb-4">
              <Input
                id={"Password"}
                label={"Password"}
                isPassword={true}
                handleChange={(e) => setRegisterPassword(e)}

              />
            </div>

            <div className="w-1/4 mx-auto h-12 mb-4 bg-white rounded cursor-pointer" onClick={_handleSignInLocal}>
              <div className="w-full h-full text-center text-lg place-self-center pt-2">Log On</div>
            </div>

            <div className="w-1/4 mx-auto h-12 mb-4 bg-white rounded cursor-pointer" onClick={_handleSignOut}>
              <div className="w-full h-full text-center text-lg place-self-center pt-2">Log Off</div>
            </div>

            <div className="w-1/4 mx-auto h-12 mb-4 bg-red-light rounded cursor-pointer" onClick={_handleRegister}>
              <div className="w-full h-full text-center text-lg place-self-center pt-2">Register</div>
            </div>

            <hr></hr>

            <div className="w-2/4 mx-auto h-12 mb-4 mt-4 bg-red-light rounded cursor-pointer" onClick={_handleSignInGoogle}>
              <div className="w-full h-full text-center text-lg place-self-center pt-2">Log On with Google</div>
            </div>

          </Subarticle>
        </Article>

      </main>
      <Footer />
    </div>
  );


}