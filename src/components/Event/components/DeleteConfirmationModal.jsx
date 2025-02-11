import ReactDOM from "react-dom"
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2 } from "lucide-react";
import { deleteClubApi, deleteEventApi } from "../../../apiEndPoints";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export function DeleteConfirmationModal({  onClose ,eventId , clubId ,modify }) {
  const navigate = useNavigate();

  const handleDelete = async()=>{
    console.log(eventId);
    let res;
    if(eventId){
      res = await deleteEventApi(eventId);
    }else{
      res = await deleteClubApi(clubId)
    }
    if(res.statusCode == 200){
      toast.success(res.message)
      if(clubId){
        localStorage.removeItem("authToken")
        delete myAxios.defaults.headers.common["Authorization"];
        navigate("/auth")
      }else{
        modify((prev)=>!prev) // For event delete from the card to again call the api
      }
    }else{
      toast.error(res.message)
    } 
    onClose();
  }

  return ReactDOM.createPortal(
      <AnimatePresence>
        <motion.div 
          className="fixed inset-0  backdrop-blur-sm  bg-opacity-50 flex items-center justify-center p-4 z-50" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-gray-900 rounded-lg p-6 w-full max-w-sm sm:max-w-md relative text-center shadow-xl max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 text-gray-400 hover:text-white hover:cursor-pointer"
            >
              <X size={20} />
            </button>
            <Trash2 className="text-red-500 mx-auto mb-4" size={40} />
            <h2 className="text-xl font-bold text-white mb-2">Are you sure?</h2>
            <p className="text-gray-300 mb-6">Do you really want to delete this {clubId? "club" : "event"} ? This action cannot be undone.</p>
            <div className="flex flex-col gap-3">
              <motion.button 
                onClick={handleDelete} 
                className="w-full py-2 px-4 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition-all duration-300 hover:cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Yes, Delete
              </motion.button>
              <motion.button 
                onClick={onClose} 
                className="w-full py-2 px-4 bg-gray-600 text-white font-semibold rounded-md shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 transition-all duration-300 hover:cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        </motion.div>      
    </AnimatePresence>,
    document.getElementById("modal-root")
    )
  
}
