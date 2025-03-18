import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import useSocket from '../hooks/useSocket'; // Adjust the path to your useSocket hook
import { useNavigate } from 'react-router-dom';

const DrawPage = () => {
    const { countdown } = useSocket(); // Get the countdown from the useSocket hook
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(1);
    const [animate, setAnimate] = useState(false);
    const [isResetting, setIsResetting] = useState(false); // Track if the countdown is resetting

    useEffect(() => {
        // Update the minutes and seconds based on the countdown value
        const newMinutes = Math.floor(countdown / 60);
        const newSeconds = countdown % 60;
        setMinutes(newMinutes);
        setSeconds(newSeconds);

        // Trigger animation when countdown reaches 0
        if (countdown === 0) {
            setAnimate(true);
            setIsResetting(true); // Show resetting state

            // Hide the animation and resetting state after 3 seconds
            setTimeout(() => {
                setAnimate(false);
                setIsResetting(false);
            }, 3000);
        }
    }, [countdown]);

    const formatTime = (time) => {
        return time < 10 ? `0${time}` : time;
    };

    const navigate = useNavigate(); // Initialize useNavigate

    // Function to handle button clicks
    const handleButtonClick = (text) => {
        if (text === "Top Up") {
            navigate('/profile'); // Navigate to the profile page for top-up
        } else if (text === "History") {
            // Handle history button click
            console.log("History button clicked");
        } else if (text === "Logout") {
            // Handle logout button click
            console.log("Logout button clicked");
        }
    };


    return (
        <div className="min-h-screen bg-gray-900 bg-opacity-95 relative overflow-hidden" style={{
            backgroundImage: "linear-gradient(45deg, rgba(9,9,45,1) 0%, rgba(15,15,40,1) 100%)",
            backgroundSize: "cover"
        }}>
            {/* Glowing orbs background effect */}
            <div className="absolute w-40 h-40 rounded-full bg-blue-500 blur-3xl opacity-20 top-20 left-20"></div>
            <div className="absolute w-48 h-48 rounded-full bg-purple-600 blur-3xl opacity-20 bottom-40 right-20"></div>
            <div className="absolute w-36 h-36 rounded-full bg-blue-400 blur-3xl opacity-10 bottom-20 left-40"></div>
            <div className="absolute w-44 h-44 rounded-full bg-fuchsia-600 blur-3xl opacity-15 top-40 right-40"></div>

            {/* Header */}
            <header className="flex justify-between items-center mb-12">
                <h1 className="text-5xl font-bold tracking-wider" style={{
                    color: "#ff1493",
                    textShadow: "0 0 10px rgba(255, 20, 147, 0.7), 0 0 20px rgba(255, 20, 147, 0.5)"
                }}>
                    TAKARAKUJI
                </h1>
                <button className="p-2 rounded-md text-white">
                    <Menu size={50} className="text-cyan-400" />
                </button>
            </header>

            {/* Grid overlay */}
            <div className="absolute inset-0"
                style={{
                    backgroundImage: "linear-gradient(rgba(75, 75, 155, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(75, 75, 155, 0.05) 1px, transparent 1px)",
                    backgroundSize: "40px 40px"
                }}>
            </div>

            <div className="container mx-auto px-4 py-6 relative z-10">
                {/* Main content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-8">
                        {/* Draw Ticket Section */}
                        <div>
                            <h2 className="text-white text-3xl mb-4 font-light">Draw Ticket</h2>
                            <div className="p-4 rounded-lg border-2 border-gray-700 bg-gray-800 bg-opacity-30 backdrop-blur-sm flex justify-between">
                                {[1, 2, 3, 4, 5, 6].map((_, index) => (
                                    <div key={index} className="w-12 h-12 rounded-md bg-gray-300 flex items-center justify-center cursor-pointer transition-all hover:bg-cyan-200 hover:shadow-lg hover:shadow-cyan-500/50">
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-10 justify-center">
                            <button className="px-20 py-4 border-2 border-fuchsia-500 rounded-md text-fuchsia-400 font-bold tracking-widest text-xl hover:bg-cyan-900 hover:bg-opacity-30 transition-all transform hover:scale-105" style={{
                                textShadow: "0 0 10px #ff00ff, 0 0 10px #ff00ff",
                                boxShadow: "0 0 10px rgba(255, 0, 255, 0.5)",
                            }}>
                                Reset
                            </button>
                            <button className="px-20 py-4 border-2 border-cyan-500 rounded-md text-cyan-400 font-bold tracking-widest text-xl hover:bg-cyan-900 hover:bg-opacity-30 transition-all transform hover:scale-105" style={{
                                textShadow: "0 0 10px rgba(34, 211, 238, 0.5)",
                                boxShadow: "0 0 15px rgba(34, 211, 238, 0.3)"
                            }}>
                                Place Bet
                            </button>
                        </div>

                        {/* Account Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg border-2 border-gray-700 bg-gray-800 bg-opacity-30 backdrop-blur-sm">
                                <div className="p-3 rounded bg-gray-700 bg-opacity-50 mb-3">
                                    <p className="text-gray-300 mb-1">Account Balance</p>
                                    <p className="text-white text-2xl font-bold">₱500.00</p>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="p-4 rounded-lg border-2 border-gray-700 bg-gray-800 bg-opacity-30 backdrop-blur-sm flex flex-col justify-between space-y-3">
                                {["History", "Logout", "Top Up"].map((text, index) => (
                                    <button
                                        key={index}
                                        className="py-3 px-4 bg-gray-200 rounded-md text-gray-800 font-mono tracking-wide hover:bg-gray-100 transition-all transform hover:scale-105"
                                        onClick={() => handleButtonClick(text)}                                  
                                    >
                                        {text}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {/* Last Draw */}
                        <div>
                            <h2 className="text-yellow-400 text-3xl mb-4 font-light" style={{
                                textShadow: "0 0 10px rgba(250, 204, 21, 0.5)"
                            }}>LAST DRAW</h2>
                            <div className="p-4 rounded-lg border-2 border-cyan-900 bg-gray-800 bg-opacity-30 backdrop-blur-sm flex justify-between">
                                {[12, 9, 43, 19, 22, 6].map((num, index) => (
                                    <div key={index}
                                        className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center text-cyan-400 font-bold border border-cyan-800"
                                        style={{
                                            boxShadow: "0 0 10px rgba(34, 211, 238, 0.3)"
                                        }}
                                    >
                                        {num}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Draw Countdown */}
                        <div>
                            <h2 className="text-yellow-400 text-3xl mb-4 font-light" style={{
                                textShadow: "0 0 10px rgba(250, 204, 21, 0.5)"
                            }}>DRAW COUNTDOWN</h2>
                            <div className="p-8 rounded-lg border-2 border-fuchsia-900 bg-gray-800 bg-opacity-30 backdrop-blur-sm">
                                <div className="flex justify-center space-x-4">
                                    <div className="w-32 h-32">
                                        <div className="w-full h-full bg-black border-2 border-fuchsia-500 rounded-md flex items-center justify-center text-6xl font-bold" style={{
                                            color: "#ff1493",
                                            textShadow: "0 0 10px rgba(255, 20, 147, 0.7)"
                                        }}>
                                            {formatTime(minutes)}
                                        </div>
                                        <p className="text-center text-gray-400 mt-2">MINUTES</p>
                                    </div>

                                    <div className="w-32 h-32">
                                        <div className="w-full h-full bg-black border-2 border-fuchsia-500 rounded-md flex items-center justify-center text-6xl font-bold" style={{
                                            color: "#ff1493",
                                            textShadow: "0 0 10px rgba(255, 20, 147, 0.7)"
                                        }}>
                                            {formatTime(seconds)}
                                        </div>
                                        <p className="text-center text-gray-400 mt-2">SECONDS</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Zero time animation */}
            {animate && (
                <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
                    <div className="text-8xl font-bold animate-pulse" style={{
                        color: "#ff1493",
                        textShadow: "0 0 10px rgba(255, 20, 147, 0.7), 0 0 20px rgba(255, 20, 147, 0.5)"
                    }}>
                        DRAW TIME!
                    </div>
                </div>
            )}

           
        </div>
    );
};

export default DrawPage;