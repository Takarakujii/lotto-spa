import React, { useState, useEffect } from 'react';
import useSocket from '../hooks/useSocket'; 
const LandingPage = () => {
    const { countdown } = useSocket();
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(1);
    const [isHovered, setIsHovered] = useState(false);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const newMinutes = Math.floor(countdown / 60);
        const newSeconds = countdown % 60;
        setMinutes(newMinutes);
        setSeconds(newSeconds);

        
        if (countdown === 0) {
            setAnimate(true);
            setTimeout(() => setAnimate(false), 3000);
        }
    }, [countdown]);

    const formatTime = (time) => {
        return time < 10 ? `0${time}` : time;
    };

    return (
        <div className="relative min-h-screen overflow-hidden" style={{
            background: "linear-gradient(180deg, #0a001a 0%, #1f0040 100%)"
        }}>
            {/* Neon grid lines in background */}
            <div className="absolute inset-0 overflow-hidden opacity-20 ">
                <div className="absolute w-full h-full" style={{
                    backgroundImage: "linear-gradient(0deg, transparent 24%, rgba(32, 216, 255, 0.3) 25%, rgba(32, 216, 255, 0.3) 26%, transparent 27%, transparent 74%, rgba(32, 216, 255, 0.3) 75%, rgba(32, 216, 255, 0.3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(32, 216, 255, 0.3) 25%, rgba(32, 216, 255, 0.3) 26%, transparent 27%, transparent 74%, rgba(32, 216, 255, 0.3) 75%, rgba(32, 216, 255, 0.3) 76%, transparent 77%, transparent)",
                    backgroundSize: "50px 50px",
                }} />
            </div>

            {/* Floating neon orbs */}
            <div className="absolute inset-0 overflow-hidden">
                {[1, 2, 3, 4, 5].map((_, index) => (
                    <div key={index} className="absolute rounded-full blur-lg" style={{
                        width: `${Math.random() * 100 + 50}px`,
                        height: `${Math.random() * 100 + 50}px`,
                        background: index % 2 === 0 ? "rgba(255, 0, 255, 0.2)" : "rgba(0, 255, 255, 0.2)",
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`
                    }} />
                ))}
            </div>

            {/* Main container */}
            <div className="container mx-auto px-4 py-16 relative z-10 flex justify-center items-center h-screen">
                <div className="flex flex-col md:flex-row justify-center items-center gap-20 w-full h-full">

                    {/* Left side - Logo and button */}
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <div className="mb-6 relative animate-pulse">
                            <h1 className="text-6xl md:text-8xl font-bold" style={{
                                fontFamily: "'Futura', sans-serif",
                                fontWeight: "900",
                                letterSpacing: "2px",
                                color: "#ff00ff",
                                textShadow: "0 0 5px #ff00ff",
                            }}>
                                TAKARAKUJI
                            </h1>
                            <div className="absolute top-0 left-0 right-0 bottom-0 blur-xl opacity-70" style={{
                                background: "linear-gradient(90deg, #ff00ff, #00ffff)",
                                filter: "blur(20px)",
                                zIndex: -1
                            }}></div>
                        </div>

                        <p className="text-lg md:text-xl mb-12 text-center" style={{
                            color: "#00ffff",
                            textShadow: "0 0 5px #00ffff, 0 0 10px #00ffff",
                            fontFamily: "'Arial', sans-serif",
                            letterSpacing: "3px"
                        }}>
                            PICK YOUR NUMBERS • WIN THE JACKPOT
                        </p>

                        {/* Start button */}
                        <button
                            className="relative px-16 py-4 text-lg font-bold rounded-md transform transition-all duration-300"
                            style={{
                                background: "rgba(0, 0, 0, 0.7)",
                                color: "#00ffff",
                                border: "2px solid #00ffff",
                                boxShadow: isHovered ? "0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff" : "0 0 5px #00ffff",
                                textShadow: "0 0 5px #00ffff",
                                letterSpacing: "3px",
                                transform: isHovered ? "scale(1.05)" : "scale(1)"
                            }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onClick={() => {
                                // Navigate to the login page
                                window.location.href = '/signin';
                            }}
                        >
                            START
                        </button>
                    </div>

                    {/* Right side - Results */}
                    <div className="flex-1 flex flex-col items-center justify-center mt-12 md:mt-0">
                        {/* Last Draw */}
                        <div className="mb-12 w-full max-w-md">
                            <h2 className="text-white text-2xl mb-4" style={{
                                color: "#ffcc00",
                                textShadow: "0 0 5px #ffcc00"
                            }}>LAST DRAW</h2>
                            <div className="p-4 flex justify-center gap-2" style={{
                                background: "rgba(0, 0, 0, 0.5)",
                                boxShadow: "0 0 10px rgba(0, 255, 255, 0.5), inset 0 0 10px rgba(0, 255, 255, 0.2)",
                                borderRadius: "10px",
                                border: "1px solid rgba(0, 255, 255, 0.3)"
                            }}>
                                {[12, 9, 43, 19, 22, 6].map((num, idx) => (
                                    <div
                                        key={idx}
                                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
                                        style={{
                                            background: "rgba(0,0,0,0.7)",
                                            border: "1px solid rgba(0, 255, 255, 0.5)",
                                            boxShadow: "0 0 5px rgba(0, 255, 255, 0.5)",
                                            color: "#00ffff",
                                            textShadow: "0 0 5px #00ffff"
                                        }}
                                    >
                                        {num}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Draw Countdown with neon effects */}
                        <div className="w-full max-w-md">
                            <h2 className="text-white text-2xl mb-4" style={{
                                color: "#ffcc00",
                                textShadow: "0 0 5px #ffcc00"
                            }}>DRAW COUNTDOWN</h2>
                            <div className="p-6 flex justify-center gap-8" style={{
                                background: "rgba(0, 0, 0, 0.5)",
                                boxShadow: "0 0 10px rgba(255, 0, 255, 0.5), inset 0 0 10px rgba(255, 0, 255, 0.2)",
                                borderRadius: "10px",
                                border: "1px solid rgba(255, 0, 255, 0.3)"
                            }}>
                                <div className="text-center">
                                    <div className="w-24 h-24 flex items-center justify-center text-6xl font-bold rounded-md" style={{
                                        background: "rgba(0,0,0,0.7)",
                                        border: "1px solid rgba(255, 0, 255, 0.5)",
                                        boxShadow: "0 0 10px rgba(255, 0, 255, 0.5)",
                                        color: "#ff00ff",
                                        textShadow: "0 0 5px #ff00ff, 0 0 10px #ff00ff",
                                    }}>
                                        {formatTime(minutes)}
                                    </div>
                                    <p className="mt-2" style={{
                                        color: "#ff00ff",
                                        textShadow: "0 0 5px #ff00ff"
                                    }}>MINUTES</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-24 h-24 flex items-center justify-center text-6xl font-bold rounded-md" style={{
                                        background: "rgba(0,0,0,0.7)",
                                        border: "1px solid rgba(255, 0, 255, 0.5)",
                                        boxShadow: "0 0 10px rgba(255, 0, 255, 0.5)",
                                        color: "#ff00ff",
                                        textShadow: "0 0 5px #ff00ff, 0 0 10px #ff00ff",
                                    }}>
                                        {formatTime(seconds)}
                                    </div>
                                    <p className="mt-2" style={{
                                        color: "#ff00ff",
                                        textShadow: "0 0 5px #ff00ff"
                                    }}>SECONDS</p>
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
                        color: "#ff00ff",
                        textShadow: "0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff, 0 0 40px #ff00ff",
                        animation: "pulse 0.5s infinite alternate"
                    }}>
                        TIMES UP!
                    </div>
                </div>
            )}

            {/* CSS for floating animation */}
            <style jsx="true">{`
                @keyframes float {
                    0% { transform: translateY(0px) translateX(0px); }
                    50% { transform: translateY(-20px) translateX(10px); }
                    100% { transform: translateY(0px) translateX(0px); }
                }
                @keyframes pulse {
                    0% { opacity: 0.5; transform: scale(0.95); }
                    100% { opacity: 1; transform: scale(1.05); }
                }
            `}</style>
        </div>
    );
};

export default LandingPage;