import { firestore } from './firebase';
// import { collection, getDocs, addDoc, doc, deleteDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth();
const user = auth.currentUser;

// Fetch all recipes
// export async function fetchRecipes(user) {
//     try {
//         const snapshot = await getDocs(collection(firestore, `userProfiles/${user.uid}/recipes`));
//         return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     } catch (error) {
//         console.error("Error fetching recipes:", error);
//         throw error;
//     }
// }

// Add a new recipe
// export async function addRecipe(user, recipe) {
//     try {
//         const docRef = await addDoc(collection(firestore, `userProfiles/${user.uid}/recipes`), recipe);
//         return { id: docRef.id, ...recipe };
//     } catch (error) {
//         console.error("Error adding recipe:", error);
//         throw error;
//     }
// }

// Delete a recipe by ID
// export async function deleteRecipe(user, recipeId) {
//     try {
//         await deleteDoc(doc(firestore, `userProfiles/${user.uid}/recipes/`, recipeId));
//     } catch (error) {
//         console.error("Error deleting recipe:", error);
//         throw error;
//     }
// }