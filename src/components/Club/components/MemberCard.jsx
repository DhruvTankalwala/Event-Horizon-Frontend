import React from 'react';
import { motion } from "framer-motion";
import { MailIcon, MoreHorizontal, Edit, Trash } from "lucide-react";
import { Button } from "../../index";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';




const MemberCard = ({ member, handleDelete ,onOpen , clubEmail }) => {

  const userRole = localStorage.getItem("userRole")
    const userEmail   =  localStorage.getItem("email")
  return <motion.div
    className="relative rounded-2xl overflow-hidden"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.05 }}
    style={{
      background: "linear-gradient(135deg, #2a1f62 0%, #ff6b9d 100%)",
    }}
  >
    <div className="p-6">
      <div className="relative">
        <motion.div
          className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-white/20"
          whileHover={{ scale: 1.1 }}
        >
          <img
            src={member.imageUrl}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        </motion.div>
        {/* Glow effect */}
        <div className="absolute -inset-1 rounded-full blur-xl bg-purple-500/30 -z-10" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <h3 className="text-xl font-bold text-white mb-1">{member.email}</h3>
        <p className="text-purple-200 text-sm mb-3">{member.designation}</p>
        <div className="flex items-center justify-center gap-2 text-pink-300">
          <MailIcon className="w-4 h-4" />
          <span className="text-sm">{member.email}</span>
        </div>
      </motion.div>
    </div>
    {/* Decorative elements */}
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/50 to-transparent" />
    </div>
    {/* Three dots dropdown menu */}
    {
      userRole == "CLUB_ADMIN" && userEmail == clubEmail &&
    <div className="absolute top-2 right-2">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="p-2 rounded-full hover:bg-gray-700">
            <MoreHorizontal size={20} className="text-white" />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="min-w-[150px] bg-gray-900 text-white rounded-md p-2 shadow-lg z-[1000]"
            sideOffset={5}
          >
            <DropdownMenu.Item
              onSelect={onOpen}
              className="p-2 cursor-pointer hover:bg-gray-700 rounded"
            >
              <div className="flex items-center gap-2">
                <Edit size={16} />
                <span>Edit</span>
              </div>
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onSelect={handleDelete}
              className="p-2 cursor-pointer hover:bg-gray-700 rounded"
            >
              <div className="flex items-center gap-2">
                <Trash size={16} />
                <span>Delete</span>
              </div>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>

    }
    
  </motion.div>
}

export default MemberCard;
