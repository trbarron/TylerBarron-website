import React, { FC } from "react";

const Navbar: FC = () => {
  return (
    <>
      <nav
        className="relative shadow-lg bg-offWhite shadow-lg flex flex-wrap items-center justify-between px-2 py-6 navbar-expand-lg">
        <a className="container px-4 mx-auto flex flex-wrap items-center justify-between"
        href="/">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start font-body">
            <div className="leading-relaxed whitespace-no-wrap">
              <div className="text-3xl text-offBlack">
                Barron Wasteland
              </div>
              <div className="text-md text-gray-400">
                Food for thought // Ideas for eating
              </div>
            </div>
          </div>
        </a>
      </nav>
    </>
  );
}

export default Navbar;
