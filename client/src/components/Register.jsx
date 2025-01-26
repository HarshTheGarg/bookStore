import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { FaGoogle } from "react-icons/fa"
import { useForm } from "react-hook-form"
import { useAuth } from '../context/AuthContext'

const Register = () => {
  const [message, setMessage] = useState()
  const {registerUser, signInWithGoogle} = useAuth()
  
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
      await registerUser(data.email, data.password)
      navigate("/")
    } catch (error) {
      setMessage("Please Provide a vaild email and password")
      console.error(error)
    }
  }

  const handleGoogleSignin = async () => {
    try {
      await signInWithGoogle()
      navigate("/")
    } catch (error) {
      setMessage("Error logging in with Google, please try again.")
      console.error(error)
    }
  }

  return (
    <div className='h-[calc(100vh-120px)] flex items-center justify-center'>
      <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <h2 className='text-xl font-semibold mb-4'>
          Please Register
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>

          <div className='mb-4'>
            <label htmlFor="email" className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
            <input {...register("email", { required: true })} type="email" name="email" id="email" placeholder='Email Address' className='shadow appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none' />
          </div>

          <div className='mb-4'>
            <label htmlFor="password" className='block text-gray-700 text-sm font-bold mb-2'>Password</label>
            <input {...register("password", { required: true })} type="password" name="password" id="password" placeholder='Password' className='shadow appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none' />
          </div>

          {
            message && <p className='text-red-500 text-xs italic mb-3'>{message}</p>
          }
          <div>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none'>
              Register
            </button>
          </div>
        </form>

        <p className='align-baseline font-medium mt-4 text-sm'>
          Already Have an Account? Please <Link to={"/login"} className='text-blue-500 hover:text-blue-700'>Login</Link>
        </p>

        <div className='mt-4'>
          <button className='w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none' onClick={handleGoogleSignin}>
            <FaGoogle className='mr-2' />
            Sign in with Google
          </button>
        </div>

        <p className='mt-5 text-center text-gray-500 text-xs'>
          &copy; 2025 Book Store. All rights reserved
        </p>

      </div>
    </div>
  )
}

export default Register