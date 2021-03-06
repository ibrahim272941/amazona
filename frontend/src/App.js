import './App.css';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomeScreen from './screen/HomeScreen';
import ProductScreen from './screen/ProductScreen';
import {
  Badge,
  Container,
  Dropdown,
  Nav,
  Navbar,
  NavDropdown,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import CartScreen from './screen/CartScreen';
import SigninScreen from './screen/SigninScreen';
import ShippingAddresScreen from './screen/ShippingAddressScreen';

function App() {
  const { cart } = useSelector((state) => state.product);
  const {
    signinUser: { user },
  } = useSelector((state) => state.auth);
  console.log(user);
  const signOutHandler = () => {};
  return (
    <Router>
      <div className="d-flex flex-column site-contianer">
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>Amazon</Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto">
                <Link to="/cart" className="nav-link">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge className="mx-2 mb-1" pill bg="danger">
                      {cart.cartItems.reduce((a, b) => a + b.quantity, 0)}
                    </Badge>
                  )}
                </Link>
                {user ? (
                  <NavDropdown title={user.name} id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signOutHandler}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link" to="/signin">
                    Sign In
                  </Link>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/" element={<HomeScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/shipping" element={<ShippingAddresScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All rights deserved</div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
