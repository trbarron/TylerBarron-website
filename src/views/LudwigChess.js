import React, { useEffect, useState } from "react";
import analytics from '../components/Analytics.js'

import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import Subarticle from "../components/Subarticle.js";
import Article from "../components/Article.js";
import Chessground from 'react-chessground'
import Chess from "chess.js"


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
  const [evalScore, setEvalScore] = useState(0);
  const [prevEvalScore, setPrevEvalScore] = useState(0);
  const [whiteSeat, setWhiteSeat] = useState("");
  const [blackSeat, setBlackSeat] = useState("");

  const { gameID, name } = useParams()

  const orientation = ((blackSeat === name) ? "black" : "white")

  useEffect(() => {

    const stockfish = new StockFish(chess, setEvalScore, setPrevEvalScore);

    async function getFromDB() {
      const db2 = db;
      const starCountRef = ref(db2, "games/" + gameID);

      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        const FEN = data.FEN;
        const whiteSeat = data.whiteSeat;
        const blackSeat = data.blackSeat;

        chess.load(FEN);
        console.log("Loaded FEN: ", FEN);
        setFen(FEN);
        stockfish.getEval(FEN);

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

        console.log("Get that ole data :)");

      }, {
        onlyOnce: true
      });
    }
    getFromDB();

  }, [gameID, name, chess])

  useEffect(() => {
    window.addEventListener("unload", (event) => {
      console.log("unloadingasdf: ");

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


  async function updateDB(FEN, from, to) {
    const newGame = {};
    newGame[gameID] = {
      FEN: FEN,
      lastMoveFrom: from,
      lastMoveTo: to,
      whiteSeat: whiteSeat,
      blackSeat: blackSeat,
    };

    console.log("Moved FEN:  ", FEN);

    update(ref(db, 'games'), newGame);
  }

  async function onMove(from, to) {
    chess.move({ from, to });
    const FEN = chess.fen();
    await updateDB(FEN, from, to);
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

  return (
    <div className="bg-background bg-fixed min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">


        <Article
          title="Ludwig Chess"
          subtitle=""
        >

          <Subarticle>
            <div className="mx-auto grid gap-x-4 w-full grid-rows-2 md:grid-rows-1 grid-cols-1 md:grid-cols-2 md:ml-iauto" style={{ gridTemplateColumns: "90% 10%", marginLeft: "-0.5rem", marginRight: "0.5rem" }}>

              <div className="w-100% col-span-1">
                <div className="text-center pb-4">
                  {(orientation === "black" ? whiteSeat : blackSeat)}
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
                  {(orientation === "black" ? blackSeat : whiteSeat)}
                </div>

              </div>
              <div className={"w-full h-full boarder " + (orientation === "black" ? "bg-black" : "bg-white")}>
                <EvalBar data={{ evalScore, prevEvalScore, orientation }} />
              </div>

            </div>

            <div className="pb-8"></div>

          </Subarticle>

        </Article>
      </main>
      <Footer />
    </div>
  );
}
