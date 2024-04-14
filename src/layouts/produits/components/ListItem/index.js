import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Product from "layouts/produits/components/Item";
import CircularProgress from "@mui/material/CircularProgress";
import MDButton from "@mui/material/Button";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../../../backend_config";

function ListItem() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "products"), orderBy("created", "desc")),
      (snapshot) => {
        const products = [];
        snapshot.forEach((doc) => {
          products.push({ id: doc.id, ...doc.data() });
        });
        setProducts(products);
        setLoading(false);
      }
    );
  
    // Retourner la fonction de désabonnement
    return () => unsubscribe();
  }, []);

  const productsPerPage = 5;
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <div>
      <MDBox pt={1} pb={2} px={2}>
        {loading ? (
          <MDBox display="flex" justifyContent="center" alignItems="center" height="100px">
            <CircularProgress color="info" />
          </MDBox>
        ) : (
          <>
            <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
              {currentProducts.map((product) => (
                <Product key={product.id} {...product} quantity={product.quantity.toString()} />
              ))}
            </MDBox>
            {totalPages > 1 && products.length > 5 && (
              <MDBox display="flex" justifyContent="center" alignItems="center" mt={2}>
                <MDBox mr={2}>
                  <MDButton
                    variant="contained"
                    color="info"
                    disabled={currentPage === 1}
                    onClick={handlePreviousPage}
                  >
                    Page précédente
                  </MDButton>
                </MDBox>
                <MDBox>
                  <MDButton
                    variant="contained"
                    color="info"
                    disabled={currentPage === totalPages}
                    onClick={handleNextPage}
                  >
                    Page suivante
                  </MDButton>
                </MDBox>
              </MDBox>
            )}
          </>
        )}
      </MDBox>
    </div>
  );
}

export default ListItem;
