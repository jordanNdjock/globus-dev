import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDocs, query, collection, where } from "firebase/firestore";
import { db } from "../../firebase"; // Assurez-vous d'importer votre instance Firebase
import { Card, CircularProgress } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDButton from "components/MDButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Footer from "examples/Footer";

const ProductDetails = () => {
  const { productName } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      }
    };

    fetchProduct(); // Appel de la fonction de récupération du produit
  }, [productName]);

  // Affiche un indicateur de chargement pendant le chargement des détails du produit
  if (loading) {
    return (
      <MDBox
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh", // Centrer verticalement sur toute la hauteur de la vue
        }}
      >
        <CircularProgress color="info" />
      </MDBox>
    );
  }

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
          justifyContent="center"
          alignItems="center"
          p={2}
          mt={2}
          borderRadius="8px"
          boxShadow={1}
          bgcolor="black"
          width="100%"
        >
          <img
            src={product.imageUrl}
            alt="Product"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </MDBox>

        <MDBox width="100%" p={2} ml={{ xs: 0, sm: 2 }}>
          <MDTypography
            variant="h3"
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
            sx={{
              maxWidth: { xs: "100%", sm: "75%" },
              textAlign: { xs: "justify", sm: "left" },
              wordWrap: "break-word",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
            }}
          >
            <MDTypography
              variant="h6"
              fontWeight="medium"
              style={{ textAlign: "justify" }}
            >
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
              <span style={{ color: "blue" }}> Prix :</span> {product.price}{" "}
              Fcfa
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
              <span style={{ color: "blue" }}>Quantité :</span>{" "}
              {product.quantity}
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
              <span style={{ color: "blue" }}>Catégorie :</span>{" "}
              {product.category}
            </MDTypography>
          </MDBox>
          <MDButton
            variant="contained"
            color="info"
            component={Link}
            to="/produits"
          >
            <ArrowBackIcon /> &nbsp;Retour
          </MDButton>
        </MDBox>
      </Card>
      <Footer />
    </DashboardLayout>
  );
};

export default ProductDetails;
