import React from 'react'
import TaskItem from './TaskItem';
const TaskList = ({tasks}) => {

 const initialTasks = [
        {
          id: 1,
          title: "Redesign landing page",
          description: "Update the landing page with new branding",
          status: "In Progress",
          priority: "High",
          dueDate: "2024-03-05",
          tags: ["in Progress","High","Design", "Marketing"],
        },
        {
          id: 2,
          title: "Fix navigation bug",
          description: "The dropdown menu is not working on mobile devices",
          status: "To Do",
          priority: "Medium",
          dueDate: "2024-03-10",
          tags: ["Completed","Low", "Bug", "Frontend"],
        },
        // Add more sample tasks here...
    ];

  return (
    <div>
      {tasks?.map(task => <TaskItem 
        task={task}
      />)}
    </div>
  )
}

export default TaskList
