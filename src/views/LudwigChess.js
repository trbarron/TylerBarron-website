import React, { useState } from "react";
import analytics from '../components/Analytics.js'

import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import Subarticle from "../components/Subarticle.js";
import Article from "../components/Article.js";
import Chessground from 'react-chessground'
import Chess from "chess.js"

import StockFish from "../components/Stockfish.js";

import 'react-chessground/dist/styles/chessground.css'
import EvalBar from "../components/charts/evalBar.js";


export default function ChessOpenings() {

  const [chess, setChess] = useState(new Chess());
  const [fen, setFen] = useState("");
  const [lastMove, setLastMove] = useState();
  const [evalScore, setEvalScore] = useState(0);
  const [prevEvalScore, setPrevEvalScore] = useState(0);
  const boardOrientation = "white";

  const stockfish = new StockFish(chess, setEvalScore, setPrevEvalScore);

  async function onMove(from, to) {
    chess.move({ from, to, promotion: "x" });
    setLastMove([from, to]);
    setFen(chess.fen());
    stockfish.getEval(chess.fen());
    // setPrevEvalScore(evalScore);
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
