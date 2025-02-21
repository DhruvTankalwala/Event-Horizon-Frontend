import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, Users, UserCheck, Star } from "lucide-react";
import { Button , ProgressComponent  } from "../../index";;

export default function EventAnalyticsCard({ event }) {
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
        <div className="relative">
          <img src={event.imageUrl || "/placeholder.svg"} alt={event.name} className="w-full h-48 object-cover" />
          <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
            <span className="text-white text-lg font-bold">View Details</span>
          </div>
        </div>
        <div className="p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500 rounded-full filter blur-2xl opacity-20 animate-pulse"></div>
          <h3 className="text-2xl font-bold text-white mb-2">{event.name}</h3>
          <p className="text-gray-300 mb-4">{event.title}</p>

          <div className="flex items-center text-purple-300 mb-2">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center text-purple-300 mb-2">
            <Clock className="w-4 h-4 mr-2" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-purple-300 mb-2">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center text-purple-300 mb-2">
            <Users className="w-4 h-4 mr-2" />
            <span>Registered: {event.registeredStudents}</span>
          </div>
          <div className="flex items-center text-purple-300 mb-2">
            <UserCheck className="w-4 h-4 mr-2" />
            <span>Attended: {event.attendedStudents}</span>
          </div>

          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span>Attendance Rate</span>
              <span>{Math.round((event.attendedStudents / event.registeredStudents) * 100)}%</span>
            </div>
            <ProgressComponent value={(event.attendedStudents / event.registeredStudents) * 100} className="h-2" />
          </div>

          {/* <div className="flex items-center text-purple-300 mb-2">
            <Star className="w-4 h-4 mr-2" />
            <span>Rating: {event.rating.toFixed(1)}/5.0</span>
          </div> */}

          {event.feedback && event.feedback.length > 0 && (
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-white mb-2">Top Feedback:</h4>
              <ul className="list-disc list-inside text-sm text-gray-300">
                {event.feedback.slice(0, 2).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

      {/* View All Feedback Button */}
      {event.feedback  && (
        <div className="px-4 sm:px-6 py-4 flex justify-center">
          <Button
            variant="default"
            whileHover={{ scale: 1.05 }}
          >
            View All Feedback
          </Button>
        </div>
      )}
    </motion.div>
  );
}
