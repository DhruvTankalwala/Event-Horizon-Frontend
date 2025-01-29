  import { useState, useEffect } from "react"
  import { motion, AnimatePresence } from "framer-motion"
  import { Calendar, Clock, MapPin, Users, Heart } from "lucide-react"
  import {Navbar , Footer , Loader , EventCard } from "../../index"
  import { getClubDetailsApi } from "../../../apiEndPoints"
  import { useParams } from "react-router-dom"
  const eventStatus = ["ONGOING", "UPCOMING", "PAST"]

  const MemberCard = ({ member }) => (
    <motion.div
      className="relative rounded-2xl overflow-hidden"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      style={{
        background: "linear-gradient(135deg, #2a1f62 0%, #ff6b9d 100%)",
      }}
    >
      <div className="p-6">
        <div className="relative">
          <motion.div
            className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-white/20"
            whileHover={{ scale: 1.1 }}
          >
            <img src={member.imageUrl || "/placeholder.svg"} alt={member.name} className="w-full h-full object-cover" />
          </motion.div>
          {/* Glow effect */}
          <div className="absolute -inset-1 rounded-full blur-xl bg-purple-500/30 -z-10" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h3 className="text-xl font-bold text-white mb-1">{member.email}</h3>
          <p className="text-purple-200 text-sm mb-3">{member.designation}</p>
          <div className="flex items-center justify-center gap-2 text-pink-300">
            <Heart className="w-4 h-4" />
            <span className="text-sm">{Math.floor(Math.random() * 100 + 20)}k</span>
          </div>
        </motion.div>
      </div>
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
    </motion.div>
  )

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
        const {members,  eventsDTO }  = res.data;
        console.log(res.data);
        setEvents(eventsDTO);
        setClubData(res.data);
      }
      getClubDetails();
    },[])
    const filteredEvents = events.filter((event) => event.status === activeTab)
    if(loading) return <Loader /> 
    return (
      <div className="min-h-screen flex flex-col bg-[#0F0F1A]">
        <Navbar />
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
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} Events
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
                      title={event.title}
                      date={event.date}
                      startTime={event.startTime}
                      endTime={event.endTime}
                      location={event.location}
                      description={event.description}
                      imageUrl={event.imageUrl}
                      completedRegistrations={event.completedRegistrations}
                      totalRegistrations={event.totalRegistrations}
                      organizingClub={name}
                    />))}
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
              {console.dir(clubData.members)}
              {clubData.members.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </motion.div>
          </section>
        </main>
        <Footer />
      </div>
    )
  }
