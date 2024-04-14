import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const CreateIssueButton = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    orderDetail: "",
    assignTo: "",
    describeIssue: "",
  });

  const [errors, setErrors] = useState({});

  // Open the dialog box
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Close the dialog box
  const handleClose = () => {
    setOpen(false);
    setErrors({});
    setFormData({ orderDetail: "", assignTo: "", describeIssue: "" });
  };

  // Handle form field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form fields
  const validate = () => {
    let tempErrors = {};
    if (!formData.orderDetail) {
      tempErrors.orderDetail = "Order detail is required";
    }
    if (!formData.assignTo) {
      tempErrors.assignTo = "Assign-to field is required";
    }
    if (!formData.describeIssue) {
      tempErrors.describeIssue = "Describe issue field is required";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (validate()) {
      try {
        await axios.post("http://localhost/abc", formData);
        handleClose(); // Close the dialog on successful submission
      } catch (error) {
        console.error("Error submitting the form:", error);
      }
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        style={{ marginTop: "12px", left: "80%" }}
      >
        Create Issue
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Issue</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="orderDetail"
            label="Order-detail"
            type="text"
            name="orderDetail"
            value={formData.orderDetail}
            onChange={handleChange}
            fullWidth
            error={!!errors.orderDetail}
            helperText={errors.orderDetail}
          />
          <FormControl fullWidth margin="dense" error={!!errors.assignTo}>
            <InputLabel id="assignTo-label">Assign-to</InputLabel>
            <Select
              labelId="assignTo-label"
              id="assignTo"
              name="assignTo"
              value={formData.assignTo}
              onChange={handleChange}
              label="Assign-to"
            >
              <MenuItem value="Dispatch-group">Dispatch-group</MenuItem>
              <MenuItem value="Saransh">Saransh</MenuItem>
              <MenuItem value="Abhishek">Abhishek</MenuItem>
              <MenuItem value="Aditya">Aditya</MenuItem>
              <MenuItem value="Abrar">Abrar</MenuItem>
            </Select>
            {errors.assignTo && <span>{errors.assignTo}</span>}
          </FormControl>
          <TextField
            margin="dense"
            id="describeIssue"
            label="Describe Issue"
            type="text"
            name="describeIssue"
            value={formData.describeIssue}
            onChange={handleChange}
            fullWidth
            multiline
            error={!!errors.describeIssue}
            helperText={errors.describeIssue}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateIssueButton;
