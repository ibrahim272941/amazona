import React, { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
// import data from '../data';
import axios from 'axios';
import reducer from '../redux/reducer';
import * as types from '../redux/actionTypes';
import logger from 'use-reducer-logger';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStart, fetchSuccess } from '../redux/actions';

const HomeScreen = () => {
  // const [products, dispatch] = useReducer(logger(reducer));
  const { products } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [res, setRes] = useState();
  // console.log(products);
  let rest = new Promise((resolve) => resolve(products));

  useEffect(() => {
    // const fetchData = async () => {
    //   dispatch({ type: types.FETCH_REQUEST });
    //   try {
    //     const result = await axios.get('/api/products');
    //     dispatch({ type: types.FETCH_SUCCESS, payload: result });
    //   } catch (err) {
    //     dispatch({ type: types.FETCH_FAIL, payload: err.message });
    //   }
    // };
    // axios
    //   .get('/api/products')
    //   .then((value) => (value ? setRes(value) : setRes('lutfen bekleyin')));
    dispatch(fetchStart(''));

    // let result = axios.get('/api/products');
    // let rest = new Promise((resolve) => axios.get('/api/products', resolve));
    // const rest = new Promise((resolve) => resolve(fetchData())).then(
    //   (val) => (value = val)
    // );
  }, []);
  // let value;
  // const fetchData = async () => {
  //   await axios
  //     .get('/api/products')
  //     .then((val) => console.log(val))
  //     .then((val) => (value = val));
  // };

  // console.log(fetchData());
  // fetchData();
  return (
    <div>
      {/* <h1>Featured Products</h1>
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
      </div> */}
    </div>
  );
};

export default HomeScreen;
