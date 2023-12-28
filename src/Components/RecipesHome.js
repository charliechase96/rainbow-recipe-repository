import React from "react";
import LogoutButton from "./LogoutButton";
import RecipeForm from "./RecipeForm";
import Footer from "./Footer";

function RecipesHome() {

    return (
        <>
                <LogoutButton />
            <div className="recipes-home">
            
                <h1>Welcome to Your Personal Rainbow Recipe Repository!</h1>
                <h3>Enter recipe name and servings to get started!</h3>
                <br/>
                <RecipeForm />
            </div>
                <Footer />
        </>
    )
}

export default RecipesHome;