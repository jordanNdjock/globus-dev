import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import { addCategory } from "bd/Categorie";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ModalCategorie({ defaultName, defaultDescription }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(defaultName || "");
  const [description, setDescription] = React.useState(defaultDescription || "");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    // Vérifier si les champs sont vides
    if (name.trim() === "" || description.trim() === "") {
      console.log("Veuillez remplir tous les champs.");
      return;
    }

    // Appeler la fonction addCategory de Firebase
    addCategory(name, description)
      .then((categoryId) => {
        console.log("Catégorie ajoutée avec succès avec l'ID:", categoryId);
        handleClose(); // Fermer le modal après la soumission
      })
      .catch((error) => {
        console.error("Une erreur s'est produite lors de l'ajout de la catégorie:", error);
      });
  };

  return (
    <div>
      <Button onClick={handleOpen}>Nouvelle Categorie</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Ajouter une nouvelle catégorie
            </Typography>
            <TextField
              id="name"
              label="Nom"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              sx={{ mt: 2 }}
            />
            <TextField
              id="description"
              label="Description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              multiline
              rows={4}
              sx={{ mt: 2 }}
            />
            <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
              Soumettre
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

// Typechecking props for the Item
ModalCategorie.propTypes = {
  defaultName: PropTypes.string,
  defaultDescription: PropTypes.string,
};

export default ModalCategorie;
