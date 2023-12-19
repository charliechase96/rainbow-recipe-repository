import React from "react";
import LogoutButton from "./LogoutButton";

function RecipesHome() {
    return (
        <div>
            <LogoutButton />
            <h1>Welcome to Your Cookbook!</h1>
            <h2>Click a recipe to see the ingredients list!</h2>
        </div>
    )
}

export default RecipesHome;