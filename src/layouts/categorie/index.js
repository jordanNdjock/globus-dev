// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Card from "@mui/material/Card";
// Billing page components
import Item from "./components/Item";
import ModalCategorie from "./components/ModalCategorie";

import React, { useState, useEffect } from "react";
import { getAllCategories } from "bd/Categorie";

export default function Categorie() {
  const [categories, setCategories] = useState([]);

  // Utilisez useEffect pour charger les catégories une seule fois au chargement du composant
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fonction pour récupérer les catégories
  const fetchCategories = async () => {
    try {
      const categoriesData = await getAllCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error("Une erreur s'est produite lors de la récupération des catégories:", error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card id="delete-account">
        <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
          <MDTypography variant="h6" fontWeight="medium">
            Payment Method
          </MDTypography>
          <MDButton variant="gradient" color="dark">
            <Icon sx={{ fontWeight: "bold" }}>add</Icon>
            &nbsp;
            <ModalCategorie
              defaultName="Nom par défaut"
              defaultDescription="Description par défaut"
            />
          </MDButton>
        </MDBox>
        <MDBox pt={1} pb={2} px={2}>
          <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
            {categories.map((category) => (
              <Item
                key={category.id}
                id={category.id}
                name={category.name}
                description={category.description}
              />
            ))}
          </MDBox>
        </MDBox>
      </Card>
      <Footer />
    </DashboardLayout>
  );
}
