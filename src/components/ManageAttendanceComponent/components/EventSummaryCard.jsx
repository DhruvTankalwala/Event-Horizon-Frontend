import { motion } from "framer-motion";
import { CalendarDays, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";
import {Button } from "../../index"
export function EventSummaryCardComponent({ eventSummary }) {
  const {
    id,
    title,
    date,
    startTime,
    endTime,
    description,
    imageUrl,
    totalAttendance,
    totalRegistrations,
  } = eventSummary;

  return (
    <motion.div
      className="bg-gradient-to-br from-purple-800 to-indigo-800 rounded-xl overflow-hidden shadow-2xl transform perspective-1000 w-full relative"
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        boxShadow: "0 25px 50px -12px rgba(138, 43, 226, 0.3)",
      }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="relative">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          className="w-full h-48 object-cover brightness-90"
        />
      </div>
      <div className="p-6 relative">
        <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500 rounded-full filter blur-2xl opacity-20 animate-pulse"></div>
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300 mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center text-indigo-300 mb-2">
          <CalendarDays className="w-4 h-4 mr-2" />
          <span>{date}</span>
        </div>
        <div className="flex items-center text-indigo-300 mb-2">
          <Clock className="w-4 h-4 mr-2" />
          <span>{startTime} - {endTime}</span>
        </div>
        <div className="flex items-center text-indigo-300 mb-4">
          <Users className="w-4 h-4 mr-2" />
          <span>{totalAttendance} / {totalRegistrations} attended</span>
        </div>
        <Link to={`/events/${id}/attendance`}>
          <Button className = "w-full" >
            Manage Attendance
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
