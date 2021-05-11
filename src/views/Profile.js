import React from "react";

import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";

import bckgrndImg from '../assets/img/background.jpg';
import usrImag from '../assets/img/me.jpg';


export default function Profile() {
  return (
    <>
      <Navbar transparent />
      <main className="profile-page">
        <section className="relative block" style={{ height: "25rem" }}>
          <div
            className="absolute top-0 w-auto h-full bg-center bg-cover overflow-hidden"
          >
            <img
              src={bckgrndImg}
              style={{maxWidth: "200%"}}
            />
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-auto absolute pointer-events-none overflow-hidden"
            style={{ height: "14rem", transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-red fill-current"
                points="3000 0 3000 500 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative pt-16 pb-4 bg-red">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-gray-light w-full mb-6 shadow-xl rounded-lg -mt-64 lg:w-8/12 xl:w-6/12 lg:mx-auto">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full  px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        src={usrImag}
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-40 w-auto"
                        style={{ maxWidth: "20rem"}}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="text-center mt-44">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-dark mb-2 ">
                    Tyler Barron
                  </h3>
                </div>
                <div className="mt-10 py-10 border-t border-gray">
                    <div className="w-full px-4">
                      <p className="mb-4 text-lg leading-relaxed text-gray">
                      I'm Tyler, a Seattlite working as a Frontend Web Developer for a consulting company. I've worked for a robotics companies in the past. I spend my free time exercising (bouldering, running, yoga), creating 
                      various art (photography / generative art), working on projects shown on this website and playing various video and board games.
                      </p>
                      <p className="mb-4 text-lg leading-relaxed text-gray">
                      Feel free to contact me using any of the methods below
                      </p>
                      
                    </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
