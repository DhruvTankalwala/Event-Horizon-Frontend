"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar , Footer, GradientBackground } from "../index"
import { BarChart2 } from "lucide-react"


const initialPolls = [
  {
    id: 1,
    question: "How often do you attend campus events?",
    options: [
      { id: 1, text: "More than once a week", votes: 45 },
      { id: 2, text: "More than once a month", votes: 63 },
      { id: 3, text: "Less than once a week", votes: 25 },
      { id: 4, text: "I don't attend events", votes: 5 },
    ],
    totalVotes: 138,
    userVoted: false,
  },
  {
    id: 2,
    question: "Which new facility would you like to see on campus?",
    options: [
      { id: 1, text: "24/7 Study Space", votes: 82 },
      { id: 2, text: "Fitness Center", votes: 67 },
      { id: 3, text: "Innovation Lab", votes: 55 },
      { id: 4, text: "Student Lounge", votes: 43 },
    ],
    totalVotes: 247,
    userVoted: false,
  },
]

export default function Polls() {
  const [polls, setPolls] = useState(initialPolls)

  const handleVote = (pollId, optionId) => {
    setPolls(
      polls.map((poll) => {
        if (poll.id === pollId) {
          const updatedOptions = poll.options.map((option) =>
            option.id === optionId ? { ...option, votes: option.votes + 1 } : option,
          )
          return {
            ...poll,
            options: updatedOptions,
            totalVotes: poll.totalVotes + 1,
            userVoted: true,
          }
        }
        return poll
      }),
    )
  }

  const getPercentage = (votes, total) => {
    return Math.round((votes / total) * 100)
  }

  return (
    <div className="min-h-screen bg-[#0F0F1A] text-white font-space">
      <GradientBackground >
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <motion.h1
          className="text-5xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Active Polls
        </motion.h1>
        <div className="space-y-12">
          {polls.map((poll) => (
            <motion.div
              key={poll.id}
              className="bg-gray-900 rounded-xl p-8 shadow-xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">{poll.question}</h2>
                <div className="flex items-center text-gray-400">
                  <BarChart2 className="w-4 h-4 mr-2" />
                  <span>{poll.totalVotes} total votes</span>
                </div>
              </div>
              <div className="space-y-4">
                {poll.options.map((option) => (
                  <motion.div
                    key={option.id}
                    className="relative"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <button
                      onClick={() => !poll.userVoted && handleVote(poll.id, option.id)}
                      disabled={poll.userVoted}
                      className={`w-full text-left p-4 rounded-lg transition-all duration-300 relative z-10 ${
                        poll.userVoted ? "bg-transparent cursor-default" : "hover:bg-gray-800 cursor-pointer"
                      }`}
                    >
                      <div className="flex justify-between items-center relative z-10">
                        <span className="font-medium">{option.text}</span>
                        {poll.userVoted && (
                          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-cyan-400">
                            {option.votes} / {getPercentage(option.votes, poll.totalVotes)}%
                          </motion.span>
                        )}
                      </div>
                      {poll.userVoted && (
                        <motion.div
                          className="absolute top-0 left-0 h-full bg-cyan-500/20 rounded-lg z-0"
                          initial={{ width: 0 }}
                          animate={{ width: `${(option.votes / poll.totalVotes) * 100}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                      )}
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
      </GradientBackground>
    </div>
  )
}

