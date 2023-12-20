// import { firestore } from './firebase';
// import { collection, getDocs, addDoc, doc, deleteDoc } from "firebase/firestore";

// Fetch all recipes
// export async function fetchRecipes() {
//     try {
//         const snapshot = await getDocs(collection(firestore, 'recipes'));
//         return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     } catch (error) {
//         console.error("Error fetching recipes:", error);
//         throw error;
//     }
// }

// Add a new recipe
// export async function addRecipe(recipe) {
//     try {
//         const docRef = await addDoc(collection(firestore, 'recipes'), recipe);
//         return { id: docRef.id, ...recipe };
//     } catch (error) {
//         console.error("Error adding recipe:", error);
//         throw error;
//     }
// }

// Delete a recipe by ID
// export async function deleteRecipe(recipeId) {
//     try {
//         await deleteDoc(doc(firestore, 'recipes', recipeId));
//     } catch (error) {
//         console.error("Error deleting recipe:", error);
//         throw error;
//     }
// }