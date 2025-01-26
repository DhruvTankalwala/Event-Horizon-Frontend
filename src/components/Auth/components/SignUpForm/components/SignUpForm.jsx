import { useState } from "react"
import { useFormik } from "formik"
import { motion } from "framer-motion"
import { colors } from '../../../../../utils/colors'
import signUpValidationSchema from "../schemas/signUpValidationSchema"
import { signUpApi } from "../../../../../apiEndPoints"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import {Loader} from "../../../../index"
export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues : {
      email : '',
      password : ''
    },
    validationSchema : signUpValidationSchema,
    onSubmit: async (values)=>{
      console.log(values);
      setIsLoading(true)
      const res = await signUpApi(values);
      setIsLoading(false)
      console.log("OnSubmit: ",res);
      if(res.statusCode == 201){
        localStorage.setItem("userEmail",JSON.stringify(values.email))
        navigate('/verify');
        toast.success(res.message)
      }else{
        toast.error(res.message)
      }
    }
  })
  if(isLoading){
    return <Loader />
  }
  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
          Email
        </label>
        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="email"
          id="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full px-3 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
          style={{ boxShadow: `0 0 10px ${colors.primary}` }}
        />
        
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
          Password
        </label>
        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="password"
          id="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full px-3 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
          style={{ boxShadow: `0 0 10px ${colors.primary}` }}
        />
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-md shadow-md hover:from-purple-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition-all duration-300"
      >
        Sign Up
      </motion.button>
    </form>
  )
}

