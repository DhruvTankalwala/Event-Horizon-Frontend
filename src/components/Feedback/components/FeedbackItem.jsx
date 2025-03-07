import { Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function FeedbackItem({ userId,userEmail,userImage, userName, feedback, rating }) {
  
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-gray-750">
      <div className="flex items-start space-x-4">
        <Link to={`/users/${userId}`} >
        <img src={userImage || "/placeholder.svg"} alt={userName} className="w-12 h-12 rounded-full object-cover" />
        </Link>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            {/* Change to name once profile is set */}
            <h3 className="text-lg font-semibold text-white">{userName}</h3> 
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-400"}`} />
              ))}
            </div>
          </div>
          <p className="text-gray-300">{feedback}</p>
        </div>
      </div>
    </div>
  );
}
