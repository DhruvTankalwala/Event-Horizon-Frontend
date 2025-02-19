import React from 'react'
import { Navbar , Footer , GradientBackground , ManageAttendanceComponent } from '../components'
const ManageAttendancePage = () => {
  return (
    <GradientBackground>
        <Navbar />
        <ManageAttendanceComponent />
        <Footer />
    </GradientBackground>
  )
}

export default ManageAttendancePage
