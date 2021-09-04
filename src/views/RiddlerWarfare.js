
import React, { useEffect, useState } from "react";
import analytics from '../components/Analytics.js'


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Input from "../components/TextInput.js";
import Castle from "../components/Castle";


import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import Subarticle from "../components/Subarticle.js";
import Article from "../components/Article.js";

export default function RiddlerWarfair() {

  const [castle1, setCastle1] = useState(0);


  function createBattleground() {

    return (
      <>
        <p>{castle1}</p>
        <div className="w-full grid grid-cols-10 gap-0 h-16 ">
          {Castle(1, castle1, setCastle1)}
          {/* {Castle(2, 20)}
          {Castle(3, 20)}
          {Castle(4, 20)}
          {Castle(5, 20)}
          {Castle(6, 20)}
          {Castle(7, 20)}
          {Castle(8, 20)}
          {Castle(9, 20)}
          {Castle(10, 20)} */}
        </div>

        <button type="button" className="my-20">
          Fight
        </button>


        <div className="w-full grid grid-cols-10 gap-0 h-16 ">
          {/* {Castle(1, 20)}
          {Castle(2, 20)}
          {Castle(3, 20)}
          {Castle(4, 20)}
          {Castle(5, 20)}
          {Castle(6, 20)}
          {Castle(7, 20)}
          {Castle(8, 20)}
          {Castle(9, 20)}
          {Castle(10, 20)} */}
        </div>
      </>)
  }

  return (
    <div className="bg-background bg-fixed">
      <Navbar />
      <main>

        <Article
          title="Riddler Warfare"
          subtitle="Battle for Riddler Nation"
        >
          <div></div>
          {createBattleground()}
        </Article>

        <Article
          title="What is Riddler Warfare?"
          subtitle=""
        >
          <p>
            In a distant, war-torn land, there are 10 castles. There are two warlords: you and your archenemy. Each castle has its own strategic value for a would-be conqueror. Specifically, the castles are worth 1, 2, 3, …, 9 and 10 victory points. You and your enemy each have 100 phalanxes of soldiers to distribute, any way you like, to fight at any of the 10 castles. Whoever sends more phalanxes to a given castle conquers that castle and wins its victory points. If you each send the same number of phalanxes, you split the points. You don’t know what distribution of forces your enemy has chosen until the battles begin. Whoever wins the most points wins the war.
          </p>
          <p>
            Unlike previous iterations of this challenge, you can split up phalanxes into tenths. In other words, the number of phalanxes you assign to any given castle can go to one decimal place. For example, you could assign 5 phalanxes to a castle, but 4.9 and 5.1 are also valid assignments. But remember — your total across all 10 castles must still add up to 100.
          </p>


        </Article>
      </main>
      <Footer />
    </div >
  );
}
