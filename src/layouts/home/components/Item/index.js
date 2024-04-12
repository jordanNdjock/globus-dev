import React, { useState } from "react";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Card, Snackbar, SnackbarContent } from "@mui/material";

function Item({ id, productName, description, price, quantity, imageUrl, category }) {
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [productQuantity, setProductQuantity] = useState(parseInt(quantity));
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSuccessAlertClose = () => {
    setSuccessAlertOpen(false);
  };
  const handleCloseModal = () => {
    setProductToModify(null);
    setOpenModal(false);
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
          <img src={imageUrl} alt="Product" style={{ maxWidth: "100%", height: "400px" }} />
        </MDBox>

        <MDBox width="100%" p={2} ml={{ xs: 0, sm: 2 }} style={{ textAlign: "center" }}>
          <MDTypography variant="h2" color="primary" gutterBottom>
            {productName}
          </MDTypography>
          <MDTypography variant="h6" color="textPrimary" gutterBottom>
            {description}
          </MDTypography>
          <MDTypography variant="h3" color="info" gutterBottom>
            Prix : {price} FCFA
          </MDTypography>
          <MDTypography variant="h5" color="success" gutterBottom>
            Quantité : {productQuantity}
          </MDTypography>
          <MDTypography variant="h4" color="warning" gutterBottom>
            Catégorie : {category}
          </MDTypography>
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
  category: PropTypes.string.isRequired,
};

export default Item;
