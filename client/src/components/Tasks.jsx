import {  FormControl , MenuItem, Select, Skeleton} from '@mui/material';
import React, { useEffect, useState } from 'react';
import {  FaSearch, FaSpinner } from 'react-icons/fa';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { GoClock } from "react-icons/go";
import { BsTags, BsExclamationCircle } from "react-icons/bs";

import TaskList from './TaskList';
import { useDispatch, useSelector } from 'react-redux';
import { addNewTask, getTasks, tasksAdded } from '../redux/taskSlice';
import _ from 'lodash';
import { toast } from 'react-toastify';
import TaskModal from './TaskModal';

const Tasks = () => {
  const [searchValue, setSearchValue] = useState('');
  const [sortValue, setSortValue] = useState('asc'); // État pour le Select
  const [activeStatus, setActiveStatus] = useState(0); // Premier item activé par défaut
  const [newOpenTaskModal, setNewOpenTaskModal] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const { tasks, errors, loading } = useSelector(state => state.task); 

  const [formData, setFormData] = useState({
    title:'',
    description:'',
    status:'To Do',
    priority:'Medium',
    dueDate: new Date(),
    owner: user._id,
    tags: []
   });
   const [formErrors, setFormErrors] = useState(errors);

  useEffect(() => {
    setFormErrors(errors);
    if(errors.length === 0){
      dispatch(getTasks());
    }
  }, [dispatch, errors]);

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
    setFormData({
      title:'',
      description:'',
      status:'To Do',
      priority:'Medium',
      dueDate: new Date(),
      owner: user._id,
      tags: []
    });
    setFormErrors([]);
  }
  const onSubmit = async () => {
    try {
      // Attendre la fin de l'action
      formData.tags.unshift(formData.status, formData.priority);
      dispatch(addNewTask(formData)).unwrap();      
      dispatch(tasksAdded(formData));
      setNewOpenTaskModal(false);
      setTimeout(() => {
        toast.success('Task Added');
      }, 2000)
      
      setFormData({
        title:'',
        description:'',
        status:'To Do',
        priority:'Medium',
        dueDate: new Date(),
        owner: user._id,
        tags: []
      })
    } catch (error) {
      toast.error(error || "An error occurred while adding the task.");
    }
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
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-orange-500 text-white hover:bg-orange-500/90 h-10 px-4 py-2"
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
            {loading ? [...Array(6)].map((_, index) => (
          <div key={index} className="mb-4">
            <Skeleton variant="rectangular" width="100%" height={20} />
          </div>
        )) :  taskStatuses.map((status, index) => (
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
          {
            loading ? [...Array(1)].map((_, index) => (
              <div key={index} className="mb-4">
                <Skeleton variant="rectangular" width="100%" height={70} />
              </div>
            )): <div className="p-4 border  shadow-md rounded-lg">
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
          }
          
        </div>

        {/* Colonne droite (Liste des tâches) */}
        <div className="w-9/12">
          <TaskList tasks={filteredTasks(tasks)}
          />
          <TaskModal
            open={newOpenTaskModal}
            onClose={handleClose}
            formData={formData}
            formErrors={formErrors}
            handleChangeForm={handleChangeForm}
            onSubmit={onSubmit}
            buttonTitle='Create Task'/>
        </div>


      </div>
    </div>
  );
};

export default Tasks;
