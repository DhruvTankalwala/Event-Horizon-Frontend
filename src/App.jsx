import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Routes, useNavigate } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import VerificationCheckPage from './pages/VerificationCheckPage'
import VerificationPendingPage from './pages/VerificationPendingPage'
import PollsPage from './pages/Polls'
import ClubsPage from './pages/ClubsPage'
import { myAxios } from './utils/user-service'

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
    <Routes>
      <Route path='/' element = {<AuthPage />} />
      <Route path='/auth' element = {<AuthPage />} />
      <Route path='/verify' element={< VerificationPendingPage/>} />
      <Route path='/verify-email' element={<VerificationCheckPage/>} />
      <Route path='/polls' element={<PollsPage />} />
      <Route path='/clubs' element={<ClubsPage />} />
    </Routes>
    <Toaster />
    </>  
  ) 
}

export default App
