import React from 'react'
import { AnalyticsComponent, Footer, GradientBackground, Navbar } from '../components/index'

const AnalyticsPage = () => {
  return (
    <GradientBackground>
      <Navbar/>
      <AnalyticsComponent />
      <Footer />
    </GradientBackground>
  )
}

export default AnalyticsPage
