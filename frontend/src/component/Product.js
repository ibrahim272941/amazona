import axios from 'axios';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { cartAddStart } from '../redux/actions';
import Rating from './Rating';
import { useState } from 'react';

const Product = ({ product }) => {
  const [buttonDisable, setButtonDisable] = useState(false);
  const {
    cart: { cartItems },
  } = useSelector((state) => state);

  const dispatch = useDispatch();
  const addToCartHandler = async (item) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    const existItem = cartItems.find((item) => item._id === data._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (data.countInStock < quantity) {
      window.alert('This Product is out of stock');
      setButtonDisable(true);
      return;
    } else if (quantity < 0) {
      window.alert('Quantity cannot be 0');
      return;
    }
    dispatch(cartAddStart({ ...item, quantity }));

    console.log();
  };

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
          {buttonDisable ? (
            <Button variant="light" disabled>
              Out of Stock
            </Button>
          ) : (
            <Button
              onClick={() => addToCartHandler(product)}
              className="btn-warning"
            >
              Add Chart
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Product;
