import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import FeedbackItem from "./components/FeedbackItem" 
import { Input , Button , Loader} from "../index"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../SelectComponents"
import { Search, Filter, ArrowLeft } from "lucide-react"
import { useParams , Link } from "react-router-dom"
import { getAllEventsFeedbackApi } from "../../apiEndPoints"
import toast from "react-hot-toast"

// const mockFeedbacks = [
//   {
//     id: "1",
//     userImage: "https://i.pravatar.cc/150?img=1",
//     userName: "Alice Johnson",
//     feedback: "The Tech Innovators Meetup was incredibly insightful. I learned so much about AI applications!",
//     rating: 5,
//     eventName: "Tech Innovators Meetup",
//   },
//   {
//     id: "2",
//     userImage: "https://i.pravatar.cc/150?img=2",
//     userName: "Bob Smith",
//     feedback: "Great workshop on entrepreneurship. The practical exercises were very helpful.",
//     rating: 4,
//     eventName: "Entrepreneurship Workshop",
//   },
// ]

export default function FeedbacksComponent() {
  const params = useParams()
  const eventId = params.eventId
  const [feedbacks, setFeedbacks] = useState([])
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRating, setSelectedRating] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAllFeedbacks = async()=>{
      const res = await getAllEventsFeedbackApi(eventId);
      console.log(res);
      if(res.statusCode == 200 ){
        setFeedbacks(res.data)
        setIsLoading(false);
      }else{
        setIsLoading(false)
        toast.error(res.message)
      }
      
    }
    fetchAllFeedbacks()
    console.log("fetched ");
  }, [])

  useEffect(() => {
    let result = feedbacks
    if (searchTerm) {
      result = result.filter(
        (feedback) =>
          feedback.feedback?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          feedback.userName?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    if (selectedRating !== "all") {
      result = result.filter((feedback) => feedback.rating === parseInt(selectedRating))
    }
    setFilteredFeedbacks(result)
  }, [searchTerm, selectedRating, feedbacks])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader />
          </div>
        ) : (
          <>
            <motion.h1
              className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Event Feedbacks
            </motion.h1>
            <div className="mb-8 flex flex-col md:flex-row gap-4">
              <div className="flex-grow relative">
                <Input
                  type="text"
                  placeholder="Search feedbacks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-2 px-4 pl-10 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" />
              </div>
              <Select value={selectedRating} onValueChange={setSelectedRating}>
                <SelectTrigger className="w-full md:w-[200px] bg-gray-800 text-white border border-gray-700 rounded-md">
                  <SelectValue placeholder="Filter by rating" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-white border border-gray-700 rounded-md">
                  <SelectItem value="all">All Ratings</SelectItem>
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <SelectItem key={rating} value={rating.toString()}>{rating} Star{rating !== 1 ? "s" : ""}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedRating("all")
                }}
                className="bg-purple-600 hover:bg-purple-700 transition-colors duration-300"
              >
                <Filter className="mr-2 h-4 w-4" /> Reset Filter
              </Button>
            </div>
            <motion.div className="space-y-6">
              {filteredFeedbacks.map((feedback) => (
                <FeedbackItem
                  key={feedback.id}
                  userImage={feedback.userImage}
                  userName={feedback.userName}
                  feedback={feedback.feedback}
                  rating={feedback.rating}
                />
              ))}
            </motion.div>
            {filteredFeedbacks.length === 0 && (
              <motion.p className="text-center text-gray-400 mt-8">No feedbacks found matching your criteria.</motion.p>
            )}
            <div className="mt-8 flex justify-center">
              {/* Change */}
              {/*<Link to={`/club/${clubId}/analytics`}> 
                <Button className="bg-gray-700 hover:bg-gray-600 transition-colors duration-300">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Analytics
                </Button>
              </Link>*/}
            </div>
          </>
        )}
      </main>
    </div>
  )
}