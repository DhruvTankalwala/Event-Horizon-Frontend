import React, { useEffect ,useState } from 'react'
import { acceptEventRegistrationsApi, eventRegistrationsApi, rejectEventRegistrationsApi } from '../../apiEndPoints';
import {Button, Loader } from "../index"
import toast from 'react-hot-toast';
import { motion , AnimatePresence } from 'framer-motion';
import {  Search , ChevronDown, ChevronUp, Check, X } from "lucide-react"
const EventRegistrationsComponent = () => {
    const [registrations, setRegistrations] = useState([])
    const [loading,setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedEventId , setExpandedEventId] = useState(null);
    const filteredEvents = registrations.filter((event) => event.title.toLowerCase().includes(searchTerm.toLowerCase()))
    const fetchAllEventRegistrations = async ()=>{
        setLoading(true);
        const res = await eventRegistrationsApi();
        if(res.statusCode==200){
            setRegistrations(res.data);
            toast.success(res.message);
            setLoading(false)
        }else{
            toast.error(res.message)
        }
        console.log(res.data);
    }

    useEffect(()=>{
        fetchAllEventRegistrations();
    },[])

    const handleAccept = async(e ,id)=>{
        e.preventDefault();
        e.stopPropagation();
        console.log(id);
        
        const res = await acceptEventRegistrationsApi(id);
        if(res.statusCode==200){
            toast.success(res.message)
                setRegistrations(prev=>(
                    prev.map(registration=>({
                        ...registration ,
                        pendingRegistrations : registration.pendingRegistrations.filter(reg=>reg.id != id )
                    }))
                ))
        }
    }

    const handleDecline = async(e ,id)=>{
        e.preventDefault();
        e.stopPropagation();
        console.log(id);
        
        const res = await rejectEventRegistrationsApi(id);
        if(res.statusCode==200){
            toast.success(res.message)
                setRegistrations(prev=>(
                    prev.map(registration=>({
                        ...registration ,
                        pendingRegistrations : registration.pendingRegistrations.filter(reg=>reg.id != id )
                    }))
                ))
        }
    }

    if(loading){
        return <Loader/>
    }

  return (
    <div className="min-h-screen flex flex-col bg-[#0F0F1A]">
    <main className="flex-grow container mx-auto px-4 py-8">
    <motion.h1
          className="text-4xl md:text-5xl font-bold text-center text-white mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
            Manage Event Registrations
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
            value= {searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
            className="w-full py-2 px-4 pl-10 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        <Search className="absolute left-3 top-2.5 text-gray-400" />
        </motion.div>
        <AnimatePresence >
            {filteredEvents.map((event)=>(
                <motion.div 
                onClick={() => setExpandedEventId(expandedEventId === event.id ? null : event.id)}
                key={event.id}
                className="bg-gray-900 rounded-lg overflow-hidden shadow-lg mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                    <div className="p-6" >
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-white hover:text-purple-400 transition-colors">
                            {event.title}
                            </h2>
                            < button id = {event.id}
                                className="text-white focus:outline-none"
                            >
                            {expandedEventId == event.id ? <ChevronDown/> : <ChevronUp /> }
                            </button>
                        </div>
                        <p className="text-gray-400 mt-2">{event.date}</p>
                    </div>
                    <AnimatePresence>
                    {expandedEventId == event.id ? 
                        <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {registrations.map((registration)=>(
                             
                                registration["pendingRegistrations"].map((reg)=>{
                            
                                if(registration.id == expandedEventId){
                                    return (<motion.div
                                        key={reg.userEmail}
                                        className="border-t border-gray-800 p-6"
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                        >
                                            <h3 className="text-xl font-semibold text-white mb-2">{reg.userEmail}</h3>
                                            <p className="text-gray-400 mb-1">Semester: {reg.semester}</p>
                                            <p className="text-gray-400 mb-4">Reason: {reg.customAnswer}</p>                  
                                            <div className="flex space-x-4">
                          <Button 
                            className="bg-green-500 hover:bg-green-600 text-white"
                            onClick = {(e)=>{
                                handleAccept(e,reg.id)
                            }}
                          >
                            <Check className="mr-2 h-4 w-4" /> Accept
                          </Button>
                          <Button
                            className="bg-red-500 hover:bg-red-600 text-white"
                            onClick={(e)=>{
                                handleDecline(e,reg.id)
                            }}
                          >
                            <X className="mr-2 h-4 w-4" /> Decline
                          </Button>
                        </div>
                     </motion.div>)
                                }
                            })
                        ))}
                      </motion.div>
                        : null 
                    }
                    </AnimatePresence>
              </motion.div>
            ))}
        </AnimatePresence>
    </main>
    
    </div>
  )

}

export default EventRegistrationsComponent;
