import { Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography, Box, rgbToHex, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import TaskList from './TaskList';
import { ShieldCloseIcon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewTask, getTasks } from '../redux/taskSlice';
import  _  from 'lodash';


const Tasks = () => {
  const [searchValue, setSearchValue] = useState();
  const [newOpenTaskModal, setNewOpenTaskModal] = useState(false);
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user);
  const {tasks, error} = useSelector(state => state.task);
  const [formData, setFormData] = useState({
      title:'',
      description:'',
      status:'To Do',
      priority:'Medium',
      dueDate:'',
      owner: user._id,
      tags: []
  });
  const handleChange = (e) => {
      setSearchValue(e.target.value)
  }
  const handleChangeForm = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }


  const handleAddTask =() => {
    setNewOpenTaskModal(true);
  }
  const handleClose = () => {
    setNewOpenTaskModal(false);
  }

  const onSubmit = () => {
      formData.tags = [formData.status, formData.priority];
      dispatch(addNewTask(formData));
  }
  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);
  const filteredTasks = (arr) => {
    return _.filter(arr, task => task.owner === user._id);
  }
  return (
    <div className='container mx-auto'>
      <div className='flex justify-between'>
        <h2 className='text-2xl font-bold'>Tasks</h2>
        <button className='pl-4 pr-4 pt-3 pb-3  text-white font-bold w-35 bg-orange-500 cursor-pointer space-x-2 flex items-center justify-between rounded-md h-10  hover:opacity-80 transition-opacity duration-300 ease-in-out' 
          onClick={handleAddTask}
          > <span>+</span> <span>Add Task</span></button>
      </div>
      <div className='flex justify-between'>
      <div className="relative flex  items-center" style={{marginTop:'12px', flex:'1'}}> {/* Adds margin top */}
        <input
          type="text"
          placeholder="Search Tasks..."
          className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-orange-500"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <FormControl sx={{ marginTop: 3,marginLeft:'5px', minHeight: '60px' }}>
        <InputLabel sx={{ paddingTop: '0.5rem' }}>Sort</InputLabel>
        <Select
          value={searchValue}
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
     <TaskList tasks={filteredTasks(tasks)}/>
     {newOpenTaskModal &&  <Modal open={newOpenTaskModal} onClose={handleClose}
     >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 550,
            bgcolor: "white",
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
           <IconButton
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  color: 'text.secondary', // Set color of the close button
                }}
              >
                <ShieldCloseIcon />
              </IconButton>
          <Typography variant="h6" sx={{
            fontWeight:'bold',
            fontSize:'18px'
          }} gutterBottom>
            Add New Task
          </Typography>
          {/* Paragraph Description */}
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Please fill in the details below to create a new task. Ensure that all necessary information is provided.
          </Typography>
          
          <Box sx={{
            padding:'8px',
            marginLeft:'20px',
          }}>
            {/* Title */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <InputLabel  sx={{ minWidth: 100, fontWeight:'bold', fontSize:'15px' }}>Title:</InputLabel>
              <TextField
                name="title"
                value={formData.title}
                onChange={handleChangeForm}
                fullWidth
                size="small"
                className="border:none focus:border-orange-500"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: 'orange', // Sets the border color to orange when focused
                    },
                  },
                }}
              />
            </Box>

            {/* Description */}
            <Box sx={{ display: "flex", mb: 2 }}>
              <InputLabel sx={{ minWidth: 100, fontWeight:'bold', fontSize:'15px' }}>Description:</InputLabel>
              <TextField
                name="description"
                value={formData.description}
                onChange={handleChangeForm}
                fullWidth
                multiline
                className='focus:border-orange-500'
                rows='4'
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: 'orange', // Sets the border color to orange when focused
                    },
                  },
                }}
              />
            </Box>

            {/* Status */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <InputLabel sx={{ minWidth: 100, fontWeight:'bold', fontSize:'15px' }}>Status:</InputLabel>
              <FormControl fullWidth size="small">
                <Select name="status"  value={formData.status} onChange={handleChangeForm}>
                  <MenuItem value="To Do">To Do</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Priority */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <InputLabel sx={{ minWidth: 100, fontWeight:'bold', fontSize:'15px' }}>Priority:</InputLabel>
              <FormControl fullWidth size="small">
                <Select name="priority"  value={formData.priority} onChange={handleChangeForm}>
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Due Date */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <InputLabel sx={{ minWidth: 100, fontWeight:'bold', fontSize:'15px' }}>Due Date:</InputLabel>
              <TextField
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChangeForm}
                fullWidth
                size="small"
                className='focus:border-orange-500'
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: 'orange', // Sets the border color to orange when focused
                    },
                  },
                }}
              />
            </Box>

    
          </Box>
                  {/* Action Buttons */}
                  <Box>
              <Button variant="contained" onClick={onSubmit} sx={{ background: "rgb(249, 115, 22)", marginLeft:'349px',
              '&:hover': {
                  opacity: 0.9, // This will increase the opacity (or decrease it) on hover
                  transition: 'opacity 0.3s ease', 
                },
              }}>Create Task</Button>
            </Box>
        </Box>
      </Modal>}
    </div>
  )
}

export default Tasks
