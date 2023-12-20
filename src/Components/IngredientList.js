import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import RecipesHome from './RecipesHome';
import { getAuth } from 'firebase/auth';
import Ingredient from './Ingredient';

function IngredientList() {
    const location = useLocation();
    const { recipeId } = location.state;

    const [ingredients, setIngredients] = useState([]);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');

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

    const url = `https://firestore.googleapis.com/v1/projects/recipe-app-charliechase96/databases/(default)/documents/recipes/${recipeId}`;

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const auth = getAuth();
                const user = auth.currentUser;
                if (!user) {
                    throw new Error("No user logged in");
                }
                const idToken = await user.getIdToken();

                const url = `https://firestore.googleapis.com/v1/projects/recipe-app-charliechase96/databases/(default)/documents/recipes/${recipeId}`;

                const response = await fetch(url, {
                    headers: { 
                        'Authorization': `Bearer ${idToken}`
                    }
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();
                console.log(data.fields.ingredients.arrayValue);
                const fetchedIngredients = data.fields.ingredients.arrayValue.values.map(item => {
                    return {
                        name: item.fields.name.stringValue,
                        amount: item.fields.amount.stringValue
                    };
                });

                setIngredients(fetchedIngredients);
            } catch (error) {
                console.error('Error fetching ingredients:', error);
            }
        };

        fetchIngredients();
    }, [recipeId]);

    function patchIngredients(event) {
        event.preventDefault();
    
        const newIngredient = { name, amount };
        if (newIngredient.name.trim()) {
            const updatedIngredients = [...ingredients, newIngredient];
            const formattedData = formatIngredientsData(updatedIngredients);
    
            const auth = getAuth();
            const user = auth.currentUser;
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
                setName("");
                setAmount("");
            })
            .catch(error => {
                console.error('Error updating ingredients:', error);
            });
        }
    }
    

    function handleRemoveIngredient(index) {
        const updatedIngredients = ingredients.filter((_, i) => i !== index);
        const formattedData = formatIngredientsData(updatedIngredients);
    
        const auth = getAuth();
        const user = auth.currentUser;
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
            return response.json(); // Or handle the response as needed
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
        <Link to="/home" element={<RecipesHome />}>Back to Recipe List!</Link>  
        <form onSubmit={patchIngredients}>
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