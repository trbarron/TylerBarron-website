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
import { setRandomFallback } from "bcryptjs";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


export default function ChessOpenings() {

  const [chess, setChess] = useState(new Chess());
  const [fen, setFen] = useState("");
  const [lastMove, setLastMove] = useState();
  const [evalScore, setEvalScore] = useState(0);
  const [prevEvalScore, setPrevEvalScore] = useState(0);
  const boardOrientation = "white";

  const { gameID } = useParams()





  const stockfish = new StockFish(chess, setEvalScore, setPrevEvalScore);


  useEffect(() => {
    getFromDB();
  }, [])

  async function getFromDB() {
    const db2 = db;
    const starCountRef = ref(db2, "games");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data[gameID].FEN)
      const FEN = data[gameID].FEN;
      // setFen(FEN)

      // setChess(chess.load(FEN));
      chess.load(FEN);
      setFen(FEN);

    });
  }

  async function updateDB(FEN) {
    const newGame = {};
    newGame[gameID] = {
      token: gameID,
      FEN: FEN
    }

    update(ref(db, 'games'), newGame)

  }

  async function onMove(from, to) {
    // if (chess.move({ from, to })) {
      chess.move({from,to});
      const FEN = chess.fen();
      setFen(FEN);
      setLastMove([from, to]);
      stockfish.getEval(FEN);
      await updateDB(FEN);
    // };
  }

  const turnColor = () => {
    return chess.turn() === "w" ? "white" : "black"
  }

  const calcMovable = () => {
    const dests = new Map()
    chess.SQUARES.forEach(s => {
      const ms = chess.moves({ square: s, verbose: true })
      if (ms.length) dests.set(s, ms.map(m => m.to))
    })
    return {
      free: false,
      dests,
      color: turnColor()
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

              <div className="w-100% col-span-2 md:col-span-1">
                <Chessground
                  fen={fen}
                  lastMove={lastMove}
                  onMove={onMove}
                  orientation={boardOrientation}
                  movable={calcMovable()}
                  turnColor={turnColor()}
                  animation={{ enabled: false }}
                  width={"100%"}
                  height={"0"}
                  style={{ paddingTop: "100%" }}
                />
              </div>
              <div className="w-full h-full boarder bg-gray-50">
                <EvalBar data={{ evalScore: evalScore, prevEvalScore: prevEvalScore }} />
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
