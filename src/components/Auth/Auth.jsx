import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import SignUpForm from "./components/SignUpForm/components/SignUpForm"
import LoginForm from "./components/LoginForm/components/LoginForm"

export default function Auth() {
  const [isLoginForm, setIsLoginForm] = useState(true)

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F0F1A] overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/stars.png')] opacity-50"></div>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{ x: Math.random() * window.innerWidth, y: -10 }}
            animate={{
              y: window.innerHeight + 10,
              x: `calc(${Math.random() * 100}vw)`,
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </div>
      <div className="relative z-10 w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center p-4 sm:p-8">
        <motion.div
          className="w-full lg:w-1/2 mb-8 lg:mb-0 lg:pr-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 text-center lg:text-left text-white font-space"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Event Horizon
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl lg:text-2xl text-gray-300 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Embark on a journey through a universe of events and connections.
          </motion.p>
          <div className="mt-8 flex justify-center lg:justify-start">
            <motion.div
              className="w-64 h-64 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 opacity-20 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          </div>
        </motion.div>
        <motion.div
          className="w-full sm:w-96 lg:w-1/2 p-8 rounded-lg shadow-2xl backdrop-blur-md bg-opacity-30 bg-gray-900 relative overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full filter blur-3xl opacity-20" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-cyan-500 to-purple-500 rounded-full filter blur-3xl opacity-20" />
          <h2 className="text-3xl font-bold mb-6 text-center text-white">
            {isLoginForm ? "Welcome Back!" : "Join the Community"}
          </h2>
          <AnimatePresence mode="wait">
            <motion.div
              key={isLoginForm ? "login" : "signup"}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {isLoginForm ? <LoginForm /> : <SignUpForm />}
            </motion.div>
          </AnimatePresence>
          <motion.button
            className="mt-4 text-sm text-gray-400 hover:text-white transition-colors duration-300 block mx-auto"
            onClick={() => setIsLoginForm(!isLoginForm)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoginForm ? "Don't have an account? Sign up" : "Already have an account? Log in"}
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

