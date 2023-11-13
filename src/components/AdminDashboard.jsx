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
    const [website, setWebsite] = useState('');  
    const [cuisine, setCuisine] = useState('');
    const [typ, setTyp] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [instagram, setInstagram] = useState('');
    const [adress, setAdress] = useState('');
    const [email, setEmail] = useState('');
    const [facebook, setFacebook] = useState('');
    const [description, setDescription] = useState('');
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
                    website, 
                    cuisine, 
                    typ, 
                    phonenumber, 
                    instagram, 
                    adress, 
                    email, 
                    facebook, 
                    description,
                });
                setEditMode(false);
                setCurrentRestaurantId(null);
            } else {
                await addDoc(collection(db, 'pizza resturants'), {
                    name,
                    Ort,
                    website, 
                    cuisine, 
                    typ, 
                    phonenumber, 
                    instagram, 
                    adress, 
                    email, 
                    facebook, 
                    description,
                });
            }
            setName('');
            setOrt('');
            setWebsite('');
            setCuisine('');
            setTyp('');
            setPhonenumber('');
            setInstagram('');
            setAdress('');
            setEmail(''); 
            setFacebook('');
            setDescription('');
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
        setWebsite(restaurant.website);
        setCuisine(restaurant.Utbud);
        setTyp(restaurant.Typ);
        setPhonenumber(restaurant.Telefon);
        setInstagram(restaurant.Instagram);
        setAdress(restaurant.Gatuadress);
        setEmail(restaurant.Email); 
        setFacebook(restaurant.Facebook);
        setDescription(restaurant.Beskrivning);
    };

    if (!user || user.email !== 'admin@example.com') return <div>Access denied!</div>;

    return (
        <Container>
      <h1>Admin Panel</h1>
      
      {loading && <Alert variant="primary">Loading...</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form>
        <Form.Group as={Row} className="mb-3">
          <Row>
            <Form.Control
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Restaurant Name"
            />
          </Row>
          <Row>
            <Form.Control
              value={Ort}
              onChange={e => setOrt(e.target.value)}
              placeholder="Restaurant Ort/Citie"
            />
          </Row>
          <Row>
            <Form.Control
              value={website}
              onChange={e => setWebsite(e.target.value)}
              placeholder="Restaurant Website"
            />
          </Row>
          <Row>
            <Form.Control
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Restaurant Description"
            />
          </Row>
          <Row>
            <Form.Control
              value={facebook}
              onChange={e => setFacebook(e.target.value)}
              placeholder="Restaurant Facebook"
            />
          </Row>
          <Row>
            <Form.Control
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Restaurant Email"
            />
          </Row>
          <Row>
            <Form.Control
              value={adress}
              onChange={e => setAdress(e.target.value)}
              placeholder="Restaurant Adress"
            />
          </Row>
          <Row>
            <Form.Control
              value={instagram}
              onChange={e => setInstagram(e.target.value)}
              placeholder="Restaurant Instagram"
            />
          </Row>
          <Row>
            <Form.Control
              value={phonenumber}
              onChange={e => setPhonenumber(e.target.value)}
              placeholder="Restaurant Phonenumber"
            />
          </Row>
          <Row>
            <Form.Control
              value={typ}
              onChange={e => setTyp(e.target.value)}
              placeholder="Restaurant Typ"
            />
          </Row>
          <Row>
            <Form.Control
              value={cuisine}
              onChange={e => setCuisine(e.target.value)}
              placeholder="Restaurant Cuisine"
            />
          </Row>
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
                  setWebsite('');
                  setCuisine('');
                  setTyp('');
                  setPhonenumber('');
                  setInstagram('');
                  setAdress('');
                  setEmail(''); 
                  setFacebook('');
                  setDescription('');
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


