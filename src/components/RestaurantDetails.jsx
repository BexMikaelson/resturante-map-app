import React from 'react';
import { useParams } from 'react-router-dom';
import useFetchRestaurantDetails from '../hooks/useFetchRestaurantDetails';
import { Container, Card, ListGroup } from 'react-bootstrap';

const RestaurantDetails = () => {
  const { id } = useParams();
  const { loading, error, restaurantDetails } = useFetchRestaurantDetails(id);

  if (loading) return <p>Laddar...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!restaurantDetails) return <p>Ingen information hittades för den valda restaurangen.</p>;

  return (
    <Container className="my-4">
    <Card>
        <Card.Header>
            <Card.Title>{restaurantDetails?.name}</Card.Title>
        </Card.Header>
        <Card.Body>
            <ListGroup variant="flush">
                <ListGroup.Item>Adress: {restaurantDetails?.Gatuadress}</ListGroup.Item>
                <ListGroup.Item>Ort: {restaurantDetails?.Ort}</ListGroup.Item>
                <ListGroup.Item>Beskrivning: {restaurantDetails?.Beskrivning}</ListGroup.Item>
                <ListGroup.Item>Typ: {restaurantDetails?.Typ}</ListGroup.Item>
                <ListGroup.Item>Utbud: {restaurantDetails?.Utbud}</ListGroup.Item>
                <ListGroup.Item>Telefon: {restaurantDetails?.Telefon}</ListGroup.Item>
                <ListGroup.Item>E-post: {restaurantDetails?.Email}</ListGroup.Item>
                <ListGroup.Item>Hemsida: <a href={restaurantDetails?.website}>{restaurantDetails?.website}</a></ListGroup.Item>
                <ListGroup.Item className="d-flex align-items-center">Facebook: 
                    <a href={restaurantDetails?.Facebook}>
                        <i className="fa fa-facebook-official fa-3x" aria-hidden="true"></i>
                    </a>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex align-items-center">Instagram: 
                    <a href={restaurantDetails?.Instagram}>
                        <i className="fa fa-instagram fa-3x" aria-hidden="true"></i>
                    </a>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex align-items-center">Google Maps: 
                    <a href={restaurantDetails?.GoogleMaps}>
                        <i className="fa fa-map-marker fa-3x" aria-hidden="true"></i> 
                    </a>
                </ListGroup.Item>
            </ListGroup>
        </Card.Body>
    </Card>
</Container>
  );
};

export default RestaurantDetails;

