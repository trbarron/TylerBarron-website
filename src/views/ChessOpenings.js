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
  // const [hasMessedUp, setHasMessedUp] = useState(false);


  const resetButtonValue = (lockedSaveState) ? "Reload Save State" : "Reset Board"
  let hasMessedUp = false;

  async function onMove(from, to) {

    
    const oldFEN = chess.fen();
    await checkMove(from,to);

    chess.move({from,to, promotion: "x"});
    setLastMove([from,to]);
    setFen(chess.fen());
    //clever way to delete arrows

    const newFEN = chess.fen();

    //tests to see if a move was made
    if (oldFEN !== newFEN) { 
      if (lockedSaveState && !hasMessedUp) {
        setCorrectionArrow(
          [{brush: 'red', dest: "m4", orig: "m3",}]
        );
        

        getNextMove(chess);
      }
    }
  }

  
  function lockSaveState() {
    if (!lockedSaveState) {
      const chessFEN = chess.fen()
      setSavedFEN(chessFEN);
      getNextMove(chess);
    }
    setLockedSaveState(!lockedSaveState);
    
  };

  // function copyFEN() {
  //   setSavedFEN(chess.fen());
  //   setLockedSaveState(true);
  // };

  // function turnColor() {
  //   return chess.turn() === "w" ? "white" : "black"
  // }

  async function checkMove(from,to) {
    const repMoves = await getRepMoves(fen);
    const selMove = selectOptimalMove(repMoves);
    const optFrom = selMove.uci.substring(0,2);
    const optTo = selMove.uci.substring(2,4);
    if (from === optFrom && to === optTo) {
      console.log("Nice! Most popular move played")
    }
    else {
      // setHasMessedUp(true);
      hasMessedUp = true;
      setCorrectionArrow([{
        brush: 'red',
        dest: optTo,
        orig: optFrom,
      }]);
    }


    
    return
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
    }
    setChess(c);
    setFen(c.fen());
    setHistPerc([]);
    hasMessedUp = false;



    if (lockedSaveState) {
      setTimeout(() => getNextMove(c),500);
    }
    
    return
  }

  async function getNextMove(c) {
    const repMoves = await getRepMoves(c.fen());
    const selMove = selectRandomMove(repMoves);

    if (selMove !== null) {
      chess.move(selMove.san);

      histPerc.push(selMove.perc);
      setHistPerc(histPerc);
      setFen(chess.fen());
      setLastMove([selMove.uci.substring(0,2), selMove.uci.substring(2,4)]);
  
      console.log("-----------")
      console.log("%: " + selMove.perc)
      console.log("move: " + selMove.san)
      console.log("-----------")
    }
    
    else {
      console.log("Bro you went so off script we don't know what to do")
    }

  }

  async function getRepMoves(aFEN) {
    const URL = "https://explorer.lichess.ovh/master?fen=" + aFEN.replaceAll(" ","%20");

    let response = await fetch(URL, {
      "method": "GET",
      });
    response = await response.json();
    

    
    const repMoves = handleData(response)
    return repMoves;
    // .then(response => response.json())
    // .then(response => )
    // .catch(err => { console.log("errrrr:" + err);})
  }

  function handleData(response) {
    let repGames = response.black + response.white + response.draws;
    let repMoves = []
    response.moves.map((entry) => {
      let games = entry.black + entry.white + entry.draws;
      repMoves.push({san: entry.san, games, uci: entry.uci, perc: games/repGames})
      return repMoves
    });

    return repMoves

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
    // const maxPerc = Math.max(...repMoves.map(move => move.perc));
    // console.log(repMoves[0]);
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


  const lockedSaveStateClassName = (lockedSaveState) ? "w-full h-8 mx-auto border-blue bg-green" : " w-full h-8 mx-auto border border-black"
  const lockedSaveStateValue = (lockedSaveState) ? "Save State Locked" : "Save State Unlocked"


  return (
    <div className="bg-background bg-fixed">
      <Navbar/>
      <main>

          
        <Article
          title="Anything Chess Related :)" 
          subtitle=""
        >

        <Subarticle
            subtitle="20 {pawn} {pawn}"
        >
          <div className="mx-auto grid" style={{gridTemplateColumns: "3fr 2fr"}}>
            <div className="w-max">
              <Chessground
                fen={fen}
                // turnColor={turnColor()}
                lastMove={lastMove}
                onMove={onMove}
                orientation={boardOrientation}
                animation={{enabled: false}}
                drawable={{autoShapes: correctionArrow}}
                // width="40vw"
                // height="40vw"
                />
            </div>
            <div className="justify-center text-center">
              <p className="w-min h-8 text-sm">% Occurance:</p>
              <p className="w-min h-8 text-lg">{findCurrPerc(histPerc)}</p>
            </div>

          </div>
          <div className="pb-8"></div>

          {/* <button className="w-full h-8 mx-auto border border-black" onClick={copyFEN}>Copy current FEN state</button>
          <input className="w-full h-8 px-auto" onChange={handleInput} placeholder={savedFEN} />
          <div className="w-full h-8"></div>            */}
          <button className={lockedSaveStateClassName} onClick={lockSaveState}>{lockedSaveStateValue}</button>
          <div className="w-full h-4"></div>           
          <button className="w-full h-8 mx-auto border border-black" onClick={resetBoard}>{resetButtonValue}</button>
          <div className="w-full h-4"></div>           
          <button className="w-full h-8 mx-auto border border-black" onClick={flipBoard}>Flip Board</button>
          <div className="pb-8"></div>
          <div className="hidden">{fen}</div>
        </Subarticle>

        </Article>

      </main>
      <Footer />
    </div>
  );
}
