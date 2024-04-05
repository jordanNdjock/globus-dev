import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function ModifyProductModal({ open, handleClose, handleSubmit, initialProduct }) {
  // Vérifier si initialProduct est null
  if (!initialProduct) {
    return null;
  }

  const { imageUrl } = initialProduct;

  // State pour les champs modifiables
  const [editedProduct, setEditedProduct] = useState(initialProduct);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 450,
          bgcolor: "white",
          borderRadius: "8px",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" fontWeight="medium" mb={2}>
          Modifier le produit
        </Typography>
        {/* Affichage de l'image */}
        <img
          src={imageUrl}
          alt="Product"
          style={{ width: "100%", height: "auto", marginBottom: "16px" }}
        />

        {/* Champ de texte pour le nom du produit */}
        <TextField
          label="Nom du produit"
          fullWidth
          variant="outlined"
          name="productName"
          value={editedProduct.productName}
          onChange={handleFieldChange}
          disabled
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
          value={editedProduct.quantity}
          onChange={handleFieldChange}
          sx={{ mb: 2 }}
        />

        {/* Champ de texte pour la catégorie */}
        <TextField
          label="Catégorie"
          fullWidth
          variant="outlined"
          name="category"
          value={editedProduct.category}
          onChange={handleFieldChange}
          disabled
          sx={{ mb: 2 }}
        />

        {/* Bouton de modification */}
        <Box textAlign="right">
          <Button
            variant="contained"
            color="primary"
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
