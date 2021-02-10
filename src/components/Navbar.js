import React from "react";

export default function Navbar() {
  return (
    <>
      <nav
        className={"relative shadow-lg bg-gray-clear shadow-lg flex flex-wrap items-center justify-between px-2 py-6 navbar-expand-lg"}>
        <a className="container px-4 mx-auto flex flex-wrap items-center justify-between"
        href="/">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <div className={"leading-relaxed whitespace-no-wrap"}>
              <div className={"text-3xl text-gray-light"}>
                Barron Wasteland
              </div>
              <div className={"text-md text-red-light"}>
                Food for thought // Ideas for eating
              </div>
            </div>
          </div>
        </a>
      </nav>
    </>
  );
}
