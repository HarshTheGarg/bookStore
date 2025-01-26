import React from 'react'

const InputField = ({ label, name, type = "text", register, placeholder }) => {
  return (
    <div className='mb-4'>
      <label className='block text-sm font-semibold text-gray-700'>
        {label}
      </label>

      {
        type == "number" ? (

          <input
            type={type}
            step="0.01"
            {...register(name, { required: true })}
            className='p-2 border w-full rounded-md focus:outline-none focus:border-blue-300'
            placeholder={placeholder}
          />
        ) : (

          <input
            type={type}
            {...register(name, { required: true })}
            className='p-2 border w-full rounded-md focus:outline-none focus:border-blue-300'
            placeholder={placeholder}
          />
        )}
    </div>
  )
}

export default InputField