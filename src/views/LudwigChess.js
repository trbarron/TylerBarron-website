import React, { useEffect, useState } from "react";
import analytics from '../components/Analytics.js'

import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import Subarticle from "../components/Subarticle.js";
import Article from "../components/Article.js";
import Chessground from 'react-chessground'
import Chess from "chess.js"
import Modal from 'react-modal';


import { db } from '../assets/tools/firebaseConn';
import { ref, update, onValue } from "firebase/database";

import StockFish from "../components/Stockfish.js";

import 'react-chessground/dist/styles/chessground.css'
import EvalBar from "../components/charts/evalBar.js";
import { useParams } from "react-router";

export default function ChessOpenings() {

  const [chess, setChess] = useState(new Chess());
  const [fen, setFen] = useState("");
  const [lastMove, setLastMove] = useState();
  const [gameOver, setGameOver] = useState("");
  const [evalScore, setEvalScore] = useState(0);
  const [evalText, setEvalText] = useState("");
  const [whiteSeat, setWhiteSeat] = useState("");
  const [blackSeat, setBlackSeat] = useState("");

  const { gameID, name } = useParams()

  const orientation = ((blackSeat === name) ? "black" : "white")

  useEffect(() => {

    const stockfish = new StockFish(chess, setEvalScore, setEvalText);

    async function getFromDB() {
      const db2 = db;
      const starCountRef = ref(db2, "games/" + gameID);

      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        const FEN = data.FEN;
        const whiteSeat = data.whiteSeat;
        const blackSeat = data.blackSeat;

        chess.load(FEN);
        setFen(FEN);
        stockfish.getEval(FEN);

        if (chess.game_over()) {
          if (chess.in_checkmate()) { setGameOver("Checkmate"); }
          if (chess.in_draw()) { setGameOver("Draw"); }
          if (chess.in_stalemate()) { setGameOver("Stalemate"); }
          if (chess.in_threefold_repetition()) { setGameOver("Threefold Repetition"); }
          if (chess.in_threefold_repetition()) { setGameOver("Insufficient Material"); }
        }

        if (data.lastMoveFrom) {
          setLastMove([data.lastMoveFrom, data.lastMoveTo]);
        }

        setWhiteSeat(whiteSeat);
        setBlackSeat(blackSeat);
      });


      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();

        if (!data.whiteSeat) {
          //Take the white seat

          const updatedData = {};
          updatedData[gameID] = data;
          updatedData[gameID].whiteSeat = name;
          update(ref(db, 'games'), updatedData);
        }
        else if (!data.blackSeat) {
          //Take the black seat

          const updatedData = {};
          updatedData[gameID] = data;
          updatedData[gameID].blackSeat = name;
          update(ref(db, 'games'), updatedData);
        }
      }, {
        onlyOnce: true
      });
    }
    getFromDB();

  }, [gameID, name, chess])

  useEffect(() => {
    window.addEventListener("unload", (event) => {

      const db2 = db;
      const starCountRef = ref(db2, "games/" + gameID);


      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();


        const updatedData = {};
        updatedData[gameID] = data;
        if (data.whiteSeat === name) {
          updatedData[gameID].whiteSeat = "";
        }
        else if (data.blackSeat === name) {
          updatedData[gameID].blackSeat = "";
        }

        update(ref(db, 'games'), updatedData);

        console.log("unloading: ", updatedData);

      }, {
        onlyOnce: true
      });



    });

    return () => {
      window.removeEventListener("unload", () => null);
    }

  }, [gameID, name])


  async function updateDB(FEN, from, to, _gameOver) {
    const newGame = {};
    newGame[gameID] = {
      FEN: FEN,
      lastMoveFrom: from,
      lastMoveTo: to,
      whiteSeat: whiteSeat,
      blackSeat: blackSeat,
    };

    if (_gameOver) newGame[gameID].gameOver = true

    update(ref(db, 'games'), newGame);
  }

  async function onMove(from, to) {
    if (whiteSeat && blackSeat) {
      chess.move({ from, to, promotion: "q" });
      let _gameOver = chess.game_over();
      const FEN = chess.fen();
      await updateDB(FEN, from, to, _gameOver);
    } else {
      chess.move();
    }

  }

  const turnColor = () => {
    return chess.turn() === "w" ? "white" : "black"
  }

  function calcMovable(orientation) {
    const dests = new Map()
    chess.SQUARES.forEach(s => {
      const ms = chess.moves({ square: s, verbose: true })
      if (ms.length) dests.set(s, ms.map(m => m.to))
    })

    let showDests = false;

    if ((orientation === "white" && chess.turn() === "w") || (orientation === "black" && chess.turn() === "b")) {
      showDests = true;
    }



    return {
      free: false,
      dests,
      showDests,
      color: orientation
    }
  }

  function handleRequestCloseFunc() {
    setGameOver("");
  }

  return (
    <div className="bg-background bg-fixed min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">


        <Article
          title="Ludwig Chess"
          subtitle=""
        >

          <Subarticle>
            <Modal
              isOpen={gameOver}
              onRequestClose={handleRequestCloseFunc}
              preventScroll={true}
              shouldFocusAfterRender={false}
              className={"inset-x-0 inset-y-0 flex fixed h-1 w-min m-auto justify-center px-4 z-50"}
            >
              <div className="text-center text-xl">
                {gameOver}
              </div>

            </Modal>

            <div className="z-0 mx-auto grid gap-x-4 w-full grid-rows-1 grid-cols-1 md:grid-cols-2 md:ml-iauto" style={{ gridTemplateColumns: "90% 10%", marginLeft: "-0.5rem", marginRight: "0.5rem" }}>
              <div className="w-100% col-span-1 z-0">
                <div className="text-center pb-4">
                  <div className={"w-min mx-auto p-0.5 " + (orientation === "black" ? "bg-white text-black" : "bg-black text-white")}>
                    {(orientation === "black" ? whiteSeat : blackSeat)}
                  </div>
                </div>

                <Chessground
                  fen={fen}
                  lastMove={lastMove}
                  onMove={onMove}
                  orientation={orientation}
                  movable={calcMovable(orientation)}
                  turnColor={turnColor()}
                  animation={{ enabled: false }}
                  width={"100%"}
                  height={"0"}
                  style={{ paddingTop: "100%" }}
                />

                <div className="text-center pt-4">
                  <div className={"w-min mx-auto p-0.5 " + (orientation === "black" ? "bg-black text-white" : "bg-white text-black")}>
                    {(orientation === "black" ? blackSeat : whiteSeat)}
                  </div>
                </div>

              </div>
              <div className={"w-full h-full boarder " + (orientation === "black" ? "bg-black" : "bg-white")}>
                <EvalBar data={{ evalScore, orientation, evalText }} />
              </div>

            </div>

            <div className="pb-8"></div>
          </Subarticle>

          {/* Show a dialog for inviting other players */}
          <Subarticle>
            <div className="text-center">
              <p>
                {"To invite someone, send this link:"}
              </p>
              <pre className="text-xs lg:text-md">{"http://tylerbarron.com/ludwigchess/" + gameID}</pre>
            </div>
            <div></div>
          </Subarticle>
        </Article>
      </main>
      <Footer />
    </div>
  );
}
