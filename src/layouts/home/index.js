import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React examples
import Footer from "examples/Footer";
import PageLayout from "examples/LayoutContainers/PageLayout";

// Billing page components
import BillingInformation from "layouts/home/components/BillingInformation";

export default function Home() {
  return (
    <PageLayout>
      <MDBox mt={0} mb={3} px={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <BillingInformation />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </PageLayout>
  );
}
