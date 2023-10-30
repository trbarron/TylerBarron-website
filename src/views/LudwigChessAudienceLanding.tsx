import React, { useEffect, useState, ReactNode } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Subarticle from "../components/Subarticle";
import Article from "../components/Article";

import { db } from '../assets/tools/firebaseConn';
import { ref, onValue } from "firebase/database";

interface Game {
    whiteSeat: string;
    gameType: string;
    blackSeat?: any;
    gameOver?: any;
}

export default function LudwigChessAudienceChess(): ReactNode {

    const [games, setGames] = useState<[string, string][] | undefined>(undefined);

    const formattedGames = (games: [string, string][] | undefined): ReactNode[] => {
        let section: ReactNode[] = [];
        let i = 0;

        if (!games) { return section; }

        games.forEach(game => {
            const link = game[1];
            const name = game[0];
            const rowClassname = (i % 2 === 0) ? "bg-gray-100" : "bg-white";
            i++;

            section.push(
                <tr className={"border-b w-full " + rowClassname} key={i}>
                    <td className="p-1 w-1/6 sm:py-3 sm:px-3 lg:px-5">
                        <a href={"/LudwigChess/" + link}>
                            {i}
                        </a>
                    </td>
                    <td className="p-1 w-2/4 sm:py-3 sm:px-3 lg:px-5">
                        <a href={"/LudwigChess/" + link}>
                            {name}
                        </a>
                    </td>
                    <td className="p-1 w-1/4 font-bold sm:py-3 sm:px-3 lg:px-5">
                        <a href={"/LudwigChess/" + link}>
                            Join Game
                        </a>
                    </td>
                </tr>
            );
        });

        return section;
    }

    useEffect(() => {
        const db2 = db;
        const starCountRef = ref(db2, "games/");

        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val() as Record<string, Game>;
            const availableGames: [string, string][] = [];

            for (const [key, value] of Object.entries(data)) {
                if (value.whiteSeat && value.gameType === "Public" && !value.blackSeat && !value.gameOver) {
                    availableGames.push([value.whiteSeat, key]);
                }
            }

            setGames(availableGames);
        });

    }, []);

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
                        <div className="py-4 flex justify-center w-full">
                            <table className="text-sm sm:text-md lg:text-lg bg-white shadow rounded mb-4 text-center w-full p-3">
                                <tbody>
                                    <tr className="border-b text-center">
                                        <td className="p-1 w-1/6 sm:py-3 sm:px-3 lg:px-5">ID</td>
                                        <td className="p-1 w-2/4 sm:py-3 sm:px-3 lg:px-5">Name</td>
                                        <td className="p-1 w-1/4 font-bold sm:py-3 sm:px-3 lg:px-5">Link</td>
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