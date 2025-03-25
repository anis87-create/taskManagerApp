import moment from 'moment/moment';
import { Modal, Typography, IconButton, Box } from "@mui/material";
import { ShieldCloseIcon } from 'lucide-react';

const TaskDetailsModal = ({open, onClose, task}) => {  
    return (
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 550,
            bgcolor: 'white',
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: 'text.secondary',
            }}
          >
            <ShieldCloseIcon />
          </IconButton>
          <Box >
            <Box sx={{
                display:'flex',
                alignItems:'center',
                justifyContent:'space-between'
            }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '18px' }} gutterBottom>
                {task.title}
            </Typography>

            <Box sx={{
                    display:'flex',
            }}>
            <div className='flex  flex-wrap gap-2'>   
                    <div className={`block my-4 px-3 font-bold rounded-xl text-xs
                        ${task.status === "In Progress" ? "bg-blue-100 text-blue-800" : 
                        task.status === "To Do" ? "bg-slate-100 text-slate-800":
                        task.status ==='Completed' ?"bg-green-100 text-green-800" : 
                        "border border-gray-200"}`}>{task.status}</div>
                    </div>
                    <div className={`block my-4 px-3 font-bold rounded-xl text-xs
                    ml-2
                        ${task.priority === "High" ? "bg-red-100 text-red-800" :
                        task.priority === "Medium" ? "bg-yellow-100 text-yellow-800":
                        task.priority ==='Low' ? "bg-green-100 text-green-800" : 
                        "border border-gray-200"}`}>{task.priority}</div>
            </Box>
            </Box>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Created on {moment(task.dueDate).format('ll')}
            </Typography>
            <Box>
               <Typography>Description</Typography>
               <p className='text-sm text-gray-400'>{task.description}</p>
            </Box>
        </Box>
      </Modal>
    );
  };

  export default TaskDetailsModal;