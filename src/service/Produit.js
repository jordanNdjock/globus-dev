import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadString, getDownloadURL, deleteObject } from "firebase/storage";
import app from "../backend_config"; // Assurez-vous que le chemin vers votre fichier firebase.js est correct

const db = getFirestore(app);

// Fonction pour ajouter un nouveau produit avec téléversement d'images et d'audio
export async function addProduct(
  productName,
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

    const imageFileName = `${productName}_${Date.now()}.jpg`;

    if (image) {
      const imageRef = ref(storage, `images/${imageFileName}`);
      await uploadString(imageRef, image, "data_url");
      imageUrl = await getDownloadURL(imageRef);
    }

    const audioFileName = `${productName}_${Date.now()}.mp3`;

    if (audio) {
      const audioRef = ref(storage, `audios/${audioFileName}`);
      await uploadString(audioRef, audio, "data_url");
      audioUrl = await getDownloadURL(audioRef);
    }


    // Ajouter le produit à la collection des produits
    const docRef = await addDoc(productsRef, {
      productName: productName,
      description: description ? description : "",
      price: price,
      quantity: quantity,
      imageUrl: imageUrl,
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
  product
) {
  try {
    console.log(product.id);
    const storage = getStorage();
    let imageUrl = ""; // Nouvelle URL d'image
    let audioUrl = ""; // Nouvelle URL audio

    // Référence du produit à mettre à jour
    const productRef = doc(db, "products", product.id);

    // Récupérer les données actuelles du produit
    const productSnap = await getDoc(productRef);
    const productData = productSnap.data();

    // Vérifier si l'image doit être mise à jour
    if (product.imageUrl && product.imageUrl !== productData.imageUrl) {
      if (productData.imageUrl) {
        const oldImageRef = ref(storage, productData.imageUrl);
        await deleteObject(oldImageRef);
        console.log("Old image deleted successfully");
      }
      const audioFileName = `${product.productName}_${Date.now()}.jpg`;
      const imageRef = ref(storage, `images/${audioFileName}`);
      await uploadString(imageRef, product.imageUrl, "data_url");
      imageUrl = await getDownloadURL(imageRef);
    } else {
      imageUrl = productData.imageUrl; // Utiliser l'ancienne URL d'image
    }

    // Vérifier si l'audio doit être mis à jour
    if (product.audio && product.audio !== productData.audio) {
      if (productData.audio) {
        const oldAudioRef = ref(storage, productData.audio);
        await deleteObject(oldAudioRef);
        console.log("Old audio deleted successfully");
      }
      const imageFileName = `${product.productName}_${Date.now()}.mp3`;
      const audioRef = ref(storage, `audios/${imageFileName}`);
      await uploadString(audioRef, product.audio, "data_url");
      audioUrl = await getDownloadURL(audioRef);
    } else {
      audioUrl = productData.audio; // Utiliser l'ancienne URL audio
    }

    // Mettre à jour le produit dans la collection des produits
    await updateDoc(productRef, {
      productName: product.productName,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      imageUrl: imageUrl,
      id_category: product.id_category,
      audio: audioUrl,
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
  try {
    console.log(productId);
  
    // Vérifier si productId est défini
    if (!productId) {
      throw new Error("Product ID is not defined");
    }
  
    // Récupérer la référence du document produit depuis Firestore
    const productRef = doc(db, "products", productId);
  
    // Vérifier si le document existe
    const productSnap = await getDoc(productRef);
    if (productSnap.exists()) {
      const productData = productSnap.data();
  
      // Supprimer le document de Firestore
      await deleteDoc(productRef);
      console.log("Product document deleted successfully");
  
      // Vérifier si imageUrl est défini
      if (productData.imageUrl) {
        // Supprimer le fichier image correspondant de Firebase Storage
        const storage = getStorage();
        const imageRef = ref(storage, productData.imageUrl);
        await deleteObject(imageRef);
        console.log("Image file deleted successfully");
      }
  
      // Vérifier si audioUrl est défini
      if (productData.audio) {
        // Supprimer le fichier audio correspondant de Firebase Storage
        const storage = getStorage();
        const audioRef = ref(storage, productData.audio);
        await deleteObject(audioRef);
        console.log("Audio file deleted successfully");
      }
    } else {
      console.log("Product document not found");
    }
  } catch (error) {
    console.error("Error deleting product and files:", error);
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

export const fetchCategory = async (id_category) => {
  try {
    // Récupérer la référence du document catégorie depuis Firestore en utilisant l'ID de la catégorie
    const categoryRef = doc(db, "categories", id_category);
    // Récupérer les données de la catégorie à partir de la référence du document
    const categoryDoc = await getDoc(categoryRef);
    // Vérifier si la catégorie existe
    if (categoryDoc.exists()) {
      // Retourner le nom de la catégorie
      return categoryDoc.data().name;
    } else {
      console.log("No such category!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
};

