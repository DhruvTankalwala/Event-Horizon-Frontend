
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {Navbar , Footer , Loader, GradientBackground} from '../index'
import { Users, Mail, Search } from "lucide-react"
import { getAllClubs } from "../../apiEndPoints"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"

export default function ClubsComponent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [clubsData, setClubsData] = useState([])
  useEffect(() => {
    
    const getAllClubDetails = async()=>{
      setIsLoading(true);
      const res = await getAllClubs();
      console.log(res);
      
      setIsLoading(false)
      if(res.statusCode == 200){
        setClubsData(res.data)
        toast.success(res.message)
      }else{
        toast.error(res.message)
      }
    }
    getAllClubDetails()
  }, [])

  const filteredClubs = clubsData.filter(
    (club) =>
      club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen flex flex-col ">
      {isLoading && <Loader />}
        <main className="flex-grow container mx-auto px-4 py-8">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-center text-white mb-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Explore Clubs
          </motion.h1>
          <motion.div
            className="mb-8 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <input
              type="text"
              placeholder="Search clubs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 px-4 pl-10 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" />
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            <AnimatePresence>
              {filteredClubs.map((club) => (
                
                <motion.div
                  key={club.clubId}
                  className="bg-gray-900 rounded-lg overflow-hidden shadow-lg"
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  exit={{ opacity: 0, y: -50 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="h-48 relative overflow-hidden group">
                    <img
                      src={club.icon || "/placeholder.svg"}
                      alt={club.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70" />
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      <h2 className="text-3xl font-bold text-white text-center px-4 drop-shadow-lg">{club.name}</h2>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-400 mb-4">{club.description}</p>
                    <div className="flex items-center text-gray-500 mb-2">
                      <Users className="w-4 h-4 mr-2" />
                      <span>{club.membersCount} members</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Mail className="w-4 h-4 mr-2" />
                      <a href={`mailto:${club.email}`} className="hover:text-cyan-500 transition-colors duration-300">
                        {club.email}
                      </a>
                    </div>
                  </div>
                  <Link to={`/clubs/${club.clubId}`}>
                  <div className="px-6 py-4">
                    <motion.button
                      className="w-full py-2 px-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-md shadow-md hover:from-cyan-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-75 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Club
                    </motion.button>
                  </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </main>
      </div>
    
      
  )
}

