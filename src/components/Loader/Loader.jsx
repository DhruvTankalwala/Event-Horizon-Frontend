import  React from "react"
import { motion } from "framer-motion"


const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0F0F1A] bg-opacity-90 z-50">
      <div className="relative">
        <motion.div
          className="w-32 h-32 border-t-4 border-b-4 border-purple-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.div
          className="w-24 h-24 border-t-4 border-b-4 border-cyan-500 rounded-full absolute top-4 left-4"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full opacity-80" />
        </motion.div>
        <motion.div
          className="text-white text-2xl font-bold absolute bottom--10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          Loading...
        </motion.div>
      </div>
    </div>
  )
}
export default Loader

