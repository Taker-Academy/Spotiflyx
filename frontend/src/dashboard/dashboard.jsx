import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const Dashboard = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(token);
            if (newPassword !== confirmNewPassword) {
                toast.error("Les nouveaux mots de passe ne correspondent pas !");
                return;
            }
    
            const response = await axios.put(
                'http://localhost:8080/user/update',
                { password: newPassword },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.status === 200) {
                toast.success("Mot de passe modifié avec succès !");
                setOldPassword('');
                setNewPassword('');
                setConfirmNewPassword('');
            } else {
                toast.error("Une erreur s'est produite lors de la modification du mot de passe !");
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Erreur lors de la modification du mot de passe !');
        }
    };
    

    return (
        <Container className="mt-5">
            <Card>
                <Card.Body>
                    <Card.Title>Changer le mot de passe</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formOldPassword">
                            <Form.Label>Ancien mot de passe</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Ancien mot de passe"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formNewPassword">
                            <Form.Label>Nouveau mot de passe</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Nouveau mot de passe"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formConfirmNewPassword">
                            <Form.Label>Confirmer le nouveau mot de passe</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirmer le nouveau mot de passe"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Modifier le mot de passe
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Dashboard;
