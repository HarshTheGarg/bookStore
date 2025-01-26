import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

const AdminRoute = ({children}) => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  if (token) {
    return children ? children : <Outlet />
  } else {
    return <Navigate to="/admin" replace={true}/>
  }
}

export default AdminRoute