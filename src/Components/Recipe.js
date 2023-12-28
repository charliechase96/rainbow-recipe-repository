import React from "react";
import { useNavigate } from "react-router-dom";

function Recipe({ recipe, onRecipeDelete, recipeId }) {
    // const [showIngredientList, setShowIngredientList] = useState(false);

    const navigate = useNavigate();

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
                onClick={() => navigate(`/ingredients-list/${recipe.id}`)}
            >
                Show Ingredients
            </button>
            {/* {showIngredientList && <IngredientList recipeId={recipeId}/>} */}
        </div>
    )
}

export default Recipe;