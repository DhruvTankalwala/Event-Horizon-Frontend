import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ProgressComponent as Progress , Loader } from "../index";
import { Card, CardContent, CardHeader, CardTitle } from "../ChartComponent";
import { Users, UserCheck, Calendar, Clock, MapPin, Star } from "lucide-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import EventAnalyticsCard from "./components/EventAnalysisCard";
import { getAllClubsPastEventsApi } from "../../apiEndPoints";
import toast from "react-hot-toast";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const mockEvents = [
    {
      id: "1",
      name: "Tech Innovators Meetup",
      title: "Exploring AI in Everyday Life",
      date: "2023-05-15",
      time: "14:00 - 17:00",
      location: "Main Auditorium",
      imageUrl: "https://source.unsplash.com/600x400/?technology,conference",
      registeredStudents: 150,
      attendedStudents: 130,
      rating: 4.7,
      feedback: ["Great insights into AI applications!", "The speakers were very knowledgeable."],
    },
    {
      id: "2",
      name: "Entrepreneurship Workshop",
      title: "From Idea to Startup",
      date: "2023-06-02",
      time: "10:00 - 16:00",
      location: "Business School, Room 101",
      imageUrl: "https://source.unsplash.com/600x400/?startup,meeting",
      registeredStudents: 100,
      attendedStudents: 85,
      rating: 4.5,
      feedback: ["The practical exercises were very helpful.", "Great networking opportunity!"],
    },
    {
      id: "3",
      name: "Environmental Awareness Day",
      title: "Sustainable Campus Initiatives",
      date: "2023-06-20",
      time: "09:00 - 18:00",
      location: "University Green",
      imageUrl: "https://source.unsplash.com/600x400/?nature,environment",
      registeredStudents: 200,
      attendedStudents: 180,
      rating: 4.8,
      feedback: ["The tree planting activity was amazing.", "Great to see our university taking action on climate change."],
    },
    {
      id: "4",
      name: "Cybersecurity Conference",
      title: "Defending Against Digital Threats",
      date: "2023-07-10",
      time: "11:00 - 15:00",
      location: "IT Auditorium",
      imageUrl: "https://source.unsplash.com/600x400/?cybersecurity,hacking",
      registeredStudents: 120,
      attendedStudents: 95,
      rating: 4.6,
      feedback: ["Very informative session!", "I learned a lot about ethical hacking."],
    },
    {
      id: "5",
      name: "Blockchain and Web3 Symposium",
      title: "Decentralized Future",
      date: "2023-08-05",
      time: "13:00 - 17:00",
      location: "Innovation Hub",
      imageUrl: "https://source.unsplash.com/600x400/?blockchain,technology",
      registeredStudents: 140,
      attendedStudents: 110,
      rating: 4.7,
      feedback: ["Smart contracts discussion was insightful!", "Loved the hands-on Ethereum demo."],
    },
    {
      id: "6",
      name: "Music Fest 2023",
      title: "Live Bands & DJ Night",
      date: "2023-09-20",
      time: "18:00 - 23:00",
      location: "Central Park",
      imageUrl: "https://source.unsplash.com/600x400/?concert,music",
      registeredStudents: 300,
      attendedStudents: 270,
      rating: 4.9,
      feedback: ["Best concert ever!", "The DJ lineup was fantastic!"],
    },
    {
      id: "7",
      name: "Health & Wellness Fair",
      title: "Mind & Body Well-being",
      date: "2023-10-15",
      time: "08:00 - 14:00",
      location: "Sports Complex",
      imageUrl: "https://source.unsplash.com/600x400/?health,wellness",
      registeredStudents: 180,
      attendedStudents: 160,
      rating: 4.8,
      feedback: ["Yoga session was amazing!", "Very useful health tips!"],
    },
    {
      id: "8",
      name: "Coding Hackathon",
      title: "24-hour Coding Challenge",
      date: "2023-11-05",
      time: "10:00 - 10:00 (Next Day)",
      location: "Computer Science Lab",
      imageUrl: "https://source.unsplash.com/600x400/?coding,hackathon",
      registeredStudents: 250,
      attendedStudents: 220,
      rating: 4.7,
      feedback: ["Loved the problem statements!", "Great mentors and guidance."],
    },
    {
      id: "9",
      name: "Literary Fest",
      title: "Poetry & Storytelling",
      date: "2023-12-10",
      time: "15:00 - 19:00",
      location: "Library Auditorium",
      imageUrl: "https://source.unsplash.com/600x400/?books,library",
      registeredStudents: 130,
      attendedStudents: 110,
      rating: 4.6,
      feedback: ["Beautiful poetry sessions!", "The storytelling contest was engaging."],
    },
    {
      id: "10",
      name: "Sports Championship",
      title: "Inter-College Sports Meet",
      date: "2024-01-25",
      time: "08:00 - 20:00",
      location: "University Stadium",
      imageUrl: "https://source.unsplash.com/600x400/?sports,stadium",
      registeredStudents: 350,
      attendedStudents: 320,
      rating: 4.9,
      feedback: ["Amazing competition!", "Very well organized events."],
    },
  ];
  

export default function AnalyticsComponent() {
  const [events, setEvents] = useState([]);
  const [isLoading , setIsLoading] = useState(true);
  useEffect(() => {
    const fetchPastEvents = async()=>{
      const res = await getAllClubsPastEventsApi();
      if(res.statusCode == 200){
        setEvents(res.data);
        console.log(res.data);
        setIsLoading(false);
      }else{
        toast.error(res.message)
      }
    }
    fetchPastEvents()
  }, []);

  const chartData = {
    labels: events.map((event) => event.title),
    datasets: [
      {
        label: "Attended Students",
        data: events.map((event) => event.totalAttendance),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        fill: false,
      },
      {
        label: "Registered Students",
        data: events.map((event) => event.completedRegistrations),
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Event Attendance Overview" },
    },
  };

  if(isLoading){
    <Loader />
  }

  return (
    <div className="min-h-screen text-white">
      <main className="container mx-auto px-4 py-8">
        <motion.h1
          className="text-4xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Event Analytics Dashboard
        </motion.h1>

        <div className="mb-8">
          <Card className="bg-gray-800 text-white">
            <CardHeader>
              <CardTitle>Event Attendance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <Line data={chartData} options={chartOptions} />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <EventAnalyticsCard key={event.id} event={event} />
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
