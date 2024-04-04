// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import * as React from "react";
// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { updateCategory } from "bd/Categorie";

import Swal from "sweetalert2";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";

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

function Item({ id, name, description, noGutter, onDelete }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const [open, setOpen] = React.useState(false);

  const [namePrint, setNameP] = React.useState(name || "");
  const [descriptionPrint, setDescriptionP] = React.useState(description || "");
  const [nameUpdate, setName] = React.useState(name || "");
  const [descriptionUpdate, setDescription] = React.useState(description || "");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUpdateCategory = async (id, name, description) => {
    try {
      // Appeler la fonction updateCategory de votre base de données
      await updateCategory(id, name, description);
      setNameP(name);
      setDescriptionP(description);
      Swal.fire("Mise à jour !", "La catégorie a été mise à jour avec succès.", "success");
    } catch (error) {
      console.error("Une erreur s'est produite lors de la mise à jour de la catégorie :", error);
      // Afficher une alerte en cas d'erreur
      Swal.fire(
        "Erreur !",
        "Une erreur s'est produite lors de la mise à jour de la catégorie.",
        "error"
      );
    }
  };

  return (
    <>
      <MDBox
        component="li"
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        bgColor={darkMode ? "transparent" : "grey-100"}
        borderRadius="lg"
        p={3}
        mb={noGutter ? 0 : 1}
        mt={2}
      >
        <MDBox width="100%" display="flex" flexDirection="column">
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            flexDirection={{ xs: "column", sm: "row" }}
            mb={2}
          >
            <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
              {namePrint}
            </MDTypography>

            <MDBox
              display="flex"
              alignItems="center"
              mt={{ xs: 2, sm: 0 }}
              ml={{ xs: -1.5, sm: 0 }}
            >
              <MDBox mr={1}>
                <MDButton variant="text" color="error" onClick={onDelete}>
                  <Icon>delete</Icon>&nbsp;Supprimer
                </MDButton>
              </MDBox>
              <MDButton variant="text" color={darkMode ? "white" : "dark"} onClick={handleOpen}>
                <Icon>edit</Icon>&nbsp;Modifier
              </MDButton>
            </MDBox>
          </MDBox>
          <MDBox mb={1} lineHeight={0}>
            <MDTypography variant="caption" color="text">
              Description:&nbsp;&nbsp;&nbsp;
              <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize">
                {descriptionPrint}
              </MDTypography>
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
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
              value={nameUpdate}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              sx={{ mt: 2 }}
            />
            <TextField
              id="description"
              label="Description"
              variant="outlined"
              value={descriptionUpdate}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              multiline
              rows={4}
              sx={{ mt: 2 }}
            />
            <Button
              variant="contained"
              onClick={() => {
                handleUpdateCategory(id, nameUpdate, descriptionUpdate);
                handleClose();
              }}
              sx={{ mt: 2 }}
            >
              Modifier
            </Button>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

// Setting default values for the props of Item
Item.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Item
Item.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
};

export default Item;
