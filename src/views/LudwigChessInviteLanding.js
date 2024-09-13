import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Subarticle from "../components/Subarticle";
import Article from "../components/Article";
import Input from "../components/TextInput.js";

import { db } from '../assets/tools/firebaseConn';
import { ref, onValue } from "firebase/database";

export default function LudwigChessInviteLanding() {
    const [name, setName] = useState("");
    const [otherPlayers, setOtherPlayers] = useState("");

    const { gameID } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const starCountRef = ref(db, "games/" + gameID);

        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();

            let players = "";

            if (data.whiteSeat) {
                players = players + data.whiteSeat;
            }
            if (data.blackSeat) {
                if (players) {players += " and "}
                players = players + data.blackSeat;
            }

            setOtherPlayers(players);

        }, {
            onlyOnce: true
        });
    }, [gameID])

    function handleJoinGame(e) {
        e.preventDefault();
        const urlName = name || "secret user";
        navigate(`/ludwigchess/${gameID}/${urlName}`);
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
                        <div className="text-center pb-4">
                            {otherPlayers ? `Join a game with ${otherPlayers}` : ""}
                        </div>

                        <div className="w-2/4 mx-auto h-16 pb-4">
                            <Input
                                id="Name"
                                label="Name"
                                handleChange={(e) => setName(e)}
                                tabIndex={0}
                                autoComplete="off"
                            />
                        </div>
                        <form onSubmit={handleJoinGame}>
                            <div className="w-1/4 mx-auto h-12 mb-4 bg-white rounded cursor-pointer">
                                <button type="submit" className="w-full h-full text-center text-lg place-self-center pt-2">Join Game</button>
                            </div>
                        </form>
                    </Subarticle>
                </Article>
            </main>
            <Footer />
        </div>
    );
}