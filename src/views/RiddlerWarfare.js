
import React, { useEffect, useState } from "react";
import analytics from '../components/Analytics.js'


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Castle from "../components/Castle";

import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import Subarticle from "../components/Subarticle.js";
import Article from "../components/Article.js";
import Radiobutton from "../components/RadioButton.js";

export default function RiddlerWarfair() {
  const [P2, setP2] = useState("Human");
  const [isRandomized, setIsRandomized] = useState(false);

  const [scoreA, setScoreA] = useState(0)
  const [scoreB, setScoreB] = useState(0)

  const [results, setResults] = useState("N/A")

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
    setIsRandomized(false);
    setResults(showResults(_scoreA, _scoreB, _exception));
  }

  function showResults(_scoreA, _scoreB, _exception) {
    if (_exception) {
      toast.error(_exception);

      return (
        <p className="text-red">
          {_exception}
        </p>
      )
    }

    if (P2 === "Human" || P2 === "Random") {
      if (_scoreA === _scoreB) {
        return (
          <>
            <p>
              Player A: {_scoreA}
            </p>
            <p>
              Player B: {_scoreB}
            </p>
            <h3>
              Players tie!
            </h3>
          </>
        )
      }

      else if (_scoreA > _scoreB) {
        return (
          <>
            <p>
              Player A: {_scoreA}
            </p>
            <p>
              Player B: {_scoreB}
            </p>
            <h3>
              Player A Wins!
            </h3>
          </>

        )
      }

      else if (_scoreB > _scoreA) {
        return (
          <>
            <p>
              Player A: {_scoreA}
            </p>
            <p>
              Player B: {_scoreB}
            </p>
            <h2>
              Player B Wins!
            </h2>
          </>
        )
      }



    }
  }


  function battleLogic(castlesA, castlesB) {
    let _scoreA = 0;
    let _scoreB = 0;
    let _exception = null;

    if (castlesA.reduce((a, b) => a + b, 0) !== 100) {
      return [0, 0, "Player A doesn't sum to 100"]
    }

    const playerBSum = castlesB.reduce((a, b) => a + b, 0);
    if (playerBSum !== 100) {
      return [0, 0, "Player B doesn't sum to 100"]
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

    function roundTenth(val) {
      return Math.round(val * 10) / 10;
    }

    function generateHumanP2() {
      return (
        <div className="w-full grid grid-cols-10 gap-0 h-48 ">
          <Castle
            castleVal={1}
            setTroopsVal={setCastle1B}
            troopsVal={castle1B}
            editable={true}
          />

          <Castle
            castleVal={2}
            setTroopsVal={setCastle2B}
            troopsVal={roundTenth(castle2B)}
            editable={true}
          />
          <Castle
            castleVal={3}
            setTroopsVal={setCastle3B}
            troopsVal={roundTenth(castle3B)}
            editable={true}
          />
          <Castle
            castleVal={4}
            setTroopsVal={setCastle4B}
            troopsVal={castle4B}
            editable={true}
          />
          <Castle
            castleVal={5}
            setTroopsVal={setCastle5B}
            troopsVal={castle5B}
            editable={true}
          />
          <Castle
            castleVal={6}
            setTroopsVal={setCastle6B}
            troopsVal={castle6B}
            editable={true}
          />
          <Castle
            castleVal={7}
            setTroopsVal={setCastle7B}
            troopsVal={castle7B}
            editable={true}
          />
          <Castle
            castleVal={8}
            setTroopsVal={setCastle8B}
            troopsVal={castle8B}
            editable={true}
          />
          <Castle
            castleVal={9}
            setTroopsVal={setCastle9B}
            troopsVal={castle9B}
            editable={true}
          />
          <Castle
            castleVal={10}
            setTroopsVal={setCastle10B}
            troopsVal={roundTenth(castle10B)}
            editable={true}
          />
        </div>
      )
    }

    function generateRandomP2(setRandom) {
      if (setRandom) {
        const randomDistro = [];

        for (let i = 0; i < 10; i++) {
          randomDistro.push(Math.random())
        }

        const sumDistro = randomDistro.reduce((a, b) => a + b, 0);

        for (let i = 0; i < 10; i++) {
          randomDistro[i] = Math.round((randomDistro[i] / sumDistro) * 1000) / 10;
        }

        // Hehe fix the last one and give it the crumbs
        const leftovers = randomDistro.reduce((a, b) => a + b, 0) - 100;
        randomDistro[9] -= leftovers;

        setCastle1B(randomDistro[0])
        setCastle2B(randomDistro[1])
        setCastle3B(randomDistro[2])
        setCastle4B(randomDistro[3])
        setCastle5B(randomDistro[4])
        setCastle6B(randomDistro[5])
        setCastle7B(randomDistro[6])
        setCastle8B(randomDistro[7])
        setCastle9B(randomDistro[8])
        setCastle10B(randomDistro[9])
        setIsRandomized(true);
      }



      return (
        <div className="w-full grid grid-cols-10 gap-0 h-48 ">
          <Castle
            castleVal={1}
            troopsVal={roundTenth(castle1B)}
            editable={false}
          />

          <Castle
            castleVal={2}
            troopsVal={roundTenth(castle2B)}
            editable={false}
          />
          <Castle
            castleVal={3}
            troopsVal={roundTenth(castle3B)}
            editable={false}
          />
          <Castle
            castleVal={4}
            troopsVal={roundTenth(castle4B)}
            editable={false}
          />
          <Castle
            castleVal={5}
            troopsVal={roundTenth(castle5B)}
            editable={false}
          />
          <Castle
            castleVal={6}
            troopsVal={roundTenth(castle6B)}
            editable={false}
          />
          <Castle
            castleVal={7}
            troopsVal={roundTenth(castle7B)}
            editable={false}
          />
          <Castle
            castleVal={8}
            troopsVal={roundTenth(castle8B)}
            editable={false}
          />
          <Castle
            castleVal={9}
            troopsVal={roundTenth(castle9B)}
            editable={false}
          />
          <Castle
            castleVal={10}
            troopsVal={roundTenth(castle10B)}
            editable={false}
          />
        </div>
      )
    }

    if (P2 === "Human") {
      P2Castles = generateHumanP2();
    }

    else if (P2 === "Random" && !isRandomized) {
      P2Castles = generateRandomP2(true);
    }
    else if (P2 === "Random") {
      P2Castles = generateRandomP2(false);
    }

    return (
      <>
        <div className="w-full grid grid-cols-10 gap-0 h-16 ">
          <Castle
            castleVal={1}
            setTroopsVal={setCastle1A}
            troopsVal={castle1A}
            editable={true}
          />

          <Castle
            castleVal={2}
            setTroopsVal={setCastle2A}
            troopsVal={castle2A}
            editable={true}
          />
          <Castle
            castleVal={3}
            setTroopsVal={setCastle3A}
            troopsVal={castle3A}
            editable={true}
          />
          <Castle
            castleVal={4}
            setTroopsVal={setCastle4A}
            troopsVal={castle4A}
            editable={true}
          />
          <Castle
            castleVal={5}
            setTroopsVal={setCastle5A}
            troopsVal={castle5A}
            editable={true}
          />
          <Castle
            castleVal={6}
            setTroopsVal={setCastle6A}
            troopsVal={castle6A}
            editable={true}
          />
          <Castle
            castleVal={7}
            setTroopsVal={setCastle7A}
            troopsVal={castle7A}
            editable={true}
          />
          <Castle
            castleVal={8}
            setTroopsVal={setCastle8A}
            troopsVal={castle8A}
            editable={true}
          />
          <Castle
            castleVal={9}
            setTroopsVal={setCastle9A}
            troopsVal={castle9A}
            editable={true}
          />
          <Castle
            castleVal={10}
            setTroopsVal={setCastle10A}
            troopsVal={castle10A}
            editable={true}
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
      <ToastContainer />
      <main>

        <Article
          title="Riddler Warfare"
          subtitle="Battle for Riddler Nation"
        >
          <Radiobutton
            title={"Opponent"}
            options={["Human", "Random", ]} //"1000 Random", "Strong Opponent", "1000 Strong Opponents"
            onChange={setP2}
          />

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
