import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Form, Button, Container, Alert } from "react-bootstrap";

export const Auth = () => {
  const {
    user,
    createAccount,
    signIn,
    logout,
  } = useContext(AuthContext);
  
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [createAcountEmail, setCreateAcountEmail] = useState("");
  const [createAcountPassword, setCreateAcountPassword] = useState("");

  return (
    <Container style={{ maxWidth: "400px", marginTop: "2rem" }}>
      <Form.Group className="mb-3">
      <div><h3>Logga in</h3></div>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Email..."
          onChange={(e) => setLoginEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => setLoginPassword(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" onClick={() => signIn(loginEmail, loginPassword)}>
        Logga in
      </Button>
      <Button variant="secondary" className="ms-2" onClick={logout}>
        Logga ut
      </Button>
      <hr />

      <Form.Group className="mb-3">
        <div><h3>Skapa Konto</h3></div>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Email..."
          onChange={(e) => setCreateAcountEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => setCreateAcountPassword(e.target.value)}
        />
      </Form.Group>

      <Button variant="success" onClick={() => createAccount(createAcountEmail, createAcountPassword)}>
        Skapa konto
      </Button>

      <hr />

      {user ? (
        <Alert variant="info">Inloggad som: {user.email}</Alert>
      ) : (
        <Alert variant="warning">Du är inte inloggad.</Alert>
      )}
    </Container>
 
  );
};











