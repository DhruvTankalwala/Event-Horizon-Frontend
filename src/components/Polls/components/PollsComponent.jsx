import React, { useEffect } from 'react'
import {getPollsApi} from "../../../apiEndPoints/index"
import toast from 'react-hot-toast'
const PollsComponent = () => {
    useEffect(()=>{
        const fetchPolls = async ()=>{
            const res = await getPollsApi()
            if(res.statusCode == 200){
                console.log("Data : ",res.data);
                toast.success(res.message)
            }else{
                toast.error(res.message)
            }
        }
        fetchPolls()
    },[])
  return (
    <div>
      
    </div>
  )
}

export default PollsComponent
