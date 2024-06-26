import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Item from "layouts/home/components/Item";
import CircularProgress from "@mui/material/CircularProgress";
import MDButton from "@mui/material/Button";
// import CustomizedInputBase from "./CustomizedInputBase";
import Grid from "@mui/material/Grid";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../../../../backend_config";

function ListItem({id_category}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  // const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    const fetchProducts = async () => {
      let productsQuery = query(collection(db, "products"), orderBy("created", "desc"));

      if (id_category !== "") {
        // Si id_category n'est pas vide, ajoutez le filtre de catégorie à la requête
        productsQuery = query(collection(db, "products"), 
                              where("id_category", "==", id_category), 
                              orderBy("created", "desc"));
      }

      const unsubscribe = onSnapshot(productsQuery, (snapshot) => {
        const productsData = [];
        snapshot.forEach((doc) => {
          productsData.push({ id: doc.id, ...doc.data() });
        });
        setProducts(productsData);
        setLoading(false);
      });

      return () => unsubscribe();
    };

    fetchProducts();
  }, [id_category]);
  
  // const handleSearch = () => {
  //   // Rechercher les produits correspondant à la requête de recherche
  //   if (searchQuery.trim() !== "") {
  //     setLoading(true);
  //     const searchResults = [];
  //     products.forEach((product) => {
  //       if (product.category.toLowerCase().includes(searchQuery.toLowerCase())) {
  //         searchResults.push(product);
  //       }
  //     });
  //     setProducts(searchResults);
  //     setLoading(false);
  //   }
  // };

  const productsPerPage = 9;
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
    <>
        <MDBox pt={3} px={2} mb={5}>
          <MDTypography variant="h1" fontWeight="medium">
          </MDTypography>
        </MDBox>
      {/* <MDBox pt={3} px={2} mb={5}>
          <CustomizedInputBase products={products} />
      </MDBox> */}
      <MDBox pt={1} pb={2} px={2}>
        {loading ? (
          <MDBox display="flex" justifyContent="center" alignItems="center" height="100px">
            <CircularProgress color="info" />
          </MDBox>
        ) : (
          <>
            <MDBox
              component="ul"
              display="flex"
              flexDirection="row"
              flexWrap="wrap"
              margin="auto"
            >
              {currentProducts.length === 0 ? (
                <MDTypography variant="body1" textAlign="center">
                  Aucun résultat trouvé pour cette catégorie.
                </MDTypography>
              ) : (
                currentProducts.map((product, index) => (
                  <Grid key={product.id} item xs={12} sm={6} md={4} lg={4} >
                    <Item {...product} />
                  </Grid>
                ))
              )}
            </MDBox>

            {totalPages > 1 && products.length > 9 && (
              <MDBox display="flex" justifyContent="center" alignItems="center" mt={2}>
                <MDBox mr={2}>
                  <MDButton
                    variant="contained"
                    color="primary"
                    disabled={currentPage === 1}
                    onClick={handlePreviousPage}
                    style={{color : 'white'}}
                  >
                    Page précédente
                  </MDButton>
                </MDBox>
                <MDBox>
                  <MDButton
                    variant="contained"
                    color="primary"
                    disabled={currentPage === totalPages}
                    onClick={handleNextPage}
                    style={{color : 'white'}}
                  >
                    Page suivante
                  </MDButton>
                </MDBox>
              </MDBox>
            )}
          </>
        )}
      </MDBox>
    </>
  );
}

export default ListItem;
