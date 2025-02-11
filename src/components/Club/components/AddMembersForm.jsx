import React from 'react'
import ReactDOM from "react-dom"
import { motion } from "framer-motion"
import { X, Plus, Trash  } from "lucide-react"
import {Button , Input} from "../../index"
import { useFormik } from 'formik'
import { addMembersApi } from '../../../apiEndPoints'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

const AddMembersForm =({onClose}) => {
  const {clubId} = useParams()
    console.log("Hello member");
    const formik = useFormik({
      initialValues : {
        members: [{ email: "", designation: "" }],
      
      },
      onSubmit : async(values)=>{
        console.log("Values: ",values);
        const res = await addMembersApi(clubId,values.members);
        if(res.statusCode == 201){
            toast.success(res.message);
            onClose();
        }else{
          toast.error(res.message);
        }
      }
    })
    return (
        <motion.div
          className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gray-900 rounded-lg p-8 w-full max-w-2xl relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 15 }}
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors hover:cursor-pointer">
              <X size={24} />
            </button>
    
            <h2 className="text-2xl font-bold text-white mb-6">Add New Members</h2>
    
            <form onSubmit={formik.handleSubmit}  className="space-y-6">
              {formik.values.members?.map((member, index) => (
                <div key={index} className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor={`email-${index}`} className="text-white">
                      Member {index + 1}
                    </label>
                    {index > 0 && (
                      <Button
                       type="button" 
                       onClick={()=>formik.setFieldValue("members" , 
                        formik.values.members.filter((_,i)=>(
                          i!=index
                        ))
                        )}
                       variant="ghost" 
                       size="sm" >
                        <Trash className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <Input
                    id={`email-${index}`}
                    type="email"
                    placeholder="Email"
                    {...formik.getFieldProps(`members[${index}].email`)}
                    className="bg-gray-800 text-white border-gray-700"
                  />
                  <Input
                    placeholder="Designation"
                    {...formik.getFieldProps(`members[${index}].designation`)}
                    className="bg-gray-800 text-white border-gray-700"
                  />
                </div>
              ))}
    
              <Button type="button" onClick = {()=>formik.setFieldValue("members" , [...formik.values.members , {email :"" , designation : ""} ] )}  variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add Another Member
              </Button>
    
              <Button type="submit" className="w-full">
                Save Members
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )
} 

export default AddMembersForm;
