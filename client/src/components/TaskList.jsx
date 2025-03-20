import React from 'react'
import TaskItem from './TaskItem';
import { useSelector } from 'react-redux';
const TaskList = ({tasks}) => {
  const {loading}  = useSelector(state => state.task);
  return (
    <div>
      {tasks?.map(task => <TaskItem 
        key={task._id}
        task={task}
        loading={loading}
      />)}
    </div>
  )
}

export default TaskList
