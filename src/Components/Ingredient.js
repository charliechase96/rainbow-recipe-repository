import React from "react";

function Ingredient({ recipeId, ingredient, onRemoveIngredient }) {
    return (
        <div className="ingredient">
            <button
                onClick={() => onRemoveIngredient(recipeId, ingredient)}
            >
                ✖
            </button>
            <p>{ingredient.name}</p>
            <p>{ingredient.amount}</p>
        </div>
    )
}

export default Ingredient;