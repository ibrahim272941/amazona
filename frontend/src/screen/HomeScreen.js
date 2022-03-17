import React, { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
// import data from '../data';
import axios from 'axios';
import reducer from '../reducer/reducer';
import * as types from '../reducer/actionTypes';
import logger from 'use-reducer-logger';

const HomeScreen = () => {
  const [products, dispatch] = useReducer(logger(reducer));
  console.log(products);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: types.FETCH_REQUEST });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: types.FETCH_SUCCES, payload: result });
      } catch (err) {
        dispatch({ type: types.FETCH_FAIL, payload: err.message });
      }
      // setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Featured Products</h1>
      <div className="products">
        {products !== undefined && products.products.length !== 0 ? (
          products.products.data.map((item, i) => (
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
