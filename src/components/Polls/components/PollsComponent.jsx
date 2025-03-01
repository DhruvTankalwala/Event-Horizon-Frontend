  import React, { useEffect , useState } from 'react'
  import {castVoteApi, createPollApi, deletePollApi, editPollApi, getPollsApi} from "../../../apiEndPoints/index"
  import { motion } from 'framer-motion'
  import { PlusCircle, BarChart2 , MoreHorizontal , Edit , Trash } from "lucide-react";
  import {Loader , Button  } from "../../index"
  import CreatePollForm from './CreatePollForm';
  import toast from 'react-hot-toast'
  import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

  const PollsComponent = () => {

      const [polls, setPolls] = useState([])
      const [poll, setPoll] = useState(null)
      const [loading, setLoading] = useState(true)
      const [FormsetFormOpen, setFormOpen ] = useState(null)
      const userType = localStorage.getItem("userRole")

      const handleDelete = async(pollId)=>{
        const res = await deletePollApi(pollId)
        console.log(res.data)
    
        if(res.statusCode == 200){
          setPolls((prevPolls)=>prevPolls.filter((poll)=>poll.id != pollId))
          toast.success(res.message)
        }else{
          toast.error(res.message)
        }
      }

      const castVote = async(pollId , eventName)=>{
        console.log(eventName);

        const res = await castVoteApi(pollId , eventName);
        console.log(res.data);
        if(res.statusCode == 200){
          toast.success(res.message);
          setPolls((prevPolls)=>prevPolls.map((poll)=>{
            
            if(poll.id == pollId){
              poll.voteCount = res.data
              poll.hasVoted = true
            }
            return poll
          }
          ))
        }else{
          toast.error(res.message)
        }
      }

      const getTotalVotes = (voteCount) =>{
      return Object.values(voteCount).reduce((sum, currentVal) => sum + currentVal, 0);
      //sum is the accumulator which starts from 0
      }

      // Function to compute percentage for a given option
    const getPercentage = (votes, total) =>
      total > 0 ? Math.round((votes / total) * 100) : 0;
    
      useEffect(()=>{
          const fetchPolls = async ()=>{
              const res = await getPollsApi()
              if(res.statusCode == 200){
                  console.log("Data : ",res.data);
                  setPolls(res.data)
                  setLoading(false)
                  toast.success(res.message)
              }else{
                  toast.error(res.message)
              }
          }
          fetchPolls()
      },[])
      if(loading){
          return <Loader />
      }
      
      return (
          <div className="min-h-screen  text-white font-space">
            <main className="container mx-auto px-4 py-16">
              <motion.h1
                className="text-5xl font-bold text-center mb-12"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Active Polls
              </motion.h1>
              <div className="flex justify-end mb-4">
                <Button
                  onClick={() => setFormOpen("create")}
                  className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
                >
                  <PlusCircle size={16} className="mr-2" /> Create Poll
                </Button>
              </div>
              <div className="space-y-12">
              {
  polls.map((poll) => {
    const totalVotes = getTotalVotes(poll.voteCount);

    return (
      <motion.div
        key={poll.id}
        className="relative bg-gray-900 rounded-xl p-8 shadow-xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Three-dots menu on each poll */}
        {userType === "CLUB_ADMIN" && (
          <div className="absolute top-4 right-4">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="p-2 rounded-full hover:bg-gray-700 cursor-pointer" >
                  <MoreHorizontal size={20} className="text-white" />
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="min-w-[150px] bg-gray-900 text-white rounded-md p-2 shadow-lg z-[1000]"
                  sideOffset={5}
                >
                  <DropdownMenu.Item
                    onSelect={() => {
                      setPoll(poll)
                      setFormOpen("edit")
                    }}
                    className="p-2 cursor-pointer hover:bg-gray-700 rounded"
                  >
                    <div className="flex items-center gap-2">
                      <Edit size={16} />
                      <span>Edit</span>
                    </div>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    onSelect={() => handleDelete(poll.id)}
                    className="p-2 cursor-pointer hover:bg-gray-700 rounded"
                  >
                    <div className="flex items-center gap-2">
                      <Trash size={16} />
                      <span>Delete</span>
                    </div>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        )}

        {/* Poll Question & Details */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">{poll.question}</h2>
          <div className="flex items-center text-gray-400 mb-2">
            <BarChart2 className="w-4 h-4 mr-2" />
            <span>{totalVotes} total votes</span>
          </div>
          <p className="text-gray-400">
            Created on: {new Date(poll.createdAt).toLocaleString()}
          </p>
        </div>

        {/* Poll Options */}
        <div className="space-y-4">
          {Object.entries(poll.voteCount).map(([option, votes]) => {
            const percentage = getPercentage(votes, totalVotes);

            return (
              <motion.div
                key={option}
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                onClick={!poll.hasVoted ? () => castVote(poll.id, option) : undefined}
              >
                <div className="w-full p-4 rounded-lg bg-gray-800 relative">
                  <div className="flex justify-between items-center relative z-10">
                    <span className="font-medium">{option}</span>
                    {(poll.hasVoted || userType === "CLUB_ADMIN") && (
                      <span className="text-cyan-400">
                        {votes} / {percentage}%
                      </span>
                    )}
                  </div>
                  {poll.hasVoted && totalVotes > 0 && (
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-cyan-500/20 rounded-lg z-0"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(votes / totalVotes) * 100}%`,
                      }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    )
  })
}
         </div>
            </main>
            {FormsetFormOpen=="create" && (
              <CreatePollForm
                onClose={() => setFormOpen(null)}
                onSubmit={async(newPoll) => {
                  const res = await createPollApi(newPoll)
                  if(res.statusCode == 201){
                    setPolls((prevPolls) => [ res.data ,...prevPolls]);
                    setFormOpen(null);
                    toast.success("Poll Created");
                  }else{
                    toast.error(res.message)
                  }
                }}
                
              />
            )}
            {FormsetFormOpen=="edit" && (
              <CreatePollForm
                poll={poll}
                onClose={() => setFormOpen(null)}
                onSubmit={async(newPoll) => {
                  const res = await editPollApi(newPoll)
                  if(res.statusCode == 201){
                    setPolls((prevPolls) =>prevPolls.map((prevPoll)=>(
                      prevPoll.id == poll.id ? res.data : prevPoll
                    )) );
                    setFormOpen(null);
                    setPoll(null)
                    toast.success("Poll Edited successfully");
                  }else{
                    toast.error(res.message)
                  }
                }}
              />
            )}
            
          </div>
        );
  }

  export default PollsComponent
