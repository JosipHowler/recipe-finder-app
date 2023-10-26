import React from 'react'
import { ListGroup, Button } from 'react-bootstrap'
import {v4 as uuidV4} from "uuid";

export default function Ingredients({ingredients, setIngredients}) {

    const handleDelete = (key) => {
        setIngredients(prevIngredients => prevIngredients.filter(ingredient => ingredient.id !== key))
    }

  return (
    <ListGroup>
        {ingredients.map(ingredient => {
            return (<div key={ingredient.id} className='d-flex align-items-center mb-2'>
                <ListGroup.Item key={ingredient.id} className='py-2' style={{ width: '210px' }}>{ingredient.name}</ListGroup.Item>
                <Button key={uuidV4()} onClick={() => handleDelete(ingredient.id)} className='ms-1 fw-bold' variant='danger'>X</Button>
            </div>);
        })}
    </ListGroup>
  );
}
