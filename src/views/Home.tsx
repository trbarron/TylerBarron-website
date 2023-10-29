import React from "react";
import Footer from "../components/Footer.js";
import '../index.css';

export default function Home() {
  return (
    <>
      <main className="h-screen bg-black relative">
        
        {/* Dark Gray Section with Transparent Text */}
        <section className="absolute w-full h-1/5 top-0 z-10 flex items-center justify-center">
          <div className="">
            <div className="text-3xl text-center md:text-left xl:text-4xl text-white">
              Barron Wasteland
            </div>
            <div className="text-md text-transparent bg-clip-text bg-background lg:text-lg xl:text-2xl">
              Food for thought // Ideas for eating
            </div>
          </div>
        </section>

        {/* Dark Gray Section with Transparent Text for List */}
        <section className="absolute top-1/4 h-1/2 w-full flex items-center justify-center z-10 bg-white">
          <ul className="mx-auto h-5/6 text-xl leading-normal lg:leading-relaxed md:text-2xl lg:text-2xl text-transparent bg-clip-text bg-background" style={{ width: "fit-content", height: "fit-content" }}>
            <li><a href="/TheRiddler" className="py-1 home-link">FiveThirtyEight's The Riddler</a></li>
            <li><a href="/LudwigChess/Join" className="py-1 home-link">Ludwig Chess</a></li>
            <li><a href="/CamelUpCup" className="py-1 home-link">Camel Up Cup</a></li>
            <li><a href="/ChessOpenings" className="py-1 home-link">Chess Openings Practice</a></li>
            <li><a href="/MarchMadness" className="py-1 home-link">March Madness</a></li>
            <li><a href="/RiddlerWarfare" className="py-1 home-link">Riddler Warfare</a></li>
            <li><a href="/GenerativeArt" className="py-1 home-link">Generative Art</a></li>
            <li><a href="/Set" className="py-1 home-link">Hackathon Project: Set</a></li>
            <li><a href="/BoulderingTracker" className="py-1 home-link">Bouldering Tracker</a></li>
            <li><a href="/SSBM" className="py-1 home-link">Super Smash Bros. Melee Mods</a></li>
            <li><a href="/SwiftneyGame" className="py-1 home-link">The Swiftney Game</a></li>
          </ul>
        </section>


        <div className="invisible lg:visible absolute bottom-0 right-0 pb-12 pr-40 z-20">
          <a href="/Profile" className=" text-gray-light text-lg">
            about me
          </a>
        </div>

        <div className="sm:h-auto lg:hidden absolute bottom-0 w-screen">
          <Footer />
        </div>

      </main>
    </>
  );
}