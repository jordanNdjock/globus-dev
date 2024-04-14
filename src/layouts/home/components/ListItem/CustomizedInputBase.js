import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react'; // Importer useState pour gérer l'état local

export default function CustomizedInputBase({ products, categories, onFilter }) {
  const [searchValue, setSearchValue] = useState(''); // État local pour stocker la valeur de recherche

  // Fonction de gestionnaire d'événements pour la saisie de la recherche
  const handleSearchInputChange = (event) => {
    const searchValue = event.target.value;
    setSearchValue(searchValue); // Mettre à jour la valeur de recherche dans l'état local
    // Appel de la fonction de filtrage des produits avec le nom de catégorie actuel
    filterProducts(searchValue);
  };
  
  // Fonction pour filtrer les produits par catégorie
  const filterProducts = (searchValue) => {
    // Trouver l'ID de la catégorie correspondant au nom de catégorie entré
    const categoryId = categories.find(cat => cat.name.toLowerCase() === searchValue.toLowerCase())?.id;
    if (categoryId) {
      // Filtrer les produits par l'ID de la catégorie
      const filteredProducts = products.filter(product =>
        product.id_category === categoryId
      );
      // Appeler la fonction de rappel pour transmettre les produits filtrés
      onFilter(filteredProducts);
    } else {
      // Si la catégorie n'est pas trouvée, afficher tous les produits
      onFilter(products);
    }
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
        value={searchValue} // Utiliser la valeur de recherche de l'état local
        onChange={handleSearchInputChange}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
    </Paper>
  );
}
