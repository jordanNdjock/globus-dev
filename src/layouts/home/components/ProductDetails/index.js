import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../../../backend_config"; // Assurez-vous d'importer votre instance Firebase
import { Card, CircularProgress } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import CloudDownloadIcon from "@mui/icons-material/CloudDownloadIcon";
import Footer from "examples/Footer";
import { fetchCategory } from "service/Produit";
// import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";

const HomeProductDetails = () => {
  const { idProduct } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, "products", idProduct);
        const productDoc = await getDoc(productRef);
        if (productDoc.exists()) {
          setProduct(productDoc.data());
          const categorie = await fetchCategory(productDoc.data().id_category);
          setCategory(categorie);
        } else {
          console.log("No such product!");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [idProduct]);
  
  if (loading) {
    return (
      <MDBox
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <CircularProgress color="info" />
      </MDBox>
    );
  }

  return (
    <PageLayout>
      <DefaultNavbar />
      <Card
        variant="outlined"
        sx={{
          backgroundColor: "light",
          borderRadius: "8px",
          boxShadow: 1,
          marginBottom: "1rem",
          marginTop: "10rem",
          display: "flex", // Pour activer le modèle de boîte flexible
          justifyContent: "center", // Pour centrer horizontalement
          alignItems: "center", // Pour centrer verticalement
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
          <img src={product.imageUrl} alt="Product" style={{ maxWidth: "100%", height: "auto" }} />
        </MDBox>

        <MDBox width="100%" p={2} ml={{ xs: 0, sm: 2 }}>
          <MDTypography variant="h3" fontWeight="medium" textTransform="capitalize" mb={1}>
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
            <MDTypography variant="h4" fontWeight="medium" style={{ textAlign: "justify" }}>
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
            <MDTypography variant="h5" fontWeight="medium">
              <span style={{ color: "blue" }}> Prix :</span> {product.price} Fcfa
            </MDTypography>
          </MDBox>
          <MDBox
            display="flex"
            justifyContent="space-between"
            fontWeight="medium"
            alignItems="center"
            mb={1}
          >
            <MDTypography variant="h5" fontWeight="medium">
              <span style={{ color: "blue" }}>Quantité :</span> {product.quantity}
            </MDTypography>
          </MDBox>
          <MDBox
            display="flex"
            justifyContent="space-between"
            fontWeight="medium"
            alignItems="center"
            mb={1}
          >
            <MDTypography variant="h5" fontWeight="medium">
              <span style={{ color: "blue" }}>Catégorie :</span> {category}
            </MDTypography>
          </MDBox>
          <MDBox
            display="flex"
            justifyContent="space-between"
            fontWeight="medium"
            alignItems="center"
            mb={1}
          ></MDBox>
          <MDBox
            display="flex"
            justifyContent="space-between"
            fontWeight="medium"
            alignItems="center"
            mb={3}
          >
            {product.audio && (
              <audio controls>
                <source src={product.audio} type="audio/mp3" />
                Votre navigateur ne supporte pas l'audio HTML5.
              </audio>
            )}
          </MDBox>
          <MDButton variant="contained" color="info" component={Link} to="/">
            <ArrowBackIcon /> &nbsp;Retour
          </MDButton>
          <a href={product.imageUrl} style={{ textDecoration: "none" }} >
            <MDButton variant="contained" color="success" style={{ marginLeft: "10px" }}>
              Telecharger 
            </MDButton>
          </a>

        </MDBox>
      </Card>
      <Footer />
    </PageLayout>
  );
};

export default HomeProductDetails;
