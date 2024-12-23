import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function NavbarComponent() {
  return (
    <Navbar bg="dark" variant="dark" sticky="top" style={{}}>
      <Container>
        <Navbar.Brand href="/">Ana Sayfa</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/alfabe">Alfabe</Nav.Link>
          <Nav.Link href="/sayilar">Sayılar</Nav.Link>
          <Nav.Link href="/kelimeler">Kelimeler</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavbarComponent