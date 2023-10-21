import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'
import "./LoginPage.css";
import aiviLogo from '/Users/harish/aivisor/src/frontend/aivi.png'; // Import the Aivi logo

export default function Login() {
  const navigate = useNavigate(); // Get the navigate function

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event: any) {
    event.preventDefault();

    // Define the data you want to send
    const data = {
      email: email,
      password: password,
    };

    axios.post('http://127.0.0.1:8000/register', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        console.log('Full Response:', response); // Log the entire response
        if (response.status === 200) {
          console.log('Response Data:', response.data);
          navigate('/quiz');
        } else if (response.status === 400) {
          // User already exists
          setError("Invalid username or password");
        } else {
          // Handle other errors
          setError("An error occurred. Please try again.");
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setError("An error occurred. Please try again.");
      });
  }
  

  return (
    <div className="Login">
    <img src={aiviLogo} alt="Aivi Logo" className="aivi-logo" />
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          autoFocus
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button size="lg" type="submit" disabled={!validateForm()}>
        Login
      </Button>
    </Form>
  </div>




  );
}