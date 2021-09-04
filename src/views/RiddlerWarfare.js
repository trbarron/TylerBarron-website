
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
import Radiobutton from "../components/RadioButton.js";

export default function RiddlerWarfair() {
  const [P2, setP2] = useState("human");

  const [scoreA, setScoreA] = useState(0)
  const [scoreB, setScoreB] = useState(0)

  const [results, setResults] = useState("")

  const [castle1A, setCastle1A] = useState(10);
  const [castle2A, setCastle2A] = useState(10);
  const [castle3A, setCastle3A] = useState(10);
  const [castle4A, setCastle4A] = useState(10);
  const [castle5A, setCastle5A] = useState(10);
  const [castle6A, setCastle6A] = useState(10);
  const [castle7A, setCastle7A] = useState(10);
  const [castle8A, setCastle8A] = useState(10);
  const [castle9A, setCastle9A] = useState(10);
  const [castle10A, setCastle10A] = useState(10);

  const [castle1B, setCastle1B] = useState(10);
  const [castle2B, setCastle2B] = useState(10);
  const [castle3B, setCastle3B] = useState(10);
  const [castle4B, setCastle4B] = useState(10);
  const [castle5B, setCastle5B] = useState(10);
  const [castle6B, setCastle6B] = useState(10);
  const [castle7B, setCastle7B] = useState(10);
  const [castle8B, setCastle8B] = useState(10);
  const [castle9B, setCastle9B] = useState(10);
  const [castle10B, setCastle10B] = useState(10);

  const castlesA = [castle1A, castle2A, castle3A, castle4A, castle5A, castle6A, castle7A, castle8A, castle9A, castle10A]
  const castlesB = [castle1B, castle2B, castle3B, castle4B, castle5B, castle6B, castle7B, castle8B, castle9B, castle10B]


  function handleBattleButton() {
    const [_scoreA, _scoreB, _exception] = battleLogic(castlesA, castlesB);
    setScoreA(_scoreA);
    setScoreB(_scoreB);
    setResults(showResults(_scoreA, _scoreB, _exception));

  }

  function showResults(_scoreA, _scoreB, _exception) {
    if (_exception) {
      return (
        <p className="text-red">
          {_exception}
        </p>
      )
    }
    
    if (P2 === "human") {
      if (_scoreA === _scoreB) {
        return (
          <p>
            Players tied with a score of {_scoreA} points!
          </p>
        )
      }

      else if (_scoreA > _scoreB) {
        return (
          <p>
            Player A (top player) won with a score of {_scoreA} points! Defeated player B total of {_scoreB} points.
          </p>
        )
      }

      else if (_scoreB > _scoreA) {
        return (
          <p>
            Player B (bottom player) won with a score of {_scoreB} points! Defeated player A total of {_scoreA} points.
          </p>
        )
      }



    }
  }


  function battleLogic(castlesA, castlesB) {
    let _scoreA = 0;
    let _scoreB = 0;
    let _exception = null;

    if (castlesA.reduce((a, b) => a + b, 0) !== 100) {
      return [0,0, "Player A doesn't sum to 100"]
    }

    if (castlesB.reduce((a, b) => a + b, 0) !== 100) {
      return [0,0, "Player B doesn't sum to 100"]
    }

    for (let i = 0; i < 10; i++) {

      // Handle ties
      if (castlesA[i] === castlesB[i]) {
        _scoreA += (i + 1) / 2;
        _scoreB += (i + 1) / 2;
      }

      // Handle A winning
      else if (castlesA[i] > castlesB[i]) {
        _scoreA += i + 1;
      }

      // Handle A winning
      else if (castlesA[i] < castlesB[i]) {
        _scoreB += i + 1;
      }
    }

    return [_scoreA, _scoreB, _exception]

  }

  function createBattleground(P2) {
    let P2Castles = <div> </div>

    if (P2 === "human") {
      P2Castles =
        <div className="w-full grid grid-cols-10 gap-0 h-48 ">
          <Castle
            castleVal={1}
            setTroopsVal={setCastle1B}
            troopsVal={castle1B}
          />

          <Castle
            castleVal={2}
            setTroopsVal={setCastle2B}
            troopsVal={castle2B}
          />
          <Castle
            castleVal={3}
            setTroopsVal={setCastle3B}
            troopsVal={castle3B}
          />
          <Castle
            castleVal={4}
            setTroopsVal={setCastle4B}
            troopsVal={castle4B}
          />
          <Castle
            castleVal={5}
            setTroopsVal={setCastle5B}
            troopsVal={castle5B}
          />
          <Castle
            castleVal={6}
            setTroopsVal={setCastle6B}
            troopsVal={castle6B}
          />
          <Castle
            castleVal={7}

            setTroopsVal={setCastle7B}
            troopsVal={castle7B}
          />
          <Castle
            castleVal={8}

            setTroopsVal={setCastle8B}
            troopsVal={castle8B}
          />
          <Castle
            castleVal={9}
            setTroopsVal={setCastle9B}
            troopsVal={castle9B}
          />
          <Castle
            castleVal={10}
            setTroopsVal={setCastle10B}
            troopsVal={castle10B}
          />
        </div>
    }

    return (
      <>
        <div className="w-full grid grid-cols-10 gap-0 h-16 ">
          <Castle
            castleVal={1}
            setTroopsVal={setCastle1A}
            troopsVal={castle1A}
          />

          <Castle
            castleVal={2}
            setTroopsVal={setCastle2A}
            troopsVal={castle2A}
          />
          <Castle
            castleVal={3}
            setTroopsVal={setCastle3A}
            troopsVal={castle3A}
          />
          <Castle
            castleVal={4}
            setTroopsVal={setCastle4A}
            troopsVal={castle4A}
          />
          <Castle
            castleVal={5}
            setTroopsVal={setCastle5A}
            troopsVal={castle5A}
          />
          <Castle
            castleVal={6}
            setTroopsVal={setCastle6A}
            troopsVal={castle6A}
          />
          <Castle
            castleVal={7}
            setTroopsVal={setCastle7A}
            troopsVal={castle7A}
          />
          <Castle
            castleVal={8}
            setTroopsVal={setCastle8A}
            troopsVal={castle8A}
          />
          <Castle
            castleVal={9}
            setTroopsVal={setCastle9A}
            troopsVal={castle9A}
          />
          <Castle
            castleVal={10}
            setTroopsVal={setCastle10A}
            troopsVal={castle10A}
          />
        </div>

        <button
          type="button"
          className="my-20"
          onClick={() => handleBattleButton(castlesA, castlesB)}
        >

          Fight
        </button>


        {P2Castles}

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
          <Radiobutton />
          <div></div>
          {createBattleground(P2)}
        </Article>

        <Article
          title="Results"
          subtitle=""
        >
          {results}

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
