import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  where,
  query,
  updateDoc,
} from "firebase/firestore";
import app from "../backend_config"; // Assurez-vous que le chemin vers votre fichier firebase.js est correct

const db = getFirestore(app);

// Fonction pour ajouter une nouvelle catégorie
export async function addCategory(name, description) {
  try {
    const docRef = await addDoc(collection(db, "categories"), {
      name: name,
      description: description,
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    return null;
  }
}

// Fonction pour lire toutes les catégories
export async function getAllCategories() {
  const querySnapshot = await getDocs(collection(db, "categories"));
  let categories = [];
  querySnapshot.forEach((doc) => {
    categories.push({ id: doc.id, ...doc.data() });
  });
  return categories;
}

// Fonction pour mettre à jour une catégorie
export async function updateCategory(categoryId, newName, newDescription) {
  const categoryRef = doc(db, "categories", categoryId);
  try {
    await updateDoc(categoryRef, {
      name: newName,
      description: newDescription,
    });
    console.log("Document successfully updated!");
    return true;
  } catch (e) {
    console.error("Error updating document: ", e);
    return false;
  }
}

// Fonction pour supprimer une catégorie et tous ses produits
export async function deleteCategory(categoryId) {
  const categoryRef = doc(db, "categories", categoryId);
  try {
    // Supprimer la catégorie
    await deleteDoc(categoryRef);
    console.log("Category document successfully deleted!");

    // Obtenir tous les produits de la catégorie spécifiée
    const productsQuerySnapshot = await getDocs(query(collection(db, "products"), where("id_category", "==", categoryId)));

    // Supprimer chaque produit de la catégorie
    productsQuerySnapshot.forEach(async (productDoc) => {
      await deleteDoc(productDoc.ref);
      console.log(`Product document ${productDoc.id} successfully deleted.`);
    });

    console.log("All products of the category successfully deleted!");
    return true;
  } catch (e) {
    console.error("Error removing category or products: ", e);
    return false;
  }
}

