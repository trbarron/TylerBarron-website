import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Subarticle from "../components/Subarticle";
import Article from "../components/Article";
import Chessground from 'react-chessground'
import Chess from "chess.js"
import AWS from 'aws-sdk';
import 'react-chessground/dist/styles/chessground.css'
import whiteKingImage from '../assets/img/ChesserGuesser/whiteKing.png';
import blackKingImage from '../assets/img/ChesserGuesser/blackKing.png';


export default function ChesserGuesser() {

  const [chess, setChess] = useState(new Chess())
  const [fen, setFen] = useState("")
  const [lockedSaveState, setLockedSaveState] = useState(false)
  const [savedFEN, setSavedFEN] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 0")
  const [boardOrientation, setBoardOrientation] = useState("white")
  const [showMore, setShowMore] = useState(false);
  const [evalScore, setEvalScore] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);

  const resetButtonValue = (lockedSaveState) ?
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 mx-auto">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
    </svg> :
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 mx-auto">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
    </svg>

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
    // Additional logic to handle slider value change
  };

  async function fetchRandomFEN() {
    AWS.config.update({
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
      region: 'us-west-2',
    });

    const dynamoDb = new AWS.DynamoDB.DocumentClient();

    const randomCgValue = Math.floor(Math.random() * 20).toString(); // Since the range is 0-300

    const orientation = "white"

    const params = {
      TableName: "chesserGuesser",
      KeyConditionExpression: "#cg = :cgValue",
      ExpressionAttributeNames: {
        "#cg": "cg"
      },
      ExpressionAttributeValues: {
        ":cgValue": randomCgValue
      }
    };

    try {
      // Query the DynamoDB table for the item with the randomly generated cg value
      const data = await dynamoDb.query(params).promise();

      // If there is no item with that cg value, return a default FEN
      if (!data.Items || data.Items.length === 0) {
        return 'rnbqkbnr/pppppppp/8/8/8/8/PRPPPPPP/RNBQKBNR b KQkq - 0 0';
      }

      // Return the FEN string from the retrieved item
      return data.Items[0].fen;
    } catch (error) {
      console.error("Error fetching FEN from DynamoDB with cg:", randomCgValue, error);
      // In case of an error, return a default FEN
      return 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 0';
    }
  }

  const handleValueChange = (newScore) => {
    setEvalScore(newScore);
    console.log('New score:', newScore); // For demonstration, you can update the state or perform other actions here
  };

  function resetBoard() {

    const c = new Chess();
    if (lockedSaveState) {
      c.load(savedFEN)
      // setTimeout(() => getNextMove(c, []), 500);
    }

    return
  }

  function onShowMore() {
    setShowMore(!showMore);
  }

  return (
    <div className="bg-background bg-fixed min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Article
          title="Chesser Guesser"
          subtitle=""
        >
          <Subarticle>
            <div className="mx-auto grid gap-x-4 grid-rows-2 md:grid-rows-1 grid-cols-1 md:grid-cols-2 md:ml-iauto" style={{ gridTemplateColumns: "80% 20%", marginLeft: "-0.5rem", marginRight: "0.5rem" }}>
              <div className="w-100% col-span-2 md:col-span-1">
                <Chessground
                  fen={fen}
                  orientation={boardOrientation}
                  animation={{ enabled: false }}

                  width={"100%"}
                  height={"0"}
                  style={{ paddingTop: "100%" }}
                />
              </div>

              <div className="justify-center text-center grid gap-y-3 h-full grid-cols-2 md:grid-cols-1 w-full grid-cols-3 col-span-2 md:col-span-1 gap-x-4 py-2 md:py-0">

                <div className="bg-white shadow rounded-lg overflow-hidden w-full col-span-3 md:col-span-1">
                  <div className="w-full  text-gray border-b-2 border-green-500 py-1 md:py-2 inline-flex items-center justify-center font-bold text-md md:text-lg">
                    Opening:
                  </div>
                  <div className="flex items-center justify-between px-4 py-2 bg-gray text-gray-light text-md h-12 md:h-32 overflow-y-auto ">
                  </div>
                </div>

                <div className="bg-white shadow rounded-lg overflow-hidden w-full col-span-3 md:col-span-1">
                  <div className="w-full text-gray border-b-2 border-green-500 py-0 md:py-2 inline-flex items-center justify-center font-bold text-sm md:text-md">
                    % Occurance:
                  </div>
                  <div className="flex items-center justify-center px-4 py-0 md:py-2 bg-gray text-gray-light text-md md:text-lg h-8 md:h-12 overflow-y-hidden ">
                  </div>
                </div>

                <button className={"w-full bg-white text-gray-800 rounded border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-4 md:px-6 inline-flex items-center"}>
                  <span className="mx-auto">
                    Analyze:
                  </span>
                </button>

                <button className="w-full bg-white text-gray-800 rounded border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center" onClick={resetBoard}>
                  <span className="mx-auto">
                  </span>
                </button>

                <button className="w-full bg-white text-gray-800 rounded border-b-2 border-green-500 hover:border-red-600 hover:bg-red-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center ">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 mx-auto">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </button>
              </div>
            </div>
            <div class="gap-2 flex -ml-2 w-4/5 mt-4 rounded">
              <img src={whiteKingImage} alt="White King" class="w-12 h-12 flex-none" />
              <input
                type="range"
                min="-400"
                max="400"
                value={sliderValue}
                onChange={handleSliderChange}
                className="range flex-auto cursor-pointer appearance-none bg-gradient-to-r from-gray-300 to-gray-800 h-2 my-auto rounded-lg"
                />
              <img src={blackKingImage} alt="Black King" class="w-12 h-12 flex-none" />
            </div>
            <div className="pb-8"></div>
            <div className="text-center w-full" onClick={onShowMore}>FAQ</div>
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