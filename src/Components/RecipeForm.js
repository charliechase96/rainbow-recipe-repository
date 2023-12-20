import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { firestore } from './firebase'

function RecipeForm() {
    const [recipeName, setRecipeName] = useState('');
    const [servings, setServings] = useState(0);
    const [recipes, setRecipes] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const snapshot = await firestore.collection('recipes').get();
                const recipesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setRecipes(recipesList);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            }
        };

        fetchRecipes();
    }, []);


    function handleDeleteRecipe(recipeId) {
        firestore.collection('recipes').doc(recipeId).delete()
        .then(() => {
            setRecipes(recipes.filter(recipe => recipe.id !== recipeId));
        })
        .catch(error => {
            console.error("Error deleting recipe:", error);
        });
    };

    function openIngredientsList(recipeId) {
        navigate('/ingredients-list', { state: { recipeId, recipes } });
    };

    function handleRecipePost(e) {
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

        firestore.collection('recipes').add(newRecipe)
            .then(docRef => {
                setRecipes([...recipes, { ...newRecipe, id: docRef.id}])
                .catch(error => {
                    console.error("Error adding recipe:", error);
                })
            });
    
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
                name: { stringValue: recipeName },
                servings: { integerValue: servings.toString() },
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
            <h2>Click a recipe to see the ingredients list!</h2>
            <br/>
            <ul>
                {recipes.map((recipe, index) => (
                <li 
                        key={index}
                    >
                    Name: {recipe.fields.name.stringValue}  Servings: {recipe.fields.servings.integerValue}
                    <button 
                        onClick={() => openIngredientsList(recipe.id)}
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