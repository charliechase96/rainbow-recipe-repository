import React, { useState } from "react";
import LogoutButton from "./LogoutButton";
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import RecipeForm from "./RecipeForm";

function RecipesHome() {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false);

    function handleRecipeSelect(recipe) {
        setSelectedRecipe(recipe);
    };

    function handleRemoveIngredient(recipeId, ingredientId) {

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
    
    function handleCreateNewRecipe(newRecipe) {
        const url = `https://firestore.googleapis.com/v1/projects/recipe-app-charliechase96/databases/(default)/documents/recipes`;

        getIdToken().then(idToken => {
            fetch(url, {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${idToken}`,
                    'Content-Type': 'application/json'},
                body: JSON.stringify({

                })
            })
        })
    };

    return (
        <>
                <LogoutButton />
            <div>
            
                <h1>Welcome to Your Personal Recipe App!</h1>
                <h2>Enter recipe name and servings to get started!</h2>
                <br/>
                <RecipeForm />
            </div>
        </>
    )
}

export default RecipesHome;