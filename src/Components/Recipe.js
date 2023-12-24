import React, { useState } from "react";
import IngredientList from "./IngredientList";

function Recipe({ recipe, onRecipeDelete, recipeId }) {
    const [showIngredientList, setShowIngredientList] = useState(false);

    function toggleIngredientList() {
        setShowIngredientList(!showIngredientList);
    }
    return (
        <div className="recipe">
            <button
                onClick={() => onRecipeDelete(recipeId)}
            >
                ✖
            </button>
            <p>{recipe.name}</p>
            <p>{recipe.servings} {(recipe.servings > 1) ? "servings" : "serving"} </p>
            <button 
                onClick={toggleIngredientList}
            >
                { showIngredientList ? "Hide Ingredients" : "Show Ingredients"}
            </button>
            {showIngredientList && <IngredientList recipeId={recipeId}/>}
        </div>
    )
}

export default Recipe;