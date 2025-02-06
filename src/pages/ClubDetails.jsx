import React, { useEffect } from 'react'
import { ClubDetailsComponent, Footer, GradientBackground , Navbar } from '../components/index'
const ClubDetails = () => {

  return (
    <GradientBackground>
        <Navbar />
        <ClubDetailsComponent />
        <Footer />
    </GradientBackground>
  )
}

export default ClubDetails
