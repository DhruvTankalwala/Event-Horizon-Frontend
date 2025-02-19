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
import EventDetailsPage from './pages/EventDetails'
import EventRegistrationsPage from './pages/EventRegistrationsPage'
import ManageClubRegistrationsPage from './pages/ManageClubRegistrationsPage'
import ManageAttendancePage from './pages/ManageAttendancePage'
import OngoingEventsPage from './pages/OngoingEventsPage'
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
      <Route path='/' element = {<EventsPage />} />
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
      path='/clubs/:clubId'
      element={
         <AuthRoute>
           <ClubDetails />
         </AuthRoute>
       }/>
      <Route
         path='/events' 
         element={
          <AuthRoute>
              < EventsPage />
          </AuthRoute>
          }/>
          <Route
         path='/events/:eventId'
         element={
            <AuthRoute>
              <EventDetailsPage />
            </AuthRoute>
          }/>
          <Route
         path='/manage-registrations'
         element={
            <AuthRoute>
              <EventRegistrationsPage />
            </AuthRoute>
          }/>

        <Route
         path='/manage-club-registrations'
         element={
            <AuthRoute>
              <ManageClubRegistrationsPage />
            </AuthRoute>
          }/>
           <Route
         path='/manage-attendance' 
         element={
          <AuthRoute>
              <OngoingEventsPage />
          </AuthRoute>
          }/>
            <Route
         path='/events/:eventId/attendance' 
         element={
          <AuthRoute>
              <ManageAttendancePage />
          </AuthRoute>
          }/>
    </Routes>
    <Toaster />
    </>  
  ) 
}

export default App
