import React, { useState } from 'react';

function IngredientList() {
  // State for the list of ingredients and the current input
  const [ingredients, setIngredients] = useState([]);
  const [input, setInput] = useState('');

  // Handler for input changes
  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  // Handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (input.trim().toLowerCase()) {
      setIngredients([...ingredients, input]);
      setInput('');
    }
  };

  // Handler for removing an ingredient
  const handleRemove = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient} 
            <button onClick={() => handleRemove(index)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IngredientList;