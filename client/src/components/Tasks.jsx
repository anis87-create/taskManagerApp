import { Button, FormControl, IconButton, InputLabel, MenuItem, Modal, Select, TextField, Typography, Box} from '@mui/material';
import React, { useEffect, useState } from 'react';
import {  FaSearch, FaSpinner } from 'react-icons/fa';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { GoClock } from "react-icons/go";
import { BsTags, BsExclamationCircle } from "react-icons/bs";

import TaskList from './TaskList';
import { useDispatch, useSelector } from 'react-redux';
import { addNewTask, getTasks } from '../redux/taskSlice';
import _ from 'lodash';
import {  ShieldCloseIcon } from 'lucide-react';

const Tasks = () => {
  const [searchValue, setSearchValue] = useState('');
  const [sortValue, setSortValue] = useState('asc'); // État pour le Select
  const [activeStatus, setActiveStatus] = useState(0); // Premier item activé par défaut
  const [newOpenTaskModal, setNewOpenTaskModal] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const { tasks } = useSelector(state => state.task);
  const [formData, setFormData] = useState({
    title:'',
    description:'',
    status:'To Do',
    priority:'Medium',
    dueDate:'',
    owner: user._id,
    tags: []
});
  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const filteredTasks = (arr) => _.filter(arr, task => task.owner === user._id);
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
  const taskStatuses = [
    { label: "All Tasks", count: 24, icon: <BsTags/> },
    { label: "To Do", count: 8, icon: <GoClock /> },
    { label: "In Progress", count: 5, icon: <FaSpinner /> },
    { label: "Completed", count: 7, icon: <IoMdCheckmarkCircleOutline /> },
    { label: "High Priority", count: 3, icon: <BsExclamationCircle /> },
    { label: "Overdue", count: 1, icon: <BsExclamationCircle /> },
  ];

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-4 ">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <button 
          className="pl-4 pr-4 pt-3 pb-3 text-white font-bold bg-orange-500 flex items-center justify-between rounded-md h-10 hover:opacity-80 transition-opacity"
          onClick={handleAddTask}
        >
          <span>+</span> <span>Add Task</span>
        </button>
      </div>

      {/* Conteneur principal en 2 colonnes */}
      <div className="flex gap-4">
        
        {/* Colonne gauche (Filtres & Recherche) */}
        <div className="w-3/12 flex flex-col gap-4">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search Tasks..."
              className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-orange-500"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
          </div>

          {/* Liste des statuts */}
          <div className="mt-4 bg-white shadow-md rounded-lg p-3">
            {taskStatuses.map((status, index) => (
              <div
                key={index}
                className={`flex justify-between items-center py-2 px-3  rounded-md cursor-pointer transition-colors ${
                  activeStatus === index ? 'bg-orange-500 text-white' : 'hover:bg-gray-100'
                }`}
                onClick={() => setActiveStatus(index)}
              >
                <div className="flex items-center space-x-2">
                  <span className={`${activeStatus === index ? 'text-white' : 'text-black'} hover:text-white`}>
                    {status.icon}
                  </span>
                  <span>{status.label}</span>
                </div>
                <span className="px-2 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
                  {status.count}
                </span>
              </div>
            ))}
          </div>

          {/* Sélecteur de tri */}
          <div className="p-4 border  shadow-md rounded-lg">
            <label className="block font-semibold mb-1 rounded-lg">Sort By</label>
            <FormControl fullWidth>
              <Select
                value={sortValue}
                onChange={(e) => setSortValue(e.target.value)}
                className="border-gray-300 rounded-md"
              >
                <MenuItem value="asc">Due Date (Ascending)</MenuItem>
                <MenuItem value="desc">Due Date (Descending)</MenuItem>
                <MenuItem value="high">Priority (High To Low)</MenuItem>
                <MenuItem value="low">Priority (Low To High)</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        {/* Colonne droite (Liste des tâches) */}
        <div className="w-9/12">
          <TaskList tasks={filteredTasks(tasks)} />
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


      </div>
    </div>
  );
};

export default Tasks;
