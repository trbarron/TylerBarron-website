
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
import Input from "../components/TextInput.js";
import BarChart from "../components/charts/barChart.js"
import Axios from "axios";

// Images
import imgCastleBlank from '../assets/img/RiddlerWarfare/castleBlank.svg';


export default function RiddlerWarfare() {
  const [P2, setP2] = useState("Local Human");
  const [totalRounds, setTotalRounds] = useState(10000);
  const [isRandomized, setIsRandomized] = useState(false);

  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);

  const [results, setResults] = useState("N/A")

  const [username, setUsername] = useState(getRandomUsername())

  const [castlesStrA, setCastlesStrA] = useState("10,10,10,10,10,10,10,10,10,10")
  const [castlesStrB, setCastlesStrB] = useState("10,10,10,10,10,10,10,10,10,10")

  const castlesIntA = castlesStrA.split(",").map((e) => parseFloat(e));
  const castlesIntB = castlesStrB.split(",").map((e) => parseFloat(e));

  const [data, setData] = useState([
    {
      Title: "Player 1",
      Value: 0.5
    },
    {
      Title: "Player 2",
      Value: 0.5
    }
  ]);

  function getRandomUsername() {
    const listOfNames = [
      "bandalls",
      "wattlexp",
      "sweetiele",
      "hyperyaufarer",
      "editussion",
      "experthead",
      "flamesbria",
      "heroanhart",
      "liveltekah",
      "linguss",
      "interestec",
      "fuzzyspuffy",
      "monsterup",
      "milka1baby",
      "lovesboost",
      "edgymnerch",
      "ortspoon",
      "oranolio",
      "onemama",
      "dravenfact",
      "reallychel",
      "reakefit",
      "popularkiya",
      "breacche",
      "blikimore",
      "stonewellforever",
      "simmson",
      "brighthulk",
      "bootecia",
      "spuffyffet",
      "rozalthiric",
      "bookman",
    ]

    return listOfNames[Math.floor(Math.random()*listOfNames.length)];
  }

  function setCastle(team, index, value) {
    if (team === "A") {
      castlesIntA[index] = value;
      setCastlesStrA(castlesIntA.join(","))
    }
    else if (team === "B") {
      castlesIntB[index] = value;
      setCastlesStrB(castlesIntB.join(","))
    }
  }

  function handleBattleButton() {
    const [_scoreA, _scoreB, _exception] = battleLogic(castlesIntA, castlesIntB);
    setScoreA(_scoreA);
    setScoreB(_scoreB);
    setIsRandomized(false);
    setResults(showResults(_scoreA, _scoreB, _exception));
  }

  function handleManyBattleButton(totalRounds) {
    let _scoreA = 0;
    let _scoreB = 0;
    let _exception = null;
    const totalRoundsNum = parseInt(totalRounds);
    for (let round = 0; round < totalRoundsNum; round++) {
      const _roundCastleB = getRandomDistro();
      const [_roundScoreA, _roundScoreB, _roundException] = battleLogic(castlesIntA, _roundCastleB);

      // Player A Won:
      if (_roundScoreA > _roundScoreB) { _scoreA += 1 }

      // Player B Won:
      else if (_roundScoreA < _roundScoreB) { _scoreB += 1 }

      // Player A Won:
      else if (_roundScoreA === _roundScoreB) { _scoreA += 0.5; _scoreB += 0.5 }

      if (_roundException) { _exception = _roundException }
    }
    setScoreA(_scoreA);
    setScoreB(_scoreB);
    setIsRandomized(false);
    setResults(showResults(_scoreA, _scoreB, _exception));
    if (!_exception) {
      setData(
        [
          {
            Title: "You",
            Value: _scoreA
          },
          {
            Title: "Random Opponent",
            Value: _scoreB
          }
        ]
      )
    }
  }

  function handleSubmitArmyButton() {
    Axios({
      method: "POST",
      data: {
        name: username,
        selections: castlesStrA,
      },
      withCredentials: true,
      url: "http://localhost:3000/api/army/post/submitArmy",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Access-Control-Allow-Credentials": true
      }
    }).then((res) => {
      console.log(res);
      // console.log(JSON.parse(res.data));
      const internetResult = res.data;
      setResults(showResults(internetResult.armyWins, internetResult.armyGamesPlayed, null, "The Internet"));

      //set data for graph
      setData(
        [
          {
            Title: "You",
            Value: internetResult.armyWins
          },
          {
            Title: "The Internet",
            Value: internetResult.armyGamesPlayed - internetResult.armyWins
          }
        ]
      )
    });
  };

  function getRandomDistro() {
    const randomDistro = [];

    for (let i = 0; i < 10; i++) {
      randomDistro.push(Math.random());
    }

    const sumDistro = randomDistro.reduce((a, b) => a + b, 0);

    for (let i = 0; i < 10; i++) {
      randomDistro[i] = Math.round((randomDistro[i] / sumDistro) * 1000) / 10;
    }

    // Hehe fix the last one and give it the crumbs
    const leftovers = randomDistro.reduce((a, b) => a + b, 0) - 100;
    randomDistro[9] -= leftovers;

    return randomDistro;
  }


  function showResults(_scoreA, _scoreB, _exception, player2 = P2) {
    if (_exception) {
      toast.error(_exception);

      return (
        <p className="text-red">
          {_exception}
        </p>
      )
    }

    if (player2 === "Local Human" || player2 === "Random") {
      if (_scoreA === _scoreB) {
        return (
          <>
            <p>
              Player A: {_scoreA}
            </p>
            <p>
              Player B: {_scoreB}
            </p>
            <p>
              Players tie!
            </p>
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
            <p>
              Player A Wins!
            </p>
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
            <p>
              Player B Wins!
            </p>
          </>
        )
      }



    }

    else if (player2 === "The Internet") {
      return (
        <>
          <p>
            Player won {_scoreA} out of {_scoreB} games played.
          </p>
          <p>
            This puts you in "tbd" place
          </p>
        </>
      )
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

    function generateHumanP2() {

      let castles = [];
      for (let castleIndex = 0; castleIndex < 10; castleIndex++) {
        castles.push(
          <Castle
            castleIndex={castleIndex}
            castleTeam={"B"}
            setTroopsVal={setCastle}
            troopsVal={castlesIntB[castleIndex]}
            editable={true}
          />
        )
      }

      return (
        <div className="w-full grid grid-cols-10 gap-0 h-32 py-4 ">
          {castles}
        </div>
      )
    }


    function generateInternetP2() {

      let castles = [];
      for (let castleIndex = 0; castleIndex < 10; castleIndex++) {
        castles.push(
          <Castle
            castleIndex={castleIndex}
            castleTeam={"B"}
            setTroopsVal={console.log}
            troopsVal={"?"}
            editable={false}
          />
        )
      }

      return (
        <div className="w-full grid grid-cols-10 gap-0 h-32 py-4 ">
          {castles}
        </div>
      )
    }

    function generateRandomP2(setRandom) {
      if (setRandom) {
        const randomDistro = getRandomDistro();

        setCastlesStrB(randomDistro.join(","))
        setIsRandomized(true);
      }


      let castles = [];
      for (var castleIndex = 0; castleIndex < 10; castleIndex++) {
        castles.push(
          <Castle
            castleIndex={castleIndex}
            castleTeam={"B"}
            setTroopsVal={setCastle}
            troopsVal={castlesIntB[castleIndex]}
            editable={false}
          />
        )
      }

      return (
        <div className="w-full grid grid-cols-10 gap-0 h-32 py-4 ">
          {castles}
        </div>
      )
    }

    if (P2 === "Local Human") {
      P2Castles = generateHumanP2();
    }

    else if (P2 === "Random" && !isRandomized) {
      P2Castles = generateRandomP2(true);
    }
    else if (P2 === "Random") {
      P2Castles = generateRandomP2(false);
    }
    else if (P2 === "The Internet") {
      P2Castles = generateInternetP2();
    }



    let castles = [];
    for (var castleIndex = 0; castleIndex < 10; castleIndex++) {
      castles.push(
        <Castle
          castleIndex={castleIndex}
          castleTeam={"A"}
          setTroopsVal={setCastle}
          troopsVal={castlesIntA[castleIndex]}
          editable={true}
        />
      )
    }

    const castleImages = [];
    const castleImagePaddings = [
      "p-5",   //1
      "p-4 ",   //2
      "p-3.5", //3
      "p-3",   //4
      "p-2.5", //5
      "p-2",   //6
      "p-1.5", //7
      "p-1",   //8
      "p-0.5", //9
      "p-0",   //10
    ]
    for (var castleImgIndex = 0; castleImgIndex < 10; castleImgIndex++) {
      castleImages.push(
        <div>
          <img
            className={castleImagePaddings[castleImgIndex]}
            src={imgCastleBlank}
            alt={"castle" + castleImgIndex}
          />
          <p className="text-center place-self-center w-full my-0">{castleImgIndex + 1}</p>
        </div>
      )
    }

    return (
      <>
        <div className="w-full grid grid-cols-10 gap-0 h-32 py-4">
          {castles}
        </div>

        <div className="w-full grid grid-cols-10 gap-0 h-full py-4 ">
          {castleImages}
        </div>


        {P2Castles}

        <div className="w-full grid grid-cols-1 pt-4">
          <BarChart width={600} height={75} data={data} />
        </div>

        <div className="h-16">
          <div className={"w-full mx-auto h-16 " + ((P2 === "The Internet") ? "" : "hidden")}>
            <Input
              id={"Name"}
              label={"Name"}
              value={username}
              handleChange={(e) => setUsername(e)}
            />
          </div>
        </div>

        <button
          type="button"
          className={"my-5 h-16 cursor-pointer bg-gray text-white" + ((P2 === "Local Human") ? "" : " hidden")}
          onClick={() => handleBattleButton()}
        >
          Fight Once
        </button>

        <button
          type="button"
          className={"my-5 h-16 cursor-pointer bg-gray text-white" + ((P2 === "Random") ? "" : " hidden")}
          onClick={() => handleManyBattleButton(totalRounds)}
        >
          Fight a lot
        </button>

        <button
          type="button"
          className={"my-5 h-16 cursor-pointer bg-gray text-white" + ((P2 === "The Internet") ? "" : " hidden")}
          onClick={() => handleSubmitArmyButton()}
        >
          Submit Army
        </button>
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
            options={["Local Human", "Random", "The Internet"]} //"1000 Random", "Strong Opponent", "1000 Strong Opponents"
            onChange={setP2}
          />

          <div className="h-24">
            <div className={"w-2/4 mx-auto h-16 pb-4 " + ((P2 === "Random") ? "" : "hidden")}>
              <Input
                id={"Total Rounds"}
                label={"Total Rounds"}
                value={totalRounds}
                handleChange={(e) => setTotalRounds(e)}
              />
            </div>
          </div>

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
