import React, { useState } from "react";
import { motion } from "framer-motion";
import bgImage from "../assets/bgimage.jpg"; // Add a relevant image

const ChallengeSetup = () => {
  const [habit, setHabit] = useState("");
  const [days, setDays] = useState("");
  const [minutes, setMinutes] = useState("");
  const [hearts, setHearts] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const habitOptions = ["Meditation", "Running", "Reading", "Workout", "Journaling", "Yoga", "Drink Water"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (habit && days && minutes) {
      setHearts(hearts + 10);
      setSubmitted(true);
    } else {
      alert("Please fill in all fields!");
    }
  };

  const resetChallenge = () => {
    setHabit("");
    setDays("");
    setMinutes("");
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl flex flex-col md:flex-row overflow-hidden"
      >
        {/* Left: Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          {!submitted ? (
            <>
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center md:text-left">
                🌿 Start Your Wellness Challenge
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4 w-full">
                <div>
                  <label className="block text-gray-700 mb-1">Select Habit</label>
                  <select
                    value={habit}
                    onChange={(e) => setHabit(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  >
                    <option value="">Choose a habit</option>
                    {habitOptions.map((h) => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Duration (days)</label>
                  <input
                    type="number"
                    min="1"
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Time per Day (minutes)</label>
                  <input
                    type="number"
                    min="5"
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-teal-500 text-white font-semibold rounded-xl py-2 mt-4 hover:bg-teal-600 transition duration-200"
                >
                  Start Challenge 🚀
                </button>
              </form>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center md:text-left"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">🎉 Challenge Started!</h2>
              <p className="text-gray-700 mb-2">Habit: <span className="font-semibold">{habit}</span></p>
              <p className="text-gray-700 mb-2">Duration: <span className="font-semibold">{days}</span> days</p>
              <p className="text-gray-700 mb-4">Daily Goal: <span className="font-semibold">{minutes}</span> minutes</p>

              <div className="flex items-center text-red-500 text-3xl mb-4">
                ❤️ {hearts} Hearts Earned
              </div>

              <button
                onClick={resetChallenge}
                className="bg-gray-200 text-gray-700 rounded-xl px-4 py-2 hover:bg-gray-300 transition"
              >
                Create New Challenge
              </button>
            </motion.div>
          )}
        </div>

        {/* Right: Image */}
        <div
          className="hidden md:block w-full md:w-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        ></div>
      </motion.div>
    </div>
  );
};

export default ChallengeSetup;
