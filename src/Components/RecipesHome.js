import React from "react";
import LogoutButton from "./LogoutButton";
import RecipeForm from "./RecipeForm";

function RecipesHome() {

    return (
        <>
                <LogoutButton />
            <div className="recipes-home">
            
                <h1>Welcome to Your Personal Recipe App!</h1>
                <h3>Enter recipe name and servings to get started!</h3>
                <br/>
                <RecipeForm />
            </div>
        </>
    )
}

export default RecipesHome;