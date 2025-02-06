import React from 'react'
import { Navbar, Footer ,EventDetailsComponent, GradientBackground } from '../components/index'

const EventDetailsPage = () => {
  return (
    <GradientBackground>
    <Navbar />
    <EventDetailsComponent />
    <Footer />
    </GradientBackground>
  )
}

export default EventDetailsPage
