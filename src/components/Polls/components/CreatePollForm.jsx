import React from "react";
import { motion } from "framer-motion";
import { X, Plus, Trash } from "lucide-react";
import { Input, Button } from "../../index";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

// Validation schema using Yup
const validationSchema = Yup.object({
  question: Yup.string().required("Question is required"),
  options: Yup.array()
    .of(Yup.string().required("Option is required"))
    .min(2, "A poll must have at least two options"),
});

// Initial values for the form (using an array of strings for options)
const initialValues = {
  question: "",
  options: ["", ""],
};

function CreatePollForm({ onClose, onSubmit , poll }) {
  const poll1 = poll;
 if(poll1 && !poll1.options){
  
  
  const keysToRemove = ["createdAt", "voteCount"];
  const filteredPoll = Object.fromEntries(
    Object.entries(poll1).filter(([key]) => !keysToRemove.includes(key))
  );
  
 }

 console.log(poll1);
 
  
  const formik = useFormik({
    initialValues : poll1 || initialValues ,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      onSubmit({ question: values.question, eventOptions: values.options })
      resetForm()
    },
  });

  // Add a new option (string)
  const handleAddOption = () => {
    formik.setFieldValue("options", [...formik.values.options, ""]);
  };

  // Remove an option based on its index, ensuring at least two options remain
  const handleRemoveOption = (index) => {
    
      const newOptions = [...formik.values.options];
      newOptions.splice(index, 1); // Removoes 1 item from newOptions i.e at the index
      formik.setFieldValue("options", newOptions);
  };

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
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">{ poll ? "Update Poll" : "Create New Poll"}</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="question" className="text-white">
              Question
            </label>
            <Input
              id="question"
              name="question"
              value={formik.values.question}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errors={formik.errors.question}
              touched={formik.touched.question}
              placeholder="Enter your poll question"
              className="bg-gray-800 text-white border-gray-700"
            />
          </div>

          <div className="space-y-4">
            <label className="text-white">Options</label>
            {formik.values.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  name={`options[${index}]`}
                  value={option}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder={`Option ${index + 1}`}
                  className="bg-gray-800 text-white border-gray-700 flex-grow"
                />
                {index >=2 && 
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => handleRemoveOption(index)}
                  className="flex-shrink-0"
                >
                  <Trash className="h-4 w-4" />
                </Button>}
              </div>
            ))}
            {formik.errors.options && typeof formik.errors.options === "string" && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.options}
              </div>
            )}
            <Button
              type="button"
              onClick={handleAddOption}
              variant="outline"
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Option
            </Button>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
          >
            { poll ? "Update Poll" : "Create New Poll"}
          </Button>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default CreatePollForm;
