import React, { useState } from "react";

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
  const [occuranceStyle, setOccuranceStyle] = useState("border-2 border-black rounded-md");
  const [openingName, setOpeningName] = useState("")
  const [showMore, setShowMore] = useState(false);

  const resetButtonValue = (lockedSaveState) ? 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 mx-auto">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
  </svg> : 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 mx-auto">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
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

    if (from === optFrom && to === optTo) {
    
      setOccuranceStyle("border-2 rounded-md transition duration-100 ease-in-out border-green-400	")
      setTimeout(() => setOccuranceStyle("border-2 border-black rounded-md transition duration-1000 ease-in-out"), 200)
    }
    else {
      hasMessedUp = true;
      setCorrectionArrow([{
        brush: 'red',
        dest: optTo,
        orig: optFrom,
      }]);

      setOccuranceStyle("border-2 rounded-md transition duration-100 ease-in-out border-red-400	")
      setTimeout(() => setOccuranceStyle("border-2 border-black rounded-md transition duration-1000 ease-in-out"), 200)
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

    perc = perc.substring(0,3) + "%";
    return perc

  }

  function onShowMore() {
    setShowMore(!showMore);
  }


  const lockedSaveStateClassName = (lockedSaveState) ? "h-20 bg-blue-200" : "h-20"
  const lockedSaveStateValue = (lockedSaveState) ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 mx-auto">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
</svg>

 :   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 mx-auto">
 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
</svg>


  return (
    <div className="bg-background bg-fixed min-h-screen">
      <Navbar/>
      <main>

          
        <Article
          title="Chess Opening Flashcards" 
          subtitle=""
        >

        <Subarticle
            subtitle="20XX for Chess"
        >
          <div className="mx-auto grid" style={{gridTemplateColumns: "3fr 2fr"}}>
            <div className="w-100%">
              <Chessground
                fen={fen}
                lastMove={lastMove}
                onMove={onMove}
                orientation={boardOrientation}
                animation={{enabled: false}}
                drawable={{autoShapes: correctionArrow}}
                
                />
            </div>
            <div className="justify-center text-center grid gap-y-3 h-full">
              <div className={occuranceStyle + " h-40"}>
                <p className="w-min h-8 mb-0 pb-0 text-sm">Opening:</p>
                <p className="w-min align-center text-xs px-0 mx-auto">{openingName}</p>
              </div>
              <div className={occuranceStyle} style={{height: "min-content"}}>
                <p className="w-min h-8 text-sm">% Occurance:</p>
                <p className="w-min h-8 text-lg">{findCurrPerc(histPerc)}</p>
              </div>
              <button className={occuranceStyle + " " + lockedSaveStateClassName} onClick={lockSaveState}>{lockedSaveStateValue}</button>
              <button className={occuranceStyle + " h-12"} onClick={resetBoard}>{resetButtonValue}</button>
              <button className={occuranceStyle + " h-12"} onClick={flipBoard}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 mx-auto">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </button>
            </div>


          </div>
          <div className="pb-8"></div>
          <div className="text-center w-full" onClick={onShowMore}><a href="#">FAQ, todo list, contact</a></div>


          {/* <button className="w-full h-8 mx-auto border border-black" onClick={copyFEN}>Copy current FEN state</button>
          <input className="w-full h-8 px-auto" onChange={handleInput} placeholder={savedFEN} />
          <div className="w-full h-8"></div>            */}

        </Subarticle>

        </Article>

        <div className={showMore ? "visible" : "hidden"}>
        <Article
          title="FAQ"
        >
          <Subarticle
            subtitle="Questions / Notes"
          >

          <p>
            This is an attempt to get you to play the most common move given an opening that you set up
          </p>
          <p>
            Play a game as both sides then lock in the position. After its locked in the computer will make moves at the same proportion as the lichess opening database
          </p>
          <p>
            Continue to play the opening until you break the book (get to the end of the opening explorer) or mess up. If you mess up press the back arrow to try again
          </p>          
          </Subarticle>

          <Subarticle
            subtitle="todo list"
          >

            <ul className="w-full px-4 mb-4 text-md leading-relaxed pl-8">
              <li>• Adequate screen size behavior</li>
              <li>• Better metric for doing well... streak score?</li>
              <li>• Wrapping things in try/catch so you can't actually break it</li>
              <li>• Styling / colors</li>
              <li>• _maybe_ accepting two answers if they are close</li>
            </ul>   
            <div></div>    
          </Subarticle>

          <Subarticle
            subtitle="Contact"
          >

          <p>
            Contact me through twitter (@BuildABarr) if you have ideas, questions, comments, etc.
          </p>
          <div></div>
          </Subarticle>
        </Article>
        </div>

      </main>
      <Footer />
    </div>
  );
}