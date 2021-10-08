import React, { useState } from "react";
import { Redirect } from 'react-router-dom';

import analytics from '../components/Analytics.js'

import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import Subarticle from "../components/Subarticle.js";
import Article from "../components/Article.js";
import Input from "../components/TextInput.js";

import { useParams } from "react-router";

export default function LudwigChessInviteLanding() {
    const [joinGame, setJoinGame] = useState(false);
    const [name, setName] = useState(false);

    const { gameID } = useParams()

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

                        <div className="w-2/4 mx-auto h-16 pb-4">
                            <Input
                                id={"Name"}
                                label={"Name"}
                                handleChange={(e) => setName(e)}
                            />
                        </div>

                        <div className="w-1/4 mx-auto h-12 mb-4 bg-white rounded cursor-pointer" onClick={() => handleJoinGame()}>
                            <div className="w-full h-full text-center text-lg place-self-center pt-2">Join Game</div>
                        </div>

                    </Subarticle>
                </Article>

            </main>
            <Footer />
        </div>
    );
}