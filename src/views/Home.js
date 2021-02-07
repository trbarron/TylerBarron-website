import React from "react";

import Navbar from "../components/Navbar.js";

import bckgrndImg from '../assets/img/background.jpg';


export default function Profile() {
  return (
    <>
      <main className="profile-page h-screen">
        <section className="relative block h-screen">
          <div className="absolute top-0 w-auto h-full bg-center bg-cover overflow-hidden">
            <img
              src={bckgrndImg}
              style={{maxWidth: "200%"}}
            />

        
          </div>
        </section>
        <section className="absolute w-1/2 h-1/5 bg-gray-clear bottom-0 z-0 grid auto-cols-auto pl-20 flex items-center">
            <div>
                <p className='text-5xl text-gray-light'>Barron Wasteland</p>
                <p className='text-2xl text-red-light'>Food for thought&ensp;//&ensp;Ideas for eating</p>
            </div>
        </section>

        <section className="absolute w-1/2 h-screen inset-y-0 right-0 z-10 bg-red-clear flex items-center justify-center">
            <ul className="mx-auto text-gray-light h-5/6" style={{width: "fit-content", height: "fit-content", fontSize:"1.875rem"}}>
                <li><a href="/TheRiddler" className="py-1 home-link">FiveThirtyEight's The Riddler</a></li>
                <li><a href="/Profile" className="py-1 home-link">Camel Up Cup</a></li>
                <li><a href="/Profile" className="py-1 home-link">Generative Art</a></li>
                <li><a href="/Profile" className="py-1 home-link">Set</a></li>
                <li><a href="/Profile" className="py-1 home-link">Bouldering Tracker</a></li>
                <li><a href="/Profile" className="py-1 home-link">Custom Hue Lights Setup</a></li>
                <li><a href="/Profile" className="py-1 home-link">Super Smash Bros. Melee Mods</a></li>
                <li><a href="/Profile" className="py-1 home-link">Bed Frame</a></li>
                <li><a href="/Profile" className="py-1 home-link">Automated Plant Waterer</a></li>
                <li><a href="/Profile" className="py-1 home-link">Kaleidoscope</a></li>
                <li><a href="/Profile" className="py-1 home-link">The Swiftney Game</a></li>
            </ul>
        </section>

      </main>
    </>
  );
}
