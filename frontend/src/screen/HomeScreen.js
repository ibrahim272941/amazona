import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { fetchStart } from '../redux/actions';
import { Col, Row } from 'react-bootstrap';
import Product from '../component/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../component/LoadingBox';

const HomeScreen = () => {
  const { products } = useSelector((state) => state);
  const dispatch = useDispatch();

  console.log(products.data);
  useEffect(() => {
    dispatch(fetchStart());
  }, [dispatch]);

  return (
    <div>
      <Helmet>
        <title>Amazon Clone Website</title>
      </Helmet>
      <h1>Featured Products</h1>
      <div className="products">
        <Row>
          {products.data.length !== 0 ? (
            products.data.map((item, i) => (
              <Col key={i} sm={6} md={4} lg={3} className="mb-3">
                <Product product={item} />
              </Col>
            ))
          ) : (
            <LoadingBox />
          )}
        </Row>
      </div>
    </div>
  );
};

export default HomeScreen;
