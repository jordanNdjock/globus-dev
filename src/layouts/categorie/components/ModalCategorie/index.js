import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import { addCategory } from "service/Categorie";

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

function ModalCategorie({ defaultName, defaultDescription, action }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(defaultName || "");
  const [description, setDescription] = React.useState(defaultDescription || "");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} color="white">
        Ajouter une Categorie
      </Button>
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
            <Button
              variant="contained"
              color="white"
              onClick={() => {
                action(name, description);
                handleClose();
              }}
              sx={{ mt: 2 }}
            >
              Ajouter
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

// Typechecking props for the Item
ModalCategorie.propTypes = {
  defaultName: PropTypes.string.isRequired,
  defaultDescription: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
};

export default ModalCategorie;
