import React, { useEffect , useState } from 'react'
import { useParams } from 'react-router-dom'
import { getEventDetailsApi } from '../../../apiEndPoints';
import  { Loader , EventRegistrationForm } from "../../index" 
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const EventDetailsComponent = () => {
    const {eventId} = useParams();
    const [event,setEvent] = useState({});
    const [loading , setLoading] = useState(true);
    const [isOpen , setIsOpen]  = useState(false)
    useEffect(()=>{
        const fetchEventDetails = async()=> {
        setLoading(true);
        const res = await getEventDetailsApi(eventId);
        setLoading(false)
        if(res.statusCode == 200){
            setEvent(res.data)  
        }else{
            toast.error(res.message)
        }
    }
    fetchEventDetails();
    },[])
    if(loading)return <Loader />
    
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl"
          >
            <div className="relative h-64 md:h-96">
              <img src={event.imageUrl || "/placeholder.svg"} alt={event.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{event.name}</h1>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-300 mb-6">{event.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-300">
                  <Calendar className="w-5 h-5 mr-2 text-purple-500" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Clock className="w-5 h-5 mr-2 text-purple-500" />
                  <span>{event.startTime} - {event.endTime} </span>
                </div>
                <div className="flex items-center text-gray-300">
                  <MapPin className="w-5 h-5 mr-2 text-purple-500" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Users className="w-5 h-5 mr-2 text-purple-500" />
                  <span>
                    {event.completedRegistrations} / {event.totalRegistrations} registered
                  </span>
                </div>
              </div>
  
              <h2 className="text-2xl font-bold text-white mb-4">Speakers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {event.speakers.map((speaker, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white">{speaker.name}</h3>
                        <p className="text-gray-400">
                          {speaker.position} at {speaker.company}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-300">{speaker.bio}</p>
                  </div>
                ))}
              </div>
  
              
  
              {/* <h2 className="text-2xl font-bold text-white mb-4">Target Audience</h2>
              <p className="text-gray-300 mb-6">{event.targetAudience}</p> */}
  
              {/* <h2 className="text-2xl font-bold text-white mb-4">Requirements</h2>
              <ul className="list-disc list-inside text-gray-300 mb-6">
                {event.requirements.map((item, index) => (
                  <li key={index} className="mb-2">
                    {item}
                  </li>
                ))}
              </ul> */}
  
              <motion.button
                className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-md shadow-md hover:from-purple-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Register for Event
              </motion.button>
            </div>
          </motion.div>
        </main>
        
      </div>
    )
}

export default EventDetailsComponent
