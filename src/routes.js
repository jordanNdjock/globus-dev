// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Categorie from "layouts/categorie";
import Produit from "layouts/produits";
import Stock from "layouts/stock";
import SignIn from "layouts/authentication/sign-in";
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
    key: "product",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/produits",
    component: <Produit />,
  },
  {
    type: "collapse",
    name: "Stock",
    key: "stock",
    icon: <Icon fontSize="small">store</Icon>,
    route: "/stock",
    component: <Stock />,
  },
];

export default routes;
