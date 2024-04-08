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
import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
// Billing page components
import Item from "./components/Item";
import ModalCategorie from "./components/ModalCategorie";

import React, { useState, useEffect } from "react";
import { getAllCategories, deleteCategory, addCategory } from "bd/Categorie";

import CircularProgress from "@mui/material/CircularProgress"; // Importez le composant CircularProgress pour le loader
import Swal from "sweetalert2";

export default function Categorie() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // État pour gérer le chargement

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Utilisez useEffect pour charger les catégories une seule fois au chargement du composant
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fonction pour récupérer les catégories
  const fetchCategories = async () => {
    try {
      const categoriesData = await getAllCategories();
      setCategories(categoriesData);
      setLoading(false); // Mettez à jour l'état de chargement une fois que les catégories sont chargées
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des catégories:",
        error
      );
      setLoading(false); // Assurez-vous de mettre à jour l'état de chargement même en cas d'erreur
    }
  };

  // Fonction pour supprimer une catégorie
  const handleDeleteCategory = async (id) => {
    // Affichez la boîte de dialogue de confirmation
    const result = await Swal.fire({
      title: "Êtes-vous sûr de vouloir supprimer cette catégorie ?",
      text: "Cette action est irréversible !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    });

    // Vérifiez si l'utilisateur a confirmé la suppression
    if (result.isConfirmed) {
      try {
        // Supprimez la catégorie de la base de données
        await deleteCategory(id);
        // Mettez à jour l'état en filtrant l'élément à supprimer
        setCategories(categories.filter((category) => category.id !== id));
        // Affichez une alerte pour indiquer que la catégorie a été supprimée avec succès
        Swal.fire(
          "Supprimé !",
          "La catégorie a été supprimée avec succès.",
          "success"
        );
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la suppression de la catégorie :",
          error
        );
        // Affichez une alerte en cas d'erreur
        Swal.fire(
          "Erreur !",
          "Une erreur s'est produite lors de la suppression de la catégorie.",
          "error"
        );
      }
    }
  };

  const handleAddCategory = (name, description) => {
    // Vérifier si les champs sont vides
    if (name === "" || description === "") {
      console.log("Veuillez remplir tous les champs.");
      return;
    }

    // Appeler la fonction addCategory de Firebase
    addCategory(name, description)
      .then((categoryId) => {
        console.log("Catégorie ajoutée avec succès avec l'ID:", categoryId);
        setCategories([
          ...categories,
          { id: categoryId, name: name, description: description },
        ]);
        handleClose(); // Fermer le modal après la soumission
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de l'ajout de la catégorie:",
          error
        );
      });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card id="delete-account">
        <MDBox
          pt={2}
          px={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <MDTypography variant="h6" fontWeight="medium">
            Categorie
          </MDTypography>
          <MDButton variant="gradient" color="dark">
            <Icon sx={{ fontWeight: "bold" }}>add</Icon>
            &nbsp;
            <ModalCategorie
              defaultName=""
              defaultDescription=""
              action={handleAddCategory}
            />
            {/* <Button onClick={handleOpen}>Nouvelle Categorie</Button> */}
          </MDButton>
        </MDBox>
        <MDBox pt={1} pb={2} px={2}>
          <MDBox
            component="ul"
            display="flex"
            flexDirection="column"
            p={0}
            m={0}
          >
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              categories.map((category) => (
                <Item
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  description={category.description}
                  onDelete={() => handleDeleteCategory(category.id)}
                />
              ))
            )}
          </MDBox>
        </MDBox>
      </Card>
      <Footer />
    </DashboardLayout>
  );
}
