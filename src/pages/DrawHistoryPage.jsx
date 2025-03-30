import React, { useState } from "react";
import { Hash, Trophy, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const DrawHistoryPage = () => {
  const [navExpanded, setNavExpanded] = useState(false);
  const navigate = useNavigate();

  // Sample draw history data
  const drawHistory = [
    {
      id: 1,
      drawNumber: "D-2023-001",
      date: "2023-10-01",
      numbers: [7, 14, 21, 28, 35, 42],
      jackpot: "₱10,000,000",
      winners: 2,
    },
    {
      id: 2,
      drawNumber: "D-2023-002",
      date: "2023-09-28",
      numbers: [3, 9, 18, 27, 36, 45],
      jackpot: "₱8,500,000",
      winners: 1,
    },
    {
      id: 3,
      drawNumber: "D-2023-003",
      date: "2023-09-25",
      numbers: [5, 10, 15, 20, 25, 30],
      jackpot: "₱7,250,000",
      winners: 3,
    },
    {
      id: 4,
      drawNumber: "D-2023-004",
      date: "2023-09-22",
      numbers: [2, 4, 8, 16, 32, 64],
      jackpot: "₱5,100,000",
      winners: 0,
    },
  ];

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0a001a 0%, #1f0040 100%)",
      }}
    >
      {/* Neon grid lines in background */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div
          className="absolute w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(0deg, transparent 24%, rgba(32, 216, 255, 0.3) 25%, rgba(32, 216, 255, 0.3) 26%, transparent 27%, transparent 74%, rgba(32, 216, 255, 0.3) 75%, rgba(32, 216, 255, 0.3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(32, 216, 255, 0.3) 25%, rgba(32, 216, 255, 0.3) 26%, transparent 27%, transparent 74%, rgba(32, 216, 255, 0.3) 75%, rgba(32, 216, 255, 0.3) 76%, transparent 77%, transparent)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Floating neon orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {[1, 2, 3, 4, 5].map((_, index) => (
          <div
            key={index}
            className="absolute rounded-full blur-lg"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              background:
                index % 2 === 0
                  ? "rgba(255, 0, 255, 0.2)"
                  : "rgba(0, 255, 255, 0.2)",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${
                Math.random() * 10 + 10
              }s infinite ease-in-out`,
            }}
          />
        ))}
      </div>

      {/* Navbar component */}
      <Navbar onExpandChange={(expanded) => setNavExpanded(expanded)} />

      {/* Wrapper div for header and draw history */}
      <div
        className={`relative z-10 transition-all duration-300 ${
          navExpanded ? "pl-48" : "pl-16"
        }`}
      >
        {/* Header */}
        <header className="p-5">
          <h1
            className="text-4xl font-bold"
            style={{
              fontFamily: "'Futura', sans-serif",
              color: "#ff0044",
              textShadow: "0 0 5px #ff0044, 0 0 10px #ff0044",
            }}
          >
            TAKARAKUJI
          </h1>
        </header>

        {/* Main content - Draw History */}
        <main className="container mx-auto px-4 py-8">
          <div
            className="p-6 rounded-lg"
            style={{
              background: "rgba(0, 0, 0, 0.5)",
              boxShadow:
                "0 0 15px rgba(255, 0, 255, 0.5), inset 0 0 10px rgba(255, 0, 255, 0.2)",
              borderRadius: "10px",
              border: "1px solid rgba(255, 0, 255, 0.3)",
            }}
          >
            <h2
              className="text-3xl mb-8 flex items-center gap-3"
              style={{
                color: "#ff00ff",
                textShadow: "0 0 5px #ff00ff, 0 0 10px #ff00ff",
                letterSpacing: "2px",
              }}
            >
              <Calendar size={32} />
              Draw History
            </h2>

            {/* Draw history table */}
            <div className="space-y-6">
              {drawHistory.map((draw) => (
                <div
                  key={draw.id}
                  className="p-6 rounded-lg"
                  style={{
                    background: "rgba(30, 30, 50, 0.7)",
                    border: "1px solid rgba(0, 255, 255, 0.5)",
                    boxShadow:
                      "0 0 10px rgba(0, 255, 255, 0.3), inset 0 0 5px rgba(0, 255, 255, 0.2)",
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                      <p className="text-lg text-cyan-400 mb-1">Draw Number</p>
                      <p className="text-xl font-medium text-white">
                        {draw.drawNumber}
                      </p>
                    </div>

                    <div>
                      <p className="text-lg text-cyan-400 mb-1">Draw Date</p>
                      <p className="text-xl font-medium text-white">
                        {draw.date}
                      </p>
                    </div>

                    <div>
                      <p className="text-lg text-cyan-400 mb-1">Winners</p>
                      <p className="text-xl font-medium text-white">
                        {draw.winners > 0 ? (
                          <span className="text-green-400">{draw.winners}</span>
                        ) : (
                          <span className="text-red-400">No winners</span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-lg text-cyan-400 mb-2">
                      Winning Numbers
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {draw.numbers.map((number, index) => (
                        <div
                          key={index}
                          className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{
                            background: "rgba(255, 0, 255, 0.3)",
                            border: "1px solid rgba(255, 0, 255, 0.7)",
                            boxShadow: "0 0 8px rgba(255, 0, 255, 0.5)",
                            color: "#ffffff",
                            textShadow: "0 0 5px #ffffff",
                          }}
                        >
                          <Hash size={16} className="mr-1" />
                          {number}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg text-cyan-400 mb-1">
                        Jackpot Prize
                      </p>
                      <p className="text-2xl font-bold text-yellow-400 flex items-center">
                        <Trophy size={24} className="mr-2" />
                        {draw.jackpot}
                      </p>
                    </div>

                    <button
                      className="px-6 py-2 rounded-md font-medium transition-all"
                      style={{
                        background: "rgba(0, 255, 255, 0.1)",
                        border: "1px solid rgba(0, 255, 255, 0.5)",
                        color: "#00ffff",
                        boxShadow: "0 0 8px rgba(0, 255, 255, 0.3)",
                      }}
                      onClick={() => navigate(`/draw-details/${draw.id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* CSS for floating animation */}
      <style jsx="true">{`
        @keyframes float {
          0% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
          100% {
            transform: translateY(0px) translateX(0px);
          }
        }
      `}</style>
    </div>
  );
};

export default DrawHistoryPage;
