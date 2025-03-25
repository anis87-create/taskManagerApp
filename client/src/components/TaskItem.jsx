import { Divider, Skeleton } from '@mui/material';
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { CiCalendarDate } from 'react-icons/ci';
import { RiDeleteBinLine } from "react-icons/ri";
import {  useDispatch, useSelector } from 'react-redux';
import TaskModal from './TaskModal';
import {  deleteTask, updateTask } from '../redux/taskSlice';
import { toast } from 'react-toastify';
import DraggableDialog from './ConfirmDialog';
import TaskDetailsModal from './TaskModalDetails';

const TaskItem = ({task}) => { 
  const [isOpen, setIsOpen] = useState(false);
  const [isEditableOpen, setIsEditableOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
   const {errors } = useSelector(state => state.task);

   const dispatch = useDispatch();
   const { user } = useSelector(state => state.user);
   const [formData, setFormData] = useState({
    title:task?.title,
    description:task?.description,
    status:task?.status,
    priority:task?.priority,
    dueDate: task?.dueDate,
    owner: user._id,
    tags: task?.tags
   });
   const [openTaskModalDetails, setOpenTaskModalDetails] = useState();
  
  const toggleDropdown = (e) => {
    setIsOpen(!isOpen);
  };
  const img = `http://localhost:5000${user?.avatar}`;
  const  isDateLessThan = (date1, date2 = new Date())  => {
    const d1 = new Date(date1).setHours(0, 0, 0, 0);
   const d2 = date2.setHours(0, 0, 0, 0);
    return d1 < d2;
  }
  const handleEditableClose = () => {
    setIsEditableOpen(false);
  }
  const handleChangeForm = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }
  const onUpdateTask = () => {
     dispatch(updateTask({id: task._id, task: formData}));
     setTimeout(() => {
      toast.success(`Task "${formData.title}" has been updated`);
     }, 2000)
  }

  
  const onUpdateStatus = (status) => {
    const updateTags = formData.tags.map(
      (item, index) => index === 0 ? status: item
    );

    dispatch(updateTask({
      id: task._id,
      task: {
        ...formData,
        status,
        tags: updateTags
      }
    }))
  }

  const onUpdatePriority = (priority) => {
    const updateTags = formData.tags.map(
      (item, index) => index === 1 ? priority: item
    );

    dispatch(updateTask({
      id: task._id,
      task: {
        ...formData,
        priority,
        tags: updateTags
      }
    }))
  }

  const handleDialogOpen = () => {
    setOpenDialog(true);
    setIsOpen(false);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  const onDeleteTask = () => {
    dispatch(deleteTask({id: task._id}));
    setTimeout(() => {
      toast.success(`Task "${formData.title}" has been deleted`);
    }, 2000)
    
  }

  const onOpenTaskModalDetails = () => {
    setOpenTaskModalDetails(true);
  }

  const oncloseTaskModalDetails = () => {
    setOpenTaskModalDetails(false);
  }
  
  return (
        <div className={`p-4 border ${task.status === 'Completed' ? 'border-gray-200': 'border-red-500'} w-full rounded-lg text-card-foreground shadow-sm cursor-pointer transition-shadow hover:shadow-md`} 
        style={{marginBottom:'8px'}}
        onClick={onOpenTaskModalDetails}
        >
                <div className="relative w-full mb-2">
                {/* Title and Icon */}
                <div className="flex items-start justify-between mb-5">
                    <h3 className="font-semibold tracking-tight text-base first-letter:uppercase">{task.title}</h3>
                    <button onClick={toggleDropdown} className="p-1">
                    <BsThreeDots className="text-gray-600 hover:bg-gray-300 hover:text-accent-foreground rounded-md p-0" />
                    </button>
                </div>

                {/* Dropdown Menu */}
                {isOpen && (
                    <div className="absolute right-1 top-10 bg-white border border-gray-300 shadow-lg rounded-md w-50 z-50">
                    <ul className="z-100 py-1 text-sm text-gray-700">
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => setIsEditableOpen(true)}>
                            Edit
                          </li>
                        <Divider sx={{ bgcolor: "gray.200"}}/>
                        <h3 className='font-bold ml-4 my-3'>Status</h3>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => onUpdateStatus('To Do')}>Set to To Do</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => onUpdateStatus('In Progress')}>Set to In Progress</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => onUpdateStatus('Completed')}>Mark as Completed</li>
                        <Divider sx={{ bgcolor: "gray.200" }}/>
                        <h3 className='font-bold ml-4 my-3'>Priority</h3>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => onUpdatePriority('Low')}>Set To Low Priority</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => onUpdatePriority('Medium')}>Set To Medium Priority</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => onUpdatePriority('High')}>Set To High Priority</li>
                        <Divider sx={{ bgcolor: "gray.200" }}/>
                        <li className='px-4 py-2 flex  items-center cursor-pointer' onClick={handleDialogOpen}>
                            <RiDeleteBinLine style={{marginRight:'8px', color:'red'}}/>
                            <span className='text-red-500'>Delete</span>
                        </li>
                    </ul>
                    </div>
                )}
                </div>
                <p className="text-muted-foreground line-clamp-2 text-xs">{task.description}</p>
                <div className='flex flex-wrap gap-2'>
                { isDateLessThan(task.dueDate) && <div className='block my-4 px-3 font-bold rounded-xl text-xs text-white bg-red-500'>OverDue</div>}   
                {task?.tags.map(tag => <div className={`block my-4 px-3 font-bold rounded-xl text-xs
                    ${tag === "In Progress" ? "bg-blue-100 text-blue-800" : 
                    tag === "High" ? "bg-red-100 text-red-800" :
                    tag === "To Do" ? "bg-slate-100 text-slate-800":
                    tag ==='Medium' ? "bg-yellow-100 text-yellow-800" :
                    tag ==='Completed' ?"bg-green-100 text-green-800" : 
                    tag ==='Low' ?"bg-green-100 text-green-800" : 
                    "border border-gray-200"}`}>{tag}</div>
                    )}
                 
                </div>  
                <div className='flex justify-between'>
                    <div className='flex items-center'>
                        <CiCalendarDate />
                        <span className='block ml-2'>{moment(task.dueDate).format('DD/MM/YYYY')}</span>
                    </div> 
                    <span className='relative flex shrink-0 overflow-hidden rounded-full h-6 w-6'>
                    <img
                        src={img}
                        alt="Profile"
                        className="aspect-square h-full w-full"
                    />
                    </span>
                </div>
                <TaskModal
                  open={isEditableOpen}
                  onClose={handleEditableClose}
                  formData={formData}
                  formErrors={errors}
                  handleChangeForm={handleChangeForm}
                  onSubmit={onUpdateTask}
                  buttonTitle='Save Changes'
              />
              <DraggableDialog
                open={openDialog}
                onDeleteTask={onDeleteTask}
                handleDialogClose={handleDialogClose}
              />
              <TaskDetailsModal
                open={openTaskModalDetails}
                close={oncloseTaskModalDetails}
                task={formData}
              />
        </div>
  )
}

export default TaskItem
