import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router";
import useAccountForm from "../service/useAccountForm";
import { useCountdown } from "../service/CountdownContext";
import { generateNewDraw, fetchLastWinningNumber, placeBet } from "../service/apiService";

const DrawPage = () => {
  const [selectedNumbers, setSelectedNumbers] = useState(Array(6).fill(null));
  const [activeModalIndex, setActiveModalIndex] = useState(null);
  const countdown = useCountdown();
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(1);
  const [animate, setAnimate] = useState(false);
  const [error, setError] = useState(null);
  const [insufficientFunds, setInsufficientFunds] = useState(false);
  const [lastDrawNumbers, setLastDrawNumbers] = useState([]);

  const { balance, handleAccountForm } = useAccountForm();
  const navigate = useNavigate();

  useEffect(() => {
    handleAccountForm();
  }, [handleAccountForm]);

  // Countdown logic
  useEffect(() => {
    const newMinutes = Math.floor(countdown / 60);
    const newSeconds = countdown % 60;
    setMinutes(newMinutes);
    setSeconds(newSeconds);

    if (countdown === 0) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 3000);
      handleGenerateNewDraw();
    }
  }, [countdown]);

  const handleGenerateNewDraw = async () => {
    try {
      const response = await generateNewDraw();
      if (response.success) {
        console.log("New draw generated:", response);
        // Refresh the last winning numbers after new draw
        handleFetchLastWinningNumber();
      } else {
        setError(response.message || "Failed to generate a new draw.");
      }
    } catch (error) {
      console.error("Error generating new draw:", error);
      setError(
        error.response?.data?.message ||
          "An error occurred while generating a new draw."
      );
    }
  };

  const handleFetchLastWinningNumber = async () => {
    try {
      const response = await fetchLastWinningNumber();
      if (response && response.lastDraw && response.lastDraw.winning_number) {
        const lastWinningNumber = response.lastDraw.winning_number.split("-").map(Number);
        setLastDrawNumbers(lastWinningNumber);
      } else {
        console.error("Unexpected API response structure:", response);
      }
    } catch (err) {
      console.error("Error fetching last draw:", err);
    }
  };

  useEffect(() => {
    handleFetchLastWinningNumber();
  }, []);

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  const handleButtonClick = (text) => {
    if (text === "Top Up") {
      navigate("/profile");
    } else if (text === "History") {
      navigate("/history");
    } else if (text === "Logout") {
      navigate("/signin");
    }
  };

  const handleOpenModal = (index) => {
    setActiveModalIndex(index);
    setError(null);
    setInsufficientFunds(false);
  };

  const handleCloseModal = () => {
    setActiveModalIndex(null);
  };

  const handleSelectNumber = (number) => {
    if (selectedNumbers.includes(number)) {
      setError("This number is already selected. Please choose a different number.");
      return;
    }

    const newSelectedNumbers = [...selectedNumbers];
    newSelectedNumbers[activeModalIndex] = number;
    setSelectedNumbers(newSelectedNumbers);
    setActiveModalIndex(null);
    setError(null);
  };

  const handleReset = () => {
    setSelectedNumbers(Array(6).fill(null));
    setError(null);
    setInsufficientFunds(false);
  };

  const numberOptions = Array.from({ length: 45 }, (_, i) => i + 1);

  const handleBet = async () => {
    setError(null);
    setInsufficientFunds(false);

    if (selectedNumbers.includes(null)) {
      setError("Please select all 6 numbers before placing a bet.");
      return;
    }

    if (balance < 50) {
      setError("Insufficient funds to place bet. Please top up your account.");
      setInsufficientFunds(true);
      return;
    }

    const formattedBetNumber = selectedNumbers
      .map((num) => String(num).padStart(2, "0"))
      .join("-");

    try {
      const response = await placeBet(formattedBetNumber);
      if (response.success) {
        console.log(response);
        handleAccountForm();
      } else {
        setError(response.message || "Bet failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during bet", error);
      setError(
        error.response?.data?.message ||
          "An error occurred while placing your bet."
      );

      if (error.response?.data?.message?.includes("insufficient")) {
        setInsufficientFunds(true);
      }
    }
  };

  const isNumberSelected = (number) => {
    return selectedNumbers.includes(number);
  };

  return (
    <div
      className="min-h-screen bg-gray-900 bg-opacity-95 relative overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(45deg, rgba(9,9,45,1) 0%, rgba(15,15,40,1) 100%)",
        backgroundSize: "cover",
      }}
    >
      {/* Glowing orbs background effect */}
      <div className="absolute w-40 h-40 rounded-full bg-blue-500 blur-3xl opacity-20 top-20 left-20"></div>
      <div className="absolute w-48 h-48 rounded-full bg-purple-600 blur-3xl opacity-20 bottom-40 right-20"></div>
      <div className="absolute w-36 h-36 rounded-full bg-blue-400 blur-3xl opacity-10 bottom-20 left-40"></div>
      <div className="absolute w-44 h-44 rounded-full bg-fuchsia-600 blur-3xl opacity-15 top-40 right-40"></div>

      <div className="container mx-auto px-4 py-6 relative z-10">
        {/* Grid overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(75, 75, 155, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(75, 75, 155, 0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            {/* Draw Ticket Section */}
            <div>
              <h2 className="text-yellow-400 text-3xl mb-4 font-light">
                DRAW TICKET
              </h2>
              <div className="p-4 rounded-lg border-2 border-gray-700 bg-gray-800 bg-opacity-30 backdrop-blur-sm flex justify-between">
                {selectedNumbers.map((number, index) => (
                  <div
                    key={index}
                    className={`w-12 h-12 rounded-md flex items-center justify-center cursor-pointer transition-all hover:shadow-lg ${
                      number === null
                        ? "bg-gray-300"
                        : insufficientFunds
                        ? "bg-red-300 text-gray-900 font-bold hover:shadow-red-500/50"
                        : "bg-green-300 text-gray-900 font-bold hover:shadow-green-500/50"
                    }`}
                    onClick={() => handleOpenModal(index)}
                  >
                    {number !== null && number}
                  </div>
                ))}
              </div>

              {/* Error message display */}
              {error && (
                <div
                  className={`mt-3 p-2 rounded-md text-center ${
                    insufficientFunds
                      ? "bg-red-900 bg-opacity-30 text-red-300"
                      : "bg-yellow-900 bg-opacity-30 text-yellow-300"
                  }`}
                >
                  {error}
                </div>
              )}
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
                className={`px-20 py-4 border-2 rounded-md font-bold tracking-widest text-xl hover:bg-opacity-30 transition-all transform hover:scale-105 ${
                  insufficientFunds
                    ? "border-red-500 text-red-400 hover:bg-red-900"
                    : "border-cyan-500 text-cyan-400 hover:bg-cyan-900"
                }`}
                style={{
                  textShadow: insufficientFunds
                    ? "0 0 10px rgba(248, 113, 113, 0.5)"
                    : "0 0 10px rgba(34, 211, 238, 0.5)",
                  boxShadow: insufficientFunds
                    ? "0 0 15px rgba(248, 113, 113, 0.3)"
                    : "0 0 15px rgba(34, 211, 238, 0.3)",
                }}
                onClick={handleBet}
              >
                Place Bet
              </button>
            </div>

            {/* Account Info - Redesigned */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Account Balance - Restyled */}
              <div
                className={`p-4 rounded-lg border-2 bg-gray-800 bg-opacity-30 backdrop-blur-sm h-64 ${
                  insufficientFunds ? "border-red-700" : "border-cyan-700"
                }`}
                style={{
                  boxShadow: insufficientFunds
                    ? "0 0 15px rgba(178, 8, 8, 0.2) inset"
                    : "0 0 15px rgba(8, 145, 178, 0.2) inset",
                }}
              >
                <div className="p-4 rounded-lg bg-black bg-opacity-50 mb-3 border border-cyan-800 h-full flex flex-col justify-between">
                  <div>
                    <p
                      className={`mb-1 font-mono uppercase tracking-wider text-sm ${
                        insufficientFunds ? "text-red-400" : "text-cyan-400"
                      }`}
                    >
                      Account Balance
                    </p>
                    <p
                      className={`text-3xl font-bold ${
                        insufficientFunds ? "text-red-300" : "text-white"
                      }`}
                      style={{
                        textShadow: "0 0 5px rgba(255, 255, 255, 0.5)",
                      }}
                    >
                      ₱{balance.toFixed(2)}
                    </p>

                    {insufficientFunds && (
                      <p className="text-red-400 text-sm mt-2">
                        Insufficient balance for ₱50 bet
                      </p>
                    )}
                  </div>
                  <div className="pt-3 border-t border-cyan-900">
                    <p className="text-cyan-200 text-xs font-mono">
                      Last transaction:{" "}
                      <span className="text-yellow-400">-₱50.00</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons - Restyled */}
              <div
                className="p-4 rounded-lg border-2 border-fuchsia-900 bg-gray-800 bg-opacity-30 backdrop-blur-sm flex flex-col justify-between h-64"
                style={{
                  boxShadow: "0 0 15px rgba(112, 26, 117, 0.2) inset",
                }}
              >
                {["History", "Logout", "Top Up"].map((text, index) => (
                  <button
                    key={index}
                    className={`py-3 px-4 bg-transparent border rounded-md font-mono tracking-wide hover:bg-opacity-20 transition-all transform hover:scale-105 flex justify-between items-center ${
                      text === "History"
                        ? "border-yellow-500 text-yellow-400"
                        : text === "Logout"
                        ? "border-red-500 text-red-400"
                        : insufficientFunds
                        ? "border-green-500 text-green-400 animate-pulse"
                        : "border-green-500 text-green-400"
                    }`}
                    style={{
                      textShadow: `0 0 5px ${
                        text === "History"
                          ? "rgba(250, 204, 21, 0.5)"
                          : text === "Logout"
                          ? "rgba(248, 113, 113, 0.5)"
                          : "rgba(74, 222, 128, 0.5)"
                      }`,
                    }}
                    onClick={() => handleButtonClick(text)}
                  >
                    <span>{text}</span>
                    <span>→</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-8">
            {/* Last Draw */}
            <div>
              <h2
                className="text-yellow-400 text-3xl mb-4 font-light"
                style={{
                  textShadow: "0 0 10px rgba(250, 204, 21, 0.5)",
                }}
              >
                LAST DRAW
              </h2>
              <div className="p-4 rounded-lg border-2 border-cyan-900 bg-gray-800 bg-opacity-30 backdrop-blur-sm flex justify-between">
                {lastDrawNumbers.map((num, index) => (
                  <div
                    key={index}
                    className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center text-cyan-400 font-bold border border-cyan-800"
                    style={{
                      boxShadow: "0 0 10px rgba(34, 211, 238, 0.3)",
                    }}
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>

            {/* Draw Countdown */}
            <div>
              <h2
                className="text-yellow-400 text-3xl mb-4 font-light pt-11"
                style={{
                  textShadow: "0 0 10px rgba(250, 204, 21, 0.5)",
                }}
              >
                DRAW COUNTDOWN
              </h2>
              <div
                className="p-4 rounded-lg border-2 border-fuchsia-900 bg-gray-800 bg-opacity-30 backdrop-blur-sm h-64 flex items-center justify-center"
                style={{
                  boxShadow: "0 0 15px rgba(112, 26, 117, 0.2) inset",
                }}
              >
                <div className="flex justify-center space-x-4">
                  <div className="w-32 h-32">
                    <div
                      className="w-full h-full bg-black border-2 border-fuchsia-500 rounded-md flex items-center justify-center text-6xl font-bold"
                      style={{
                        color: "#ff1493",
                        textShadow: "0 0 10px rgba(255, 20, 147, 0.7)",
                      }}
                    >
                      {formatTime(minutes)}
                    </div>
                    <p className="text-center text-gray-400 mt-2">MINUTES</p>
                  </div>

                  <div className="w-32 h-32">
                    <div
                      className="w-full h-full bg-black border-2 border-fuchsia-500 rounded-md flex items-center justify-center text-6xl font-bold"
                      style={{
                        color: "#ff1493",
                        textShadow: "0 0 10px rgba(255, 20, 147, 0.7)",
                      }}
                    >
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
          <div
            className="bg-gray-900 border-2 border-cyan-500 rounded-lg p-6 w-full max-w-lg relative"
            style={{
              boxShadow: "0 0 30px rgba(34, 211, 238, 0.4)",
            }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-cyan-400 text-xl font-bold">Select Number</h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            {/* Show error message in modal if a number is already selected */}
            {error && (
              <div className="mb-4 p-2 bg-red-900 bg-opacity-30 text-red-300 rounded-md text-center">
                {error}
              </div>
            )}

            <div className="grid grid-cols-5 gap-3">
              {numberOptions.map((num) => (
                <button
                  key={num}
                  className={`w-12 h-12 rounded-md flex items-center justify-center text-white font-bold transition-all transform hover:scale-110 ${
                    isNumberSelected(num)
                      ? "bg-green-600 cursor-not-allowed"
                      : "bg-gray-800 hover:bg-cyan-700"
                  }`}
                  onClick={() => handleSelectNumber(num)}
                  disabled={isNumberSelected(num)}
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