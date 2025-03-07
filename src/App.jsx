import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import {  useNavigate } from 'react-router-dom'
import { myAxios } from './utils/user-service'

import AppRoutes from './routes/AppRoutes'
function App() {
  const navigate = useNavigate()
  useEffect(()=>{
    const token = localStorage.getItem("authToken");
    if(!token){
      navigate("/auth")  
    }
    myAxios.defaults.headers.common['authorization'] = token;
    console.log(token);
  },[])
  return (
    <>
    <AppRoutes />
    <Toaster />
    </>
  ) 
}

export default App
