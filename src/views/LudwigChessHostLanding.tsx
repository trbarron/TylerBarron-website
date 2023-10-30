import React, { useState, ChangeEvent, FormEvent } from "react";
import { Redirect } from 'react-router-dom';

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Subarticle from "../components/Subarticle";
import Article from "../components/Article";
import Input from "../components/TextInput";
import Radiobutton from "../components/RadioButton";

import token from '../assets/tools/tokenGeneration';
import { db } from '../assets/tools/firebaseConn';
import { ref, update } from "firebase/database";

export default function LudwigChessHostLanding(): JSX.Element {
    const [gameID, setGameID] = useState<string | false>(false);
    const [name, setName] = useState<string | false>(false);
    const [gameType, setGameType] = useState<"Public" | "Private">("Public");
    
    if (gameID) {
        let urlName = name || "AnonymousUser";
        return <Redirect to={`/ludwigchess/${gameID}/${urlName}`} />;
    }

    const createGame = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        
        const generatedGameID = token();
        const newGame = {
            [generatedGameID]: {
                FEN: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
                lastMoveFrom: null,
                lastMoveTo: null,
                whiteSeat: "",
                blackSeat: "",
                gameType,
                gameOver: false
            }
        };

        update(ref(db, 'games'), newGame);
        setGameID(generatedGameID);
    };

    return (
        <div className="bg-background bg-fixed min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <Article title="Ludwig Chess" subtitle="">
                    <Subarticle subtitle="">
                        <p className="text-center"> Create a game to continue </p>
                        <div className="w-2/4 mx-auto h-16 pb-4">
                            <Input
                                id="Name"
                                label="Name"
                                handleChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                                tabIndex={0}
                                autoComplete={false}
                            />
                        </div>
                        <div className="w-2/4 mx-auto pb-4">
                            <Radiobutton
                                title="Type"
                                options={["Public", "Private"]}
                                default="Public"
                                onChange={setGameType}
                                checkedVal={gameType}
                            />
                        </div>
                        <form onSubmit={createGame} action="#">
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
