import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";

export const fetchCategories = async () => {
  try {
    const categoriesArray = [];
    const querySnapshot = await getDocs(collection(db, "categories"));
    querySnapshot.forEach((doc) => {
      categoriesArray.push({
        id: doc.id,
        name: doc.data().name,
      });
    });
    return categoriesArray;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
