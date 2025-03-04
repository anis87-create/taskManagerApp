import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLogout } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { logout, updateUser } from "../redux/userSlice";
import { useNavigate } from 'react-router-dom';
import { Modal, Box, Button, TextField } from "@mui/material";
import { MdOutlineSettings } from "react-icons/md";

export default function Dropdown() {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const img = `http://localhost:5000${user?.avatar}`;
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
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


  
  return (
    <div className="relative inline-block">
      {/* Dropdown Button */}
      <div
        className="flex items-center justify-between  w-24 h-12   p-1 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {/* Circular Button */}

          <img
            src={img}
            alt="Profile"
            className="rounded-full"
            width={40}
            height={40}
          />


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
          <div className="flex items-center p-2 cursor-pointer"  onClick={handleOpen}>
              <FaRegUser />
              <div className="ml-4 w-40 pl-3">Profil</div>
          </div>
          <div className="flex items-center p-2 border-gray-200 border-b-1">
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
          <Modal open={openModal} onClose={handleClose} aria-labelledby="modal-title">
                    <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >

            <label htmlFor="email">Email: *</label>
            <TextField
              id="email"
              type="email"
              name="email"
              variant="outlined"
              style={{ marginBottom: "4px", width: "90%" }}
              value={formData.email}
              onChange={handleChange}
              required
            />


            <label htmlFor="username">Username: *</label>
            <TextField
              id="username"
              type="text"
              name="username"
              variant="outlined"
              style={{ marginBottom: "4px", width: "90%" }}
              value={formData.username}
              onChange={handleChange}
              required
            />


            <input type="file" onChange={handleChangeFile} />

            <Button
              onClick={handleSubmit}
              sx={{
                mt: 2,
                backgroundColor: "#f97316", // Orange
                "&:hover": {
                  backgroundColor: "#ea580c", // Darker orange
                },
              }}
              variant="contained"
            >
              Confirm
            </Button>

            {/* Close Button */}
            <Button
              onClick={handleClose}
              sx={{
                mt: 2,
                backgroundColor: "#f0f0f0", // Light grey instead of white
                color: "black", // Ensure text is visible
                "&:hover": {
                  backgroundColor: "#d4d4d4", // Slightly darker grey
                },
              }}
              variant="contained"
            >
              Close
            </Button>
          </Box>

      </Modal>
        </div>
      )}
    </div>
  );
}
