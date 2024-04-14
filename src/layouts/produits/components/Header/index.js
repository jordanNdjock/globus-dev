import React, { useState } from "react";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import AddProductModal from "layouts/produits/modal/AddProductModal";
import { Snackbar, SnackbarContent } from "@mui/material";
import { addProduct } from "service/Produit";

function Header() {
  const [openModal, setOpenModal] = useState(false);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSuccessAlertClose = () => {
    setSuccessAlertOpen(false);
  };

  const handleSubmit = async (formData) => {
    const { productName, description, price, quantity, image, id_category, audio, created } = formData;
    await addProduct(
      productName,
      description,
      price,
      quantity,
      image,
      id_category,
      audio,
      created
    );
    setSuccessAlertOpen(true);
  };

  return (
    <>
      <Card id="delete-account">
        <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
          <MDTypography variant="h6" fontWeight="medium">
            Gestion des Produits
          </MDTypography>
          <MDButton variant="gradient" color="dark" onClick={handleOpenModal}>
            <Icon sx={{ fontWeight: "bold" }}>add</Icon>
            &nbsp;Ajouter un produit
          </MDButton>
        </MDBox>
        <MDBox p={2}>
          {/* Modal pour ajouter un produit */}
          <AddProductModal
            open={openModal}
            handleClose={handleCloseModal}
            handleSubmit={handleSubmit}
          />
        </MDBox>
      </Card>
      <Snackbar
        open={successAlertOpen}
        autoHideDuration={5000}
        onClose={handleSuccessAlertClose}
        color="success"
        message="La classe a été ajoutée avec succès."
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <SnackbarContent
          sx={{ backgroundColor: "#4CAF50" }}
          message="Le produit a été ajoutée avec succès."
        />
      </Snackbar>
    </>
  );
}

export default Header;
