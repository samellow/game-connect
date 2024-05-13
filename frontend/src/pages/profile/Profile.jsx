import React from 'react'
import './profile.css'
import { ProfileSidebar } from '../../components'
import { UserDashBoard } from '../../components'
const Profile = () => {
  return (
    <>
    
<div className='container'>

    <ProfileSidebar></ProfileSidebar>
    <UserDashBoard></UserDashBoard>
</div>


    </>
  )
}

export default Profile
  