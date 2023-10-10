import React from 'react';
import { useAuth} from '../contexts/AuthContext';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Navigation = () => {
   const { user} = useAuth();

  return (
    <Navbar expand="md" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand><Nav.Link href="/">The Pizza Map</Nav.Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/RestaurantsPage">Restauranger</Nav.Link>
            {user ? (
            <>
            <Nav.Link href="/auth">Logga in/Registrera</Nav.Link>
            <Nav.Link href="/adminPanel">Admin-panel</Nav.Link>
            </>
            ):(
            <Nav.Link href="/auth">Logga in/Registrera</Nav.Link>
            )}
 
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
