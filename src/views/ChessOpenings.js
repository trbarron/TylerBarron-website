import React, { useState } from "react";
import analytics from '../components/Analytics.js'

import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import Subarticle from "../components/Subarticle.js";
import Article from "../components/Article.js";
import Chessground from 'react-chessground'
import Chess from "chess.js"

import 'react-chessground/dist/styles/chessground.css'


export default function ChessOpenings() {

  const [chess, setChess] = useState(new Chess())
  const [fen, setFen] = useState("")
  const [lastMove, setLastMove] = useState()
  const [lockedSaveState, setLockedSaveState] = useState(false)
  const [savedFEN, setSavedFEN] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 0")
  const [histPerc, setHistPerc] = useState([])
  const [boardOrientation, setBoardOrientation] = useState("white")
  const [correctionArrow, setCorrectionArrow] = useState([])
  const [occuranceStyle, setOccuranceStyle] = useState("");
  const [openingName, setOpeningName] = useState("")
  const [showMore, setShowMore] = useState(false);

  const resetButtonValue = (lockedSaveState) ? 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 mx-auto">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
  </svg> : 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 mx-auto">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
  </svg>

  async function onMove(from, to) {
    
    const oldFEN = chess.fen();

    chess.move({from,to, promotion: "x"});
    setLastMove([from,to]);
    setFen(chess.fen());

    const newFEN = chess.fen();

    //tests to see if a move was made
    if (oldFEN !== newFEN) { 
      

      if (lockedSaveState) {
        const hasMessedUp = await checkMove(from,to);
        if (!hasMessedUp) {
          //clever way to delete arrows
          setCorrectionArrow(
            [{brush: 'red', dest: "m4", orig: "m3",}]
          );
          setTimeout(() => getNextMove(chess,histPerc),500);
        }
      }
    }
  }

  
  function lockSaveState() {
    if (!lockedSaveState) {
      const chessFEN = chess.fen()
      setSavedFEN(chessFEN);
      getNextMove(chess,histPerc);
    }
    setLockedSaveState(!lockedSaveState);
    
  };

  async function checkMove(from,to) {
    const {repMoves,openingName} = await getRepMoves(fen);
    const selMove = selectOptimalMove(repMoves);
    const optFrom = selMove.uci.substring(0,2);
    const optTo = selMove.uci.substring(2,4);
    setOpeningName(openingName);
    
    let hasMessedUp = false

    if ((from === optFrom && to === optTo) || (from === optFrom && to === "g1" && optTo === "h1")) {
    
      setOccuranceStyle(" transition duration-400 ease-in-out bg-green-100")
      setTimeout(() => setOccuranceStyle("  transition duration-1000 ease-in-out bg-auto"), 400)
    }
    else {
      hasMessedUp = true;
      setCorrectionArrow([{
        brush: 'red',
        dest: optTo,
        orig: optFrom,
      }]);

      setOccuranceStyle(" transition duration-400 ease-in-out bg-red-100")
      setTimeout(() => setOccuranceStyle("  transition duration-1000 ease-in-out bg-auto"), 400)
    }
    
    return hasMessedUp
  }

  function flipBoard() {
    const or = (boardOrientation === "white") ? "black" : "white"
    setBoardOrientation(or);
    return
  }

  function resetBoard() {
    setCorrectionArrow(
      [{brush: 'red', dest: "m4", orig: "m3",}]
    );

    const c = new Chess();
    if (lockedSaveState) {
      c.load(savedFEN)
      setTimeout(() => getNextMove(c,[]),500);
    }


    else {
      setChess(c);
      setFen(c.fen());
      setHistPerc([]);
    }

    return
  }

  async function getNextMove(c,aHistPerc) {
    const {repMoves,openingName} = await getRepMoves(c.fen());
    const selMove = selectRandomMove(repMoves);
    

    if (selMove !== null) {
      c.move(selMove.san);

      aHistPerc.push(selMove.perc);
      setChess(c);
      setFen(c.fen());
      setHistPerc(aHistPerc);
      setLastMove([selMove.uci.substring(0,2), selMove.uci.substring(2,4)]);
      setOpeningName(openingName);
    }
    
    else {
      setOpeningName("Bro you went so off script we don't know what to do");
    }

  }

  async function getRepMoves(aFEN) {
    const URL = "https://explorer.lichess.ovh/master?fen=" + aFEN.replaceAll(" ","%20");

    let response = await fetch(URL, {
      "method": "GET",
      });
    response = await response.json();
    

    
    const {repMoves,openingName} = handleData(response)
    return {repMoves,openingName};
  }

  function handleData(response) {
    let repGames = response.black + response.white + response.draws;
    let repMoves = []
    response.moves.map((entry) => {
      let games = entry.black + entry.white + entry.draws;
      repMoves.push({san: entry.san, games, uci: entry.uci, perc: games/repGames})
      return repMoves
    });
    
    let openingName = "";
    try {
      openingName = response.opening.name;
    } catch (error) {
      console.log(error);
    }

    return {repMoves,openingName}

  }

  function selectRandomMove(repMoves) {
    let selected = false;
    let multiplier = 1;
    let selectedMove = null;

    repMoves.forEach((entry) => {
      if (!selected) {
        if (Math.random()*multiplier < entry.perc) {
          selected = true;
          selectedMove = entry;
        }
        else {
          multiplier-=entry.perc;
        }
      }
    });
    return selectedMove
  }

  function selectOptimalMove(repMoves) {
    return repMoves[0]
  }

  function findCurrPerc(histPerc) {
    let perc = "N/A"


    if (histPerc.length === 0) {
      return perc
    }

    else if (histPerc.length === 1) {
      perc = (histPerc[0]*100).toString();
    }
    else {
      let numPerc = 1
      histPerc.forEach(element => {
        numPerc *= element
      });
      perc = (numPerc * 100).toString()
    }

    perc = perc.substring(0,4) + "%";
    return perc

  }

  function onShowMore() {
    setShowMore(!showMore);
  }


  const lockedSaveStateClassName = (lockedSaveState) ? " bg-red-300" : ""
  const lockedSaveStateValue = (lockedSaveState) ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 mx-auto">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>

 :   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 mx-auto">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
  </svg>


  return (
    <div className="bg-background bg-fixed min-h-screen">
      <Navbar/>
      <main className="flex-grow">

          
        <Article
          title="Chess Opening Practice" 
          subtitle=""
          styleModifier={occuranceStyle}
        >

        <Subarticle>
          <div className="mx-auto grid gap-x-4 grid-rows-2 md:grid-rows-1 grid-cols-1 md:grid-cols-2 md:ml-iauto" style={{gridTemplateColumns: "80% 20%", marginLeft: "-0.5rem", marginRight: "0.5rem"}}>
            <div className="w-100% col-span-2 md:col-span-1">
              <Chessground
                fen={fen}
                lastMove={lastMove}
                onMove={onMove}
                orientation={boardOrientation}
                animation={{enabled: false}}
                drawable={{autoShapes: correctionArrow}}

                width={"100%"}
                height={"0"}
                style={{paddingTop: "100%"}}
                />
            </div>



            <div className="justify-center text-center grid gap-y-3 h-full grid-cols-2 md:grid-cols-1 w-full grid-cols-3 col-span-2 md:col-span-1 gap-x-4 py-2 md:py-0">
              
              <div className="bg-white shadow rounded-lg overflow-hidden w-full col-span-3 md:col-span-1">
                <div className="w-full  text-gray border-b-2 border-red-500 py-1 md:py-2 inline-flex items-center justify-center font-bold text-md md:text-lg">
                  Opening:
                </div>
                <div className="flex items-center justify-between px-4 py-2 bg-gray text-gray-light text-md h-12 md:h-32 overflow-y-auto ">
                  {openingName}
                </div>
              </div>

              <div className="bg-white shadow rounded-lg overflow-hidden w-full col-span-3 md:col-span-1">
                <div className="w-full text-gray border-b-2 border-red-500 py-0 md:py-2 inline-flex items-center justify-center font-bold text-sm md:text-md">
                  % Occurance:
                </div>
                <div className="flex items-center justify-center px-4 py-0 md:py-2 bg-gray text-gray-light text-md md:text-lg h-8 md:h-12 overflow-y-hidden ">
                  {findCurrPerc(histPerc)}
                </div>
              </div>

              <button className={"w-full bg-white text-gray-800 rounded border-b-2 border-red-500 hover:border-red-600 hover:bg-red-500 hover:text-white shadow-md py-2 px-4 md:px-6 inline-flex items-center" + lockedSaveStateClassName} onClick={lockSaveState}>
                <span className="mx-auto">
                  Analyze: {lockedSaveStateValue}
                </span>
              </button>
              
              <button className="w-full bg-white text-gray-800 rounded border-b-2 border-red-500 hover:border-red-600 hover:bg-red-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center" onClick={resetBoard}>
                <span className="mx-auto">
                  {resetButtonValue}
                </span>
              </button>

              <button className="w-full bg-white text-gray-800 rounded border-b-2 border-red-500 hover:border-red-600 hover:bg-red-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center " onClick={flipBoard}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 mx-auto">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>
                  </svg>
              </button>

            </div>

          </div>
          <div className="pb-8"></div>
          <div className="text-center w-full" onClick={onShowMore}><a href="#">FAQ, todo list, contact</a></div>

        </Subarticle>

        </Article>

        <div className={showMore ? "visible" : "hidden"}>
        <Article
          title="FAQ"
        >
          <Subarticle
            subtitle=""
          >

          <p>
            This is an attempt to get you to play the most common move given an opening that you set up
          </p>
          <p>
            Play a game as both sides then lock in the position. After its locked in the computer will make moves at the same proportion as the lichess opening database. The chance that you get to that position in a game is shown in the [% Occurance] display
          </p>
          <p>
            Continue to play the opening until you break the book (get to the end of the opening explorer) or mess up. If you mess up press the back arrow to try again
          </p>          
          </Subarticle>
        </Article>
        </div>

      </main>
      <Footer />
    </div>
  );
}
