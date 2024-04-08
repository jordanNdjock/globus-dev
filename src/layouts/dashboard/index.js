import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

function Dashboard() {
  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const productQuerySnapshot = await getDocs(collection(db, "products"));
        setProductCount(productQuerySnapshot.size);
      } catch (error) {
        console.error("Error fetching product count:", error);
      }
    };

    const fetchCategoryCount = async () => {
      try {
        const categoryQuerySnapshot = await getDocs(
          collection(db, "categories")
        );
        setCategoryCount(categoryQuerySnapshot.size);
      } catch (error) {
        console.error("Error fetching category count:", error);
      }
    };

    fetchProductCount();
    fetchCategoryCount();
  }, []);

  const [productCount, setProductCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="table_view"
                title="Categorie"
                count={productCount.toString()}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={4.5}>
              <ComplexStatisticsCard
                icon="receipt_long"
                title="Produit"
                count={categoryCount.toString()}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
