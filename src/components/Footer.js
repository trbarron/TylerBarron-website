import React from "react";
import email from '../assets/img/email.svg';
import git from '../assets/img/git.svg';
import lin from '../assets/img/in.svg';

export default function Footer() {
  return (
    <>
      <footer className="relative bg-red pb-12 pt-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4">

            </div>
          </div>
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm text-gray-600">
              <div className="text-sm">
                  <a href="https://www.tylerbarron.com/" className="text-gray-light text-md">made by Tyler Barron</a>
              </div>
              <div className="text-sm  pb-4 text-black">
                  V2.0.2
              </div>
              <div className="mt-0">

                <a href="mailto: trbbarron@gmail.com"
                  className="bg-gray-light shadow-lg h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 p-2"
                  type="button">
                  <i className="flex fab"></i>
                  <img
                    src={email}
                    style={{backgroundSize: "cover"}}
                    alt="email"
                  />
                </a>

                <a href="https://github.com/trbarron"
                  className="bg-gray-light shadow-lg h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 p-2"
                  type="button">
                  <i className="flex fab uil-instagram"></i>
                  <img
                    src={git}
                    style={{backgroundSize: "cover"}}
                    alt="github"
                  />
                </a>

                <a href="https://www.linkedin.com/in/tyler-barron-61972855/"
                  className="bg-gray-light shadow-lg h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 p-2"
                  type="submit">
                  <img
                    href="https://www.linkedin.com/in/tyler-barron-61972855/"
                    src={lin}
                    style={{backgroundSize: "cover"}}
                    alt="linkedin"
                  />
                </a>
              </div>


              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
