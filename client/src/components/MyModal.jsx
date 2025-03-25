import React, { useState } from "react";
import { Modal, Box, Button, Typography, Input, TextField } from "@mui/material";

const MyModal = ({handleClose, open}) => {



  return (
    <div>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
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
          <Typography id="modal-title" variant="h6">
           Update profile
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            <TextField
            label="Email"
            type="email"
            name="email"
            variant="outlined"

            required
        />
        <TextField
            label="Username"
            type="text"
            name="username"
            variant="outlined"
            required
        />
        <input type="file" />
          </Typography>
          <Button onClick={handleClose} sx={{ mt: 2 }} variant="contained">
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default MyModal;
