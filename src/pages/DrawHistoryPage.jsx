import React from "react";
import { Menu, Calendar, Trophy, Hash } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DrawHistoryPage = () => {
  
  const navigate = useNavigate();
  const drawHistory = [
    {
      id: 1,
      date: "2023-10-01",
      numbers: [7, 14, 21, 28, 35, 42],
      prize: "₱1,000,000",
    },
    {
      id: 2,
      date: "2023-09-28",
      numbers: [3, 9, 18, 27, 36, 45],
      prize: "₱500,000",
    },
    {
      id: 3,
      date: "2023-09-25",
      numbers: [5, 10, 15, 20, 25, 30],
      prize: "₱250,000",
    },
    {
      id: 4,
      date: "2023-09-22",
      numbers: [2, 4, 8, 16, 32, 64],
      prize: "₱100,000",
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

      {/* Wrapper div for header and draw history */}
      <div className="relative z-10">
        {/* Header */}
        <header className="p-5 flex justify-between items-center">
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
          <div
            className="text-3xl cursor-pointer"
            style={{
              color: "#00ffff",
              textShadow: "0 0 5px #00ffff",
            }}
          >
            <Menu size={32} /> {/* Lucide Menu Icon */}
          </div>
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
              className="text-3xl mb-8 flex items-center gap-2"
              style={{
                color: "#ff00ff",
                textShadow: "0 0 5px #ff00ff, 0 0 10px #ff00ff",
                letterSpacing: "2px",
              }}
            >
              <Calendar size={32} /> {/* Lucide Calendar Icon */}
              Draw History
            </h2>

            {/* Draw history table */}
            <div className="space-y-4">
              {drawHistory.map((draw) => (
                <div
                  key={draw.id}
                  className="p-4 rounded-md"
                  style={{
                    background: "rgba(30, 30, 50, 0.7)",
                    border: "1px solid rgba(0, 255, 255, 0.5)",
                    boxShadow:
                      "0 0 5px rgba(0, 255, 255, 0.5), inset 0 0 5px rgba(0, 255, 255, 0.2)",
                  }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <p
                      className="text-xl flex items-center gap-2"
                      style={{
                        color: "#00ffff",
                        textShadow: "0 0 3px #00ffff",
                      }}
                    >
                      <Calendar size={20} /> {/* Lucide Calendar Icon */}
                      Draw Date:{" "}
                      <span style={{ color: "#ffffff" }}>{draw.date}</span>
                    </p>
                    <p
                      className="text-xl flex items-center gap-2"
                      style={{
                        color: "#00ffff",
                        textShadow: "0 0 3px #00ffff",
                      }}
                    >
                      <Trophy size={20} /> {/* Lucide Trophy Icon */}
                      Prize:{" "}
                      <span style={{ color: "#ffffff" }}>{draw.prize}</span>
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    {draw.numbers.map((number, index) => (
                      <div
                        key={index}
                        className="p-2 rounded-full flex items-center justify-center"
                        style={{
                          width: "40px",
                          height: "40px",
                          background: "rgba(255, 0, 255, 0.3)",
                          border: "1px solid rgba(255, 0, 255, 0.5)",
                          boxShadow: "0 0 5px rgba(255, 0, 255, 0.5)",
                          color: "#ffffff",
                          textShadow: "0 0 5px #ffffff",
                        }}
                      >
                        <Hash size={16} /> {/* Lucide Hash Icon */}
                        {number}
                      </div>
                    ))}
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