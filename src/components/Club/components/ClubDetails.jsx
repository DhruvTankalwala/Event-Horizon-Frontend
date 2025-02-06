  import { useState, useEffect } from "react"
  import { motion, AnimatePresence } from "framer-motion"
  import { Calendar, Clock, MapPin, Users, Heart, MailIcon } from "lucide-react"
  import {Navbar , Footer , Loader , EventCard } from "../../index"
  import { getClubDetailsApi } from "../../../apiEndPoints"
  import { useParams } from "react-router-dom"
  import { Link } from "react-router-dom"
  import toast from "react-hot-toast"
  import MemberCard from "./MemberCard"
  const eventStatus = ["ONGOING", "UPCOMING", "PAST"]

  export default function ClubPage() {
    const [isLoading, setIsLoading] = useState(true)
    const [activeTab, setActiveTab] = useState("ONGOING")
    const {clubId}  = useParams();
    const [events , setEvents] = useState([]);
    const [clubData, setClubData] = useState({}); // <-- Store club details
    const [loading , setLoading] = useState(true)
    useEffect(()=>{
      const getClubDetails = async()=>{
        setLoading(true)
        const res  = await getClubDetailsApi(clubId);
        setLoading(false);
        if(res.statusCode == 200){
          toast.success(res.message)
          const {members,  eventsDTO }  = res.data;
          setEvents(eventsDTO);
          setClubData(res.data);
        }else{
          toast.error(res.message)
        }
        console.log(res.data);
        
      }
      getClubDetails();
    },[])
    const filteredEvents = events.filter((event) => event.status === activeTab)
    if(loading) return <Loader /> 
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
              {clubData.name}
            </h1>
            <p className="text-xl text-gray-300">{clubData.description}</p>
            <p className="text-xl text-gray-300">Email : {clubData.email}</p>
          </motion.div>

          <section className="mb-16">
            <motion.h2
              className="text-3xl font-bold text-white mb-8 text-center"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Club Events
            </motion.h2>
            
            <div className="flex justify-center mb-8">
              {eventStatus.map((tab) => (
                <motion.button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 mx-2 rounded-full text-sm font-medium ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`} 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab} Events
                </motion.button>
              ))}
            </div>

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
                  <EventCard
                      key={event.id}
                      eventDetails = {event}
                    />
                    ))}
              </motion.div>
            </AnimatePresence>
          </section>

          <section>
            <motion.h2
              className="text-3xl font-bold text-white mb-12 text-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Club Members
            </motion.h2>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {console.dir(clubData)}
              { clubData.members.length >0 && clubData.members.map((member) => (
                
                <MemberCard key={member.id} member={member} />
              ))}
            </motion.div>
          </section>
        </main>
        
      </div>
    )
  }
