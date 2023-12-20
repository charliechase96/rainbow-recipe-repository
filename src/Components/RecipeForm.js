import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { fetchRecipes, addRecipe, deleteRecipe } from '../firestoreService';

function RecipeForm() {
    const [recipeName, setRecipeName] = useState('');
    const [servings, setServings] = useState(0);
    const [recipes, setRecipes] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        async function getRecipes() {
            try {
                const recipesList = await fetchRecipes();
                setRecipes(recipesList);
            } catch (error) {
            }
        };
        getRecipes();
    }, []);


    const handleDeleteRecipe = async (recipeId) => {
        try {
            await deleteRecipe(recipeId);
            setRecipes(recipes.filter(recipe => recipe.id !== recipeId));
        } catch (error) {
        }
    };

    function openIngredientsList(recipeId) {
        navigate('/ingredients-list', { state: { recipeId, recipes } });
    };

    const handleRecipePost = async (e) => {
        e.preventDefault();
    
        const newRecipe = {
            fields: {
                name: { stringValue: recipeName },
                servings: { integerValue: servings.toString() },
                ingredients: {
                    arrayValue: { values: [] }
                }
            }
        };

        try {
            const addedRecipe = await addRecipe(newRecipe);
            setRecipes([...recipes, addedRecipe]);
        }
            catch(error) {
                console.error("Error adding recipe:", error);
            }
    
        const url = `https://firestore.googleapis.com/v1/projects/recipe-app-charliechase96/databases/(default)/documents/recipes`;
    
        getAuth().onAuthStateChanged(user => {
            if (user) {
                user.getIdToken().then(idToken => {
                    fetch(url, {
                        method: 'POST',
                        headers: { 
                            'Authorization': `Bearer ${idToken}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formatRecipeData(newRecipe))
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Recipe created:', data);
                        setRecipes([...recipes, newRecipe]);
                        setRecipeName('');
                        setServings(0);
                    })
                    .catch(error => console.error('Error creating recipe:', error));
                });
            } else {
                console.error('No user logged in');
            }
        });
    }

    function formatRecipeData(recipe) {
        return {
            fields: {
                name: { stringValue: recipe.fields.name },
                servings: { integerValue: recipe.fields.servings.toString() },
                ingredients: {
                    arrayValue: { values: [] }
                }
            }
        };
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
            <h3>Click a recipe to see the ingredients list!</h3>
            <br/>
            <ul>
                {recipes.map((recipe, index) => (
                <li 
                        key={index}
                    >
                    Name: {recipe.name}  Servings: {recipe.servings}
                    <button 
                        onClick={() => openIngredientsList(recipe.id)}
                    >
                        Ingredients
                    </button>
                    <button 
                        onClick={() => handleDeleteRecipe(recipe.id)}
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