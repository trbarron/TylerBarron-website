import React from 'react';
import email from '../assets/img/email.svg';
import git from '../assets/img/git.svg';
import lin from '../assets/img/in.svg';

const Footer: React.FC = () => {
  return (
    <>
      <footer className="relative bg-offWhite pb-12 pt-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm text-gray-600">
                <div className="text-sm">
                  <a href="https://www.tylerbarron.com/" className="text-offBlack text-md">made by Tyler Barron</a>
                </div>
                <div className="text-sm pb-4 text-offBlack">
                  V3.0.2
                </div>
                <div className="mt-0 max-w-full">
                  <a href="mailto: trbbarron@gmail.com"
                    className="bg-white shadow-lg h-8 w-8 md:h-10 md:w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 p-2"
                    type="button">
                    <img src={email} alt="email" />
                  </a>

                  <a href="https://github.com/trbarron"
                    className="bg-white shadow-lg h-8 w-8 md:h-10 md:w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 p-2"
                    type="button">
                    <img src={git} alt="github" />
                  </a>

                  <a href="https://www.linkedin.com/in/tyler-barron-61972855/"
                    className="bg-white shadow-lg h-8 w-8 md:h-10 md:w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 p-2"
                    type="button">
                    <img src={lin} alt="linkedin" />
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

export default Footer;
