import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  const { user } = useAuth();

  return (
    <Navbar expand="md" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={NavLink} to="/">The Pizza Map</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item>
              <Nav.Link as={NavLink} to="/">
                Hem
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/RestaurantsPage">
                Restauranger
              </Nav.Link>
            </Nav.Item>
            {user ? (
              <>
                <Nav.Item>
                  <Nav.Link as={NavLink} to="/auth">
                    Logga in/Registrera
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={NavLink} to="/adminPanel">
                    Admin-panel
                  </Nav.Link>
                </Nav.Item>
              </>
            ) : (
              <Nav.Item>
                <Nav.Link as={NavLink} to="/auth">
                  Logga in/Registrera
                </Nav.Link>
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;

