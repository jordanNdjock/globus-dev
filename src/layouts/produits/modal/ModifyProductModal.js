import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MenuItem from "@mui/material/MenuItem";
import { getAllCategories } from "../../../service/Categorie";

function ModifyProductModal({
  open,
  handleClose,
  handleSubmit,
  initialProduct,
}) {
  

  // State pour les champs modifiables
  const [editedProduct, setEditedProduct] = useState(initialProduct);
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    const fetchCategoriesData = async () => {
      const categoriesData = await getAllCategories();
      setCategories(categoriesData);
    };
    fetchCategoriesData();
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditedProduct({
        ...editedProduct,
        imageUrl: reader.result,
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setEditedProduct({
      ...editedProduct,
      imageUrl: "",
    });
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

// Gestion audio
const handleAudioChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditedProduct((prevProduct) => ({
        ...prevProduct,
        audio: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  }
};

const handleClearAudio = () => {
  setEditedProduct((prevProduct) => ({
    ...prevProduct,
    audio: "",
  }));
};


// Vérifier si initialProduct est null
if (!initialProduct) {
  return null;
}


  
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: "8px",
          minWidth: 300,
          maxHeight: "90vh",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "3px",
          },
        }}
      >
        <Typography variant="h6" fontWeight="medium" mb={2}>
          Modifier le produit
        </Typography>
        {/* Affichage de l'image */}
        {editedProduct.imageUrl && (
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <IconButton color="error" onClick={handleImageRemove}>
              <DeleteIcon />
            </IconButton>
            <Box
              sx={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                overflow: "hidden",
                margin: "0 auto",
                border: "2px solid #ccc",
              }}
            >
              <img
                src={editedProduct.imageUrl}
                alt="Product"
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                  backgroundSize: "cover",
                }}
              />
            </Box>
          </Box>
        )}
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <input
            accept="image/*"
            id="image-upload"
            type="file"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <label htmlFor="image-upload">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>
          <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
            Choisir une image
          </Typography>
        </Box>
        {/* Champ de texte pour le nom du produit */}
        <TextField
          label="Nom du produit"
          fullWidth
          variant="outlined"
          name="productName"
          value={editedProduct.productName}
          onChange={handleFieldChange}
          sx={{ mb: 2 }}
        />

        {/* Champ de texte pour la description */}
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          name="description"
          value={editedProduct.description}
          onChange={handleFieldChange}
          sx={{ mb: 2 }}
        />

        {/* Champ de texte pour le prix */}
        <TextField
          label="Prix"
          fullWidth
          type="number"
          variant="outlined"
          name="price"
          value={editedProduct.price}
          onChange={handleFieldChange}
          sx={{ mb: 2 }}
        />

        {/* Champ de texte pour la quantité */}
        <TextField
          label="Quantité"
          fullWidth
          type="number"
          variant="outlined"
          name="quantity"
          disabled
          value={editedProduct.quantity}
          onChange={handleFieldChange}
          sx={{ mb: 2 }}
        />

        {/* Champ de texte pour la catégorie */}
        <TextField
          select
          label="Catégorie"
          fullWidth
          variant="outlined"
          name="id_category"
          value={editedProduct.id_category}
          onChange={handleFieldChange}
          sx={{ height: "100%" }}
          InputProps={{
            sx: { height: "100%", padding: "12px" },
          }}
        >
          {categories.map((category) => (
            <MenuItem
              key={category.id}
              value={category.id}
              selected={category.id === editedProduct.id_category}
            >
              {category.name}
            </MenuItem>
          ))}
        </TextField>
        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <input
            accept="audio/*"
            id="audio-upload"
            type="file"
            onChange={handleAudioChange}
            style={{ display: "none" }}
          />
          <label htmlFor="audio-upload">
            <IconButton color="primary" aria-label="upload audio" component="span">
              <MusicNoteIcon />
            </IconButton>
          </label>
          <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
            Choisir un fichier audio
          </Typography>
        </Box>
          {editedProduct.audio && (
            <>
              <audio controls>
                <source src={editedProduct.audio} type="audio/mp3" />
                Votre navigateur ne supporte pas l'audio HTML5.
              </audio>
              <IconButton color="error" aria-label="clear audio" onClick={handleClearAudio}>
                  <DeleteIcon />
              </IconButton>
            </>
            )}

        {/* Bouton de modification */}
        <Box textAlign="right" mt={3}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => handleSubmit(editedProduct)}
            style={{ color: "white" }}
          >
            Modifier
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

ModifyProductModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialProduct: PropTypes.object,
};

export default ModifyProductModal;
