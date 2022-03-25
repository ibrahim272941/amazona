import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useContext } from 'react';
import { cartAddStart, cartAddSucces, fetchProduct } from '../redux/actions';
import {
  Badge,
  Button,
  Card,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap';
import Rating from '../component/Rating';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';

const ProductScreen = () => {
  const params = useParams();
  const { slug } = params;
  const { fetchproduct } = useSelector((state) => state);
  const { cart } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProduct(slug));
  }, [slug, dispatch]);
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find(
      (item) => item._id === fetchproduct._id
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${fetchproduct._id}`);
    console.log(data);
    if (data.countInStock < quantity) {
      window.alert('This Product is out of stock');
      return;
    }
    dispatch(cartAddStart({ ...fetchproduct, quantity }));
  };
  return (
    <div>
      <Row>
        <Col md={6}>
          <img
            style={{ maxWidth: '100%' }}
            src={fetchproduct.image}
            alt={fetchproduct.name}
          />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <Helmet>
                <title>{fetchproduct.name}</title>
              </Helmet>
              <h1>{fetchproduct.name}</h1>
            </ListGroupItem>
            <ListGroupItem>
              <Rating
                rating={fetchproduct.rating}
                numReviews={fetchproduct.numReviews}
              />
            </ListGroupItem>
            <ListGroupItem>Price : {fetchproduct.price}€</ListGroupItem>
            <ListGroupItem>
              Description : {fetchproduct.description}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>{fetchproduct.price}€</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {fetchproduct.countInStock > 0 ? (
                        <Badge bg="success">In Stock</Badge>
                      ) : (
                        <Badge bg="danger">Out Stock</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {fetchproduct.countInStock > 0 && (
                  <ListGroupItem>
                    <div className="d-grid">
                      <Button
                        style={{
                          backgroundColor: '#E09E10',
                          border: '#0000',
                        }}
                        variant="primary"
                        onClick={addToCartHandler}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </ListGroupItem>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductScreen;
