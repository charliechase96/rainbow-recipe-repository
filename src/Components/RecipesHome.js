import React from "react";
import LogoutButton from "./LogoutButton";
import RecipeForm from "./RecipeForm";

function RecipesHome() {

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