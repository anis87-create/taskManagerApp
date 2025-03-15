import { Divider } from '@mui/material';
import moment from 'moment/moment';
import React, { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { CiCalendarDate } from 'react-icons/ci';
import { RiDeleteBinLine } from "react-icons/ri";

const TaskItem = ({task}) => {
    const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
            <div className='p-4 border border-gray-200 w-full rounded-lg' style={{marginBottom:'8px'}}>
                <div className="relative w-full mb-2">
                {/* Title and Icon */}
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold tracking-tight">{task.title}</h2>
                    <button onClick={toggleDropdown} className="p-1">
                    <BsThreeDots className="text-gray-600 cursor-pointer" />
                    </button>
                </div>

                {/* Dropdown Menu */}
                {isOpen && (
                    <div className="absolute right-1 top-10 bg-white border border-gray-300 shadow-lg rounded-md w-50 z-50">
                    <ul className="z-100 py-1 text-sm text-gray-700">
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Edit</li>
                        <Divider sx={{ bgcolor: "gray.200"}}/>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Mark as completed</li>
                        <Divider sx={{ bgcolor: "gray.200" }}/>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Set To Low Priority</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Set To Medium Priority</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Set To High Priority</li>
                        <Divider sx={{ bgcolor: "gray.200" }}/>
                        <li className='px-4 py-2 flex  items-center cursor-pointer'>
                            <RiDeleteBinLine style={{marginRight:'8px', color:'red'}}/>
                            <span className='text-red-500'>Delete</span>
                        </li>
                    </ul>
                    </div>
                )}
                </div>
                <p className="my-2  text-sm text-muted-foreground">{task.description}</p>
                <div className='flex flex-wrap gap-2'>
                {task.tags.map(tag => <div className={`block my-4 px-3 font-bold rounded-xl text-xs
                    ${tag === "in Progress" ? "bg-blue-100 text-blue-800" : 
                    tag === "High" ? "bg-red-100 text-red-800" :
                    tag === "To Do" ? "bg-slate-100 text-slate-800":
                    tag ==='Medium' ? "bg-yellow-100 text-yellow-800" :
                    tag ==='Completed' ?"bg-green-100 text-green-800" : 
                    tag ==='Low' ?"bg-green-100 text-green-800" : 
                    "border border-gray-200"}`}>{tag}</div>)}
                </div>  
                <div className='flex items-center py-2'>
                    <CiCalendarDate />
                    <span className='block ml-2'>Due: {moment(task.dueDate).format('DD/MM/YYYY')}</span>
                </div> 
            </div>
  )
}

export default TaskItem
