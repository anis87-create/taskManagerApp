import React from 'react';
import { Modal, Box, Typography, TextField, InputLabel, IconButton, FormControl, Select, MenuItem, Button } from '@mui/material';
import { ShieldCloseIcon } from 'lucide-react';
import moment from 'moment';

const TaskModal = ({open, onClose, formData, formErrors, handleChangeForm, onSubmit, buttonTitle }) => {
  const tagsOptions = ['Design', 'Marketing', 'Bug', 'Frontend', 'Backend', 'Documentation', 'Security', 'Performance', 'Feature', 'UI/UX'];   
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
        <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '18px' }} gutterBottom>
          Add New Task
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Please fill in the details below to create a new task.
        </Typography>

        <Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
            <InputLabel 
              error={formErrors.some(error => error?.params === 'title')} 
              sx={{ fontWeight: 'bold', fontSize: '15px' }}
            >
              Title:
            </InputLabel>
            <TextField
              name="title"
              value={formData.title}
              onChange={handleChangeForm}
              error={formErrors.some(error => error?.params === 'title')}
              helperText={formErrors.find(error => error?.params === 'title')?.msg}
            />
          </Box>
             {/* Description */}
             <Box sx={{ display: "flex", mb: 2, flexDirection:'column' }}>
              <InputLabel sx={{ minWidth: 100, fontWeight:'bold', fontSize:'15px', display:'block' }}>Description:</InputLabel>
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
            <Box sx={{ display: "flex",flexDirection:'column', mb: 2 }}>
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
            <Box sx={{ display: "flex",flexDirection:'column' , mb: 2 }}>
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
            <Box sx={{ display: "flex",flexDirection:'column', mb: 2 }}>
              <InputLabel sx={{ minWidth: 100, fontWeight:'bold', fontSize:'15px' }}>Due Date:</InputLabel>
              <TextField
                type="date"
                name="dueDate"
                value={moment(formData.dueDate).format('YYYY-MM-DD')}
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
            {/* tags */}
            <Box sx={{ display: 'flex', flexDirection:'column', mb: 2 }}>
             <InputLabel sx={{ minWidth: 100, fontWeight: 'bold', fontSize: '15px' }}>Tags:</InputLabel>
              <FormControl fullWidth size="small">
                <Select
                  name="tags"
                  multiple
                  value={formData.tags || []}
                  onChange={handleChangeForm}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {tagsOptions.map((tag) => (
                    <MenuItem key={tag} value={tag}>{tag}</MenuItem>
                  ))}
                </Select>
              </FormControl>
             </Box>
        </Box>
        <Box className="flex pl-[250px]">
          <Button variant="contained" onClick={onclose}
              className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium'
              sx={{
              '&:hover': {
                  opacity: 0.9, // This will increase the opacity (or decrease it) on hover
                  transition: 'opacity 0.3s ease', 
                },
                background:'white',
                color:'black',
                marginRight:'8px'
              }}>Close</Button>
              <Button variant="contained" onClick={onSubmit}
              className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium'
              sx={{ background: "rgb(249, 115, 22)",
              '&:hover': {
                  opacity: 0.9, // This will increase the opacity (or decrease it) on hover
                  transition: 'opacity 0.3s ease', 
                },
              }}>{buttonTitle}</Button>
            
            </Box>
      </Box>
    </Modal>
  );
};

export default TaskModal;
