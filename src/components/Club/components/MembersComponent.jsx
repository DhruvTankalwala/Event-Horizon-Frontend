import React,{useState} from 'react'
import { Edit , UserPlus , Trash2 } from 'lucide-react'
import {MemberCard , Button , AddMembersForm} from "../../index"
import { motion } from 'framer-motion'
import { deleteMemberApi } from '../../../apiEndPoints'

const MembersComponent = ({memberValues}) => {
    console.log("memberValues", memberValues);
    
    const [modalOpen , setModalOpen] = useState("")
    const [members , setMembers] = useState(memberValues || []);
    const [selectedMember , setSelectedMember] = useState(null);
    console.log("Members: ",members);
    
    const onDelete =async (id)=>{
        const res = await deleteMemberApi(id);
        if(res.statusCode==200){
            setMembers(()=>members.filter((member)=>id!=member.id));
        }
    }
    
return <>
        <div className="flex justify-center mb-8 space-x-4">
            <Button onClick={()=>setModalOpen("addMembers")} variant = "green">
              <UserPlus className="w-4 h-4 mr-2" /> Add Members
            </Button>
          </div>
          <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >

        { members && members.length >0 && 
        members.map((member) => (
        <MemberCard  
            key={member.id}
            member={member} 
            onOpen={()=>{
                setModalOpen("editMembers")
                setSelectedMember(member)
            }}
            handleDelete={()=>onDelete(member.id)}/>
    ))}
        </motion.div>
        {modalOpen == "addMembers" &&  <AddMembersForm addMember={setMembers} onClose={()=>setModalOpen("") } /> }
        {modalOpen == "editMembers" && <AddMembersForm  
                                                 addMember={setMembers}
                                                 memberData={selectedMember}
                                                 onClose={()=>{
                                                    setModalOpen("") 
                                                    setSelectedMember(null)} 
                                                    } /> }
    </>
}

export default MembersComponent
