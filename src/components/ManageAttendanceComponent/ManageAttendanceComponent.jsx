import React, { useEffect, useState } from 'react'
import { Search, Check, Plus, CheckCheckIcon, CheckIcon } from "lucide-react"
import {Input , Button, Loader} from "../index"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/Tabs"
import { useParams } from 'react-router-dom'
import { acceptAttendanceApi, getAllApprovedRegistrationsApi } from '../../apiEndPoints'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
const ManageAttendanceComponent = () => {
    const {eventId} = useParams()
    const [students, setStudents] = useState(null)
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedTab, setSelectedTab] = useState("pending")

    useEffect(()=>{
            const fetchAllApprovedRegistrations = async() =>{        
                const res = await getAllApprovedRegistrationsApi(eventId);
                if(res.statusCode == 200){
                    setStudents(res.data)
                    setLoading(false)
                }else{
                    toast.error(res.message)
                }
        }
        fetchAllApprovedRegistrations()
    },[])

    const handleAccept  = async (id)=>{
      const res = await acceptAttendanceApi(id);
      if(res.statusCode==200){
        toast.success(res.message)
        setStudents((students) =>
          students.map((student) =>
            student.id === id ? res.data : student
          )
        );
        }else{
        toast.error(res.message)
      }
    }

    const filteredStudents = students
                  ?.filter((student)=>(selectedTab == "pending" ? student.attendanceStatus == false  : student.attendanceStatus == true ))
                .filter((student) => student.email.toLowerCase().includes(searchTerm.toLowerCase()) 
    )
    
    if(loading){
        return <Loader />
    }
    return (
        <div className="min-h-screen flex flex-col">
          <main className="flex-grow container mx-auto px-4 py-8 relative">
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-center text-white mb-8"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Registered Attendees  for  {students[0]?.title}
            </motion.h1>
            <div className="mb-8 flex">
              <div className="relative flex-grow">
                <Input
                  type="text"
                  placeholder="Search Attendees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-2 px-4 pl-10 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>
            <Tabs value={selectedTab} onValueChange={(value) => setSelectedTab(value)} className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pending">Pending Registrations</TabsTrigger>
            <TabsTrigger value="accepted">Accepted Registrations</TabsTrigger>
          </TabsList>
          </Tabs>
          
            <div className="grid gap-6">
              {
                filteredStudents.length == 0 ? 
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center items-center h-64"
                  >
                    <div className="text-center bg-gray-800 p-6 rounded-lg shadow-lg">
                      <h2 className="text-2xl font-semibold text-white">
                        No {selectedTab} attendees found
                      </h2>
                    </div>
                  </motion.div>  :  filteredStudents.map((student) => (

                  <motion.div
                    key={student.id}
                    className="bg-gray-800 rounded-lg p-6 flex flex-col md:flex-row justify-between items-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                     <div className="flex items-center gap-4">
                    {/* Profile Image / Icon */}
                    <img 
                      src={student.profileImage} 
                      alt={student.email} 
                      className="w-12 h-12 rounded-full border border-gray-600" 
                    />

                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-white">
                        {/* Change to name */}
                        {student.email}
                      </h2>
                      <p className="text-gray-400">{student.email}</p>
                    </div>

                    {student.attendanceStatus ? (
                        <Button
                          size="sm"
                        >
                          Accepted <CheckIcon/> 
                        </Button>) :
                         (
                          <Button
                          size="sm"
                          onClick={() => handleAccept(student.id)}
                        >
                          Accept 
                        </Button>) 
                    }
                    
                  </motion.div>
                ))}
            </div>
            <motion.div
              className="fixed bottom-8 right-8"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                size="lg"
                className="rounded-full w-16 h-16 bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
                // onClick={() => setIsManualAttendanceOpen(true)}
              >
                <Plus className="h-8 w-8" />
              </Button>
            </motion.div>
          </main>
          {/* <ManualAttendanceForm
            isOpen={isManualAttendanceOpen}
            onClose={() => setIsManualAttendanceOpen(false)}
            onSubmit={handleManualAttendance}
            events={mockEvents}
          /> */}
        </div>
      )
    
}

export default ManageAttendanceComponent
