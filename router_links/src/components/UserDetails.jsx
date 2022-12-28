import React from 'react'
import { useParams } from 'react-router-dom'

function UserDetails() {
    // const params=useParams()
    // const userId=params.userId
    const {userId}=useParams()
  return (
    <div>
      User {userId} details
    </div>
  )
}

export default UserDetails
