import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import axios from "axios"
import { getBaseURL } from '../utils/getBaseUrl'

const AdminLogin = () => {
  const [message, setMessage] = useState();
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    setMessage()
    try {
      // console.log(data)
      const response = await axios({
        method: "POST",
        url: `${getBaseURL()}/api/auth/admin`,
        headers: {
          "Content-Type": "application/json",
        },
        data,
      })
      const auth = await response.data
      if ( auth.token ) {
        localStorage.setItem('token', auth.token)

        setTimeout(() => {
          localStorage.removeItem('token')
          navigate("/")
          alert("Admin timeout.. sign in again to use.")
        }, auth.tokenTime)

        alert("Admin Login Success")
        navigate("/dashboard")
      }
      // console.log(auth)

      // navigate("/")
    } catch (error) {
      setMessage("Incorrect email or password")
      console.error(error)
    }
  }

  return (
    <div className='h-screen flex items-center justify-center'>
      <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <h2 className='text-xl font-semibold mb-4'>
          Admin Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>

          <div className='mb-4'>
            <label htmlFor="username" className='block text-gray-700 text-sm font-bold mb-2'>Username</label>
            <input {...register("username", { required: true })}
              type="username"
              name="username"
              id="username"
              placeholder='username'
              className='shadow appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none' />
          </div>

          <div className='mb-4'>
            <label htmlFor="password" className='block text-gray-700 text-sm font-bold mb-2'>Password</label>
            <input {...register("password", { required: true })} type="password" name="password" id="password" placeholder='Password' className='shadow appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none' />
          </div>

          {
            message && <p className='text-red-500 text-xs italic mb-3'>{message}</p>
          }
          <div>
            <button className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none'>
              Login
            </button>
          </div>
        </form>

        <p className='mt-5 text-center text-gray-500 text-xs'>
          &copy; 2025 Book Store. All rights reserved
        </p>

      </div>
    </div>
  )
}

export default AdminLogin