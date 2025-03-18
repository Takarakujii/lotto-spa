import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const DrawPage = () => {
  const [selectedNumbers, setSelectedNumbers] = useState(Array(6).fill(null));
  const [activeModalIndex, setActiveModalIndex] = useState(null);

  const handleOpenModal = (index) => {
    setActiveModalIndex(index);
  };

  const handleCloseModal = () => {
    setActiveModalIndex(null);
  };

  const handleSelectNumber = (number) => {
    const newSelectedNumbers = [...selectedNumbers];
    newSelectedNumbers[activeModalIndex] = number;
    setSelectedNumbers(newSelectedNumbers);
    setActiveModalIndex(null);
  };

  const handleReset = () => {
    setSelectedNumbers(Array(6).fill(null));
  };

  // Generate numbers 1-45 for lottery selection
  const numberOptions = Array.from({ length: 45 }, (_, i) => i + 1);

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

      {/* Grid overlay */}
      <div className="absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(rgba(75, 75, 155, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(75, 75, 155, 0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}>
      </div>

      <div className="container mx-auto px-4 py-6 relative z-10">
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

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            {/* Draw Ticket Section */}
            <div>
              <h2 className="text-yellow-500 text-3xl mb-4 font-light">Draw Ticket</h2>
              <div className="p-4 rounded-lg border-2 border-gray-700 bg-gray-800 bg-opacity-30 backdrop-blur-sm flex justify-between">
                {selectedNumbers.map((number, index) => (
                  <div
                    key={index}
                    className={`w-12 h-12 rounded-md flex items-center justify-center cursor-pointer transition-all hover:shadow-lg hover:shadow-cyan-500/50 ${number === null ? 'bg-gray-300' : 'bg-cyan-200 text-gray-900 font-bold'
                      }`}
                    onClick={() => handleOpenModal(index)}
                  >
                    {number !== null && number}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-10 justify-center">
              <button
                className="px-20 py-4 border-2 border-fuchsia-500 rounded-md text-fuchsia-400 font-bold tracking-widest text-xl hover:bg-cyan-900 hover:bg-opacity-30 transition-all transform hover:scale-105"
                style={{
                  textShadow: "0 0 10px #ff00ff, 0 0 10px #ff00ff",
                  boxShadow: "0 0 10px rgba(255, 0, 255, 0.5)",
                }}
                onClick={handleReset}
              >
                Reset
              </button>
              <button
                className="px-20 py-4 border-2 border-cyan-500 rounded-md text-cyan-400 font-bold tracking-widest text-xl hover:bg-cyan-900 hover:bg-opacity-30 transition-all transform hover:scale-105"
                style={{
                  textShadow: "0 0 10px rgba(34, 211, 238, 0.5)",
                  boxShadow: "0 0 15px rgba(34, 211, 238, 0.3)"
                }}
              >
                Place Bet
              </button>
            </div>

            {/* Account Info - Redesigned */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Account Balance - Restyled */}
              <div className="p-4 rounded-lg border-2 border-cyan-700 bg-gray-800 bg-opacity-30 backdrop-blur-sm h-64"
                style={{
                  boxShadow: "0 0 15px rgba(8, 145, 178, 0.2) inset"
                }}>
                <div className="p-4 rounded-lg bg-black bg-opacity-50 mb-3 border border-cyan-800 h-full flex flex-col justify-between">
                  <div>
                    <p className="text-cyan-400 mb-1 font-mono uppercase tracking-wider text-sm">Account Balance</p>
                    <p className="text-white text-3xl font-bold" style={{
                      textShadow: "0 0 5px rgba(255, 255, 255, 0.5)"
                    }}>₱500.00</p>
                  </div>
                  <div className="pt-3 border-t border-cyan-900">
                    <p className="text-cyan-200 text-xs font-mono">Last transaction: <span className="text-yellow-400">-₱50.00</span></p>
                  </div>
                </div>
              </div>

              {/* Action Buttons - Restyled */}
              <div className="p-4 rounded-lg border-2 border-fuchsia-900 bg-gray-800 bg-opacity-30 backdrop-blur-sm flex flex-col justify-between h-64"
                style={{
                  boxShadow: "0 0 15px rgba(112, 26, 117, 0.2) inset"
                }}>
                <button
                  className="py-3 px-4 bg-transparent border border-yellow-500 rounded-md text-yellow-400 font-mono tracking-wide hover:bg-yellow-900 hover:bg-opacity-20 transition-all transform hover:scale-105 flex justify-between items-center"
                  style={{
                    textShadow: "0 0 5px rgba(250, 204, 21, 0.5)"
                  }}
                >
                  <span>HISTORY</span>
                  <span>→</span>
                </button>
                <button
                  className="py-3 px-4 bg-transparent border border-red-500 rounded-md text-red-400 font-mono tracking-wide hover:bg-red-900 hover:bg-opacity-20 transition-all transform hover:scale-105 flex justify-between items-center"
                  style={{
                    textShadow: "0 0 5px rgba(248, 113, 113, 0.5)"
                  }}
                >
                  <span>LOGOUT</span>
                  <span>→</span>
                </button>
                <button
                  className="py-3 px-4 bg-transparent border border-green-500 rounded-md text-green-400 font-mono tracking-wide hover:bg-green-900 hover:bg-opacity-20 transition-all transform hover:scale-105 flex justify-between items-center"
                  style={{
                    textShadow: "0 0 5px rgba(74, 222, 128, 0.5)"
                  }}
                >
                  <span>TOP UP</span>
                  onClick={() => handleButtonClick(text)} 
                  <span>→</span>
                </button>
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
              <h2 className="text-yellow-400 text-3xl mb-4 font-light pt-11" style={{
                textShadow: "0 0 10px rgba(250, 204, 21, 0.5)"
              }}>DRAW COUNTDOWN</h2>
              <div className="p-4 rounded-lg border-2 border-fuchsia-900 bg-gray-800 bg-opacity-30 backdrop-blur-sm h-64 flex items-center justify-center"
                style={{
                  boxShadow: "0 0 15px rgba(112, 26, 117, 0.2) inset"
                }}>
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

      {/* Number Selection Modal */}
      {activeModalIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 border-2 border-cyan-500 rounded-lg p-6 w-full max-w-lg relative"
            style={{
              boxShadow: "0 0 30px rgba(34, 211, 238, 0.4)"
            }}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-cyan-400 text-xl font-bold">Select Number</h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-5 gap-3">
              {numberOptions.map(num => (
                <button
                  key={num}
                  className="w-12 h-12 rounded-md bg-gray-800 flex items-center justify-center text-white font-bold hover:bg-cyan-700 transition-all transform hover:scale-110"
                  onClick={() => handleSelectNumber(num)}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DrawPage;