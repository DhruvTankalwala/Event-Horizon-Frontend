import React, { useState , useEffect } from "react";
import ReactDOM from "react-dom"
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { X, Plus, Trash } from "lucide-react";
import { Input, TextArea, Button, Loader } from "../../index";
import { createEvent, updateEventApi } from "../../../apiEndPoints";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  date: Yup.string().required("Date is required"),
  startTime: Yup.string().required("Start Time is required"),
  endTime: Yup.string().required("End Time is required"),
  location: Yup.string().required("Location is required"),
  speakers: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Speaker name is required"),
      position: Yup.string().required("Speaker position is required"),
      company: Yup.string().required("Speaker company is required"),
    })
  )
});
  const initialValues =  {
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    status : "",
    totalRegistrations: undefined, 
    speakers: [],
  }
export function CreateEventForm({ onClose , event , modifyEvent  }) {
  const formik = useFormik({
    initialValues : event || initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      let res;
      if(event!=null){
         res = await updateEventApi(values);
        
      }else{  
        res = await createEvent(values);
      }
      console.log(res);
      if(res.statusCode >= 200 && res.statusCode < 300){
          console.log("Hiii");
          toast.success(res.message)
          modifyEvent((prev)=>!prev)
           onClose();
      }else{
        toast.error(res.message)
      }
    },
  });

  const addSpeaker = () => {
    formik.setFieldValue("speakers", [...formik.values.speakers, { name: "", position: "", company: "" }]);
  };

  const removeSpeaker = (index) => {
    const updatedSpeakers = formik.values.speakers.filter((_, i) => i !== index);
    formik.setFieldValue("speakers", updatedSpeakers);
  };

  return ReactDOM.createPortal(
    <motion.div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="bg-gray-900 rounded-lg p-8 w-full max-w-2xl relative z-10 h-full max-h-[90vh] overflow-y-auto" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}>
        <button onClick={()=>onClose()} className="absolute top-4 right-4 text-gray-400 hover:text-white hover:cursor-pointer">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Create New Event</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <Input 
            name="title" 
            placeholder="Title" 
            {...formik.getFieldProps("title")} 
            className="w-full bg-gray-800 text-white" 
            error={formik.errors.title} 
            touched={formik.touched.title} 
          />
          <TextArea 
            name="description" 
            placeholder="Description" 
            {...formik.getFieldProps("description")} 
            className="w-full bg-gray-800 text-white min-h-[100px]" 
            error={formik.errors.description} 
            touched={formik.touched.description} 
          />
          <Input 
            type="date" 
            name="date" 
            {...formik.getFieldProps("date")} 
            className="w-full bg-gray-800 text-white" 
            error={formik.errors.date} 
            touched={formik.touched.date} 
          />
          <Input 
            type="time" 
            name="startTime" 
            {...formik.getFieldProps("startTime")}
            className="w-full bg-gray-800 text-white" 
            error={formik.errors.startTime} 
            touched={formik.touched.startTime} 
          />
          <Input 
            type="time" 
            name="endTime" 
            {...formik.getFieldProps("endTime")} 
            className="w-full bg-gray-800 text-white" 
            error={formik.errors.endTime} 
            touched={formik.touched.endTime} 
          />

          {
            event &&
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
              <select
                name="status"
                {...formik.getFieldProps("status")}
                className="flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background bg-gray-800 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 hover:cursor-pointer"
              >
                <option value="UPCOMING">Upcoming</option>
                <option value="ONGOING">Ongoing</option>
                <option value="PAST">Past</option>
              </select>
              {formik.errors.status && formik.touched.status && (
                <div className="text-red-500 text-sm mt-2">{formik.errors.status}</div>
              )}
          </div>

          }

          <Input 
            name="totalRegistrations" 
            placeholder="Total registrations" 
            {...formik.getFieldProps("totalRegistrations")} 
            className="w-full bg-gray-800 text-white" 
            error={formik.errors.title} 
            touched={formik.touched.title} 
          />
          <Input 
            name="location" 
            placeholder="Location" 
            {...formik.getFieldProps("location")} 
            className="w-full bg-gray-800 text-white" 
            error={formik.errors.location} 
            touched={formik.touched.location}
          />
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Speakers</label>
            {formik.values.speakers?.map((speaker, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input placeholder="Name" {...formik.getFieldProps(`speakers[${index}].name`)} className="flex-1 bg-gray-800 text-white" />
                <Input placeholder="Position" {...formik.getFieldProps(`speakers[${index}].position`)} className="flex-1 bg-gray-800 text-white" />
                <Input placeholder="Company" {...formik.getFieldProps(`speakers[${index}].company`)} className="flex-1 bg-gray-800 text-white" />
                <button className="hover:cursor-pointer" type="button" onClick={() => removeSpeaker(index)}>
                  <Trash size={16} />
                </button>               
              </div>
            ))}
            <Button type="button" onClick={addSpeaker} className="px-4 py-3 text-lg flex items-center gap-2 bg-gray-800 text-white rounded-lg hover:cursor-pointer">
              <Plus size={20} /> Add Speaker
            </Button>
          </div>
          <Button type="submit" className="w-full px-4 py-3 text-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-lg hover:cursor-pointer">
           {event ? " Update Event" :  "Create Event" }
          </Button>
        </form>
      </motion.div>
    </motion.div>,
    document.getElementById("modal-root")
  )
}
