import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase'; 
import { useAuth } from '../contexts/AuthContext';
import { collection, onSnapshot, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { Container, Form, Button, Alert, ListGroup, Row, Col } from 'react-bootstrap';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [restaurants, setRestaurants] = useState([]);
    const [name, setName] = useState('');
    const [Ort, setOrt] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [currentRestaurantId, setCurrentRestaurantId] = useState(null);

    useEffect(() => {
        if (user && user.email === import.meta.env.VITE_ADMIN_EMAIL) {
            setLoading(true);
            const unsubscribe = onSnapshot(collection(db, 'pizza resturants'), snapshot => {
                setRestaurants(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                setLoading(false);
            });

            return () => unsubscribe();
        }
    }, [user]);

    const addOrUpdateRestaurant = async () => {
        setLoading(true);
        setError('');
        try {
            if (editMode) {
                await updateDoc(doc(db, 'pizza resturants', currentRestaurantId), {
                    name,
                    Ort,
                });
                setEditMode(false);
                setCurrentRestaurantId(null);
            } else {
                await addDoc(collection(db, 'pizza resturants'), {
                    name,
                    Ort,
                });
            }
            setName('');
            setOrt('');
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    const deleteRestaurant = async (id) => {
        setLoading(true);
        setError('');
        try {
            await deleteDoc(doc(db, 'pizza resturants', id));
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    const startEditing = (restaurant) => {
        setEditMode(true);
        setCurrentRestaurantId(restaurant.id);
        setName(restaurant.name);
        setOrt(restaurant.Ort);
    };

    if (!user || user.email !== 'admin@example.com') return <div>Access denied!</div>;

    return (
        <Container>
      <h1>Admin Panel</h1>
      
      {loading && <Alert variant="primary">Loading...</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form>
        <Form.Group as={Row} className="mb-3">
          <Col>
            <Form.Control
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Restaurant Name"
            />
          </Col>
          <Col>
            <Form.Control
              value={Ort}
              onChange={e => setOrt(e.target.value)}
              placeholder="Ort"
            />
          </Col>
          <Col>
            <Button variant="primary" onClick={addOrUpdateRestaurant}>
              {editMode ? 'Update Restaurant' : 'Add Restaurant'}
            </Button>
          </Col>
          {editMode && (
            <Col>
              <Button
                variant="secondary"
                onClick={() => {
                  setEditMode(false);
                  setName('');
                  setOrt('');
                }}
              >
                Cancel Editing
              </Button>
            </Col>
          )}
        </Form.Group>
      </Form>
      
      <ListGroup>
        {restaurants.map(restaurant => (
          <ListGroup.Item key={restaurant.id}>
            {restaurant.name} ({restaurant.Ort})
            <Button variant="danger" size="sm" className="ms-2" onClick={() => deleteRestaurant(restaurant.id)}>
              Delete
            </Button>
            <Button variant="warning" size="sm" className="ms-2" onClick={() => startEditing(restaurant)}>
              Edit
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
    );
};

export default AdminDashboard;


