import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import RecipesHome from './RecipesHome';
import { getAuth } from 'firebase/auth';
import Ingredient from './Ingredient';
import Footer from './Footer';
import { db } from '../firebase';
import { getDoc, updateDoc, arrayUnion, doc, arrayRemove } from 'firebase/firestore';

function IngredientList() {

    const [ingredients, setIngredients] = useState([]);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');

    const params = useParams();
    const recipeId = params.recipeId;

    console.log(recipeId)

    const auth = getAuth();
    const user = auth.currentUser;

    // function formatIngredientsData(ingredients) {
    //     return {
    //         fields: {
    //             ingredients: {
    //                 arrayValue: {
    //                     values: ingredients.map(ingredient => {
    //                         return {
    //                             mapValue: {
    //                                 fields: {
    //                                     name: { stringValue: ingredient.name },
    //                                     amount: { stringValue: ingredient.amount }
    //                                     }
    //                                 }
    //                             };
    //                         })
    //                     }
    //                 }
    //             }
    //         };
    //     }

    function handleIngredientName(event) {
        setName(event.target.value);
    };

    function handleAmountChange(event) {
        let value = (event.target.value);

        if (value < 0) {
            value = 0;
        }

        const filteredValue = value.replace(/[-!@#$%^&*()]/g, '');
        setAmount(filteredValue);
    };

    async function fetchIngredients(event) {
    event.preventDefault();
    console.log("Fetching ingredients for recipeId:", recipeId); // Debugging

    if (!recipeId) {
        console.log("No recipeId provided!");
        return; // Exit if no recipeId
    }

    const recipeDocRef = doc(db, `userProfiles/${auth.currentUser.uid}/recipes/${recipeId}`);
    console.log("Constructed path:", recipeDocRef.path); // Check the constructed path

    try {
        const docSnap = await getDoc(recipeDocRef);

        if (docSnap.exists() && docSnap.data().ingredients) {
            const ingredientsArray = docSnap.data().ingredients;
            console.log("Fetched ingredients:", ingredientsArray); // Check fetched data
            setIngredients(ingredientsArray);
        } else {
            console.log("No such document or ingredients found at:", recipeDocRef.path);
            setIngredients([]);
        }
    } catch (error) {
        console.error("Error fetching ingredients:", error);
    }
}
    
    function addIngredient(event) {
        event.preventDefault();
        // Reference to the specific recipe document
        const recipeDocRef = doc(db, `userProfiles/${auth.currentUser.uid}/recipes/${recipeId}`);
    
        // New ingredient data
        const newIngredient = { name, amount };
    
        // Update the document
        updateDoc(recipeDocRef, {
            ingredients: arrayUnion(newIngredient)
        })
        .then(() => {
            // Handle successful addition, maybe update local state or UI
            setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
            setName("");
            setAmount("");
        })
        .catch((error) => {
            console.error("Error adding ingredient:", error);
        });
    }
    
    

    async function deleteIngredient(recipeId, ingredientToRemove) {
        // Reference to the specific recipe document
        const recipeRef = doc(db, `userProfiles/${auth.currentUser.uid}/recipes/${recipeId}`);
        
        try {
            // Directly remove the ingredient from the array in Firebase
            await updateDoc(recipeRef, {
                ingredients: arrayRemove(ingredientToRemove)
            });
    
            // Fetch the updated ingredients to reflect the change in local state
            const updatedSnap = await getDoc(recipeRef);
            if (updatedSnap.exists() && updatedSnap.data().ingredients) {
                setIngredients(updatedSnap.data().ingredients);
            } else {
                setIngredients([]);
            }
            console.log(`Ingredient removed from recipe: ${recipeId}`);
        } catch (error) {
            console.error("Error removing ingredient:", error);
        }
    }

    
    
    return (
    <>
    <div className='ingredients-list'>
        <Link to="/home" element={<RecipesHome />}>Back to Recipe List!</Link>  
        <br/>
        <form onSubmit={addIngredient}>
            <button onClick={fetchIngredients}>Fetch ingredients</button>
            <label>Add an Ingredient</label>
            <input
                type="text"
                placeholder='ingredient name'
                value={name}
                onChange={handleIngredientName}
                required
                />
            <input
                type="text"
                placeholder='amount'
                value={amount}
                onChange={handleAmountChange}
                required
            />
            <button
                className='add-button' 
                type="submit"
                disabled={!name || !amount}
            >
                Add ingredient
            </button>
            </form>
            <br/>
            <ul>
            {ingredients.map((ingredient, index) => (
                <li >
                    <Ingredient 
                        key={index} 
                        ingredient={ingredient}
                        recipeId={recipeId}
                        onRemoveIngredient={deleteIngredient}
                    />
                </li>
            ))}
        </ul>
        </div>
        <Footer />
        </>
        );
    }

export default IngredientList;