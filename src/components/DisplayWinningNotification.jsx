import React from 'react';
import { PartyPopper, Award, X } from 'lucide-react';

const WinningNotification = ({
    username = "CyberPlayer88",
    winAmount = "₱10,000.00",
    winningNumbers = [12, 9, 43, 19, 22, 6],
    onClose
}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 backdrop-blur-sm">
            <div
                className="bg-gray-900 border-2 border-fuchsia-500 rounded-lg p-6 w-full max-w-md relative overflow-hidden"
                style={{
                    boxShadow: "0 0 40px rgba(255, 20, 147, 0.6)",
                    backgroundImage: "radial-gradient(circle at center, rgba(15,15,40,1) 0%, rgba(9,9,45,1) 100%)",
                }}
            >
                {/* Background effects */}
                <div className="absolute w-40 h-40 rounded-full bg-fuchsia-600 blur-3xl opacity-20 -top-10 -left-10"></div>
                <div className="absolute w-40 h-40 rounded-full bg-cyan-500 blur-3xl opacity-20 -bottom-10 -right-10"></div>

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-white z-10"
                >
                    <X size={24} />
                </button>

                {/* Content */}
                <div className="flex flex-col items-center text-center relative z-10">
                    <div className="mb-2 flex justify-center">
                        <PartyPopper size={40} className="text-yellow-400 mr-2" />
                        <Award size={40} className="text-cyan-400" />
                    </div>

                    <h2
                        className="text-3xl font-bold mb-2"
                        style={{
                            color: "#ff1493",
                            textShadow: "0 0 10px rgba(255, 20, 147, 0.7), 0 0 20px rgba(255, 20, 147, 0.5)"
                        }}
                    >
                        CONGRATULATIONS!
                    </h2>

                    <p className="text-cyan-300 text-xl mb-3">
                        <span className="text-yellow-400 font-bold">{username}</span>
                    </p>

                    <p className="text-cyan-300 text-lg mb-4">You've won:</p>

                    <div
                        className="bg-black bg-opacity-50 border border-cyan-700 rounded-lg p-4 mb-5 w-full"
                        style={{
                            boxShadow: "0 0 15px rgba(8, 145, 178, 0.2) inset"
                        }}
                    >
                        <p className="text-gray-400 text-sm font-mono uppercase tracking-wider">Prize Amount</p>
                        <p
                            className="text-4xl font-bold text-yellow-400"
                            style={{
                                textShadow: "0 0 10px rgba(250, 204, 21, 0.5)"
                            }}
                        >
                            {winAmount}
                        </p>
                    </div>

                    <div className="mb-5 w-full">
                        <p className="text-gray-400 text-sm font-mono uppercase tracking-wider mb-2">Winning Combination</p>
                        <div className="flex justify-center space-x-2">
                            {winningNumbers.map((num, index) => (
                                <div
                                    key={index}
                                    className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-cyan-400 font-bold border border-cyan-800"
                                    style={{
                                        boxShadow: "0 0 10px rgba(34, 211, 238, 0.3)"
                                    }}
                                >
                                    {num}
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        className="py-3 px-8 w-full bg-transparent border-2 border-cyan-500 rounded-md text-cyan-400 font-bold tracking-wide hover:bg-cyan-900 hover:bg-opacity-30 transition-all transform hover:scale-105"
                        style={{
                            textShadow: "0 0 5px rgba(34, 211, 238, 0.5)",
                            boxShadow: "0 0 10px rgba(34, 211, 238, 0.3)"
                        }}
                    >
                        CLAIM NOW
                    </button>

                    <div className="mt-6 text-sm text-gray-400">
                        Funds will be added to your account within 24 hours
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WinningNotification;