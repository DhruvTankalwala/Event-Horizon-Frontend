import React from 'react'
import { GradientBackground , Navbar , Footer, UserProfileComponent } from '../components'
const UserProfilePage = () => {
  return (
    <GradientBackground>
        <Navbar />
        <UserProfileComponent />
        <Footer />
    </GradientBackground>
  )
}

export default UserProfilePage
