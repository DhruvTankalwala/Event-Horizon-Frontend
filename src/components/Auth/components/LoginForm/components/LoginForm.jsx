import React,{useState,useEffect} from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import loginValidationSchema from '../schemas/LoginFormSchema';
import { loginApi } from '../../../../../apiEndPoints';
import { colors } from '../../../../../utils/colors';
import { motion } from 'framer-motion';
import {Loader} from '../../../../index' ;

function LoginForm() {
  const [isLoading , setIsLoading] = useState(false)
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: async(values) => {
      console.log('Form Submitted');
      console.log(values);
      setIsLoading(true);
      const res = await loginApi(values);
      if(res.statusCode == 200){
        toast.success(res.message)
        navigate('/');
      }else{
        console.log("Error");
        console.log(res.message);
        
        toast.error(res.message)
      }
      setIsLoading(false);
      console.log('LoginForm:',res);
    },
  });

      if(isLoading){
        return <Loader />
      }

  return(
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
          Email
        </label>
        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="email"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full px-3 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 ${
            formik.touched.email && formik.errors.email ? 'border-red-500' : ''
          }`}
          style={{ boxShadow: `0 0 10px ${colors.secondary}` }}
        />
        {formik.touched.email && formik.errors.email ? (
          <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
        ):null}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
          Password
        </label>
        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="password"
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full px-3 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 ${
            formik.touched.password && formik.errors.password ? 'border-red-500' : ''
          }`}
          style={{ boxShadow: `0 0 10px ${colors.secondary}` }}
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
        )}
      </div>

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="w-full py-2 px-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-md shadow-md hover:from-cyan-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-75 transition-all duration-300"
      >
        Login
      </motion.button>
    </form>
  );
}

export default LoginForm;
