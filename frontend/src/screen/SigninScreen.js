import { Container, Form, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userSigninStart } from '../redux/actions';

const SigninScreen = () => {
  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get('redirect');
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const redirect = redirectUrl ? redirectUrl : '/';
  const { signinUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  console.log(redirect);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userSigninStart(email, password));
    if (signinUser.token) {
      navigate(redirect);
    }
  };
  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h3 className="my-3 text-center">Sign In</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter password"
            required
          />
        </Form.Group>
        <div className="mb-3 d-grid gap-2">
          <Button
            style={{
              backgroundColor: '#E09E10',
              border: '#0000',
            }}
            type="submit"
            size="lg"
          >
            Sign In
          </Button>
        </div>
        <div className="mb-3 text-center">
          New Costumer
          <Link to={`/signin?redirect=${redirect}`}> Create your account </Link>
        </div>
      </Form>
    </Container>
  );
};
export default SigninScreen;
