import { Button, InputGroup, Form } from "react-bootstrap";
import Ingredients from "./components/Ingredients";
import Recipes from "./components/Recipes";
import { useState } from "react";
import {v4 as uuidV4} from "uuid";
import axios from "axios";

function App() {
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState(null);

  const apiKey = "Follow Spoonacular docs to get the api key";
  console.log(apiKey);

  const handleIngredientClick = () => {
    setIngredients(prevIngredient => {
      return [...prevIngredient, {name: ingredient, id: uuidV4()}]
    });
    setIngredient("");
  };

  const handleChange = e => {
    setIngredient(e.target.value);
  };

  const handleSearch = async() => {
    setRecipes(null);
    let ingredientsForRecipes = [];
    ingredients.forEach(ingredient => ingredientsForRecipes.push(ingredient.name));
    try{
      const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredientsForRecipes.join(",+")}&number=16&ranking=1`);
      await setRecipes(response.data);
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center">
      <h1 className="text-center my-5 fw-bold">What is in my fridge?</h1>
      <Ingredients ingredients={ingredients} setIngredients={setIngredients} />
      <div className="my-3">
        <InputGroup>
        <Form.Control
          placeholder="New ingredient"
          aria-label="Ingredient"
          value={ingredient}
          onChange={handleChange}
        />
        <Button onClick={handleIngredientClick} variant="dark" className="fw-bold">+</Button>
        </InputGroup>
      </div>
      <Button variant="primary" onClick={handleSearch}>Search</Button>
      {recipes  && <Recipes recipes={recipes} />}
    </div>
  );
}

export default App;
