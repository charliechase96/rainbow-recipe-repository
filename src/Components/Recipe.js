import React from "react";

function Recipe({ recipe, onRecipeDelete, onOpenIngredientsList }) {
    return (
        <div className="recipe">
            <button
                onClick={onRecipeDelete}
            >
                ✖
            </button>
            <p>{recipe.name}</p>
            <p>{recipe.servings}</p>
            <button 
                onClick={onOpenIngredientsList}
            >
                Ingredients
            </button>
        </div>
    )
}

export default Recipe;