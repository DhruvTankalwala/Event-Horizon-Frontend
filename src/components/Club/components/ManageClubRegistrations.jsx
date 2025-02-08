import React , {useEffect, useState}from 'react'
import { motion , AnimatePresence } from 'framer-motion'
import { Search, ChevronDown, ChevronUp, Check, X, Users, Mail, Calendar } from "lucide-react"
import {Input , Button, Loader} from "../../index"
import { acceptClubRegistrationApi, getAllClubsRegistrationsApi, rejectClubRegistrationApi } from '../../../apiEndPoints'
import toast from 'react-hot-toast'




const ManageClubRegistrations = () => {
    useEffect(()=>{
      const fetchAllClubRegistrations = async()=>{
        const res = await getAllClubsRegistrationsApi();
        if(res.statusCode==200){
          toast.success(res.message)
          setRegistrations(res.data)
          setLoading(false)
        }else{
          toast.error(res.message)
        }
      }
        fetchAllClubRegistrations();
    },[])
    const [expandedClub , setExpandedClub] = useState(null);
    const [registrations , setRegistrations] = useState([]) 
    const [loading , setLoading] = useState(true)
    const [searchTerm , setSearchTerm] = useState("")

      const filteredClubRegistrations = registrations.filter((registration)=>registration.name.includes(searchTerm) || registration.description.includes(searchTerm) )
    
    const acceptRegistration = async(e,id)=>{
      e.stopPropagation();
      console.log(id);
      
      const res = await acceptClubRegistrationApi(id);
      if(res.statusCode==200){
        toast.success(res.message)
        setRegistrations(prev=>prev.filter(r=> r.clubId != id))
        console.log("Hello",filteredClubRegistrations);
        
      }else{
        toast.error(res.message)
      }
    }
    
    
    const rejectRegistration = async(e,id)=>{
      e.stopPropagation();
      const res = await rejectClubRegistrationApi(id);
      if(res.statusCode==200){
        filteredClubRegistrations.filter(r=>r.clubId != id )
        toast.success(res.message)
      }else{
        toast.error(res.message)
      }
    }


    if(loading){
      return <Loader />
    }
    return (
        <div className="min-h-screen flex flex-col ">
          <main className="flex-grow container mx-auto px-4 py-8">
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-center text-white mb-8"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Manage Club Registrations
            </motion.h1>
            <motion.div
              className="mb-8 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Input
                type="text"
                value = {searchTerm}
                onChange = {(e)=>setSearchTerm(e.target.value)}
                placeholder="Search clubs..."
                className="w-full py-2 px-4 pl-10 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" />
            </motion.div>
            <AnimatePresence>
              {filteredClubRegistrations.map((club) => (
                <motion.div
                  key={club.clubId}
                  id={club.clubId}
                  
                  onClick={()=> setExpandedClub(expandedClub === club.clubId ? null : club.clubId)}
                  className="bg-gray-900 rounded-lg overflow-hidden shadow-lg mb-6 hover:cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold text-white">{club.name}</h2>
                      <Button
                        id={club.clubId}
                        name={club.clubId}
                        className="text-white focus:outline-none"
                      >
                        {expandedClub === club.clubId ? <ChevronUp /> : <ChevronDown />}
                      </Button>
                    </div>
                    <p className="text-gray-400 mt-2">{club.description}</p>
                  </div>
                  <AnimatePresence>
                    {expandedClub === club.clubId && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="border-t border-gray-800 p-6">
                            <div className="flex items-center text-gray-400">
                              <Mail className="w-5 h-5 mr-2" />
                              <span>{club.email}</span>
                            </div>
                            
                            <div className="flex items-center text-gray-400">
                              <Calendar className="w-5 h-5 mr-2" />
                              <span>Submitted on: {club.club_registeredAt}</span>
                            </div>
                            <div className="flex items-center text-gray-400">
                              <Users className="w-5 h-5 mr-2" />
                              <span>Representative: {club.userName}</span>
                            </div>
                          <div className="mt-6 flex space-x-4">
                            <Button
                              variant = "outline"
                              onClick={(e)=>acceptRegistration(e,club.clubId)}
                              className="px-4 py-2"
                            >
                              <Check className="mr-2 h-4 w-4" /> Accept
                            </Button>
                            <Button
                            variant = "outline"
                            onClick={(e)=>rejectRegistration(e,club.clubId)}
                              className="px-4 py-2"
                            >
                              <X className="mr-2 h-4 w-4" /> Decline
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </main>          
        </div>
      )
}

export default ManageClubRegistrations
