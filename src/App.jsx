import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Routes, useNavigate } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import VerificationPendingPage from './pages/VerificationPendingPage'
import PollsPage from './pages/Polls'
import ClubsPage from './pages/ClubsPage'
import EventsPage from './pages/EventsPage'
import { myAxios } from './utils/user-service'
import { AuthRoute } from './components'
import ClubDetails from './pages/ClubDetails'

function App() {
  const navigate = useNavigate()
  useEffect(()=>{
    const token = localStorage.getItem("authToken");
    if(!token){
      navigate("/auth")      
    }
    myAxios.defaults.headers.common['authorization'] = token;
    console.log(token);
    navigate('/clubs')
  },[])
  return (
    <>
    <Routes>
      <Route path='/' element = {<AuthPage />} />
      <Route path='/auth' element = {<AuthPage />} />
      <Route path='/verify' element={< VerificationPendingPage/>} />
      <Route 
          path='/polls' 
          element={
                <AuthRoute>
                <PollsPage />
                </AuthRoute>
        } />
      <Route 
          path='/clubs' 
          element={
            <AuthRoute>
                <ClubsPage/>
            </AuthRoute>
        } />
      <Route
         path='/events' 
         element={
          <AuthRoute>
              < EventsPage />
          </AuthRoute>
          }/>
           <Route
         path='/clubs/:clubId'
         element={
            <AuthRoute>
              <ClubDetails />
            </AuthRoute>
          }/>
    </Routes>
    <Toaster />
    </>  
  ) 
}

export default App
