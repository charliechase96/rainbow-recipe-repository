import React, { useState, useId } from "react";
import { useNavigate } from "react-router-dom";
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

function RecipeForm() {
    const [recipeName, setRecipeName] = useState('');
    const [servings, setServings] = useState(0);
    const [recipes, setRecipes] = useState([]);

    const navigate = useNavigate();
    const id = useId();


    function handleDeleteRecipe(recipeIndex) {
        setRecipes(recipes.filter((index) => index !== recipeIndex));
    };

    function openIngredientsList() {
        navigate('/ingredients-list')
    };

    function getIdToken() {
        return new Promise((resolve, reject) => {
          getAuth().onAuthStateChanged(user => {
            if (user) {
              user.getIdToken().then(idToken => {
                resolve(idToken);
              });
            } else {
              reject('No user logged in');
            }
          });
        });
      }
    
    // function postNewRecipe(newRecipe) {
    //     const url = `https://firestore.googleapis.com/v1/projects/recipe-app-charliechase96/databases/(default)/documents/recipes`;

    //     getIdToken().then(idToken => {
    //         fetch(url, {
    //             method: 'POST',
    //             headers: { 
    //                 'Authorization': `Bearer ${idToken}`,
    //                 'Content-Type': 'application/json'},
    //             body: JSON.stringify({
    //                 name: recipeName,
    //                 servings: servings,
    //                 ingredients: {}
    //             })
    //         .then(response => response.json())
    //         .then(data => console.log('Recipe created:', data))
    //         .catch(error => console.error('Error creating recipe:', error))
    //         })
    //     })
    // };

    function handleRecipePost(e) {
        e.preventDefault();
    
        // Prepare new recipe data
        const newRecipe = { name: recipeName, servings: servings };
    
        // URL for Firestore
        const url = `https://firestore.googleapis.com/v1/projects/recipe-app-charliechase96/databases/(default)/documents/recipes`;
    
        // Get ID token
        getAuth().onAuthStateChanged(user => {
            if (user) {
                user.getIdToken().then(idToken => {
                    // Make the POST request with ID token
                    fetch(url, {
                        method: 'POST',
                        headers: { 
                            'Authorization': `Bearer ${idToken}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ recipe: formatRecipeData(newRecipe) })
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Recipe created:', data);
                        setRecipes([...recipes, newRecipe]); // Update state with new recipe
                        setRecipeName(''); // Reset recipe name
                        setServings(0); // Reset servings
                    })
                    .catch(error => console.error('Error creating recipe:', error));
                });
            } else {
                console.error('No user logged in');
            }
        });
    }

    function formatRecipeData(recipe) {
        recipe = {  id: id,
                    name: recipeName,
                    servings: servings,
                    ingredients: {}
        }
    }

    return (
        <div>
            <form onSubmit={handleRecipePost}>
                <label>Recipe Name</label>
                <input 
                    type="text" 
                    value={recipeName} 
                    onChange={(e) => setRecipeName(e.target.value)} placeholder="Recipe Name" 
                />
                <label>Servings</label>
                <input 
                    type="number" 
                    value={servings} 
                    onChange={(e) => setServings(e.target.value)} placeholder="Servings" 
                />
                <button type="submit">Create Recipe</button>
            </form>
            <br/>
            <h2>Click a recipe to see the ingredients list!</h2>
            <br/>
            <ul>
                {recipes.map((recipe, index) => (
                <li 
                        key={index}
                    >
                    Name: {recipe.name}  Servings: {recipe.servings}
                    <button 
                        onClick={openIngredientsList}
                    >
                        Ingredients
                    </button>
                    <button 
                        onClick={() => handleDeleteRecipe(index)}
                    >
                        ✖
                    </button>
                </li>
                ))}
            </ul>
        </div>
    )
}

export default RecipeForm;