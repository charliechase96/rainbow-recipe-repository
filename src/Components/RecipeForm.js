import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import Recipe from "./Recipe";
import { addDoc, doc, deleteDoc, collection } from "firebase/firestore";

function RecipeForm() {

    // might need to add "const id = useId" and import at top
    const [recipeName, setRecipeName] = useState('');
    const [servings, setServings] = useState(0);
    const [recipes, setRecipes] = useState([]);

    const navigate = useNavigate();

    const url = "https://firestore.googleapis.com/v1/projects/recipe-app-charliechase96/databases/(default)/documents/recipes";

    
    function fetchRecipes() {
        fetch(url)
        .then(response => {
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            setRecipes(data);
        });
    }


      function deleteRecipe(userId, recipeId, setRecipes) {
        const recipeRef = doc(db, 'userProfiles', userId, 'recipes', recipeId);

        deleteDoc(recipeRef)
            .then(() => {
                console.log(`Recipe with ID ${recipeId} deleted successfully.`);
                setRecipes(recipes.filter(recipe => recipe.id !== recipeId));
            })
            .catch(error => {
                console.error("Error deleting recipe:", error);
            })
      }

    function openIngredientsList(recipeId) {
        navigate('/ingredients-list/:recipeId', { state: { recipeId, recipes } });
    };


    function postRecipe(event, userId, recipeData) {
        event.preventDefault();

        const formattedRecipeData = formatRecipeData(recipeData);

        const userRecipeRef = collection(db, 'userProfiles', userId, 'recipes');

        addDoc(userRecipeRef, formattedRecipeData)
            .then(docRef => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(error => {
                console.error("Error adding document: ", error);
            });
    }

    function formatRecipeData(recipeData) {
        return {
            name: String(recipeData.name),
            servings: String(recipeData.servings),
            ingredients: Array.isArray(recipeData.ingredients) ? recipeData.ingredients : []
        };
    }

    return (
        <div>
            <form onSubmit={postRecipe}>
                <label>Recipe Name</label>
                <input 
                    type="text" 
                    value={recipeName} 
                    onChange={(e) => setRecipeName(e.target.value)} placeholder="Recipe Name"
                    required
                />
                <label>Servings</label>
                <input 
                    type="number" 
                    value={servings} 
                    onChange={(e) => setServings(e.target.value)} placeholder="Servings"
                    required 
                />
                <button 
                disabled={!recipeName || !servings}
                type="submit"
                >
                    Create Recipe
                </button>
            </form>
            <br/>
            <button 
                onClick={fetchRecipes}
            >
                Click to see recipes!
            </button>
            <ul className="recipe-list">
                {recipes.map((recipe) => (
                <li>
                    <Recipe 
                        recipe={recipe} 
                        key={recipe.id}
                        onRecipeDelete={deleteRecipe}
                        onOpenIngredientsList={openIngredientsList}
                        />
                </li>
                ))}
            </ul>
        </div>
    )
}

export default RecipeForm;