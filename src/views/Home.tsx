import React from "react";
import Footer from "../components/Footer.tsx";
import '../index.css';

export default function Home() {
  return (
    <>
      <main className="h-screen bg-offWhite relative font-body">

        {/* Dark Gray Section with Transparent Text */}
        <section className="w-full h-1/5 top-0 z-10 flex items-center justify-center">
          <div className="">
            <div className="text-3xl text-center md:text-left xl:text-4xl text-offBlack">
              Barron Wasteland
            </div>
            <div className="text-gray-400 lg:text-lg xl:text-2xl">
              Food for thought // Ideas for eating
            </div>
          </div>
        </section>

        <section className="w-full flex items-center justify-center bg-white pt-8 pb-12">
          <div className="flex flex-col items-center w-full">
            <h2 className="ml-4 text-offBlack"> Projects </h2>
            <ul className="mx-auto pl-6 pr-4 h-5/6 text-xl leading-normal lg:leading-relaxed md:text-2xl lg:text-2xl text-transparent bg-clip-text bg-text-bg" style={{ width: "fit-content", height: "fit-content" }}>
              <li>
                <a href="/TheRiddler" className="py-1 home-link">FiveThirtyEight's The Riddler</a>
                <div className="ml-6 text-sm text-gray-600 pb-2">Math puzzles and problems</div>
              </li>
              <li>
                <a href="/LudwigChessLanding" className="py-1 home-link">Ludwig Chess</a>
                <div className="ml-6 text-sm text-gray-600 pb-2">Realtime chess with evaluation bar</div>
              </li>
              <li>
                <a href="/CamelUpCup" className="py-1 home-link">Camel Up Cup</a>
                <div className="ml-6 text-sm text-gray-600 pb-2">"Bring your own board game playing bot" competition</div>
              </li>
              <li>
                <a href="/ChessOpenings" className="py-1 home-link">Chess Openings Practice</a>
                <div className="ml-6 text-sm text-gray-600 pb-2">Tool to practice your chess openings</div>
              </li>
              <li>
                <a href="/RiddlerWarfare" className="py-1 home-link">Riddler Warfare</a>
                <div className="ml-6 text-sm text-gray-600 pb-2">Blotto style game-theory challenge</div>
              </li>
              <li>
                <a href="/GenerativeArt" className="py-1 home-link">Generative Art</a>
                <div className="ml-6 text-sm text-gray-600 pb-2">Dive into plotters and generative art</div>
              </li>
              <li>
                <a href="/Set" className="py-1 home-link">Set</a>
                <div className="ml-6 text-sm text-gray-600 pb-2">Using computer vision to play a board game</div>
              </li>
              <li>
                <a href="/BoulderingTracker" className="py-1 home-link">Bouldering Tracker</a>
                <div className="ml-6 text-sm text-gray-600 pb-2">Using computer vision to track climbing style</div>
              </li>
              <li>
                <a href="/SSBM" className="py-1 home-link">Super Smash Bros. Melee Mods</a>
                <div className="ml-6 text-sm text-gray-600 pb-2">Collection of hardware and software mods</div>
              </li>
            </ul>
          </div>
        </section>

        <div className="sm:h-auto lg:hidden w-screen">
          <Footer />
        </div>

      </main>
    </>
  );
}