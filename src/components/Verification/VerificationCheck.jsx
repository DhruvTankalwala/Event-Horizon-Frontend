import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { verifyEmailApi } from "../../apiEndPoints"
import { motion } from "framer-motion"
import { CheckCircle, XCircle, Loader } from "lucide-react"
import toast from "react-hot-toast"


export default function VerificationCheck(){
  const [isVerifying, setIsVerifying] = useState(true)
  const [isValid, setIsValid] = useState(false)
  const location = useLocation();
  

  useEffect(() => {
    const verify = async () => {
        
        const searchParams = new URLSearchParams(location.search)
        const token = searchParams.get('token')
        const result = await verifyEmailApi(token);
        if(result.success){
            setIsValid(true)
        }else{
            toast.error(result.message)
        }
        setIsVerifying(false)
    }
    verify()
  }, [])

  const handleContinue = () => {
    // Redirect to home page or dashboard
  }

  const handleRetry = () => {
     // Redirect to resend verification email page
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0F0F1A]">
      
      <main className="flex-grow flex items-center justify-center px-4 py-16">
        <motion.div
          className="max-w-md w-full bg-gray-900 p-8 rounded-lg shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {isVerifying ? (
            <div className="text-center">
              <Loader className="w-16 h-16 mx-auto mb-4 text-cyan-500 animate-spin" />
              <h2 className="text-2xl font-bold text-white mb-2">Verifying Your Email</h2>
              <p className="text-gray-400">Please wait while we verify your email address...</p>
            </div>
          ) : isValid ? (
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
              </motion.div>
              <h2 className="text-2xl font-bold text-white mb-2">Email Verified!</h2>
              <p className="text-gray-400 mb-6">
                Your email has been successfully verified. You can now access all features of Event Horizon.
              </p>
              <motion.button
                onClick={handleContinue}
                className="w-full py-2 px-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-md shadow-md hover:from-cyan-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Continue to Event Horizon
              </motion.button>
            </div>
          ) : (
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                <XCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
              </motion.div>
              <h2 className="text-2xl font-bold text-white mb-2">Verification Failed</h2>
              <p className="text-gray-400 mb-6">
                We couldn't verify your email. The verification link may have expired or is invalid.
              </p>
              <motion.button
                onClick={handleRetry}
                className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-md shadow-md hover:from-purple-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Resend Verification Email
              </motion.button>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  )
}

