import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

export default function CustomizedInputBase({ products }) {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchInputChange = (event) => {
    const searchValue = event.target.value;
    setSearchValue(searchValue);
    filterProducts(searchValue);
  };
  
  const filterProducts = (searchValue) => {
    const filteredProducts = products.filter(product =>
      product.category && product.category.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredProducts(filteredProducts);
  };

  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: { xs: '100%', sm: 400, md: 600, lg: 800 },
        textAlign: 'center',
        margin: 'auto'
      }}
    >
      <IconButton sx={{ p: '10px' }} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Rechercher les produits par catégorie"
        inputProps={{ 'aria-label': 'search' }}
        value={searchValue}
        onChange={handleSearchInputChange}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
    </Paper>
  );
}
