import { Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';

const initialValue = {
  fullName: '',
  address: '',
  city: '',
  postalCode: '',
};
const ShippingAddresScreen = () => {
  const [data, setData] = useState(initialValue);
  const { fullName, address, city, postalCode } = data;
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = (e) => {
    e.preventDefault();
    let { name, value } = e.target;

    setData((prev) => ({ ...prev, [name]: value }));
  };
  console.log(data);
  return (
    <div>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <h1 className="my-3"> Shipping Address</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="fullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            value={fullName}
            onChange={handleChange}
            required
            name="fullName"
          ></Form.Control>
          <Form.Label>Address</Form.Label>
          <Form.Control
            value={address}
            onChange={handleChange}
            required
            name="address"
          ></Form.Control>
          <Form.Label>City</Form.Label>
          <Form.Control
            value={city}
            onChange={handleChange}
            required
            name="city"
          ></Form.Control>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            value={postalCode}
            onChange={handleChange}
            required
            name="postalCode"
          ></Form.Control>
        </Form.Group>
      </Form>
    </div>
  );
};

export default ShippingAddresScreen;
