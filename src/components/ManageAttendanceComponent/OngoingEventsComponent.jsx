import React, { useEffect, useState } from 'react'
import { getAllOngoingEventsApi } from '../../apiEndPoints'
import { Loader, EventSummaryCardComponent } from "../index"
import toast from 'react-hot-toast'
import { Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const OngoingEventsComponent = () => {
    const [events, setEvents] = useState(null)
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    
    useEffect(() => {
        const fetchOngoingEvents = async () => {
            setLoading(true);
            const res = await getAllOngoingEventsApi();
            setLoading(false);
            if (res.statusCode === 200) {
                setEvents(res.data);
            } else {
                toast.error(res.data);
            }
        };
        fetchOngoingEvents();
    }, []);

    const filteredEvents = events?.filter((event) => 
        (event?.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
         event?.description?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow container mx-auto px-4 py-8">
                {/* Title Animation */}
                <motion.h1
                    layout
                    className="text-4xl md:text-5xl font-bold text-center text-white mb-8"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }} 
                >
                    Ongoing Events
                </motion.h1>

                {/* Search Bar Animation */}
                <motion.div
                    layout
                    className="mb-8 relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                >
                    <input
                        type="text"
                        placeholder="Search ongoing events..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full py-2 px-4 pl-10 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400" />
                </motion.div>

                {/* Event Summary Cards with Smooth Animations */}
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    
                >
                <AnimatePresence >
                        {filteredEvents.map((event) => (
                            <motion.div
                                key={event.id}
                                className="bg-gray-900 rounded-lg overflow-hidden shadow-lg"
                                variants={{
                                    hidden: { opacity: 0, y: 50 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                                initial="hidden"
                                animate="visible"
                                exit={{ opacity: 0, y: -50 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <EventSummaryCardComponent eventSummary={event} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    </motion.div>
            </main>
        </div>
    );
}

export default OngoingEventsComponent;
