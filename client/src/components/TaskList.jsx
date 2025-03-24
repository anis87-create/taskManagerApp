import React, { useEffect, useState } from 'react';
import TaskItem from './TaskItem';
import { Skeleton } from '@mui/material';
import { useSelector } from 'react-redux';

const TaskList = () => {
  const { tasks, loading } = useSelector(state => state.task);

  
  
  if (loading) {
    return (
      <div>
        {[...Array(4)].map((_, index) => (
          <div key={index} className="mb-4">
            <Skeleton variant="text" width="70%" height={30} />
            <Skeleton variant="text" width="60%" height={20} />
            <Skeleton variant="rectangular" width="100%" height={100} />
          </div>
        ))}
      </div>
    );
  }

  if (!tasks?.length) {
    return <p>Aucune tâche trouvée</p>;
  }

  return (
    <div>
      {tasks.map(task => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
