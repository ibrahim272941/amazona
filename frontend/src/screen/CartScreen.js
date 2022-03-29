import axios from 'axios';
import { useEffect } from 'react';
import {
  Col,
  ListGroup,
  ListGroupItem,
  Row,
  Button,
  Card,
} from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { cartAddStart, cartRemoveStart } from '../redux/actions';
import { useNavigate } from 'react-router-dom';

const CartScreen = () => {
  const {
    cart: { cartItems },
  } = useSelector((state) => state);
  const navigate = useNavigate();
  useEffect(() => {}, []);
  const dispatch = useDispatch();
  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('This Product is out of stock');
      return;
    } else if (quantity < 0) {
      window.alert('Quantity cannot be 0');
      return;
    }
    dispatch(cartAddStart({ ...item, quantity }));
    console.log(data);
  };
  const removeItemHanlder = (item) => {
    dispatch(cartRemoveStart(item));
  };
  const checkOutHandler = () => {
    navigate('/signin?redirect=/shipping');
  };
  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <div className="bg-warning d-flex justify-content-center h-50 text-center pt-4">
              <p className="px-3">Cart is empty</p>
              <Link to="/">Go to Homepage</Link>
            </div>
          ) : (
            <ListGroup>
              {cartItems.map((item) => {
                return (
                  <ListGroupItem key={item._id}>
                    <Row className="align-items-center">
                      <Col md={4}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        />
                        <Link
                          style={{ textDecoration: 'none', marginLeft: '10px' }}
                          to={`/product/${item.slug}`}
                        >
                          {item.name}
                        </Link>
                      </Col>
                      <Col md={3}>
                        <Button
                          variant="light"
                          disable={item.quantity === 0 ? true : false}
                          onClick={() => {
                            updateCartHandler(item, item.quantity - 1);
                          }}
                        >
                          <i className="fa fa-minus-circle"></i>
                        </Button>

                        <span>{item.quantity}</span>
                        <Button
                          variant="light"
                          // disable={item.quantity === item.countInStock}
                          onClick={() => {
                            updateCartHandler(item, item.quantity + 1);
                          }}
                        >
                          <i className="fa fa-plus-circle"></i>
                        </Button>
                      </Col>
                      <Col md={3}>
                        <strong>${item.price}</strong>
                      </Col>
                      <Col md={2}>
                        <Button
                          variant="light"
                          onClick={() => removeItemHanlder(item)}
                        >
                          <i className="fa fa-trash-alt" />
                        </Button>
                      </Col>
                    </Row>
                  </ListGroupItem>
                );
              })}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    items):€
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      style={{
                        backgroundColor: '#E09E10',
                        border: '#0000',
                      }}
                      variant="primary"
                      type="button"
                      disable={cartItems.length === 0 ? true : false}
                      onClick={checkOutHandler}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CartScreen;
