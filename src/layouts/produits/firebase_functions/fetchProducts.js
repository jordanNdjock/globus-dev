import { db } from "../../../firebase";
import { collection, query, getDocs, where, doc } from "firebase/firestore";
import { fetchCategories } from "./fetchCategories";

export const fetchProductsByCategory = async (category) => {
  try {
    // Obtenez une référence à la collection "products"
    const productsRef = collection(db, "products");

    // Créez une requête pour récupérer les produits de la catégorie spécifiée
    const productsQuery = query(productsRef, where("category", "==", category));

    // Exécutez la requête et obtenez les résultats
    const productsSnapshot = await getDocs(productsQuery);

    // Mappez les documents de produits en un tableau
    const productsArray = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return productsArray;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
};

export const fetchAllProductsByCategory = async () => {
  try {
    // Récupérer toutes les catégories
    const categories = await fetchCategories();
    const allProducts = [];

    // Pour chaque catégorie, récupérer les produits correspondants
    for (const category of categories) {
      const products = await fetchProductsByCategory(category.name);

      // Ajouter la catégorie à chaque produit
      products.forEach((product) => {
        product.category = category.name;
      });

      // Ajouter les produits de cette catégorie à la liste de tous les produits
      allProducts.push(...products);
    }

    return allProducts;
  } catch (error) {
    console.error("Error fetching all products by category:", error);
    return [];
  }
};
