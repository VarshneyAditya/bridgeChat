import React, { useState } from 'react';
import { Grid, Card, CardHeader, CardContent, Typography, TextField } from '@mui/material/';
import { Link } from 'react-router-dom';

  
const ProductGrid = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for products
  const products = [
    { id: 1, name: 'JE03565', image: "/assets/images/products/JE03565.png" },
    { id: 2, name: 'JL03666', image: "/assets/images/products/JL03666.png" },
    { id: 3, name: 'JP05256', image: "/assets/images/products/JP05256.png" },
    { id: 4, name: 'JR02625', image: "/assets/images/products/JR02625.png" },
    { id: 5, name: 'JR03475', image: "/assets/images/products/JR03475.png" },
    { id: 6, name: 'MR00630', image: "/assets/images/products/MR00630.png" },
    { id: 7, name: 'JR03647', image: "/assets/images/products/JR03647.png" },
    { id: 8, name: 'SR00130', image: "/assets/images/products/SR00130.png" },
    { id: 9, name: 'UR00175', image: "/assets/images/products/UR00175.png" },
    // Add more products here
  ];

  // Filter products based on search query
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card>
     <Card sx={{ display: 'flex', alignItems: 'center', padding: '12px' }}>
          <CardHeader title="Search SKU's" sx={{ marginRight: '20px' }} />
          <TextField
            variant="standard"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
     </Card>
      <Grid container spacing={3} sx={{padding: '10px'}} >
        {filteredProducts.map(product => (
          <Grid key={product.id} item xs={9} md={9} lg={4}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '50%',
                boxShadow: '3',
                padding: '0px 10px'
              }}
            >
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  sx={{
                    width: '40px', // Adjust size as needed
                    height: '40px', // Adjust size as needed
                    borderRadius: '20%', // Make the image round
                    marginBottom: '10px',
                  }}
                />
                <Typography level="h1">{product.name}</Typography>

                {/* <CardHeader title={product.name} titleTypographyProps={{ fontSize: 1,}} /> */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

export default ProductGrid;
