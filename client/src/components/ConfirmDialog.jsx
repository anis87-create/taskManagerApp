import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useSelector } from "react-redux";

export default function DraggableDialog({open,onDeleteTask,  handleDialogClose}) {
  const { loading } = useSelector(state => state.task); 
  
    return (
      <>
        <Dialog
          open={open}
          onClose={handleDialogClose}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle  style={{ cursor: 'move' }} id="draggable-dialog-title">
            <h2 className="text-lg font-semibold leading-none tracking-tight">
            Confirm Deletion
            </h2>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this task? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button className="cursor-pointer h-10 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md hover:bg-gray-200 text-white transition delay-50 duration-300" style={{color:'black', border: '1px solid #e0e0e0'}} autoFocus onClick={handleDialogClose}>
              Cancel
            </button>
            <button className="cursor-pointer cursor-pointer h-10 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md  bg-red-500 hover:bg-red-400/90 text-white transition delay-50 duration-300"  onClick={onDeleteTask}>{loading === true ? 'Deleting...':'Delete'} </button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
  