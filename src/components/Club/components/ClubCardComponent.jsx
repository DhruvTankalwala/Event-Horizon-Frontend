import { motion } from "framer-motion"
import { Users, Mail } from "lucide-react"
import { Link } from "react-router-dom"

export function ClubCard({ name, members, description, email, logoUrl, clubId }) {
  return (
    <Link to={`/clubs/${club.clubId}`}>
    <motion.div
      className="bg-gradient-to-br from-teal-900 to-blue-900 rounded-lg overflow-hidden shadow-lg transform perspective-1000"
      whileHover={{
        scale: 1.05,
        rotateX: 5,
        boxShadow: "0 25px 50px -12px rgba(0, 206, 209, 0.25)",
      }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="relative h-48 overflow-hidden">
        <img src={logoUrl || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-900 to-transparent"></div>
        <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">{name}</h3>
      </div>
      <div className="p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-teal-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="flex items-center justify-center text-teal-300 mb-2">
          <Users className="w-4 h-4 mr-2" />
          <span>{members} members</span>
        </div>
        <p className="text-gray-300 mb-4 text-center">{description}</p>
        <div className="flex items-center justify-center text-teal-300">
          <Mail className="w-4 h-4 mr-2" />
          <a href={`mailto:${email}`} className="hover:text-white transition-colors duration-300">
            {email}
          </a>
        </div>
        <div className="px-6 py-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to={`/club/${clubId}`}
              className="block w-full py-2 px-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-md shadow-md hover:from-cyan-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-75 transition-all duration-300 text-center"
            >
              View Club
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
    </Link>
  )
}

