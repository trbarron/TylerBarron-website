import React, { useState } from "react";
import token from '../assets/tools/tokenGeneration';
import { db } from '../assets/tools/firebaseConn';
import { ref, update } from "firebase/database";
import { Redirect } from 'react-router-dom';

import analytics from '../components/Analytics.js'

import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import Subarticle from "../components/Subarticle.js";
import Article from "../components/Article.js";
import Input from "../components/TextInput.js";
import Radiobutton from "../components/RadioButton.js";

export default function LudwigChessHostLanding() {
    const [gameID, setGameID] = useState(false);
    const [name, setName] = useState(false);
    const [gameType, setGameType] = useState("Public")


    if (gameID) {
        let urlName = name;
        if (!urlName) {
            urlName = "AnonymousUser"
        }
        return <Redirect to={"/ludwigchess/" + gameID + "/" + urlName} />
    }


    const createGame = (e, setGameID) => {
        const gameID = token();
        const newGame = {};
        newGame[gameID] = {
            FEN: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
            lastMoveFrom: null,
            lastMoveTo: null,
            whiteSeat: "",
            blackSeat: "",
            gameType,
            gameOver: false
        }

        update(ref(db, 'games'), newGame)

        setGameID(gameID)

    }

    return (


        <div className="bg-background bg-fixed min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">

                <Article
                    title="Ludwig Chess"
                    subtitle=""
                >

                    <Subarticle
                        subtitle=""
                    >

                        <div className="w-2/4 mx-auto h-16 pb-4">
                            <Input
                                id={"Name"}
                                label={"Name"}
                                handleChange={(e) => setName(e)}
                                tabIndex={0}
                                autoComplete={false}
                            />
                        </div>

                        <div className="w-2/4 mx-auto pb-4">
                            <Radiobutton
                                title={"Type"}
                                options={["Public", "Private"]}
                                default={"Public"}
                                onChange={setGameType}
                                checkedVal={gameType}
                            />
                        </div>


                        <form onSubmit={(e) => createGame(e, setGameID)} action='#'>
                            <div className="w-1/2 mx-auto h-16 mb-4 bg-white rounded cursor-pointer">
                                <button type="submit" className="w-full h-full text-center text-lg place-self-center pt-2">Create Lobby</button>
                            </div>
                        </form>

                    </Subarticle>
                </Article>

            </main>
            <Footer />
        </div>
    );
}