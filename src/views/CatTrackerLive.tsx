import React, { useState, useEffect } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Article from "../components/Article";
import ImageDisplay from "../components/CatImage";

interface ApiResponse {
    statusCode: number;
    headers: {
        "Content-Type": string;
    };
    body: string;
    isBase64Encoded: boolean;
}

interface BasicResponseData {
    work_time: string;
    is_present: boolean;
}

interface DetailedResponseData extends BasicResponseData {
    last_week_work_time: number;
    thirty_days_work_time: number;
    lifetime_work_time: number;
    work_time_histogram: { hour: number; count: number }[];
}

export default function ChecoLiveTracker(): JSX.Element {
    const [basicData, setBasicData] = useState<BasicResponseData | null>(null);
    const [detailedData, setDetailedData] = useState<DetailedResponseData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [showDetails, setShowDetails] = useState<boolean>(false);
    const [isDetailedLoading, setIsDetailedLoading] = useState<boolean>(false);
    const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

    useEffect(() => {
        const fetchBasicData = async () => {
            try {
                const response = await axios.get<ApiResponse>(
                    "https://nj3ho46btl.execute-api.us-west-2.amazonaws.com/checoStage/checoRestEndpoint"
                );
                const data: BasicResponseData = JSON.parse(response.data.body);
                setBasicData(data);
                setElapsedSeconds(0);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            }
        };

        fetchBasicData();
        const fetchInterval = setInterval(fetchBasicData, 1000 * 60 * 5);

        return () => {
            clearInterval(fetchInterval);
        };
    }, []);

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;

        if (basicData && basicData.is_present) {
            // Start the timer when the cat is actively working
            timer = setInterval(() => {
                setElapsedSeconds((prevSeconds) => prevSeconds + 1);
            }, 1000);
        } else {
            // Reset the timer when the cat is not working
            setElapsedSeconds(0);
        }

        // Cleanup function to clear the interval
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [basicData]);

    const formatTime = (totalSeconds: number): string => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const getTotalWorkTime = (): string => {
        if (!basicData) return "00:00:00";

        const [hours, minutes, seconds] = basicData.work_time.split(':').map(Number);
        const totalSeconds = hours * 3600 + minutes * 60 + seconds + elapsedSeconds;
        return formatTime(totalSeconds);
    };

    useEffect(() => {
        if (showDetails && !detailedData) {
            const fetchDetailedData = async () => {
                setIsDetailedLoading(true);
                try {
                    const response = await axios.get<ApiResponse>(
                        "https://nj3ho46btl.execute-api.us-west-2.amazonaws.com/checoStage/checoRestEndpoint/details"
                    );
                    const data: DetailedResponseData = JSON.parse(response.data.body);
                    setDetailedData(data);
                } catch (error) {
                    console.error("Error fetching detailed data:", error);
                } finally {
                    setIsDetailedLoading(false);
                }
            };
    
            fetchDetailedData();
        }
    }, [showDetails, detailedData]);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const formatHour = (hour: number) => {
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        return `${hour12}${ampm}`;
    };

    return (
        <div className="bg-background bg-fixed min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <Article title="" subtitle="">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-black">Cat Work Tracker</h2>
                        {isLoading ? (
                            <h2 className="text-4xl font-bold text-gray-500">Loading...</h2>
                        ) : basicData ? (
                            <>
                                <h2 className={`text-4xl ${basicData.is_present ? "text-green-500" : "text-red-500"}`}>
                                    {basicData.is_present ? "Actively Working" : "Not Actively Working"}
                                </h2>
                                <p className="text-3xl mt-4 mb-8">
                                    Time Worked Today: {getTotalWorkTime()}
                                </p>

                                <ImageDisplay />
                                
                                <button
                                    onClick={toggleDetails}
                                    className="bg-white text-gray-800 rounded border-b-2 border-green-500 hover:border-green-500 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center "
                                    >
                                    {showDetails ? "Hide Details" : "Show Details"}
                                </button>

                                {showDetails && (
                                    <div className="mt-8">
                                        {isDetailedLoading ? (
                                            <h2 className="text-2xl font-bold text-gray-500">loading details</h2>
                                        ) : detailedData ? (
                                            <>
                                                <p className="text-2xl mt-2">Last Week: {detailedData.last_week_work_time.toFixed(2)} hours</p>
                                                <p className="text-2xl mt-2">Last 30 Days: {detailedData.thirty_days_work_time.toFixed(2)} hours</p>
                                                <p className="text-2xl mt-2 mb-8">Lifetime: {detailedData.lifetime_work_time.toFixed(2)} hours</p>
                                                
                                                <h3 className="text-2xl font-bold mt-8 mb-4">Work Time Distribution (Last 30 Days)</h3>
                                                <ResponsiveContainer width="100%" height={400}>
                                        <BarChart 
                                            data={detailedData.work_time_histogram}
                                            margin={{ top: 20, right: 0, left: 0, bottom: 20 }}
                                        >
                                            <XAxis 
                                                dataKey="hour" 
                                                tickFormatter={formatHour}
                                                label={{ value: 'Hour of Day', position: 'bottom', offset: 0, fontSize: 12 }}
                                                tick={{ fontSize: 10 }}
                                            />
                                            <YAxis 
                                                label={{ value: 'Total Minutes', angle: -90, position: 'insideLeft', offset: 10, fontSize: 12 }}
                                                tick={{ fontSize: 10 }}
                                            />
                                            <Tooltip 
                                                formatter={(value) => [`${value} minutes`]}
                                                labelFormatter={formatHour}
                                                contentStyle={{ fontSize: 12 }}
                                            />
                                            <Bar dataKey="count" name="Work Time" fill="#2E3532" />
                                        </BarChart>
                                        </ResponsiveContainer>
                                        </>
                                    ) : (
                                        <h2 className="text-2xl font-bold text-red-500">Error loading detailed data</h2>
                                    )}
                                </div>
                            )}
                            </>
                        ) : (
                            <h2 className="text-4xl font-bold text-red-500">Error loading data</h2>
                        )}
                        <a href="/CatTracker/Blog" className="block mt-8 mb-20">
                            Learn more about the Cat Tracker project
                        </a>
                    </div>
                </Article>
            </main>
            <Footer />
        </div>
    );
}