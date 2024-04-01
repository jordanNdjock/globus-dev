// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";
import { deleteCategory } from "bd/Categorie";

function Item({ id, name, description, noGutter }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const handleDelete = () => {
    deleteCategory(id)
      .then(() => {
        console.log("Catégorie supprimée avec succès.");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Une erreur s'est produite lors de la suppression de la catégorie:", error);
      });
  };

  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor={darkMode ? "transparent" : "grey-100"}
      borderRadius="lg"
      p={3}
      mb={noGutter ? 0 : 1}
      mt={2}
    >
      <MDBox width="100%" display="flex" flexDirection="column">
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}
        >
          <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
            {name}
          </MDTypography>

          <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
            <MDBox mr={1}>
              <MDButton variant="text" color="error" onClick={handleDelete}>
                <Icon>delete</Icon>&nbsp;Supprimer
              </MDButton>
            </MDBox>
            <MDButton variant="text" color={darkMode ? "white" : "dark"}>
              <Icon>edit</Icon>&nbsp;Modifier
            </MDButton>
          </MDBox>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text">
            Description:&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize">
              {description}
            </MDTypography>
          </MDTypography>
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of Item
Item.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Item
Item.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
};

export default Item;
