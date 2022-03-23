import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingBox = () => {
  return (
    <Spinner
      style={{
        width: '10rem',
        height: '10rem',
        marginTop: '10rem',
        alignItems: 'center',
      }}
      animation="border"
      variant="warning"
      size="lg"
    />
  );
};

export default LoadingBox;
