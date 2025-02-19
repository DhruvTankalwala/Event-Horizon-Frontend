import React from 'react'
import ReactDOM from "react-dom"
import { m, motion } from "framer-motion"
import { X, Plus, Trash  } from "lucide-react"
import {Button , Input} from "../../index"
import { useFormik } from 'formik'
import { addMembersApi, editMemberApi } from '../../../apiEndPoints'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

const AddMembersForm =({ memberData, onClose , addMember }) => {
  const {clubId} = useParams()
    console.log("Hello member");
    const formik = useFormik({
      initialValues : memberData ||  { email: "", designation: "" }
      ,
      onSubmit : async(values)=>{
        console.log("Values: ",values);
        if(memberData){
          const res = await editMemberApi(values)
          
          if(res.statusCode == 200){
            toast.success(res.message)
            addMember((members)=>{
              return members.map((member)=>{
                return member.id==res.data.id ? res.data : member
              })
            })
            onClose()
          }else{
            toast.error(res.message)
          }
        }else{
          debugger
          const res = await addMembersApi(clubId,values);
            if(res.statusCode == 201){
              toast.success(res.message);
              console.log(res.data);
              addMember((prev)=>[...prev , res.data]);
              onClose();
            } else{
              toast.error(res.message);
          }
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
              
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor={`email`} className="text-white">
                      Member 
                    </label>
                  </div>
                  <Input
                    id={`email`}
                    type="email"
                    placeholder="Email"
                    {...formik.getFieldProps(`email`)}
                    className="bg-gray-800 text-white border-gray-700"
                  />
                  <Input
                    placeholder="Designation"
                    {...formik.getFieldProps(`designation`)}
                    className="bg-gray-800 text-white border-gray-700"
                  />
                </div>
              
              <Button type="submit" className="w-full p-2">
                Save Members
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )
} 

export default AddMembersForm;
