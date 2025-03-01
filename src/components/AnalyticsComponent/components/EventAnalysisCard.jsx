import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, UserCheck, Star } from "lucide-react";
import { Button, ProgressComponent } from "../../index";

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
        <img src={event.imageUrl || "/placeholder.svg"} alt={event.title} className="w-full h-48 object-cover" />
      </div>
      <div className="p-6 relative overflow-hidden">
        <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
        <p className="text-gray-300 mb-4">{event.description}</p>

        <div className="flex items-center text-purple-300 mb-2">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center text-purple-300 mb-2">
          <Clock className="w-4 h-4 mr-2" />
          <span>{event.startTime} - {event.endTime}</span>
        </div>
        <div className="flex items-center text-purple-300 mb-2">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center text-purple-300 mb-2">
          <Users className="w-4 h-4 mr-2" />
          <span>Registered: {event.totalRegistrations}</span>
        </div>
        <div className="flex items-center text-purple-300 mb-2">
          <UserCheck className="w-4 h-4 mr-2" />
          <span>Attended: {event.totalAttendance}</span>
        </div>

        {/* Attendance Rate Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span>Attendance Rate</span>
            <span>
              {event.totalRegistrations > 0
                ? Math.round((event.totalAttendance / event.totalRegistrations) * 100)
                : 0}%
            </span>
          </div>
          <ProgressComponent value={(event.totalAttendance / event.totalRegistrations) * 100} className="h-2" />
        </div>

        {/* Display Event Rating (if available) */}
        {event.rating && (
          <div className="flex items-center text-yellow-400 mb-4">
            <Star className="w-5 h-5 mr-2" />
            <span className="text-lg font-semibold">{event.rating.toFixed(1)} / 5</span>
          </div>
        )}

        {/* Speakers Section */}
        {event.speakers && event.speakers.length > 0 && (
          <div className="mb-4">
            <h4 className="text-lg font-semibold text-white mb-2">Speakers:</h4>
            <ul className="list-disc list-inside text-sm text-gray-300 space-y-2">
              {event.speakers.map((speaker, idx) => (
                <li key={idx}>
                  <span className="font-medium">{speaker.name}</span> - {speaker.position} at {speaker.company}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {event.feedbackGiven && (
        <div className="px-4 sm:px-6 py-4 flex justify-center">
          <Button variant="default" whileHover={{ scale: 1.05 }}>
            View Feedback
          </Button>
        </div>
      )}
    </motion.div>
  );
}
