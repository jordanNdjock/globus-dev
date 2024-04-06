import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDocs, query, collection, where } from "firebase/firestore";
import { db } from "../../firebase"; // Assurez-vous d'importer votre instance Firebase
import { Card, Typography, Button, CircularProgress } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDButton from "components/MDButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ProductDetails = () => {
  const { productName } = useParams(); // Récupère le nom du produit depuis les paramètres d'URL
  const [product, setProduct] = useState(null); // État pour stocker les détails du produit
  const [loading, setLoading] = useState(true); // État pour indiquer si le chargement est en cours

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Récupère les données du produit depuis Firestore en utilisant son nom
        const productQuerySnapshot = await getDocs(
          query(
            collection(db, "products"),
            where("productName", "==", productName)
          )
        );
        if (!productQuerySnapshot.empty) {
          // Le produit existe, nous prenons le premier document trouvé
          const productDoc = productQuerySnapshot.docs[0];
          // Met à jour l'état avec les détails du produit
          setProduct(productDoc.data());
        } else {
          console.log("No such product!");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        // Met à jour l'état de chargement une fois le chargement terminé
        setLoading(false);
      }
    };

    fetchProduct(); // Appel de la fonction de récupération du produit
  }, [productName]); // Déclenche le chargement du produit lorsque le nom du produit change

  // Affiche un indicateur de chargement pendant le chargement des détails du produit
  if (loading) {
    return (
      <MDBox
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh", // Centrer verticalement sur toute la hauteur de la vue
        }}
      >
        <CircularProgress color="info" />
      </MDBox>
    );
  }

  // Affiche les détails du produit une fois le chargement terminé
  return (
    <DashboardLayout>
      <DashboardNavbar />
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
            width={{ xs: "100%", sm: "43%", height: "100%" }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor="black"
          >
            <img
              src={product.imageUrl}
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
              {product.productName}
            </MDTypography>
            <MDBox
              display="flex"
              justifyContent="space-between"
              fontWeight="medium"
              alignItems="center"
              mb={1}
            >
              <MDTypography variant="h6" fontWeight="medium">
                {product.description}
              </MDTypography>
            </MDBox>
            <MDBox
              display="flex"
              justifyContent="space-between"
              fontWeight="medium"
              alignItems="center"
              mb={1}
            >
              <MDTypography variant="h6" fontWeight="medium">
                {product.price} Fcfa
              </MDTypography>
            </MDBox>
            <MDBox
              display="flex"
              justifyContent="space-between"
              fontWeight="medium"
              alignItems="center"
              mb={1}
            >
              <MDTypography variant="h6" fontWeight="medium">
                {product.category}
              </MDTypography>
            </MDBox>
            <MDBox
              display="flex"
              justifyContent="space-between"
              fontWeight="medium"
              alignItems="center"
              mb={1}
            >
              <MDTypography variant="h6" fontWeight="medium">
                {product.quantity}
              </MDTypography>
            </MDBox>
            {/* Ajoutez d'autres détails du produit ici */}
            <MDButton
              variant="contained"
              color="info"
              component={Link}
              to="/produits"
            >
              <ArrowBackIcon /> &nbsp;Retour
            </MDButton>
          </MDBox>
        </MDBox>
      </Card>
    </DashboardLayout>
  );
};

export default ProductDetails;
