import React from "react";
import Footer from "../components/Footer.js";

import bckgrndImg from '../assets/img/background.jpg';


export default function Profile() {
  return (
    <>
      <main className="profile-page h-screen">
        <section className="relative block h-screen">
          <div className="absolute top-0 w-auto h-full bg-background bg-fixed overflow-hidden">
            <img
              src={bckgrndImg}
              style={{maxWidth: "400%"}}
            />

        
          </div>
        </section>
        <section className="absolute w-screen justify-center h-1/5 bg-gray-clear z-0 grid auto-cols-auto items-center top-0 lg:w-1/2 lg:bottom-0 lg:top-auto lg:pl-20">
            <div>
                <p className='text-3xl text-gray-light text-center md:text-left xl:text-4xl'>Barron Wasteland</p>
                <p className='text-md text-red-light lg:text-lg xl:text-2xl'>Food for thought&ensp;//&ensp;Ideas for eating</p>
            </div>
        </section>

        <section className="absolute top-1/4 h-1/2 w-screen inset-y-0 right-0 z-10 bg-red-clear flex items-center justify-center lg:w-1/2 lg:h-screen lg:top-auto">
            <ul className="mx-auto text-gray-light h-5/6 text-lg leading-normal lg:leading-relaxed lg:text-3xl" style={{width: "fit-content", height: "fit-content"}}>
                <li><a href="/TheRiddler" className="py-1 home-link">FiveThirtyEight's The Riddler</a></li>
                <li><a href="/CamelUpCup" className="py-1 home-link">Camel Up Cup</a></li>
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

        <div className="sm:h-auto md:hidden absolute bottom-0 w-screen">
          <Footer/>
        </div>

      </main>
    </>
  );
}
