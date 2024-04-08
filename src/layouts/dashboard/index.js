import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
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
    const unsubscribeProduct = onSnapshot(
      collection(db, "products"),
      (snapshot) => {
        setProductCount(snapshot.size);
      }
    );

    const unsubscribeCategory = onSnapshot(
      collection(db, "categories"),
      (snapshot) => {
        setCategoryCount(snapshot.size);
      }
    );

    return () => {
      // Unsubscribe from the snapshot listeners when the component unmounts
      unsubscribeProduct();
      unsubscribeCategory();
    };
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
                count={categoryCount.toString()}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={4.5}>
              <ComplexStatisticsCard
                icon="receipt_long"
                title="Produit"
                count={productCount.toString()}
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
