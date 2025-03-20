import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLogout } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { logout, updateUser } from "../redux/userSlice";
import { useNavigate } from 'react-router-dom';
import { Modal, Box, Button, TextField, Typography, InputAdornment, IconButton, ListItem, ListItemText, FormControlLabel, Switch, Divider, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { MdOutlineSettings } from "react-icons/md";
import { CloudUpload, ShieldCloseIcon } from "lucide-react";

export default function Dropdown() {
  const [open, setOpen] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [openSettingsModal, setOpenSettingsModal] = useState(false);
  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const img = `http://localhost:5000${user?.avatar}`;
  const handleOpenProfileModal = () => setOpenProfileModal(true);
  const handleCloseProfilemodal = () => setOpenProfileModal(false);
  const handleOpenSettingsModal = () => setOpenSettingsModal(true);
  const handleCloseSettingsmodal = () => setOpenSettingsModal(false);

  const [formData, setFormData] = useState({
    email: user?.email || '',
    username: user?.username || '',
    avatar: user?.avtart || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleChangeFile = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0]
    });
  }

  const handleSubmit = () => {
    dispatch(updateUser({user: formData, id : user?._id} ));
  }
  const [emailNotifications, setEmailNotifications] = useState(true); // Default checked
  const [darkMode, setDarkMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  // Handle switch changes
  const handleEmailNotificationChange = (event) => {
    setEmailNotifications(event.target.checked);
  };

  const handleDarkModeChange = (event) => {
    setDarkMode(event.target.checked);
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };


  
  return (
    <div className="relative inline-block" style={{marginLeft:'2px'}}> 
      {/* Dropdown Button */}
      <div
        className="flex items-center justify-between  w-24 h-12   p-1 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {/* Circular Button */}
        <span className="relative flex shrink-0 overflow-hidden rounded-full h-8 w-8">
          <img
            src={img}
            alt="Profile"
            className="aspect-square h-full w-full"
          />
        </span>  
        {/* Arrow Icon */}
        <div className={`ml-auto pr-2 transition-transform ${open ? "rotate-180" : "rotate-0"}`}>
        </div>
      </div>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute p-2 right-10  mb-4 w-50  bg-white shadow-md rounded-md overflow-hidden border border-gray-300">
          <div className="p-2 flex border-gray-200 border-b-1 w-full">
              <span className="font-bold">{user?.username}</span>
          </div>  
          <div className="flex items-center p-2 cursor-pointer"  onClick={handleOpenProfileModal}>
              <FaRegUser />
              <div className="ml-4 w-40 pl-3">Profil</div>
          </div>
          <div className="flex items-center p-2 border-gray-200 border-b-1 cursor-pointer" onClick={handleOpenSettingsModal}>
              <MdOutlineSettings />
              <div className="ml-4 w-40 pl-3">Settings</div>
          </div>
          <div className="flex items-center p-2 cursor-pointer"
            onClick={() => {
                dispatch(logout());
                navigate('/login');
                window.location.reload();
            }}
          >
              <AiOutlineLogout  />
              <div className="ml-4 w-40 pl-3"
              >Déconnexion</div>
          </div>  
      {/* Profile Modal  */}
         <Modal open={openProfileModal} onClose={handleCloseProfilemodal} aria-labelledby="modal-title" aria-describedby="modal-description"
              >
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
            boxShadow: 24,
            outline: 'none'}}
        >
          <IconButton
                onClick={handleCloseProfilemodal}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  color: 'text.secondary', // Set color of the close button
                }}
              >
                <ShieldCloseIcon />
              </IconButton>

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
      {/* Setting Modal */}
        <Modal open={openSettingsModal}>
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
          boxShadow: 24,
          outline: 'none',
// This ensures the close button is positioned correctly
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={handleCloseSettingsmodal}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'text.secondary', // Set color of the close button
          }}
        >
          <ShieldCloseIcon />
        </IconButton>

        <Typography variant="h6" gutterBottom>
          Settings
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          Manage your account settings and preferences here.
        </Typography>

        {/* Email Notifications Switch */}
        <FormControlLabel
          control={
            <Switch
              checked={emailNotifications}
              onChange={handleEmailNotificationChange}
              color="warning"
            />
          }
          label="Email Notifications"
        />

        {/* Dark Mode Switch */}
        <FormControlLabel
          control={
            <Switch
              checked={darkMode}
              onChange={handleDarkModeChange}
              color="warning"
            />
          }
          label="Dark Mode"
        />

        {/* Language Select */}
        <FormControl fullWidth sx={{ marginTop: 2 }}>
          <InputLabel>Language</InputLabel>
          <Select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            label="Language"
            fullWidth
            defaultValue="English"
          >
            <MenuItem value="French">French</MenuItem>
            <MenuItem value="English">English</MenuItem>
            <MenuItem value="Spanish">Spanish</MenuItem>
          </Select>
        </FormControl>
      </Box>
        </Modal>
        </div>
      )}
    </div>
  );
}
