import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RecipeForm() {
    const [recipeName, setRecipeName] = useState('');
    const [servings, setServings] = useState(0);
    const [recipes, setRecipes] = useState([]);

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        const newRecipe = { name: recipeName, servings: servings };
        setRecipes([...recipes, newRecipe]);
        setRecipeName('');
        setServings();
    };

    function handleDeleteRecipe(recipeIndex) {
        setRecipes(recipes.filter((index) => index !== recipeIndex));
    };

    function openIngredientsList() {
        navigate('/ingredients-list')
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
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