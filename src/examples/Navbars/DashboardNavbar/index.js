import { useState, useEffect } from "react";

// react-router components
import { useLocation, Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import Icon from "@mui/material/Icon";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Breadcrumbs from "examples/Breadcrumbs";
import Swal from "sweetalert2";
// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
} from "context";

function DashboardNavbar({ absolute, light, isMini }) {
  const [userName, setUserName] = useState(localStorage.getItem("name") || "");
  const navigate = useNavigate();
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, darkMode } = controller;
  const route = useLocation().pathname.split("/").slice(1);

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(
        dispatch,
        (fixedNavbar && window.scrollY === 0) || !fixedNavbar
      );
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  async function handleSignOut() {
    const result = await Swal.fire({
      title: "Êtes-vous sûr de vouloir vous déconnecter ?",
      text: "Vous irez sur la page de connexion !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui",
      cancelButtonText: "Annuler",
    });
    if (result.isConfirmed) {
      signOut(auth)
        .then(() => {
          localStorage.removeItem("token");
          Swal.fire("Deconnecté !", "Deconnexion réussie !", "success");
          navigate("/login");
        })
        .catch((error) => {
          console.log("Erreur de deconnexion !");
          Swal.fire(
            "Erreur !",
            "Une erreur s'est produite lors de la deconnexion.",
            "error"
          );
        });
    }
  }

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);

  // Styles for the navbar icons
  const iconsStyle = ({
    palette: { dark, white, text },
    functions: { rgba },
  }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) =>
        navbar(theme, { transparentNavbar, absolute, light, darkMode })
      }
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox
          color="inherit"
          mb={{ xs: 1, md: 0 }}
          sx={(theme) => navbarRow(theme, { isMini })}
          display={{ xs: "none", sm: "block" }}
        >
          <Breadcrumbs
            icon="home"
            title={route[route.length - 1]}
            route={route}
            light={light}
          />
        </MDBox>
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            <MDBox color={light ? "white" : "inherit"} sx={{ width: "100%" }}>
              <Link to="/dashboard">
                <IconButton
                  sx={navbarIconButton}
                  size="medium"
                  disableRipple
                  style={{ marginTop: "-2px" }}
                >
                  <Icon
                    sx={iconsStyle}
                    className="text-primary"
                    style={{ fontWeight: "bold" }}
                  >
                    account_circle
                  </Icon>
                  <span style={{ marginLeft: "5px" }}>
                    {userName.substring(0, 6)}
                  </span>
                </IconButton>
              </Link>

              <IconButton
                size="medium"
                disableRipple
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
                style={{ float: "right", marginTop: "-2px" }}
              >
                <MenuIcon />
              </IconButton>
              <IconButton
                size="medium"
                disableRipple
                sx={navbarIconButton}
                onClick={handleSignOut}
                style={{ float: "right" }}
              >
                <Icon
                  sx={iconsStyle}
                  style={{ color: "crimson", fontWeight: "bold" }}
                >
                  logout
                </Icon>
              </IconButton>
            </MDBox>
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
