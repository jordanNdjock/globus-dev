import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import app from "../backend_config"; // Assurez-vous que le chemin vers votre fichier firebase.js est correct

const db = getFirestore(app);

// Fonction pour ajouter un nouveau produit avec téléversement d'images et d'audio
export async function addProduct(
  name,
  description,
  price,
  quantity,
  image,
  id_category,
  audio,
  created
) {
  try {
    const storage = getStorage();
    let imageUrl = "";
    let audioUrl = "";

    // Référence de la collection des produits
    const productsRef = collection(db, "products");

    // Téléverser l'image si elle est fournie
    if (image) {
      const imageRef = ref(storage, `images/${name}`);
      await uploadString(imageRef, image, "data_url");
      imageUrl = await getDownloadURL(imageRef);
    }

    // Téléverser l'audio si il est fourni
    if (audio) {
      const audioRef = ref(storage, `audio/${name}`);
      await uploadString(audioRef, audio, "data_url");
      audioUrl = await getDownloadURL(audioRef);
    }

    // Ajouter le produit à la collection des produits
    const docRef = await addDoc(productsRef, {
      name: name,
      description: description,
      price: price,
      quantity: quantity,
      image: imageUrl,
      id_category: id_category,
      audio: audioUrl,
      created: created,
    });

    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    return null;
  }
}

// Fonction pour lire tous les produits
export async function getAllProducts() {
  const querySnapshot = await getDocs(collection(db, "products"));
  let products = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });
  return products;
}

// Fonction pour mettre à jour un produit avec téléversement d'images et d'audio
export async function updateProduct(
  productId,
  newName,
  newDescription,
  newPrice,
  newQuantity,
  newImage,
  newId_category,
  newAudio,
  newCreated
) {
  try {
    const storage = getStorage();
    let imageUrl = "";
    let audioUrl = "";

    // Référence du produit à mettre à jour
    const productRef = doc(db, "products", productId);

    // Téléverser la nouvelle image si elle est fournie
    if (newImage) {
      const imageRef = ref(storage, `images/${newName}`);
      await uploadString(imageRef, newImage, "data_url");
      imageUrl = await getDownloadURL(imageRef);
    }

    // Téléverser le nouvel audio si il est fourni
    if (newAudio) {
      const audioRef = ref(storage, `audio/${newName}`);
      await uploadString(audioRef, newAudio, "data_url");
      audioUrl = await getDownloadURL(audioRef);
    }

    // Mettre à jour le produit dans la collection des produits
    await updateDoc(productRef, {
      name: newName,
      description: newDescription,
      price: newPrice,
      quantity: newQuantity,
      image: imageUrl,
      id_category: newId_category,
      audio: audioUrl,
      created: newCreated,
    });

    console.log("Document successfully updated!");
    return true;
  } catch (e) {
    console.error("Error updating document: ", e);
    return false;
  }
}

// Fonction pour supprimer un produit
export async function deleteProduct(productId) {
  const productRef = doc(db, "products", productId);
  try {
    await deleteDoc(productRef);
    console.log("Document successfully deleted!");
    return true;
  } catch (e) {
    console.error("Error removing document: ", e);
    return false;
  }
}

// Fonction pour obtenir une liste de produits en fonction d'une catégorie
export async function getProductsByCategory(categoryId) {
  const productsRef = collection(db, "products");
  const querySnapshot = await getDocs(query(productsRef, where("id", "==", categoryId)));
  let products = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });
  return products;
}[]

// Fonction pour obtenir la catégorie d'un produit
export async function getCategoriesByProduct(productId) {
  const productsRef = collection(db, "products");
  const querySnapshot = await getDocs(query(productsRef, where("id", "==", productId)));
  let categories = [];
  querySnapshot.forEach((doc) => {
    categories.push(doc.data().category);
  });
  return categories;
}
