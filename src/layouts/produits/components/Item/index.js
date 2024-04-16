import React, { useState } from "react";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import ButtonGroup from "@mui/material/ButtonGroup";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Card, Snackbar, SnackbarContent } from "@mui/material";
import Swal from "sweetalert2";
import { doc, query, where, getDocs, collection, updateDoc } from "firebase/firestore";
import { db } from "../../../../backend_config";
import ModifyProductModal from "layouts/produits/modal/ModifyProductModal";
import { Link } from "react-router-dom";
import { deleteProduct } from "service/Produit";
import { updateProduct } from "service/Produit";

function Item({ id, productName, description, price, quantity, imageUrl, id_category, audio, created }) {
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [productToModify, setProductToModify] = useState(null);
  const [productQuantity, setProductQuantity] = useState(parseInt(quantity));
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleChangeQuantity = async (productName, newQuantity) => {
    const value = parseInt(newQuantity);
    setProductQuantity(isNaN(value) ? 0 : value);
    if (!isNaN(newQuantity)) {
      try {
        // Mettre à jour la quantité dans Firebase
        const productQuerySnapshot = await getDocs(
          query(collection(db, "products"), where("productName", "==", productName))
        );
        if (!productQuerySnapshot.empty) {
          const productId = productQuerySnapshot.docs[0].id;
          const productRef = doc(db, "products", productId);
          await updateDoc(productRef, { quantity: newQuantity });
          setSnackbarMessage("Quantité modifiée avec succès !");
          setSuccessAlertOpen(true);
        }
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    }
  };

  const handleIncrease = async () => {
    setProductQuantity(productQuantity + 1);
    const newQuantity = productQuantity + 1;
    await handleChangeQuantity(productName, newQuantity);
  };

  const handleDecrease = async () => {
    if (productQuantity > 0) {
      setProductQuantity(productQuantity - 1);
      const newQuantity = productQuantity - 1;
      await handleChangeQuantity(productName, newQuantity);
    }
  };

  const handleOpenModal = (product) => {
    setProductToModify(product);
    setOpenModal(true);
  };
  const handleSuccessAlertClose = () => {
    setSuccessAlertOpen(false);
  };
  const handleCloseModal = () => {
    setProductToModify(null);
    setOpenModal(false);
  };

  //modification du produit
  const handleSubmit = async (editedProduct) => {
    try {
          await updateProduct(editedProduct);
          setOpenModal(false);
          setSnackbarMessage("Le produit a été modifié avec succès !");
          setSuccessAlertOpen(true);

    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  //suppression du produit
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Êtes-vous sûr de vouloir supprimer ce  produit ?",
      text: "Cette action est irréversible !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    });

    if (result.isConfirmed) {
      try {
          await deleteProduct(id);
          Swal.fire("Supprimé !", "Le produit a été supprimé avec succès.", "success");
      } catch (error) {
        console.error("Error deleting product:", error);
        Swal.fire(
          "Erreur !",
          "Une erreur s'est produite lors de la suppression du produit.",
          "error"
        );
      }
    }
  };

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          backgroundColor: "light",
          borderRadius: "8px",
          boxShadow: 1,
          marginBottom: "1rem",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <MDBox
          component="li"
          display="flex"
          justifyContent="center"
          alignItems="center"
          p={2}
          mt={2}
          borderRadius="8px"
          boxShadow={1}
          bgcolor="black"
          width="100%"
        >
          <img src={imageUrl} alt="Product" style={{ maxWidth: "100%", height: "300px" }} />
        </MDBox>

        <MDBox width="100%" p={2} ml={{ xs: 0, sm: 2 }} style={{ textAlign: "center" }}>
          <MDTypography variant="h3" fontWeight="medium" textTransform="capitalize" mb={1}>
            {productName}
          </MDTypography>
          <MDBox
            display="flex"
            justifyContent="center"
            fontWeight="medium"
            alignItems="center"
            style={{ textAlign: "center" }}
            mb={3}
          >
            <MDTypography variant="h6" fontWeight="medium">
              {price} Fcfa
            </MDTypography>
          </MDBox>
          <ButtonGroup size="small" variant="outlined" aria-label="quantity">
            <MDButton onClick={handleDecrease} variant="contained" size="small" color="error">
              -
            </MDButton>
            <input
              type="text"
              value={productQuantity}
              onChange={(event) => handleChangeQuantity(productName, event.target.value)}
              style={{
                width: "60px",
                textAlign: "center",
                border: "1px solid #ced4da",
                borderRadius: "4px",
                outline: "none",
                padding: "8px 12px",
                fontSize: "14px",
              }}
            />
            <MDButton onClick={handleIncrease} variant="contained" size="small" color="success">
              +
            </MDButton>
          </ButtonGroup>
        </MDBox>

        <MDBox display="flex" alignItems="center">
          <MDBox mr={1}>
            <MDButton
              variant="contained"
              color="error"
              size="medium"
              sx={{ display: { xs: "none", sm: "flex" } }}
              onClick={() =>handleDelete(id)}
            >
              <Icon>delete</Icon>
            </MDButton>
          </MDBox>
          {/* <MDBox mr={1}>
            <MDButton
              variant="contained"
              color="dark"
              size="medium"
              sx={{ display: { xs: "none", sm: "flex" } }}
              onClick={() =>
                handleOpenModal({
                  id,
                  productName,
                  description,
                  price,
                  quantity,
                  imageUrl,
                  id_category,
                  audio,
                })
              }
            >
              <Icon>edit</Icon>
            </MDButton>
          </MDBox> */}
          <MDBox display="flex" alignItems="center">
            <Link to={`/produits/${id}`} color="dark">
              <MDButton
                variant="contained"
                color="info"
                size="medium"
                sx={{ display: { xs: "none", sm: "flex" } }}
              >
                <Icon color="white">visibility</Icon>
              </MDButton>
            </Link>
          </MDBox>
        </MDBox>
        {/* <MDBox p={2}>
          <ModifyProductModal
            open={openModal}
            handleClose={handleCloseModal}
            handleSubmit={handleSubmit}
            initialProduct={productToModify}
          />
        </MDBox> */}
        <MDBox display={{ xs: "block", sm: "none" }} ml="auto" p={2}>
          <IconButton onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={() =>handleDelete(id)}>
              Supprimer &nbsp;<Icon color="error">delete</Icon>
            </MenuItem>
            {/* <MenuItem
              onClick={() =>
                handleOpenModal({
                  id,
                  productName,
                  description,
                  price,
                  quantity,
                  imageUrl,
                  id_category,
                  audio,
                })
              }
            >
              Modifier &nbsp;<Icon color="info">edit</Icon>
            </MenuItem> */}
            <Link to={`/produits/${id}`} color="dark">
              <MenuItem>
                Voir détails &nbsp;<Icon>visibility</Icon>
              </MenuItem>
            </Link>
          </Menu>
        </MDBox>
      </Card>
      <Snackbar
        open={successAlertOpen}
        autoHideDuration={5000}
        onClose={handleSuccessAlertClose}
        color="success"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <SnackbarContent sx={{ backgroundColor: "#4CAF50" }} message={snackbarMessage} />
      </Snackbar>
    </>
  );
}

// Prop types validation
Item.propTypes = {
  id: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  quantity: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  id_category: PropTypes.string.isRequired,
};

export default Item;
