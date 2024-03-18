import React, { useState, useEffect } from "react";
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
import retryImage from '../assets/img/ChesserGuesser/retry.png';
import { useParams } from 'react-router-dom';
import Modal from '../components/Modal';

export default function ChesserGuesserDaily() {

  const [chess, setChess] = useState(new Chess())
  const [fen, setFen] = useState("")
  const [boardOrientation, setBoardOrientation] = useState("white")
  const [evalScore, setEvalScore] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [currentTurn, setCurrentTurn] = useState(chess.turn() === 'w' ? 'White' : 'Black');
  const [turnIndex, setTurnIndex] = useState(0);
  const [totalDifference, setTotalDifference] = useState(0);
  const [showRankModal, setShowRankModal] = useState(false);
  const [lastEval, setLastEval] = useState(0);
  const [lastSlider, setLastSlider] = useState(0);
  const [loadingScores, setLoadingScores] = useState(false);
  const [scoresData, setScoresData] = useState({ userScore: null, userRank: null, totalUsers: null, topScores: [] });

  const { name } = useParams();

  useEffect(() => {
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const puzzleIndexBase = dayOfYear % 80;

    fetchPuzzle(puzzleIndexBase * 5);


  }, [name]);

  useEffect(() => {
    if (showRankModal) {
      setLoadingScores(true);
      getScores(name).then(scoresData => {
        setScoresData(scoresData);
        setLoadingScores(false);
      });
    }
  }, [showRankModal, name]);

  const fetchPuzzle = async (puzzleIindex) => {
    AWS.config.update({
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
      region: 'us-west-2',
    });

    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    const cgValue = puzzleIindex.toString();

    const params = {
      TableName: "chesserGuesser",
      KeyConditionExpression: "#cg = :cgValue",
      ExpressionAttributeNames: { "#cg": "cg" },
      ExpressionAttributeValues: { ":cgValue": cgValue }
    };

    setTurnIndex(turnIndex + 1);

    try {
      const data = await dynamoDb.query(params).promise();
      if (!data.Items || data.Items.length === 0) {
        console.log('No data returned for cgValue:', cgValue, 'retrying...');
        return 'rnbqkbnr/pppppppp/8/8/8/8/PRPPPPPP/RNBQKBNR b KQkq - 0 0';
      }
      setEvalScore(data.Items[0].eval);
      setCurrentTurn(getCurrentPlayer(data.Items[0].fen));
      setFen(data.Items[0].fen);
      setBoardOrientation(getCurrentPlayer(data.Items[0].fen).toLowerCase())
      setSliderValue(0);
    } catch (error) {
      console.error("Error fetching FEN from DynamoDB with puzzleIindex:", puzzleIindex, error);
    }
  };

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
    // Additional logic to handle slider value change
  };

  const submitGuess = async () => {
    const difference = Math.abs(evalScore - sliderValue) / 100;
    setTotalDifference(prevTotal => prevTotal + difference);

    if (turnIndex >= 5) { // Adjust based on zero indexing
      await saveUserScore(); // Ensure the score is saved before proceeding
      setShowRankModal(true); // Show the rank modal after the score has been saved
    } else {
      setTurnIndex(prevIndex => prevIndex + 1);
      // Fetch the next puzzle based on the new turnIndex
      const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
      const puzzleIndexBase = dayOfYear % 80;
      fetchPuzzle(puzzleIndexBase * 5 + turnIndex + 1);
    }

    setLastEval(evalScore / 100);
    setLastSlider(sliderValue / 100);
  };

  function flipBoard() {
    const or = (boardOrientation === "white") ? "black" : "white"
    setBoardOrientation(or);
    return
  }

  const saveUserScore = async () => {
    AWS.config.update({
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
      region: 'us-west-2',
    });

    const dynamoDb = new AWS.DynamoDB.DocumentClient();

    const currentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    const userDateKey = `${name}#${currentDate}`; // Composite key of username and date

    const params = {
      TableName: "cgUserData",
      Item: {
        "userData": userDateKey, // Partition key
        "score": totalDifference, // Attribute holding the score
        "date": currentDate.toString(), // Separate attribute for the date if needed for queries
      }
    };

    try {
      await dynamoDb.put(params).promise();
      console.log("Score saved successfully.");
    } catch (error) {
      console.error("Error saving score to DynamoDB:", error);
    }
  };

  const getScores = async (userName) => {
    // Configuration for DynamoDB
    AWS.config.update({
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
      region: 'us-west-2',
    });

    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    const currentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

    const params = {
      TableName: "cgUserData",
      FilterExpression: "contains(#date, :dateVal)",
      ExpressionAttributeNames: {
        "#date": "date",
      },
      ExpressionAttributeValues: {
        ":dateVal": currentDate,
      }
    };

    try {
      const data = await dynamoDb.scan(params).promise();
      const scores = data.Items.map(item => ({
        userName: item.userData.split('#')[0], // Extract userName from userData
        score: item.score,
        date: item.date
      })).filter(item => item.date === currentDate);

      // Sort scores in ascending order (lower is better)
      scores.sort((a, b) => a.score - b.score);

      // Find user's score and rank
      const userIndex = scores.findIndex(item => item.userName === userName);
      const userScore = scores[userIndex];
      const userRank = userIndex + 1; // Adding 1 because array indexes start at 0
      const totalUsers = scores.length;

      // Get top 3 scores
      const topScores = scores.slice(0, 5);

      return {
        userScore: userScore ? userScore.score.toFixed(2) : null,
        userRank,
        totalUsers,
        topScores
      };

    } catch (error) {
      console.error("Error fetching scores from DynamoDB:", error);
      return {
        userScore: null,
        userRank: null,
        topScores: []
      };
    }
  };




  function getCurrentPlayer(fen) {
    const parts = fen.split(' '); // Split the FEN string by spaces
    const turnIndicator = parts[1]; // 'w' or 'b'

    return turnIndicator === 'w' ? 'White' : 'Black';
  }

  return (
    <div className="bg-background bg-fixed min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Article
          title="Chesser Guesser Daily"
          subtitle=""
        >
          <Subarticle>
            <div className="mx-auto grid gap-x-4 grid-rows-2 md:grid-rows-1 grid-cols-1 md:grid-cols-2 md:ml-iauto" style={{ gridTemplateColumns: "80% 20%", marginLeft: "-0.5rem", marginRight: "0.5rem" }}>
              <div className="w-100% col-span-2 md:col-span-1">
                <Chessground
                  fen={fen}
                  orientation={boardOrientation}
                  animation={{ enabled: false }}
                  movable={{
                    free: false,
                    color: 'undefined',
                    dests: [],
                  }}
                  drawable={{
                    enabled: true,
                    visible: true,
                    eraseOnClick: true,
                  }}

                  width={"100%"}
                  height={"0"}
                  style={{ paddingTop: "100%" }}
                />
                <div className="gap-2 flex w-full mt-4 rounded">
                  <img src={blackKingImage} alt="Black King" class="w-12 h-12 flex-none" />
                  <input
                    type="range"
                    min="-400"
                    max="400"
                    value={sliderValue}
                    onChange={handleSliderChange}
                    className="range flex-auto cursor-pointer appearance-none bg-gradient-to-r to-gray-300 from-gray-700 h-2 my-auto rounded-lg"
                  />
                  <img src={whiteKingImage} alt="White King" class="w-12 h-12 flex-none" />
                </div>

                <button
                  className={`w-full rounded border-b-2 border-green-500 hover:border-green-600 hover:text-white shadow-md py-2 px-6 inline-flex flex-col items-center justify-center ${sliderValue === 0 ? 'bg-gray-500 text-black ' : sliderValue > 0 ? 'bg-white  text-black ' : 'bg-black text-white '}`}
                  onClick={() => {
                    submitGuess()
                  }}
                >
                  <span className={`text-xs ${sliderValue === 0 ? 'bg-gray-500 text-black ' : sliderValue > 0 ? 'bg-white  text-black ' : 'bg-black text-white '}`}>
                    Submit
                  </span>
                  <span className={`text-xs ${sliderValue === 0 ? 'bg-gray-500 text-black ' : sliderValue > 0 ? 'bg-white  text-black ' : 'bg-black text-white '}`}>
                    {(sliderValue / 100).toFixed(2)}
                  </span>
                </button>
              </div>

              <div className="justify-center text-center grid gap-y-3 h-80 md:h-full md:grid-cols-1	w-full grid-cols-3 col-span-2 md:col-span-1 gap-x-4 py-2 md:py-0 ">

                <div className="bg-white shadow rounded-lg overflow-hidden w-full col-span-3 md:col-span-1 md:h-60 h-36 ">
                  <div className="w-full text-gray border-b-2 z-30 bg-white border-green-500 py-0 md:py-2 inline-flex items-center justify-center font-bold text-sm md:text-md">
                    Last Round:
                  </div>
                  <div className="flex items-center justify-center px-4 pb-0 -mt-3 z-10 md:py-2 bg-gray text-gray-light text-xs md:text-xs h-full overflow-y-hidden ">
                    Answer: {lastEval.toFixed(2)} <br /> Guess: {lastSlider.toFixed(2)} <br /><br /> Difference: {(lastEval - lastSlider).toFixed(2)}
                  </div>
                </div>

                <div className="bg-white shadow rounded-lg overflow-hidden w-full md:col-span-1 ">
                  <div className="w-full text-gray border-b-2 z-30 bg-white border-green-500 py-0 md:py-2 inline-flex items-center justify-center font-bold text-sm md:text-md">
                    Turn:
                  </div>
                  <div className="h-full flex items-center justify-center px-4 pb-0 -mt-3 z-10 md:pb-4 bg-gray text-gray-light text-md md:text-lg overflow-y-hidden">
                    {(turnIndex > 5 ? 5 : turnIndex)}
                  </div>
                </div>

                <div className={`shadow rounded-lg overflow-hidden w-full col-span-1 md:col-span-1 border ${currentTurn === 'White' ? 'bg-white border-black' : 'bg-black border-white'}`}>
                  <div className={`w-full py-0 md:py-2 inline-flex items-center justify-center font-bold text-sm md:text-md my-auto h-full ${currentTurn === 'White' ? 'text-black' : 'text-white'}`}>
                    {currentTurn} to move
                  </div>
                </div>

                <button className="w-full bg-white text-gray-800 rounded border-b-2 border-green-500 hover:border-red-600 hover:bg-red-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center " onClick={flipBoard}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 mx-auto">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </button>
              </div>
            </div>
          </Subarticle>
        </Article>
        <div className="visible ">
          <Article
            title="About Chesser Guesser"
          >
            <Subarticle
              subtitle=""
            >
              <p>
                Challenge yourself to guess the computer's evaluation of chess positions. Your goal is to estimate the position's value as accurately as possible -- the best guessers of the 5 daily positions can find themselves on the highscore list!
              </p>
            </Subarticle>
          </Article>
        </div>
      </main>
      <Footer />
      {showRankModal && (
        <Modal onClose={() => setShowRankModal(false)}>
          {loadingScores ? (
            <p>Loading scores...</p>
          ) : (
            <div>
              <div className="text-base font-normal text-gray-700">Your score: {scoresData.userScore}</div>
              <div className="text-base font-normal text-gray-700">Your rank: {scoresData.userRank} of {scoresData.totalUsers}</div>
              <div className="text-lg font-semibold text-gray-900 mt-4">Top 5 Scores:</div>
              <ol className="list-decimal list-inside">
                {scoresData.topScores.map((score, index) => (
                  <li key={index} className="text-base text-gray-600">{score.userName} : {(score.score).toFixed(2)}</li>
                ))}
              </ol>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}