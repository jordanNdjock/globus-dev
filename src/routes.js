// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Categorie from "layouts/categorie";
import Produit from "layouts/produits";
// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Accueil",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Categorie",
    key: "categorie",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/categorie",
    component: <Categorie />,
  },
  {
    type: "collapse",
    name: "Produits",
    key: "produits",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/produits",
    component: <Produit />,
  },
];

export default routes;
