import React from "react";
import { auth } from "../firebase";

function RecipesHome() {
    return (
        <div>
            <h1>Welcome to Your Cookbook!</h1>
            <h2>Click a recipe to see the ingredients list!</h2>
        </div>
    )
}

export default RecipesHome;