import React from 'react'
import { EventsComponent, Footer, Navbar , GradientBackground } from '../components'

const EventsPage = () => {
  return (
    <GradientBackground >
        <Navbar />
        <EventsComponent />
        <Footer />
    </GradientBackground>
  )
}

export default EventsPage
