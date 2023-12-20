import React from "react";

function Ingredient({ ingredient, onRemoveIngredient }) {
    return (
        <div className="ingredient">
            <button
                onClick={onRemoveIngredient}
            >
                ✖
            </button>
            <p>{ingredient.name}</p>
            <p>{ingredient.amount}</p>
        </div>
    )
}

export default Ingredient;