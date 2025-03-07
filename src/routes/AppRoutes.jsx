
import React from 'react'
import AuthRoute from './ProtectedRoutes'
import ClubDetails from '../pages/ClubDetails'
import EventDetailsPage from '../pages/EventDetails'
import EventRegistrationsPage from '../pages/EventRegistrationsPage'
import ManageClubRegistrationsPage from '../pages/ManageClubRegistrationsPage'
import ManageAttendancePage from '../pages/ManageAttendancePage'
import OngoingEventsPage from '../pages/OngoingEventsPage'
import EventAnalyticsPage from '../pages/AnalyticsPage'
import LogoutComponent from '../components/Logout/LogoutComponent'
import EventFeedbacksPage from '../pages/EventFeedbacksPage'
import UserProfilePage from '../pages/UserProfilePage'
import { Route, Routes, Navigate } from 'react-router-dom'
import AuthPage from '../pages/AuthPage'
import VerificationPendingPage from '../pages/VerificationPendingPage'
import PollsPage from '../pages/Polls'
import ClubsPage from '../pages/ClubsPage'
import EventsPage from '../pages/EventsPage'
const AppRoutes = () => {
    const token = localStorage.getItem("authToken")
    const userType = localStorage.getItem("userRole")
  return (
    <Routes>
    {/* Unauthenticated and unauthorized routes */}
        {!token && (
            <>
            <Route path='/auth' element = {<AuthPage />} />
            <Route path='/verify' element={< VerificationPendingPage/>} />
            </>
        )}

    {/* Authorized routes for userType == "USER" */}
        {
           token && userType == "USER" ? (
                // Firstly add the protected routes for user
                < Route element = { <AuthRoute userTypeAccepted = "USER" /> }>
                    <Route path='/auth' element = {< Navigate to='/' />}   />
                    <Route path='/verify' element={< Navigate to='/' />}   />
                    <Route path='/' element={ < EventsPage />}    />
                    <Route path='/events' element={ < EventsPage />}    />
                    <Route path='/events/:eventId' element={ <EventDetailsPage />}/>
                    <Route path='/feedbacks/events/:eventId' element={ <EventFeedbacksPage /> } />
                    <Route path='/clubs' element={ <ClubsPage/>}           />
                    <Route path='/clubs/:clubId' element={ <ClubDetails />}/>
                    <Route path='/users/:userId' element={ <UserProfilePage />}/>
                    <Route path='/polls' element={<PollsPage />} />
                    <Route path='/logout'  element={  <LogoutComponent />}/>
                </Route>
            ) : token && userType == "CLUB_ADMIN" ? (

                < Route element = { <AuthRoute userTypeAccepted = "CLUB_ADMIN" /> }>
                    {/* Here at / show the clubDetials of that particular club */}
                    <Route path='/auth' element = {< Navigate to='/' />}   />
                    <Route path='/verify' element={< Navigate to='/' />}   />

                    <Route path='/' element={ < EventsPage />}    />
                    <Route path='/events' element={ < EventsPage />}    />
                    <Route path='/events/:eventId' element={ <EventDetailsPage />}/>
                    <Route path='/feedbacks/events/:eventId' element={ <EventFeedbacksPage /> } />
                    <Route path='/clubs' element={ <ClubsPage/>}           />
                    <Route path='/clubs/:clubId' element={ <ClubDetails />}/>
                    <Route path='/users/:userId' element={ <UserProfilePage />}/>
                    <Route path='/polls' element={<PollsPage />} />
                    {/* CLUB_ADMIN specific routes */}
                    <Route path='/manage-attendance'  element={ <OngoingEventsPage /> }/>
                    <Route path='/manage-registrations' element={ <EventRegistrationsPage /> }/>
                    <Route path='/events/:eventId/attendance'  element={ <ManageAttendancePage /> } />
                    <Route path='/event-analytics' element={ <EventAnalyticsPage />}/>
                    <Route path='/logout'  element={  <LogoutComponent />}/>
                </Route>

            ) : token && userType == "ADMIN" ? (
                < Route element = { <AuthRoute userTypeAccepted = "ADMIN" /> }>
                    <Route path='/auth' element = {< Navigate to='/' />}   />
                    <Route path='/verify' element={< Navigate to='/' />}   />
                    <Route path='/manage-club-registrations' element={<ManageClubRegistrationsPage />}/>
                    <Route path='/logout'  element={  <LogoutComponent />}/>
                </Route>
            ) : <Route path='*' element={<Navigate to={"/"}/>}/>
        }
        <Route path='*' element={<Navigate to={"/"}/>}/>
  </Routes>
  )
}

export default AppRoutes;
