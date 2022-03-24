import React from 'react';
import { Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CartScreen = () => {
  const {
    cart: { cartItems },
  } = useSelector((state) => state);
  console.log(cartItems);
  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <div>
              Cart is empty ,<Link to="/">Go to Homepage</Link>
            </div>
          ) : (
            <ListGroup>
              {cartItems.map((item) => {
                return (
                  <ListGroupItem key={item._id}>
                    <Row className="align-items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      />
                    </Row>
                    <Link to={`/product/${item.slug}`}>{item.name}</Link>
                  </ListGroupItem>
                );
              })}
            </ListGroup>
          )}
        </Col>
        <Col md={4}></Col>
      </Row>
    </div>
  );
};

export default CartScreen;
