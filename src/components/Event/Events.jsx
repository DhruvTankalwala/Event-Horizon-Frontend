import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Clock, MapPin, Search } from "lucide-react"
import {Navbar,Footer, Loader, GradientBackground} from "../index"
import { getAllEvents } from "../../apiEndPoints"
import toast from "react-hot-toast"
import { EventRegistrationForm } from "./components/EventRegistrationForm"

// User accept thaye pachi aj count vadhvo joiye

export default function EventsComponent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("ONGOING")
  const [events, setEvents] = useState([])
  const [selectedEvent , setSelectedEvent] = useState(null);
  const [registrations , setRegistrations] = useState(null);
  
  const[loading,setLoading] = useState(false)
  useEffect(()=>{
       const fetchAllEvents = async()=>{
            setLoading(true)
            const res = await getAllEvents();
            setLoading(false)
            if(res.statusCode==200){
                toast.success(res.message)
                setEvents(res.data);
            }else{
                toast.error(res.message)
            }
        }
        fetchAllEvents();
  },[])
  const filteredEvents = events.filter(
    (event) =>
      (event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      event.status === activeTab,
  )

  const tabVariants = {
    active: { backgroundColor: "#8B5CF6", color: "#ffffff" },
    inactive: { backgroundColor: "#1F2937", color: "#9CA3AF" },
  }
  const eventStatus = ["ONGOING", "UPCOMING", "PAST"]

  if(loading){
    return <Loader />
  }
  return (
    
    <div className="min-h-screen flex flex-col bg-[#0F0F1A]">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center text-white mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Explore Events
        </motion.h1>
        <motion.div
          className="mb-8 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 px-4 pl-10 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" />
        </motion.div>
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {eventStatus.map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 mx-2 rounded-full text-sm font-medium`}
              variants={tabVariants}
              animate={activeTab === tab ? "active" : "inactive"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Events
            </motion.button>
          ))}
        </motion.div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                className="bg-gray-900 rounded-lg overflow-hidden shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative">
                  <img
                    src={event.imageUrl || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-0 right-0 bg-purple-500 text-white px-2 py-1 m-2 rounded-md text-sm">
                    {event.status}
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-white mb-2">{event.title}</h2>
                  <p className="text-gray-400 mb-4">{event.description}</p>
                  <div className="flex items-center text-gray-500 mb-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-500 mb-2">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{event.startTime} - {event.endTime}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-gray-500 mb-2">
                    <span className="font-medium">Organizing Club : </span> <span>{event.clubName}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <span className="font-medium">Registrations:</span>{" "}
                    <span>
                      {event.completedRegistrations}/{event.totalRegistrations}
                    </span>
                  </div>
                </div>
                <div className="px-6 py-4">
                  <motion.button
                    className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-md shadow-md hover:from-purple-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedEvent(event);
                      setRegistrations(event.completedRegistrations);
                    }}
                  >
                    {event.status === "PAST" ? "View Details" : event.registered == false ? "Register Now" : "Registered" }
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <AnimatePresence >
      {selectedEvent && (
          <EventRegistrationForm setRegistrations={setRegistrations} eventId={selectedEvent.id} eventName={selectedEvent.title} onClose={() => setSelectedEvent(null)} />
        )}
    </AnimatePresence>
    </div>
    

  )
}

