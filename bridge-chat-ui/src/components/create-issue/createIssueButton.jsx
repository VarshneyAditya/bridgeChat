/* eslint-disable */

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Iconify from 'src/components/iconify';
import PropTypes from 'prop-types';
import InputLabel from '@mui/material/InputLabel';

const CreateIssueButton = ({ token }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    orderDetail: '',
    assignTo: '',
    describeIssue: '',
  });
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({});

  const config = useMemo(
    () => ({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    [token]
  );

  const fetchAllUsers = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/chats/fetchAllUsers', config);
      const { data: userData = [] } = response || {};
      const userArray = userData.map((user) => ({
        _id: user?._id,
        name: user?.name,
      }));
      setUsers(userArray);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  }, [config]);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  // Open the dialog box
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Close the dialog box
  const handleClose = () => {
    setOpen(false);
    setErrors({});
    setFormData({
      orderDetail: '',
      assignTo: '',
      describeIssue: '',
    });
  };

  // Handle form field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form fields
  const validate = () => {
    const tempErrors = {};
    if (!formData.orderDetail) {
      tempErrors.orderDetail = 'Order detail is required';
    }
    if (!formData.assignTo) {
      tempErrors.assignTo = 'Assign-to field is required';
    }
    if (!formData.describeIssue) {
      tempErrors.describeIssue = 'Describe issue field is required';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (validate()) {
      try {
        const apiEndpoint = 'http://localhost:3000/api/chats/conversation';
        await axios.post(apiEndpoint, { userId: formData?.assignTo }, config);
        handleClose();
      } catch (error) {
        console.error('Error submitting the form:', error);
      }
    }
  };

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        color="inherit"
        startIcon={<Iconify icon="eva:plus-fill" />}
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
            label="SKU/Barcode/Order-Id"
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
              {users &&
                users.map(({ name, _id }) => (
                  <MenuItem key={_id} value={_id}>
                    {name}
                  </MenuItem>
                ))}
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

CreateIssueButton.propTypes = {
  token: PropTypes.string.isRequired,
};

export default CreateIssueButton;
