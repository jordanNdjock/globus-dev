import React, { useState } from "react";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import AddProductModal from "layouts/produits/modal/AddProductModal";
import { db } from "../../../../firebase";
import { collection, addDoc } from "firebase/firestore";
import {
  ref,
  uploadString,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
import { Snackbar, SnackbarContent } from "@mui/material";

function GestionProduit() {
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
    try {
      let imageUrl = "";
      let storage = getStorage();

      // Référence de la collection des produits
      const productsRef = collection(db, "products");

      // Téléverser l'image si elle est fournie
      if (formData.image) {
        const imageRef = ref(storage, `images/${formData.productName}`);
        await uploadString(imageRef, formData.image, "data_url");
        imageUrl = await getDownloadURL(imageRef);
      }
      // Ajouter le produit à la collection des produits
      await addDoc(productsRef, {
        productName: formData.productName,
        description: formData.description,
        price: formData.price,
        quantity: formData.quantity,
        imageUrl: imageUrl,
        category: formData.category, // Si nécessaire
      });
      console.log("Produit ajouté avec succès !");
      setSuccessAlertOpen(true);
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit :", error);
    }
  };

  return (
    <>
      <Card id="delete-account">
        <MDBox
          pt={2}
          px={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
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

export default GestionProduit;
