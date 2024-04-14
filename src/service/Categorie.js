import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
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

// Fonction pour supprimer une catégorie
export async function deleteCategory(categoryId) {
  const categoryRef = doc(db, "categories", categoryId);
  try {
    await deleteDoc(categoryRef);
    console.log("Document successfully deleted!");
    return true;
  } catch (e) {
    console.error("Error removing document: ", e);
    return false;
  }
}
