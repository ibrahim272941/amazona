import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchProduct } from '../redux/actions';
import { Col, Row } from 'react-bootstrap';

const ProductScreen = () => {
  const params = useParams();
  const { slug } = params;
  const { fetchproduct } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProduct(slug));
  }, [slug, dispatch]);

  return (
    <div>
      {typeof fetchProduct !== String ? (
        <Row>
          <Col md={6}>
            <img
              style={{ maxWidth: '100%' }}
              src={fetchproduct.image}
              alt={fetchproduct.name}
            />
          </Col>
          <Col md={3}>{}</Col>
          <Col md={3}></Col>
        </Row>
      ) : (
        <h3>Please Wait</h3>
      )}
    </div>
  );
};

export default ProductScreen;
