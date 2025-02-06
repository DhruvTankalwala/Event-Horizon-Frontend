import { Link } from "react-router-dom";
import { FacebookIcon as Facebook, TwitterIcon as Twitter , InstagramIcon as Instagram, GithubIcon as GitHub } from "lucide-react";


export function Footer() {
  return (
    <footer className="bg-gray-900/95 backdrop-blur-sm border-t border-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Event Horizon</h3>
            <p className="text-gray-400">Where Events and Clubs Collide</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/events" className="text-gray-400 hover:text-white transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/clubs" className="text-gray-400 hover:text-white transition-colors">
                  Clubs
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
            <p className="text-gray-400">Email: info@eventhorizon.com</p>
            <p className="text-gray-400">Phone: (123) 456-7890</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-cyan-400 hover:text-white transition-colors">
                <Facebook />
              </a>
              <a href="#" className="text-cyan-400 hover:text-white transition-colors">
                <Twitter />
              </a>
              <a href="#" className="text-cyan-400 hover:text-white transition-colors">
                <Instagram />
              </a>
              <a href="#" className="text-cyan-400 hover:text-white transition-colors">
                <GitHub />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">&copy; 2025 Event Horizon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

