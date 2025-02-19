import React from 'react'
import { OngoingEventsComponent , Navbar ,Footer , GradientBackground } from '../components'

const OngoingEventsPage = () => {
  return (
    <GradientBackground>
      <Navbar />
      <OngoingEventsComponent />
      <Footer />
    </GradientBackground>
  )
}

export default OngoingEventsPage
