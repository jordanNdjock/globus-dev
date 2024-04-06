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
import {
  deleteDoc,
  doc,
  query,
  where,
  getDocs,
  collection,
  updateDoc,
} from "firebase/firestore";
import {
  ref,
  uploadString,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
import { db } from "../../../../firebase";
import ModifyProductModal from "layouts/produits/modal/ModifyProductModal";

function Bill({
  productName,
  description,
  price,
  quantity,
  imageUrl,
  category,
}) {
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
          query(
            collection(db, "products"),
            where("productName", "==", productName)
          )
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
      let storage = getStorage();
      // Effectuer une requête pour trouver le document correspondant au nom du produit
      const productQuery = query(
        collection(db, "products"),
        where("productName", "==", editedProduct.productName)
      );
      const productQuerySnapshot = await getDocs(productQuery);

      // Vérifier si le produit a été trouvé
      if (!productQuerySnapshot.empty) {
        const productId = productQuerySnapshot.docs[0].id;
        const productData = productQuerySnapshot.docs[0].data();
        const currentImageUrl = productData.imageUrl;

        // Vérifier si l'URL de l'image a changé
        if (editedProduct.imageUrl !== currentImageUrl) {
          // Si l'URL de l'image a changé, télécharger et mettre à jour l'image dans le stockage
          const imageRef = ref(storage, `images/${editedProduct.productName}`);
          await uploadString(imageRef, editedProduct.imageUrl, "data_url");
          const imageUrlToUpdate = await getDownloadURL(imageRef);

          // Mettre à jour le document correspondant avec les nouvelles données
          const productDocRef = doc(db, "products", productId);
          await updateDoc(productDocRef, {
            productName: editedProduct.productName,
            description: editedProduct.description,
            price: editedProduct.price,
            quantity: editedProduct.quantity,
            category: editedProduct.category,
            imageUrl: imageUrlToUpdate,
          });

          console.log("Product updated successfully!");
          setOpenModal(false);
          setSnackbarMessage("Le produit a été modifié avec succès !");
          setSuccessAlertOpen(true);
        } else {
          // Si l'URL de l'image n'a pas changé, mettre à jour le document sans télécharger l'image
          const productDocRef = doc(db, "products", productId);
          await updateDoc(productDocRef, {
            productName: editedProduct.productName,
            description: editedProduct.description,
            price: editedProduct.price,
            quantity: editedProduct.quantity,
            category: editedProduct.category,
          });

          console.log("Product updated successfully!");
          setOpenModal(false);
          setSnackbarMessage("Le produit a été modifié avec succès !");
          setSuccessAlertOpen(true);
        }
      } else {
        console.log("Product not found:", editedProduct.productName);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  //suppression du produit
  const handleDelete = async () => {
    try {
      const productQuery = query(
        collection(db, "products"),
        where("productName", "==", productName)
      );
      const productQuerySnapshot = await getDocs(productQuery);

      if (!productQuerySnapshot.empty) {
        const productId = productQuerySnapshot.docs[0].id;
        await deleteDoc(doc(db, "products", productId));
        console.log("produit supprimé avec succès");
      } else {
        console.log("Product not found:", productName);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
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
          ustifyContent="space-between"
          alignItems="center"
          p={2}
          mt={2}
          borderRadius="8px"
          boxShadow={1}
          bgcolor="black"
        >
          <MDBox
            width={{ xs: "100%", sm: "33%" }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor="black"
          >
            <img
              src={imageUrl}
              alt="Product"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </MDBox>

          <MDBox
            width={{ xs: "100%", sm: "calc(67% - 40px)" }}
            p={2}
            ml={{ xs: 0, sm: 2 }}
          >
            <MDTypography
              variant="h4"
              fontWeight="medium"
              textTransform="capitalize"
              mb={1}
            >
              {productName}
            </MDTypography>
            <MDBox
              display="flex"
              justifyContent="space-between"
              fontWeight="medium"
              alignItems="center"
              mb={1}
            >
              <MDTypography variant="h6" fontWeight="medium">
                {price} Fcfa
              </MDTypography>
            </MDBox>
            <ButtonGroup size="small" variant="outlined" aria-label="quantity">
              <MDButton
                onClick={handleDecrease}
                variant="contained"
                size="small"
                color="error"
              >
                -
              </MDButton>
              <input
                type="text"
                value={productQuantity}
                onChange={(event) =>
                  handleChangeQuantity(productName, event.target.value)
                }
                style={{
                  width: "50px",
                  textAlign: "center",
                  border: "1px solid #ced4da",
                  borderRadius: "4px",
                  outline: "none",
                  borderRadius: "4px",
                  padding: "8px 12px",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
              <MDButton
                onClick={handleIncrease}
                variant="contained"
                size="small"
                color="success"
              >
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
                onClick={handleDelete}
              >
                <Icon>delete</Icon>
              </MDButton>
            </MDBox>
            <MDBox mr={1}>
              <MDButton
                variant="contained"
                color="dark"
                size="medium"
                sx={{ display: { xs: "none", sm: "flex" } }}
                onClick={() =>
                  handleOpenModal({
                    productName,
                    description,
                    price,
                    quantity,
                    imageUrl,
                    category,
                  })
                }
              >
                <Icon>edit</Icon>
              </MDButton>
            </MDBox>
            <MDBox display="flex" alignItems="center">
              <MDButton
                variant="contained"
                color="info"
                size="medium"
                sx={{ display: { xs: "none", sm: "flex" } }}
              >
                <Icon>visibility</Icon>
              </MDButton>
            </MDBox>
          </MDBox>
          <MDBox p={2}>
            {/* Modal pour modifier un produit */}
            <ModifyProductModal
              open={openModal}
              handleClose={handleCloseModal}
              handleSubmit={handleSubmit}
              initialProduct={productToModify}
            />
          </MDBox>
        </MDBox>
        <MDBox display={{ xs: "block", sm: "none" }} ml="auto" p={2}>
          <IconButton onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleDelete}>
              Supprimer &nbsp;<Icon color="error">delete</Icon>
            </MenuItem>
            <MenuItem
              onClick={() =>
                handleOpenModal({
                  productName,
                  description,
                  price,
                  quantity,
                  imageUrl,
                  category,
                })
              }
            >
              Modifier &nbsp;<Icon color="info">edit</Icon>
            </MenuItem>
            <MenuItem onClick={() => console.log("Voir détails")}>
              Voir détails &nbsp;<Icon color="dark">visibility</Icon>
            </MenuItem>
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
        <SnackbarContent
          sx={{ backgroundColor: "#4CAF50" }}
          message={snackbarMessage}
        />
      </Snackbar>
    </>
  );
}

// Prop types validation
Bill.propTypes = {
  productName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  quantity: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default Bill;
