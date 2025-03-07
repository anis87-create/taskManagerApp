import { Button, IconButton, InputAdornment, Modal, TextField, Typography } from '@mui/material'
import { Box, CloudUpload } from 'lucide-react'

const ProfileModal = ({ openModal, handleClose, formData, handleChange, handleChangeFile, handleSubmit}) => {

    return (
        <Modal open={openModal} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
       <Box
         sx={{
           position: "absolute",
           top: "50%",
           left: "50%",
           transform: "translate(-50%, -50%)",
           width: 400,
           bgcolor: "background.paper",
           p: 4,
           borderRadius: 2,
           border: "none",
           outline: "none",
           boxShadow: 24,
         }}
       >
         {/* Modal Title */}
         <Typography id="modal-title" variant="h6" component="h2" sx={{ mb: 1 }}>
           Edit Profile
         </Typography>
     
         {/* Modal Description */}
         <Typography id="modal-description" variant="body2" color="text.secondary" sx={{ mb: 2 }}>
         Make changes to your profile here. Click save when you're done.
         </Typography>
     
         {/* Email Field (Label + Input in the Same Row) */}
         <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
           <Typography sx={{ width: "30%", fontWeight: "bold",fontSize:'14px' }}>Email</Typography>
           <TextField
             id="email"
             type="email"
             name="email"
             variant="outlined"
             fullWidth
             value={formData.email}
             onChange={handleChange}
             size="small"  // Reduces height
             sx={{
               padding: "2px",  // Reduces internal padding
               "& .MuiOutlinedInput-root": {
                 height: "36px", // Adjust height (default is ~56px)
                 fontSize: "14px", // Adjust font size
               },
            }}
             required
           />
         </Box>
     
         {/* Username Field (Label + Input in the Same Row) */}
         <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
           <Typography sx={{ width: "30%", fontWeight: "bold", fontSize:'14px' }}>Username</Typography>
           <TextField
             id="username"
             type="text"
             name="username"
             variant="outlined"
             fullWidth
             value={formData.username}
             onChange={handleChange}
             size="small"  // Reduces height
             sx={{
               padding: "2px",  // Reduces internal padding
               "& .MuiOutlinedInput-root": {
                 height: "36px", // Adjust height (default is ~56px)
                 fontSize: "14px", // Adjust font size
               },
             }}
             required
           />
         </Box>
     
         {/* File Upload */}
         <TextField
       type="file"
       onChange={handleChangeFile}
       variant="outlined"
       size="small"
       fullWidth
       InputProps={{
         startAdornment: (
           <InputAdornment position="start">
             <IconButton component="label">
               <CloudUpload />
               <input type="file" hidden onChange={handleChangeFile} />
             </IconButton>
           </InputAdornment>
         ),
       }}
     />
         {/* Confirm Button */}
                 <Box
               sx={{
                 display: "flex",
                 justifyContent: "flex-end", // Aligns the button to the right
                 mt: 2, // Adds some margin-top
               }}
             >
             <Button
                         onClick={handleSubmit}
                         sx={{
                           mt: 2,
                           backgroundColor: "#f97316", // Orange
                           width:'40%',
                           "&:hover": {
                             backgroundColor: "#ea580c", // Darker orange
                           },
                         }}
                         variant="contained"
                         fullWidt
                       >
                         Confirm
                       </Button>
             </Box>
                     
             </Box>
       </Modal>
     )

  
}

export default ProfileModal
