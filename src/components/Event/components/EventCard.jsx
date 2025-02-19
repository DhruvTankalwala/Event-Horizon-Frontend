import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Clock, MapPin, Users, Star, User, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { CreateEventForm } from "./CreateEventForm";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";

export function EventCard({eventDetails , setEvents}) {
  const [selectedForm, setSelectedForm] = useState("");

  const {
    id,
    title,
    date,
    startTime,
    endTime,
    location,
    description,
    imageUrl,
    completedRegistrations,
    totalRegistrations,
    clubName,
    speakers,
  } = eventDetails;
  
  return (
    <motion.div
      className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-lg overflow-hidden shadow-lg transform perspective-1000 w-full"
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        boxShadow: "0 25px 50px -12px rgba(138, 43, 226, 0.25)",
      }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link to={`/events/${id}`}>
        <div className="relative">  
          <img src={imageUrl || "/placeholder.svg"} alt={title} className="w-full h-48 object-cover" />
          <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
            <span className="text-white text-lg font-bold">View Details</span>
          </div>
        </div>
        <div className="p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500 rounded-full filter blur-2xl opacity-20 animate-pulse"></div>
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-gray-300 mb-4">{description}</p>
          <div className="flex items-center text-purple-300 mb-2">
            <CalendarDays className="w-4 h-4 mr-2" />
            <span>{date}</span>
          </div>
          <div className="flex items-center text-purple-300 mb-2">
            <Clock className="w-4 h-4 mr-2" />
            <span>{startTime} - {endTime}</span>
          </div>
          <div className="flex items-center text-purple-300 mb-2">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{location}</span>
          </div>
          <div className="flex items-center text-purple-300 mb-2">
            <Users className="w-4 h-4 mr-2" />
            <span>{completedRegistrations} / {totalRegistrations} registered</span>
          </div>
          <div className="flex items-center text-purple-300 mb-4">
            <Star className="w-4 h-4 mr-2" />
            <span>Organized by: {clubName}</span>
          </div>
          {speakers && speakers.length > 0 && (
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-white mb-2">Speakers:</h4>
              {speakers.map((speaker, index) => (
                <div key={index} className="flex items-center text-gray-300 mb-2">
                  <User className="w-4 h-4 mr-2" />
                  <span>{speaker.name} - {speaker.position} at {speaker.company}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </Link>
      <div className="px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between gap-2">
        <motion.button
          className="w-full sm:w-auto py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-300 hover:cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.preventDefault();  
            setSelectedForm("edit");
          }}
        >
          <Edit className="w-4 h-4 inline-block mr-2" />
          Edit
        </motion.button>
        <motion.button
          className="w-full sm:w-auto py-2 px-4 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition-all duration-300 hover:cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.preventDefault();
            setSelectedForm("delete")
          }}
        >
          <Trash2 className="w-4 h-4 inline-block mr-2" />
          Delete
        </motion.button>
      </div>
          {selectedForm =="edit" && <CreateEventForm event={eventDetails} onClose={()=>setSelectedForm("")} setEvents={setEvents}  /> }
            {/* Write for register */}
          {selectedForm =="delete" && <DeleteConfirmationModal eventId={id}  onClose={()=>setSelectedForm("")} setEvents={setEvents} /> }
    </motion.div>
  );
}
