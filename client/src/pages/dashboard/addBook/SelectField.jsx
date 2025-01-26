import React from 'react'

const SelectField = ({label, name, options, register}) => {
  return (
    <div className='mb-4'>
      <label className='block text-sm font-semibold text-gray-700'>
        {label}
      </label>

      <select 
      {...register(name, {required: true})}
      className='w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-white'>
        {
          options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))
        }
      </select>
    </div>
  )
}

export default SelectField