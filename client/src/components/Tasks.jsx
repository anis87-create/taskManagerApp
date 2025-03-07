import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

const Tasks = () => {
  const [seatchValue, setSearchValue] = useState();

  const handleChange = (e) => {
      setSearchValue(e.target.value)
  }
  return (
    <div className='container mx-auto'>
      <div className='flex justify-between'>
        <h2 className='text-2xl font-bold'>Tasks</h2>
        <button className='pl-4 pr-4 pt-3 pb-3  text-white font-bold w-35 bg-orange-500 cursor-pointer space-x-2 flex items-center justify-between rounded-md h-10  hover:bg-primary/90' > <span>+</span> <span>Add Task</span></button>
      </div>
      <div className='flex justify-between'>
      <div className="relative flex  items-center" style={{marginTop:'12px', flex:'1'}}> {/* Adds margin top */}
        <input
          type="text"
          placeholder="Search Tasks"
          className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-orange-500"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <FormControl sx={{ marginTop: 3,marginLeft:'5px', minHeight: '60px' }}>
  <InputLabel sx={{ paddingTop: '0.5rem' }}>Sort</InputLabel>
  <Select
    value={seatchValue}
    onChange={handleChange}
    label="Sort"
    defaultValue="asc"
    sx={{
      height: '45px',  // Slightly increase the height of the Select
      padding: '8px',  // Adjust padding for a better fit
      '& .MuiSelect-icon': {
        top: '50%', // Keep the dropdown icon centered
        transform: 'translateY(-50%)',
      },
    }}
  >
    <MenuItem value="asc">Due Date (Ascending)</MenuItem>
    <MenuItem value="desc">Due Date (Descending)</MenuItem>
    <MenuItem value="high">Priority (High To Low)</MenuItem>
    <MenuItem value="low">Priority (Low To High)</MenuItem>
  </Select>
</FormControl>


     </div>
    </div>
  )
}

export default Tasks
