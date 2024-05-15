import React, { useState } from 'react';
import axios from 'axios';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { setLoggedIn } from '../actions';
import { Navigate } from 'react-router-dom';

const CLIENT_ID = "fc00e50de4ed4be7bb06faa37378a36e";

const Login = ({  onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const dispatch = useDispatch();
    const [redirect, setRedirect] = useState(false);

    const handleSpotifyLogin = () => {
        window.location.href = 'https://accounts.spotify.com/authorize?' + CLIENT_ID;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (isSignUp) {
                response = await axios.post('http://localhost:8080/auth/register', { email, password });
                localStorage.setItem('token', response.data.token);
                toast.success('Inscription réussie !');
                dispatch(setLoggedIn(true));
                setRedirect(true); 
            } else {
                response = await axios.post('http://localhost:8080/auth/login', { email, password });
                localStorage.setItem('token', response.data.token); 
                toast.success('Connexion réussie ! Bienvenue sur le site.');
                dispatch(setLoggedIn(true));
                handleSpotifyLogin();
                setRedirect(true); 
            }
            console.log('Success');
        } catch (error) {
            console.error('Error:', error);
            toast.error('Erreur lors de la connexion ! Veuillez vérifier vos identifiants.');
        }
    };
    

    const toggleSignUp = () => {
        setIsSignUp(!isSignUp);
    };

    if (redirect) {
        return <Navigate to="/home" />;
    }

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>{isSignUp ? 'Inscription' : 'Connexion'}</Card.Title>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                {isSignUp && (
                                    <Form.Group className="mb-3" controlId="formConfirmPassword">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Confirm Password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                )}

                                <Button variant="primary" type="submit">
                                    {isSignUp ? 'Sign Up' : 'Login'}
                                </Button>
                            </Form>
                        </Card.Body>
                        <Card.Footer>
                            <small>
                                {isSignUp ? (
                                    <span>Already have an account? <Button variant="link" onClick={toggleSignUp}>Login</Button></span>
                                ) : (
                                    <span>Don't have an account yet? <Button variant="link" onClick={toggleSignUp}>Sign Up</Button></span>
                                )}
                            </small>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;