import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Article from "../components/Article";

interface ApiResponse {
    statusCode: number;
    headers: {
        "Content-Type": string;
    };
    body: string;
    isBase64Encoded: boolean;
}

interface ResponseData {
    work_time: string;
    is_present: boolean;
}

export default function ChecoLiveTracker(): JSX.Element {
    const [workTime, setWorkTime] = useState<string>("0:00:00");
    const [isPresent, setIsPresent] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<ApiResponse>(
                    "https://nj3ho46btl.execute-api.us-west-2.amazonaws.com/checoStage/checoRestEndpoint"
                );
                const data: ResponseData = JSON.parse(response.data.body);
                setWorkTime(data.work_time);
                setIsPresent(data.is_present);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            }
        };

        fetchData();
        const fetchInterval = setInterval(fetchData, 1000 * 60 * 5); // Refresh every 5 minutes

        let timerInterval: NodeJS.Timeout | null = null;

        if (isPresent) {
            timerInterval = setInterval(() => {
                setWorkTime((prevTime) => {
                    const [hours, minutes, seconds] = prevTime.split(":").map(Number);
                    const totalSeconds = hours * 3600 + minutes * 60 + seconds + 1;
                    const updatedHours = Math.floor(totalSeconds / 3600);
                    const updatedMinutes = Math.floor((totalSeconds % 3600) / 60);
                    const updatedSeconds = totalSeconds % 60;
                    return `${updatedHours}:${updatedMinutes.toString().padStart(2, "0")}:${updatedSeconds.toString().padStart(2, "0")}`;
                });
            }, 1000);
        }

        return () => {
            clearInterval(fetchInterval);
            if (timerInterval) {
                clearInterval(timerInterval);
            }
        };
    }, [isPresent]);

    return (
        <div className="bg-background bg-fixed min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <Article title="" subtitle="">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-black">Checo Work Tracker</h2>
                        {isLoading ? (
                            <h2 className="text-4xl font-bold text-gray-500">Loading...</h2>
                        ) : (
                            <>
                                <h2 className={`text-4xl font-bold ${isPresent ? "text-green-500" : "text-red-500"}`}>
                                    {isPresent ? "Actively Working" : "Not Actively Working"}
                                </h2>
                                <p className="text-3xl mt-4 mb-20">Time Worked Today: {workTime}</p>
                            </>
                        )}
                        <a href="/CatTracker/Blog" className="pb-8">
                            Learn more about the Cat Tracker project
                        </a>
                        <p></p>
                    </div>
                </Article>
            </main>
            <Footer />
        </div>
    );
}