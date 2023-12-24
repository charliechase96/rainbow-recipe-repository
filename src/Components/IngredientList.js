import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RecipesHome from './RecipesHome';
import { getAuth } from 'firebase/auth';
import Ingredient from './Ingredient';
import { db } from '../firebase';
import { collection, getDocs, updateDoc, arrayUnion, doc } from 'firebase/firestore';

function IngredientList({ recipeId }) {

    const [ingredients, setIngredients] = useState([]);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');

    const auth = getAuth();
    const user = auth.currentUser;

    function formatIngredientsData(ingredients) {
        return {
            fields: {
                ingredients: {
                    arrayValue: {
                        values: ingredients.map(ingredient => {
                            return {
                                mapValue: {
                                    fields: {
                                        name: { stringValue: ingredient.name },
                                        amount: { stringValue: ingredient.amount }
                                        }
                                    }
                                };
                            })
                        }
                    }
                }
            };
        }

    function handleIngredientName(event) {
        setName(event.target.value);
    };

    function handleAmountChange(event) {
        setAmount(event.target.value);
    };

    async function getIngredients() {
        try {
            const fetchedIngredients = fetchIngredients();
            setIngredients(fetchedIngredients);
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    }

    function fetchIngredients() {
        const ingredientsCollectionRef = collection(db, `userProfiles/${auth.currentUser.uid}/recipes/${recipeId}/ingredients`);

        getDocs(ingredientsCollectionRef)
            .then(snapshot => {
                snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
            })
            .catch(error => {
                console.error("Error fetching ingredients:", error);
            })
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
        })
        .catch((error) => {
            console.error("Error adding ingredient:", error);
        });
    }
    
    

    function handleRemoveIngredient(index) {
        const url = `https://firestore.googleapis.com/v1/projects/recipe-app-charliechase96/databases/(default)/documents/useProfiles/${auth.currentUser.uid}/recipes/${recipeId}`;

        const updatedIngredients = ingredients.filter((_, i) => i !== index);
        const formattedData = formatIngredientsData(updatedIngredients);
    
        
        if (!user) {
            console.error("No user logged in");
            return;
        }
    
        user.getIdToken().then(idToken => {
            return fetch(url, {
                method: 'PATCH',
                headers: { 
                    'Authorization': `Bearer ${idToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formattedData)
            });
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(() => {
            setIngredients(updatedIngredients);
        })
        .catch(error => {
            console.error('Error deleting ingredient:', error);
        });
    }

    
    
    return (
    
    <div>
        {/* <Link to="/home" element={<RecipesHome />}>Back to Recipe List!</Link>   */}
        <form onSubmit={addIngredient}>
            <button onClick={getIngredients}>Fetch ingredients</button>
            <label>Ingredient</label>
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
                type="submit"
                disabled={!name || !amount}
            >
                Add
            </button>
            </form>
            <ul>
            {ingredients.map((ingredient, index) => (
                <li >
                    <Ingredient 
                        key={index} 
                        ingredient={ingredient}
                        onRemoveIngredient={handleRemoveIngredient}
                    />
                </li>
            ))}
        </ul>
        </div>
        );
    }

export default IngredientList;