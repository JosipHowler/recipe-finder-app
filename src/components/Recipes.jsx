import React from 'react'
import { Card, Button } from "react-bootstrap";
import axios from "axios";

export default function Recipes({recipes}) {

  const apiKey = "Follow Spoonacular docs to get the api key";

  const handleClick = async(id) => {
    try {
      const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/card?apiKey=${apiKey}`);
      if (response.data.url) {
        window.open(response.data.url, '_blank');
      } else {
        console.log('No URL found in the API response.');
      }
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div className='d-flex align-items-center gap-3 justify-content-center flex-wrap mt-5'>{recipes.map(recipe => {
      return (
        <Card key={recipe.id} style={{ width: '25rem', height: "30rem"}}>
          <Card.Img variant="top" src={recipe.image} style={{ height: '50%' }}/>
          <Card.Body>
            <Card.Title>{recipe.title}</Card.Title>
            <Card.Text>Used ingredients: {recipe.usedIngredientCount}, Missing ingredients: {recipe.missedIngredientCount}</Card.Text>
            <Button variant="primary" onClick={() => handleClick(recipe.id)}>Visit</Button>
          </Card.Body>
        </Card>
      );
    })}</div>
  )
}
