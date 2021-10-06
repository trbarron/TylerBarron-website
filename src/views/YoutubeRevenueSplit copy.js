import React, { useEffect, useState } from "react";
import analytics from '../components/Analytics.js'

import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import Subarticle from "../components/Subarticle.js";
import Article from "../components/Article.js";
import Input from "../components/TextInput.js";

import GoogleLogin from 'react-google-login';
import Axios from "axios";

export default function AuthExample() {

  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [displayData, setDisplayData] = useState(null);

  useEffect(() => {
    getUser();
  })

  const handleLogin = async googleData => {

    const res = await Axios({
      method: "POST",
      data: {
        // username: loginUsername,
        // password: loginPassword,
        token: googleData.tokenId
      },
      withCredentials: true,
      url: "http://localhost:4000/loginGoogle",
    });

    const data = res.data;
    // store returned user somehow
    console.log(data);
    // setDisplayData(data);
  }


  const getUser = async () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/user",
    }).then((res) => {
      setDisplayData(res.data);
      console.log('res.data: ',res.data);
    });
  };

  return (
    <div className="bg-background bg-fixed min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">

        {/* <BottomStripe/> */}

        <Article
          title="Youtube Revenue Split"
          subtitle=""
        >

          <Subarticle
            subtitle=""
          >
            <h3 className="text-xl text-center pb-4">Log On</h3>

            <div className="w-2/4 mx-auto h-16 pb-4">
              <Input
                id={"Entry Name"}
                label={"Entry Name"}
                handleChange={(e) => setRegisterUsername(e.target.value)}
              />
            </div>

            <div className="w-2/4 mx-auto h-16 pb-4">
              <Input
                id={"Password"}
                label={"Password"}
                isPassword={true}
                handleChange={(e) => setRegisterPassword(e.target.value)}

              />
            </div>

            <div className="w-2/4 mx-auto h-12 mb-4 bg-red-light rounded cursor-pointer" onClick={handleLogin}>
              <div className="w-full h-full text-center text-lg place-self-center pt-2">Log On</div>
            </div>

            <GoogleLogin
              clientId={'138518727357-knc1fld5mld5v5u4av4q6icg2a68gr2s.apps.googleusercontent.com'}
              buttonText="Login"
              onSuccess={handleLogin}
              onFailure={handleLogin}
              cookiePolicy={'single_host_origin'}
            />

            <p> {'Data:' + displayData} </p>
          </Subarticle>
        </Article>

      </main>
      <Footer />
    </div>
  );
}
