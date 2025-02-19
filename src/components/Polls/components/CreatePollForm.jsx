import React,{useState} from 'react'
import { motion } from "framer-motion"
import { X, Plus, Trash } from "lucide-react"
import {Input , Button }  from "../../index"
import toast from 'react-hot-toast'

function CreatePollForm({ onClose, onSubmit }) {
  const [question, setQuestion] = useState("")
  const [options, setOptions] = useState([
    { id: 1, text: "", votes: 0 },
    { id: 2, text: "", votes: 0 },
  ])

  const handleAddOption = () => {
    setOptions([...options, { id: options.length + 1, text: "", votes: 0 }])
  }

  const handleRemoveOption = (id) => {
    if (options.length > 2) {
      setOptions(options.filter((option) => option.id !== id))
    } else {
      toast({
        title: "Cannot Remove Option",
        description: "A poll must have at least two options.",
        variant: "destructive",
      })
    }
  }

  const handleOptionChange = (id, value) => {
    setOptions(options.map((option) => (option.id === id ? { ...option, text: value } : option)))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (question.trim() === "") {
      toast({
        title: "Invalid Question",
        description: "Please enter a valid question for the poll.",
        variant: "destructive",
      })
      return
    }
    if (options.some((option) => option.text.trim() === "")) {
      toast({
        title: "Invalid Options",
        description: "Please ensure all options have text.",
        variant: "destructive",
      })
      return
    }
    onSubmit({ question, options })
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
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
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">Create New Poll</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="question" className="text-white">
              Question
            </label>
            <Input
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
              className="bg-gray-800 text-white border-gray-700"
              placeholder="Enter your poll question"
            />
          </div>

          <div className="space-y-4">
            <label className="text-white">Options</label>
            {options.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Input
                  value={option.text}
                  onChange={(e) => handleOptionChange(option.id, e.target.value)}
                  required
                  className="bg-gray-800 text-white border-gray-700 flex-grow"
                  placeholder={`Option ${option.id}`}
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => handleRemoveOption(option.id)}
                  className="flex-shrink-0"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <Button type="button" onClick={handleAddOption} variant="outline" className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Add Option
          </Button>

          <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white">
            Create Poll
          </Button>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default CreatePollForm;
