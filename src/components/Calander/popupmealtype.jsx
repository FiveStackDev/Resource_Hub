import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import MealTypeSelect from "./MealTypeSelect";
import "../css/Calender/PopupMealType.css";  // Import the CSS file

function Popupmealtype({ open, handleClose, onAddEvent }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      BackdropProps={{
        className: "popup-backdrop",
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        className="popup-box" sx={{overflowY: "auto"}}
      >
        <MealTypeSelect onSelect={(mealType) => onAddEvent(mealType)} />
      </Box>
    </Modal>
  );
}

export default Popupmealtype;
