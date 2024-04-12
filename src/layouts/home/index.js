import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React examples
import Footer from "examples/Footer";
import PageLayout from "examples/LayoutContainers/PageLayout";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

// Billing page components
import ListItem from "./components/ListItem";

export default function Home() {
  return (
    <PageLayout>
      <DefaultNavbar />
      <MDBox mt={5} mb={5} px={4}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container mt={5}>
              <Grid item xs={12}>
                <ListItem />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </PageLayout>
  );
}
