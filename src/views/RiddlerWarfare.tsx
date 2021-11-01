
import { useEffect, useState } from "react";
import analytics from '../components/Analytics.js'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Castle from "../components/Castle";

import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import Article from "../components/Article.js";
import Radiobutton from "../components/RadioButton.js";
import Input from "../components/TextInput.js";
import BarChart from "../components/charts/barChart.js"
import Axios from "axios";

import { battleLogic, submitArmyResponse, playerData } from "../types/RiddlerWarfare";
import { listOfNames } from "../assets/tools/usernameList" // List of names to suggest as usernames


// Image that we use for the castles
import imgCastleBlank from '../assets/img/RiddlerWarfare/castleBlank.svg';

export default function RiddlerWarfare() {
  const [P2, setP2] = useState<string>("The Internet");
  const [isRandomized, setIsRandomized] = useState<Boolean>(false);

  const [results, setResults] = useState<JSX.Element>()
  const [leaderboard, setLeaderboard] = useState<JSX.Element>(<p>Loading...</p>)

  const [username, setUsername] = useState<string>(getRandomUsername())

  const [castlesStrA, setCastlesStrA] = useState<string>("10,10,10,10,10,10,10,10,10,10")
  const [castlesStrB, setCastlesStrB] = useState<string>("10,10,10,10,10,10,10,10,10,10")

  const totalRounds: number = 10000;

  const castlesArrIntA: number[] = castlesStrA.split(",").map((e) => parseFloat(e));
  const castlesArrIntB: number[] = castlesStrB.split(",").map((e) => parseFloat(e));

  const castlesArrStrA: string[] = castlesStrA.split(",").map((e) => e);
  const castlesArrStrB: string[] = castlesStrB.split(",").map((e) => e);

  const [data, setData] = useState<playerData[]>([
    {
      title: "Player 1",
      value: 0.5
    },
    {
      title: "Player 2",
      value: 0.5
    }
  ]);

  const numberLeaderboardToDisp: number = 14;
  const getArmyEndpoint: string = "https://eusrys31w3.execute-api.us-east-1.amazonaws.com/api/army/get/getArmyLeaderboard";
  // If using in local mode change the endoint: "http://localhost:3000/api/army/get/getArmyLeaderboard "
  const submitArmyEndpoint: string = "https://eusrys31w3.execute-api.us-east-1.amazonaws.com/api/army/post/submitArmy"
  // If using in local mode change the endoint: "http://localhost:3000/api/army/post/submitArmy",



  // Functionally the same as getLeaderboard -- populates the leaderboard on initial load
  useEffect(() => {
    Axios({
      method: "GET",
      data: {},
      url: getArmyEndpoint,

      headers: {
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      const leaderboard = formatLeaderboard(res.data, numberLeaderboardToDisp);
      setLeaderboard(leaderboard);
    });
  }, [setLeaderboard])


  function getLeaderboard() {
    Axios({
      method: "GET",
      data: {},
      url: getArmyEndpoint,

      headers: {
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      const leaderboard: JSX.Element = formatLeaderboard(res.data, numberLeaderboardToDisp);
      setLeaderboard(leaderboard);
    });
  }

  function formatLeaderboard(data: any, numberLeaderboardToDisp: number) {
    const leaderboard: JSX.Element[] = [];
    const leaders: any[] = [];
    let uniqueLeader: number = 0;

    data.map((entry: { name: string; armyWins: number; armyGamesPlayed: number; }) => {
      const name: string = entry.name;
      const armyWins: number = entry.armyWins;
      const armyGamesPlayed: number = entry.armyGamesPlayed;

      if (!leaders.includes(name) && leaderboard.length <= numberLeaderboardToDisp) {
        leaders.push(name);
        const rowClassname: string = (uniqueLeader % 2 === 0) ? "bg-gray-100" : "bg-white"
        uniqueLeader += 1;

        leaderboard.push(
          <tr className={"border-b " + rowClassname}>
            <td className="p-1 sm:py-3 sm:px-3 lg:px-5">{uniqueLeader}</td>
            <td className="p-1 sm:py-3 sm:px-3 lg:px-5">{name}</td>
            <td className="p-1 sm:py-3 sm:px-3 lg:px-5">{armyWins}</td>
            <td className="p-1 sm:py-3 sm:px-3 lg:px-5">{armyGamesPlayed - armyWins}</td>
            <td className="p-1 sm:py-3 sm:px-3 lg:px-5">{(Math.round(armyWins * 1000 / armyGamesPlayed) / 1000).toString}</td>
          </tr>
        );
      }
      return "Error..."

    })

    // now format it in jsx
    const leaderboardJSX: JSX.Element = (
      <div className="py-4 flex justify-center w-full">
        <table className="text-sm sm:text-md lg:text-lg bg-white shadow rounded mb-4 text-center w-full p-3">
          <tbody>
            <tr className="border-b text-center">
              <th className="p-1 sm:py-3 sm:px-3 lg:px-5">Rank</th>
              <th className="p-1 sm:py-3 sm:px-3 lg:px-5">Name</th>
              <th className="p-1 sm:py-3 sm:px-3 lg:px-5">Wins</th>
              <th className="p-1 sm:py-3 sm:px-3 lg:px-5">Losses</th>
              <th className="p-1 sm:py-3 sm:px-3 lg:px-5">Win Rate</th>
            </tr>
            {leaderboard}
          </tbody>
        </table>
      </div>
    )

    return leaderboardJSX
  }

  function getRandomUsername() {
    // get a random username (with number suffix) from listOfNames

    const selectedName: string = listOfNames[Math.floor(Math.random() * listOfNames.length)]
    const selectedSuffix: number = Math.floor(Math.random() * 100)

    return selectedName + selectedSuffix;
  }

  function setCastle(team: string, index: number, value: any) {
    if (team === "A") {
      castlesArrIntA[index] = value;
      setCastlesStrA(castlesArrIntA.join(","))
    }
    else if (team === "B") {
      castlesArrIntB[index] = value;
      setCastlesStrB(castlesArrIntB.join(","))
    }
  }

  function handleBattleButton() {
    const { _scoreA, _scoreB, _exception }: battleLogic = battleLogic(castlesArrIntA, castlesArrIntB);
    const _results: JSX.Element = showResults(_scoreA, _scoreB, _exception);
    setResults(_results);
    setIsRandomized(false);
  }

  function handleManyBattleButton(totalRounds: number) {
    let _scoreA: number = 0;
    let _scoreB: number = 0;
    let _exception: string = "";

    for (let round: number = 0; round < totalRounds; round++) {
      const _roundCastleB: number[] = getRandomDistro();
      const { _scoreA: _roundScoreA, _scoreB: _roundScoreB, _exception: _roundException }: battleLogic = battleLogic(castlesArrIntA, _roundCastleB);

      // Something weird happened -- just skip
      if (!_roundScoreA || !_roundScoreB) { _scoreA += 0; _scoreB += 0 }
      
      // Player A Won:
      else if (_roundScoreA > _roundScoreB) { _scoreA += 1 }

      // Player B Won:
      else if (_roundScoreA < _roundScoreB) { _scoreB += 1 }

      // Players tied:
      else if (_roundScoreA === _roundScoreB) { _scoreA += 0.5; _scoreB += 0.5 }

      // There was an exception from the backend (usually caused by funky teams)
      if (_roundException) { _exception = _roundException }
    }
    setIsRandomized(false);
    setResults(showResults(_scoreA, _scoreB, _exception));
    if (!_exception) {
      setData(
        [
          {
            title: "You",
            value: _scoreA
          },
          {
            title: "Random Opponent",
            value: _scoreB
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
      url: submitArmyEndpoint,
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      console.log(res);
      const internetResult: submitArmyResponse = res.data;
      setResults(showResults(internetResult.armyWins, internetResult.armyGamesPlayed, "", "The Internet"));

      //set data for graph
      setData(
        [
          {
            title: "You",
            value: internetResult.armyWins
          },
          {
            title: "The Internet",
            value: internetResult.armyGamesPlayed - internetResult.armyWins
          }
        ]
      )
    });
    getLeaderboard()
  };

  function getRandomDistro() {
    const randomDistro: number[] = [];

    for (let i = 0; i < 10; i++) {
      randomDistro.push(Math.random());
    }

    const sumDistro: number = randomDistro.reduce((a: number, b: number) => a + b, 0);

    for (let i: number = 0; i < 10; i++) {
      randomDistro[i] = Math.floor((randomDistro[i] / sumDistro) * 1000) / 10;
    }

    // Hehe fix the last one and give it the crumbs
    const leftovers: number = randomDistro.reduce((a, b) => a + b, 0) - 100;
    randomDistro[9] -= leftovers;

    return randomDistro;
  }

  function showResults(_scoreA: number, _scoreB: number, _exception: string, player2: string = P2) {

    // Throw user errors here
    if (_exception) {
      toast.error(_exception);

      return (
        <p className="text-red">
          {_exception}
        </p>
      )
    }

    // Format the results text for playing against a random opponent or local human
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
      else {
        return (
          <></>
        )
      }

    }

    // Format the results text for playing against the internet
    else if (player2 === "The Internet") {
      return (
        <>
          <p>
            Player won {_scoreA} out of {_scoreB} games played for a winrate of {Math.round(_scoreA / (_scoreB) * 1000) / 10}%.
          </p>
          <p>
            Your army was added to the database for future armies to face
          </p>
        </>
      )
    }

    else {
      return (<></>)
    }
  }


  function battleLogic(castlesA: number[], castlesB: number[]) {
    let _scoreA: number = 0;
    let _scoreB: number = 0;
    let _exception: string = "";

    if (castlesA.reduce((a, b) => a + b, 0) !== 100) {
      return { _scoreA: 0, _scoreB: 0, _exception: "Player A doesn't sum to 100" }
    }

    const playerBSum = castlesB.reduce((a, b) => a + b, 0);
    if (playerBSum !== 100) {
      return { _scoreA: 0, _scoreB: 0, _exception: "Player B doesn't sum to 100" }
    }

    const minNumberA = Math.min(...castlesA);
    if (minNumberA < 0) {
      return { _scoreA: 0, _scoreB: 0, _exception: "Player A has an invalid (negative) number" }
    }

    const minNumberB = Math.min(...castlesB);
    if (minNumberB < 0) {
      return { _scoreA: 0, _scoreB: 0, _exception: "Player B has an invalid (negative) number" }
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

    return { _scoreA, _scoreB, _exception }

  }

  function createBattleground(P2: any) {
    let P2Castles = <div> </div>

    function generateHumanP2() {

      let castles = [];
      for (let castleIndex = 0; castleIndex < 10; castleIndex++) {
        castles.push(
          <Castle
            castleIndex={castleIndex}
            castleTeam={"B"}
            setTroopsVal={setCastle}
            troopsVal={castlesArrStrB[castleIndex]}
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

    function generateRandomP2(setRandom: boolean) {
      if (setRandom) {
        const randomDistro = getRandomDistro();

        setCastlesStrB(randomDistro.join(","))
        setIsRandomized(true);
      }

      let castles: JSX.Element[] = [];
      for (let castleIndex: number = 0; castleIndex < 10; castleIndex++) {
        castles.push(
          <Castle
            castleIndex={castleIndex}
            castleTeam={"B"}
            setTroopsVal={setCastle}
            troopsVal={castlesArrStrB[castleIndex]}
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

    // Check to see if Player A has a soldier count of 100
    let doesntSum = (<div className="h-4"></div>);
    const sum = Math.round(castlesArrIntA.reduce((a, b) => a + b, 0) * 10) / 10;

    if (sum !== 100) {
      doesntSum = (
        <p className="text-center w-full text-sm p-0 m-0 h-4">
          soldier total: {sum}
        </p>
      );
    }

    let castles: JSX.Element[] = [];
    for (let castleIndex: number = 0; castleIndex < 10; castleIndex++) {
      castles.push(
        <Castle
          castleIndex={castleIndex}
          castleTeam={"A"}
          setTroopsVal={setCastle}
          troopsVal={castlesArrStrA[castleIndex]}
          editable={true}
        />
      )
    }

    const castleImages: JSX.Element[] = [];
    const castleImagePaddings: string[] = [
      "p-2 md:p-5 lg:p-8",   //1
      "p-2 md:p-4 lg:p-7",   //2
      "p-1.5 md:p-3.5 lg:p-6", //3
      "p-1.5 md:p-3 lg:p-5",   //4
      "p-1 md:p-2.5 lg:p-4", //5
      "p-1 md:p-2 lg:p-3",   //6
      "p-0.5 md:p-1.5 lg:p-2", //7
      "p-0.5 md:p-1 lg:p-1.5",   //8
      "p-0 md:p-0.5 lg:p-1", //9
      "p-0 md:p-0 lg:p-0",   //10
    ]
    for (let castleImgIndex: number = 0; castleImgIndex < 10; castleImgIndex++) {
      castleImages.push(
        <div>
          <img
            className={"h-full " + castleImagePaddings[castleImgIndex]}
            src={imgCastleBlank}
            alt={"castle" + castleImgIndex}
          />
          <p className="text-center place-self-center w-full my-0 p-0 align-bottom">{castleImgIndex + 1}</p>
        </div>
      )
    }

    return (
      <>
        {doesntSum}
        <div className="w-full grid grid-cols-10 gap-0 h-28 pt-4">
          {castles}
        </div>

        <div className="w-full grid grid-cols-10 gap-0 h-full pb-8 ">
          {castleImages}
        </div>


        {P2Castles}

        <div className="w-full grid grid-cols-1 py-2">
          <BarChart data={data} />
        </div>

        <div className="h-16 mt-5">
          <div className={"w-full mx-auto h-16 " + ((P2 === "The Internet") ? "" : "hidden")}>
            <Input
              id={"Name"}
              label={"Name"}
              value={username}
              handleChange={(e: string) => setUsername(e)}
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
    <div className="bg-background bg-fixed min-h-screen flex flex-col">
      <Navbar />
      <ToastContainer />
      <main className="flex-grow">

        <Article
          title="Riddler Warfare"
          subtitle="Battle for Riddler Nation"
        >
          <Radiobutton
            title={"Opponent"}
            options={["The Internet", "Random", "Local Human"]} //"1000 Random", "Strong Opponent", "1000 Strong Opponents"
            onChange={setP2}
            checkedVal={P2}
          />

          {createBattleground(P2)}

        </Article>

        <Article
          title="Results"
          subtitle=""
        >
          <div className="pb-4">
            {results}
          </div>

        </Article>

        <Article
          title="Leaderboard"
          subtitle=""
        >
          <div className="pb-4">
            {leaderboard}
          </div>

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
