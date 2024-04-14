import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';


function Chats() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dummyOrders = ['12345', '67890', 'ABCDE'];

  const handleOrderSubmit = async (value) => {
    if (dummyOrders.includes(value)) {
      navigate(`/chat/${value}`); // Navigate to the ChatCard page with the order ID
    } else {
      alert('Invalid order ID or barcode!');
    }
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Button variant="contained" onClick={handlePopoverOpen} style={{ backgroundColor: '#8E1A86' }}>
        New Chat
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <OrderInputForm onSubmit={handleOrderSubmit} />
      </Popover>
    </div>
  );
}

function OrderInputForm({ onSubmit }) {
  const [value, setValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(value);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px', padding: '20px' }}>
      <TextField
        label="Order ID or Barcode"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
        fullWidth
        style={{ marginBottom: '10px' }}
      />
      <Button type="submit" variant="contained" style={{ backgroundColor: '#8E1A86' }}>
        Create Chat
      </Button>
    </form>
  );
}

export default Chats;
