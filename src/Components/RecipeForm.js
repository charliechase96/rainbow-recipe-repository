import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { fetchRecipes, addRecipe, deleteRecipe } from '../firestoreService';
import Recipe from "./Recipe";

function RecipeForm() {
    const [recipeName, setRecipeName] = useState('');
    const [servings, setServings] = useState(0);
    const [recipes, setRecipes] = useState([]);

    async function getRecipes() {
        try {
            const fetchedRecipes = await fetchRecipes();
            setRecipes(fetchedRecipes);
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    }

    async function handleRecipePost(event, recipe) {
        event.preventDefault();
        const auth = getAuth(); // initialize authentication
        const user = auth.currentUser; // get the current user
        
        if (user) { // Check if user is authenticated
            try {
                // Call addRecipe function to add a new recipe to Firestore
                const response = await addRecipe(recipe);
                console.log("Recipe added with ID:", response.id);
                
                // Update the state to include the new recipe
                setRecipes(prevRecipes => [...prevRecipes, response]);
                setServings(0);
                setRecipeName("");
    
                // Handle further operations after successful recipe addition
            } catch (error) {
                console.error("Failed to post recipe", error);
                // Handle errors, such as displaying a message to the user
            }
        } else {
            // Handle the case where the user is not authenticated
            console.log("User is not authenticated. Please log in to post recipes.");
        }
    }

    async function handleDeleteRecipe(recipeId) {
        try {
            // Delete the recipe from Firebase using the deleteRecipe function
            await deleteRecipe(recipeId);
            console.log(`Recipe with ID: ${recipeId} has been deleted`);
            setRecipes(currentRecipes => currentRecipes.filter(recipe => recipe.id !== recipeId));
        } catch (error) {
            // Handle any errors that occur during deletion
            console.error("Failed to delete recipe", error);
        }
    }

    function handleRecipeName(event) {
        setRecipeName(event.target.value);
    }

    function handleServingSize(event) {
        setServings(event.target.value);
    }

    return (
        <div className="recipe-form">
            <form onSubmit={(event) => handleRecipePost(event, { name: recipeName, servings })}>
                <label>Recipe Name</label>
                <input 
                    type="text" 
                    value={recipeName} 
                    onChange={handleRecipeName} 
                    placeholder="Recipe Name"
                    required
                />
                <label>Servings</label>
                <input 
                    type="number" 
                    value={servings} 
                    onChange={handleServingSize} 
                    placeholder="Servings"
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
            <button onClick={getRecipes}>Fetch recipes</button>
            <br/>
            <ul className="recipe-list">
                {recipes.map((recipe, index) => (
                <li>
                    <Recipe 
                        recipe={recipe} 
                        key={recipe.id}
                        recipeId={recipe.id}
                        onRecipeDelete={handleDeleteRecipe}
                    />
                </li>
                ))}
            </ul>
        </div>
    )
}

export default RecipeForm;