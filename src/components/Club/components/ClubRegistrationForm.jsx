import React, { useRef , useState } from 'react'
import { X, Upload } from "lucide-react"
import { motion } from 'framer-motion'
import { Button , Input ,TextArea } from "../../../components/index"
import { useFormik } from 'formik'
import * as yup from "yup"
import { registerClubApi, updateClubDetailsApi } from '../../../apiEndPoints'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
const validationSchema  = yup.object({
  name : yup
        .string()
        .required("Name is required"),

  description : yup
                .string()
                .required("Club description is required"),

  icon:         yup.mixed()
                .required("File is required")
}
)

const initialValues = {
    name : "" , 
    description : "",
    icon : undefined
}




const ClubRegistrationForm = ({onClose , club }) => {
   const {clubId} = useParams()
  const [iconPreview , setIconPreview] = useState(null);
  const formik = useFormik({
    initialValues : club || initialValues ,
    validationSchema,
    onSubmit :async(values)=>{
        console.log(values);
        let res;
        if(!club){
          res = await registerClubApi(values)
        }else{
            res = await updateClubDetailsApi(values,clubId)
        }
        
        if(res.statusCode>=200 && res.statusCode <300){
          toast.success(res.message)
          onClose()  
        } else{
          toast.error(res.message)
        }
    }
  });

  const handleFileChange = (e)=>{
    const file = e.currentTarget.files[0];
    if(file){
      formik.setFieldValue("icon", file);
      setIconPreview(URL.createObjectURL(file))   
    }else{
      setIconPreview(null)
    }
  }

const iconRef = useRef(null);

  return (
    <motion.div
      className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gray-900 rounded-lg p-4 sm:p-8 w-full max-w-[90%] sm:max-w-md relative z-10"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 15 }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors hover : cursor-pointer">
          <X size={24} />
        </button>   

        <h2 className="text-2xl font-bold text-white mb-6 text-center">Register Your Club</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="clubName">Club Name</label>
            <Input
              name="name"
              {...formik.getFieldProps("name")}
              error = {formik.errors.name}
              touched = {formik.touched.name}
              className="bg-gray-800 text-white border-gray-700"
            />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <TextArea
              name="description"
              error = {formik.errors.description}
              touched = {formik.touched.description}
              {...formik.getFieldProps("description")}
              className="bg-gray-800 text-white border-gray-700 min-h-[100px]"
            />
          </div>

          <div>
            <label htmlFor="icon">Club Icon</label>
            <div className="flex items-center space-x-2 w-full">
              <input
                id = "icon" 
                name="icon"
                type="file"
                ref={iconRef}
                accept="image/*,.jpg,.jpeg,.png,.gif,.bmp,.webp"
                className="hidden"
                onChange ={handleFileChange}
                error = {formik.errors.icon}
                touched = {formik.touched.icon}
              />

              <Button
                type="button"
                onClick ={()=>iconRef.current.click()}
                className="w-full py-2 px-4 text-sm sm:text-base bg-gray-800 hover:bg-gray-700"
              >
                <Upload className="mr-2 h-4 w-4" /> Upload Icon
              </Button>
              {
                (formik.values.icon || club?.icon) && <img className='max-h-20' src={iconPreview || club?.icon} alt={club?.name} />
              }
            </div>
            {formik.errors.icon && formik.touched.icon && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.icon}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full py-2 px-4 text-sm sm:text-base bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold"
          >
            {club ? "Update Club" : "Register Club" }
            
          </Button>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default ClubRegistrationForm
