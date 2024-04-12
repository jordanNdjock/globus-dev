import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuItem from "@mui/material/MenuItem";
import { getAllCategories } from "../../../service/Categorie";

// eslint-disable-next-line react/prop-types
function AddProductModal({ open, handleClose, handleSubmit }) {
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    price: "",
    quantity: "",
    image: "",
    category: "",
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      const categoriesData = await getAllCategories();
      setCategories(categoriesData);
    };
    fetchCategoriesData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        image: reader.result,
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setFormData({
      ...formData,
      image: "",
    });
  };

  const handleFormSubmit = () => {
    if (
      formData.productName &&
      formData.description &&
      formData.price &&
      formData.quantity &&
      formData.category &&
      formData.image
    ) {
      handleSubmit(formData);
      setFormData({
        productName: "",
        description: "",
        price: "",
        quantity: "",
        image: "",
        category: "",
      });
      handleClose();
    } else {
      alert("Veuillez remplir tous les champs obligatoires.");
    }
  };

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
        }}
      >
        <Typography variant="h6" gutterBottom>
          Ajouter un produit
        </Typography>
        {formData.image && (
          <Box sx={{ textAlign: "center", mb: 2 }}>
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
                src={formData.image}
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
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <input
            accept="image/*"
            id="image-upload"
            type="file"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <label htmlFor="image-upload">
            <IconButton color="primary" aria-label="upload picture" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
          <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
            Choisir une image
          </Typography>
        </Box>
        <TextField
          name="productName"
          label="Nom du produit"
          value={formData.productName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="description"
          label="Description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
          margin="normal"
        />
        <TextField
          type="number"
          name="price"
          label="Prix"
          value={formData.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          type="number"
          name="quantity"
          label="Quantité initiale"
          value={formData.quantity}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          select
          name="category"
          label="Catégorie"
          value={formData.category}
          onChange={handleChange}
          fullWidth
          margin="normal"
          sx={{ height: "100%" }}
          InputProps={{
            sx: { height: "100%", padding: "12px" },
          }}
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>

        <Button
          onClick={handleFormSubmit}
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          style={{ color: "white" }}
        >
          Ajouter
        </Button>
      </Box>
    </Modal>
  );
}

export default AddProductModal;
