import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from "react-router-dom"

const PrivateRoute = ({children}) => {
  const {currentUser, loading} = useAuth()
  const navigate = useNavigate()


  if (loading ) {
    return <div>Loading...</div>
  }

  if (currentUser) {
    return children
  }

  navigate("/login", {replace: true})
}

export default PrivateRoute