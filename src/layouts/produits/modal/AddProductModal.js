import React, { useState, useEffect } from "react";
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


function AddProductModal({ open, handleClose, handleSubmit }) {
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    price: "",
    quantity: "",
    image: "",
    id_category: "",
    audio: "",
    created: ""
  });

  const [categories, setCategories] = useState([]);
  const [audioUrl, setAudioUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      // Récupérer les catégories
      const categoriesData = await getAllCategories();
      setCategories(categoriesData);
      
      // Définir la date de création
      const currentDate = new Date();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const formattedDate = `${currentDate.getDate()}/${month}/${currentDate.getFullYear()}`;
      setFormData(prevFormData => ({
        ...prevFormData,
        created: formattedDate
      }));
    };

    fetchData();
  }, []);

  // Gestion Image
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

  // Gestion audio
  const handleAudioChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        audio: reader.result,
      });
      setAudioUrl(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleClearAudio = () => {
    setFormData({
      ...formData,
      audio: "",
    });
    setAudioUrl(""); // Réinitialiser l'URL du fichier audio sélectionné
  };
//Audio finish  
  

//Soumission et changement

const handleChange = (event) => {
  const { name, value } = event.target;
  setFormData({
    ...formData,
    [name]: value,
  });
};

  const handleFormSubmit = () => {
    if (
      formData.productName &&
      formData.price &&
      formData.quantity &&
      formData.id_category &&
      formData.image
    ) {
      console.log(formData);
      handleSubmit(formData);
      setFormData({
        productName: "",
        description: "",
        price: "",
        quantity: "",
        image: "",
        idcategory: "",
        audio: "",
        created: "",
      });
      setAudioUrl("");
      handleClose();
    } else {
      alert("Veuillez remplir tous les champs obligatoires.");
    }
    
  };

  //Fin fonction

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
          name="id_category"
          label="Catégorie"
          value={formData.id_category}
          onChange={handleChange}
          fullWidth
          margin="normal"
          sx={{ height: "100%" }}
          InputProps={{
            sx: { height: "100%", padding: "12px" },
          }}
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
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
            {audioUrl && (
            <>
              <audio controls>
                <source src={audioUrl} type="audio/mp3" />
                Votre navigateur ne supporte pas l'audio HTML5.
              </audio>
              <IconButton color="error" aria-label="clear audio" onClick={handleClearAudio}>
                  <DeleteIcon />
              </IconButton>
            </>
            )}
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
