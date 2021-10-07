import React, { useState } from "react";
import token from '../assets/tools/tokenGeneration';
import { db } from '../assets/tools/firebaseConn';
import { ref, update } from "firebase/database";
import { Redirect } from 'react-router-dom';



export default function LudwigChessLanding() {
    const [newGame, setNewGame] = useState(false);
    const [gameID, setGameID] = useState(false);
    
    if (gameID) {
        return <Redirect to={"/ludwigchess/" + gameID} />
    }

    return (
        

        <div className='view row'>
            <div className='column column-50 column-offset-25' style={{ textAlign: 'center' }}>
                <button onClick={() => createGame(setNewGame, setGameID)}>Create a New Game</button>
            </div>
        </div>
    );
}

function createGame(setNewGame, setGameID) {
    const gameID = token();
    const newGame = {};
    newGame[gameID] = {
        token: token(),
        FEN: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    }

    update(ref(db, 'games'), newGame)

    setNewGame(newGame);
    setGameID(gameID)

}