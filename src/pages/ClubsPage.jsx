import React from 'react'
import { ClubsComponent, Footer, GradientBackground, Navbar } from '../components'

function ClubsPage() {
  return (
    <GradientBackground>
      <Navbar />
      <ClubsComponent />
      <Footer />
    </GradientBackground>
  )
}

export default ClubsPage