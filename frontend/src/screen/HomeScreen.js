import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { fetchStart } from '../redux/actions';

const HomeScreen = () => {
  const { products } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStart());
  }, [dispatch]);

  return (
    <div>
      <h1>Featured Products</h1>
      <div className="products">
        {products !== undefined && products.length !== 0 ? (
          products.map((item, i) => (
            <div className="product" key={item.slug}>
              <Link to={`/product/${item.slug}`}>
                <img src={item.image} alt="" />
              </Link>
              <div className="product-info">
                <p>{item.name}</p>
                <Link to={`/product/${item.slug}`}>
                  <p>
                    {' '}
                    <strong>{item.price}€</strong>
                  </p>
                </Link>
                <button>Add Chart</button>
              </div>
            </div>
          ))
        ) : (
          <p>Please Wait</p>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
