import React, { useEffect, useState } from "react";
import { Redirect } from 'react-router-dom';

import analytics from '../components/Analytics.js'

import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import Subarticle from "../components/Subarticle.js";
import Article from "../components/Article.js";
import Input from "../components/TextInput.js";

import { db } from '../assets/tools/firebaseConn';
import { ref, onValue } from "firebase/database";

import { useParams } from "react-router";

export default function LudwigChessInviteLanding() {
    const [joinGame, setJoinGame] = useState(false);
    const [name, setName] = useState(false);
    const [otherPlayers, setOtherPlayers] = useState();

    const { gameID } = useParams()


    useEffect(() => {
        const db2 = db;
        const starCountRef = ref(db2, "games/" + gameID);


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

    if (joinGame) {
        let urlName = name;
        if (!urlName) {
            urlName = "secret user"
        }
        return <Redirect to={"/ludwigchess/" + gameID + "/" + urlName} />
    }


    function handleJoinGame() {
        setJoinGame(true);
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
                            {(otherPlayers) ? "Join a game with " + otherPlayers : ""}
                        </div>

                        <div className="w-2/4 mx-auto h-16 pb-4">
                            <Input
                                id={"Name"}
                                label={"Name"}
                                handleChange={(e) => setName(e)}
                                tabIndex={0}
                                autoComplete={false}
                            />
                        </div>
                        <form onSubmit={(e) => handleJoinGame()} action='#'>
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