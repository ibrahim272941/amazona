import './App.css';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomeScreen from './screen/HomeScreen';
import ProductScreen from './screen/ProductScreen';
import { Badge, Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';

function App() {
  const { cart } = useSelector((state) => state);
  console.log(cart.cartItems);
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
                      {cart.cartItems.length}
                    </Badge>
                  )}
                </Link>
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/" element={<HomeScreen />} />
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
