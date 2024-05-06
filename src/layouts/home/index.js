import React from "react";
import Grid from "@mui/material/Grid";
// import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React examples
import Footer from "examples/Footer";
import PageLayout from "examples/LayoutContainers/PageLayout";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";


// Billing page components
import ListItem from "./components/ListItem";

export default function Home() {
  // const theme = useTheme();
  const { category } = useParams();
  return (
    <PageLayout>
      <DefaultNavbar />
      <MDBox mt={5} mb={5} px={4}>
        <Grid container spacing={3} mt={5}>
          <Grid item xs={12} lg={12}>
            <Grid container mt={5}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <ListItem id_category={category || ""} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </PageLayout>
  );
}
