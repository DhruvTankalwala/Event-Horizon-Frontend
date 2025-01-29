import { motion } from "framer-motion"
import { CalendarDays, Clock, MapPin, Users, Star } from 'lucide-react'

export function EventCard({ title, date, startTime , endTime, location, description, imageUrl, completedRegistrations, totalRegistrations, organizingClub}) {
  return (
    <motion.div
      className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-lg overflow-hidden shadow-lg transform perspective-1000"
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        boxShadow: "0 25px 50px -12px rgba(138, 43, 226, 0.25)",
      }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="relative">
        <img src={imageUrl || "/placeholder.svg"} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <span className="text-white text-lg font-bold">View Details</span>
        </div>
      </div>
      <div className="p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500 rounded-full filter blur-2xl opacity-20 animate-pulse"></div>
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300 mb-4">{description}</p>
        <div className="flex items-center text-purple-300 mb-2">
          <CalendarDays className="w-4 h-4 mr-2" />
          <span>{date}</span>
        </div>
        <div className="flex items-center text-purple-300 mb-2">
          <Clock className="w-4 h-4 mr-2" />
          <span>{startTime}- {endTime}</span>
        </div>
        <div className="flex items-center text-purple-300 mb-2">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{location}</span>
        </div>
        <div className="flex items-center text-purple-300 mb-2">
          <Users className="w-4 h-4 mr-2" />
          <span>{completedRegistrations} / {totalRegistrations} registered</span>
        </div>
        <div className="flex items-center text-purple-300 mb-4">
          <Star className="w-4 h-4 mr-2" />
          <span>Organized by: {organizingClub}</span>
        </div>
      </div>
    </motion.div>
  )
}
