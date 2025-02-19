import  React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import {Input , Button} from "../../index"
import { registerForEvent } from "../../../apiEndPoints"

export function EventRegistrationForm({ eventId,eventName, onClose,setRegistrations }){
  const [semester, setSemester] = useState("")
  const [reason, setReason] = useState("")

  const handleSubmit = async(e) => {
    e.preventDefault()
    const res = await registerForEvent(eventId,{semester,customAnswer:reason});
    console.log("Form submitted:", res.data);
    onClose();
    setRegistrations((prev)=>prev+1);
  }

  return (
    <motion.div
      className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gray-900 rounded-lg p-8 w-full max-w-md relative overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 15 }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors hover:cursor-pointer">
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6 text-center">Register for {eventName}</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="semester" className="block text-sm font-medium text-gray-300 mb-1">
              Semester
            </label>
            <Input
              id="semester"
              type="text"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              placeholder="e.g., Fall 2023"
            />
          </div>

          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-gray-300 mb-1">
              Why would you like to be a part of this event?
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 min-h-[100px] resize-y"
              placeholder="Share your reasons for joining..."
            />
          </div>

          <Button
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-md shadow-md hover:from-purple-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition-all duration-300"
          >
            Submit Registration
          </Button>
        </form>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500" />
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500" />
        <div className="absolute top-2 left-2 w-2 h-16 bg-gradient-to-b from-purple-500 to-cyan-500" />
        <div className="absolute top-2 right-2 w-2 h-16 bg-gradient-to-b from-cyan-500 to-purple-500" />
      </motion.div>
    </motion.div>
  )
}

