// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { useOrders } from '../context/OrdersContext';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import ListItemText from '@mui/material/ListItemText';

// function ChatCard() {
//   const { orderId } = useParams();
//   const { orders } = useOrders();
//   const chat = orders[orderId];

//   return (
//     <Card style={{ marginTop: '40px', marginLeft: '30px', marginRight: '40px', borderRadius: '40px' }}>
//       <CardContent>
//         {chat && chat.map((message, index) => (
//           <ListItemText key={index} primary={`Message: ${message}`} secondary={`Order ID: ${orderId}`} />
//         ))}
//       </CardContent>
//     </Card>
//   );
// }

// export default ChatCard;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ListItemText from '@mui/material/ListItemText';
import { useOrders } from '../context/OrdersContext';

function ChatCard() {
  const { orderId } = useParams();
  const { orders } = useOrders();
 // const chat = orders[orderId];
  const [chat, setChat] = useState(null);

  useEffect(() => {
    const fetchChat = async () => {
      const response = await fetch(`http://localhost:5000/Chats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId }),
      });
      const data = await response.json();
     setChat(data.chats);
    };

    fetchChat();
  }, [orderId]);

  return (
    <><Card style={{ marginTop: '40px', marginLeft: '30px', marginRight: '40px', borderRadius : '40px' }}>
      <CardContent>
        {chat && chat.map((message) => (
          <ListItemText key={message.id =2}primary={`Order Issue#${message.order_id}`} secondary={`Message: ${message.message}`} style={{ marginTop: '40px', marginLeft: '30px' }} />
        ))}
      </CardContent>
    </Card><Card style={{ marginTop: '40px', marginLeft: '30px', marginRight: '40px' , borderRadius : '40px'}}>
        <CardContent>
          {chat && chat.map((message) => (
            <ListItemText key={message.id =2}primary={`Order Issue#${message.order_id}`} secondary={`Message: ${message.message}`} style={{ marginTop: '40px', marginLeft: '30px' }} />
          ))}
        </CardContent>
      </Card>
      <Card style={{ marginTop : '40px', marginLeft : '30px' , marginRight : '40px' , borderRadius : '40px'}}>
      <CardContent >
        {chat && chat.map((message) => (
          <ListItemText key={message.id =2}primary={`Order Issue#${message.order_id}`} secondary={`Message: ${message.message}`}  style={{ marginTop : '40px', marginLeft : '30px' }} />
        ))}
      </CardContent>
    </Card>
      </>
  );
}

export default ChatCard;

