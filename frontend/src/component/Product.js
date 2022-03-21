import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <div>
      <Card key={product.slug}>
        <Link to={`/product/${product.slug}`}>
          <img src={product.image} alt="" className="card-img-top" />
        </Link>
        <Card.Body>
          <Link to={`/product/${product.slug}`}>
            <Card.Title>{product.name}</Card.Title>
          </Link>
          <Rating rating={product.rating} numReviews={product.numReviews} />
          <Card.Text>{product.price}€</Card.Text>
          <Button className="btn-warning">Add Chart</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Product;
