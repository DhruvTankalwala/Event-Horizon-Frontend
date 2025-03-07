import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [role, setRole] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setRole(decodedToken.roles?.[0] || "USER"); // Default to USER if no role is found
    }
  }, []);

  const commonNavItems = [
    { name: "Events", to: "/events" },
    { name: "Polls", to: "/polls" },
  ];

  const userNavItems = [{ name: "Clubs", to: "/clubs" }];

  const clubAdminNavItems = [
    { name: "Manage Registrations", to: "/manage-registrations" },
    { name: "Manage Attendance", to: "/manage-attendance" },
    { name: "Event Analytics", to: "/event-analytics" },
  ];

  const adminNavItems = [
    { name: "Manage Club Registrations", to: "/manage-club-registrations" },
  ];

  let navItems = [];
  if (role === "USER") navItems = [...commonNavItems, ...userNavItems];
  if (role === "CLUB_ADMIN") navItems = [...commonNavItems, ...clubAdminNavItems];
  if (role === "ADMIN") navItems = [...commonNavItems, ...adminNavItems];

  // Always place User Profile & Logout at the end
  const finalNavItems = [
    ...navItems,
    role !="ADMIN" && { name: "User Profile", to: `/users/${userId}` },
    { name: "Logout", to: "/logout" },
  ];

  return (
    <nav className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-white text-2xl font-bold">Event Horizon</span>
            </Link>
          </div>
          <div className="hidden md:block w-full">
            <div
              className={`flex items-baseline ${
                role === "USER" ? "justify-center space-x-8" : "justify-end space-x-4"
              }`}
            >
              {finalNavItems.map((item , index) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <motion.div
          className="md:hidden backdrop-blur-sm"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="px-4 pt-4 pb-3 space-y-3 sm:px-5 text-center">
            {finalNavItems.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-4 py-3 rounded-md text-base font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
