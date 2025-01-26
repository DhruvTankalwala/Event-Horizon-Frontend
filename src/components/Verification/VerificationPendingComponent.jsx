import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Mail, ArrowRight, RefreshCw, CheckCircle } from "lucide-react";
import { resendEmail, verifyEmailApi } from "../../apiEndPoints";
import { Navbar,Footer,Input,Button } from "../index";

const VerificationPendingPage = () => {
  const [isResending, setIsResending] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const navigate = useNavigate();
 
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleResendEmail = async () => {
    setIsResending(true);
    console.log("heheh");
    
    const res = await resendEmail();
    setIsResending(false);
    if(res.statusCode == 200){
      toast.success(res.message)
    }else{
      toast.error(res.message)
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value !== "" && index < 3) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleVerify = async() => {
    const otpValue = otp.join("");
    if (otpValue.length === 4) {
      console.log("Verifying OTP:", typeof otpValue);
      const res = await verifyEmailApi(otpValue);
      console.log(res);
      if(res.statusCode==200){
        toast.success(res.message)
        localStorage.removeItem("userEmail");
        navigate('/polls')
      }else{
        toast.error(res.message)
      }
    } else {
      toast.error("Please enter all 4 digits")
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0F0F1A]">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-4 py-16">
        <motion.div
          className="max-w-md w-full bg-gray-900 p-8 rounded-lg shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500" />
          <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500" />
          <div className="absolute top-2 left-2 w-2 h-16 bg-gradient-to-b from-purple-500 to-cyan-500" />
          <div className="absolute top-2 right-2 w-2 h-16 bg-gradient-to-b from-cyan-500 to-purple-500" />

          <motion.div
            className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <Mail className="text-white w-10 h-10" />
          </motion.div>
          <h1 className="text-3xl font-bold text-center text-white mb-6">Verify Your Email</h1>
          <p className="text-gray-300 text-center mb-8">
            We've sent a verification code to your inbox. Please enter the 4-digit code below to verify your email.
          </p>
          <div className="flex justify-center space-x-4 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={inputRefs[index]}
                className="w-12 h-12 text-center text-2xl bg-gray-800 border-2 border-cyan-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            ))}
          </div>
         
          <button onClick={handleVerify} className="w-full py-2 px-4 mb-4 text-lg font-semibold bg-purple-600 text-white rounded-md">
            Verify Email
            <CheckCircle className="ml-2 w-5 h-5" />
          </button>
          <button
            onClick={handleResendEmail}
            disabled={isResending}
            className="w-full py-2 px-4 mb-4 text-lg font-semibold bg-gray-800 text-white rounded-md"
          >
            {isResending ? (
              <RefreshCw className="animate-spin mr-2" />
            ) : (
              <>
                Didn't receive email? Resend
                <ArrowRight className="ml-2 w-5 h-5" />
              </>
            )}
          </button>
          <Link to="/auth">
            <button className="w-full py-2 px-4 text-lg font-semibold border border-cyan-500 text-cyan-500 rounded-md">
              Back to Login
            </button>
          </Link>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default VerificationPendingPage;
