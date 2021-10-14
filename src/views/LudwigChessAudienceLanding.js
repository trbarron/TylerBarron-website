import React, { useEffect, useState } from "react";
import analytics from '../components/Analytics.js'

import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import Subarticle from "../components/Subarticle.js";
import Article from "../components/Article.js";

import { db } from '../assets/tools/firebaseConn';
import { ref, onValue } from "firebase/database";

export default function LudwigChessAudienceChess() {

    const [games, setGames] = useState();
    const formattedGames = (games) => {
        let section = [];
        let i = 0;

        if (!games) { return }

        games.forEach(game => {
            const link = game[1];
            const name = game[0];
            const rowClassname = (i % 2 === 0) ? "bg-gray-100" : "bg-white"
            i++;

            section.push(
                <tr class={"border-b w-full " + rowClassname}>
                    <td class="p-1 w-1/6 sm:py-3 sm:px-3 lg:px-5">
                        <a href={link} className="text-black">
                            {i}
                        </a>
                    </td>
                    <td class="p-1 w-2/4 sm:py-3 sm:px-3 lg:px-5">
                        <a href={link} className="text-black">
                            {name}
                        </a>
                    </td>
                    <td class="p-1 w-1/4 font-bold sm:py-3 sm:px-3 lg:px-5">
                        <a href={link}>
                            Join Game
                        </a>
                    </td>
                </tr>
            );
        });

        return section
    }

    useEffect(() => {
        const db2 = db;
        const starCountRef = ref(db2, "games/");

        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            const availableGames = [];

            for (const [key, value] of Object.entries(data)) {
                if ((data[key].whiteSeat) && (data[key].gameType === "Public") && (!data[key].blackSeat) && (!data[key].gameOver)) {
                    availableGames.push(
                        [value.whiteSeat, key]
                    )
                }
            }
            setGames(availableGames);
        });

    }, [])


    return (

        <div className="bg-background bg-fixed min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">

                <Article
                    title="What is Ludwig Chess?"
                    subtitle=""
                >
                    <Subarticle
                        subtitle=""
                    >
                        <p>
                            Ludwig Chess is a chess variant where you get the Stockfish evaluation bar during the game.
                            This lets players know how the computer values the board without telling you the best move.
                        </p>
                        <p>
                            Enjoy!
                        </p>
                    </Subarticle>

                    <Subarticle
                        subtitle="Play a Game"
                    >
                        <div class="py-4 flex justify-center w-full">
                            <table class="text-sm sm:text-md lg:text-lg bg-white shadow rounded mb-4 text-center w-full p-3">
                                <tbody>
                                    <tr class="border-b text-center">
                                        <td class="p-1 w-1/6 sm:py-3 sm:px-3 lg:px-5">ID</td>
                                        <td class="p-1 w-2/4 sm:py-3 sm:px-3 lg:px-5">Name</td>
                                        <td class="p-1 w-1/4 font-bold sm:py-3 sm:px-3 lg:px-5">Link</td>
                                    </tr>
                                    {formattedGames(games)}
                                </tbody>
                            </table>
                        </div>


                        <a href="/LudwigChess">
                            <div className="w-3/4 lg:w-2/4 mx-auto h-20 mb-4 bg-red rounded cursor-pointer">
                                <button type="submit" className="w-full h-full text-center text-lg text-white place-self-center pt-2">No games? Create one!</button>
                            </div>
                        </a>

                    </Subarticle>
                </Article>
            </main>
            <Footer />
        </div>
    );
}
