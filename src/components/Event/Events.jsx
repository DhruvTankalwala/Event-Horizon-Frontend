import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {  Search ,Plus } from "lucide-react"
import { Loader, EventCard , Button} from "../index"
import { getAllEvents } from "../../apiEndPoints"
import toast from "react-hot-toast"
import { EventRegistrationForm } from "./components/EventRegistrationForm"
import { CreateEventForm } from "./components/CreateEventForm"

// User accept thaye pachi aj count vadhvo joiye

export default function EventsComponent() {
  const[loading,setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("UPCOMING")
  const [events, setEvents] = useState([])
  const [modifiedEvent , setModifiedEvent] = useState(false);
  const [isCreateFormOpen , setIsCreateFormOpen] = useState(null);

  const userRole = localStorage.getItem("userRole")

  useEffect(()=>{
       const fetchAllEvents = async()=>{
            setLoading(true)
            const res = await getAllEvents();
            setLoading(false)
            if(res.statusCode==200){
                
                setEvents(res.data);
            }else{
                toast.error(res.message)
            }
        }
        fetchAllEvents();
  },[modifiedEvent])
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
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.h1
          layout
          className="text-4xl md:text-5xl font-bold text-center text-white mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          Explore Events
        </motion.h1>
  
        {/* Search Bar */}
        <motion.div
          layout
          className="mb-8 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
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
  
        {/* Tabs */}
        <motion.div
          layout
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
        >
          {eventStatus.map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 mx-2 rounded-full text-sm font-medium hover:cursor-pointer`}
              variants={tabVariants}
              animate={activeTab === tab ? "active" : "inactive"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Events
            </motion.button>
          ))}
        </motion.div>
  
        {/* Create Event Button */}
        {
          userRole == "CLUB_ADMIN" &&
          <div className="flex justify-end mb-4">
          <Button
            onClick={() => setIsCreateFormOpen(true)}
            className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-3 py-2 hover:cursor-pointer"
          >
            <Plus size={16} className="mr-2" /> Create Event
          </Button>
        </div>
        }
  
        {/* Event List with Smooth Transitions */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeTab}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredEvents.map((event) => (
              <EventCard key={event.id} eventDetails={event} setEvents={setEvents} />
            ))}
          </motion.div>
        </AnimatePresence>
      </main>
  
      {/* Create Event Modal */}
      <AnimatePresence>
        {isCreateFormOpen && (
          <CreateEventForm onClose={() => setIsCreateFormOpen(false)} setEvents={setEvents} />
        )}
      </AnimatePresence>
    </div>
  );  
}

