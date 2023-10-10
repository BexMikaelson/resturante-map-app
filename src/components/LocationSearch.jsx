import React, { useState, useRef, useEffect } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { Container, Form, Button, InputGroup } from 'react-bootstrap';


const LocationSearch = ({ onPlaceSelected }) => {
  const [inputValue, setInputValue] = useState("");
  const autocompleteRef = useRef(null);
  let stopScrolling = false;

  useEffect(() => {
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("touchmove", handleTouchMove, { passive: false });
    };
  }, []);

  const handleSearch = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place && place.geometry && place.geometry.location) {
        const newCenter = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        onPlaceSelected(newCenter);
      }
    }
  };

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleReset = () => {
    setInputValue("");
     autocompleteRef.current.set('place', null);
  };

  function handleTouchMove(e) {
    if (!stopScrolling) {
      return;
    }
    e.preventDefault();
  }

  function onTouchStart() {
    stopScrolling = true;
  }

  function onTouchEnd() {
    stopScrolling = false;
  }

  return (
    
      <Container>
        <Form className="my-4">
        <InputGroup>
            <Autocomplete
              onLoad={(ref) => autocompleteRef.current = ref}
              >
              <Form.Control 
                  id="autocomplete"
                  placeholder="Ange ort"
                  type="text"
                  value={inputValue}
                  onChange={handleInput}
                  onTouchStart={onTouchStart}
                  onTouchEnd={onTouchEnd}
              />
              
            </Autocomplete>
                <Button variant="primary" onClick={handleSearch}>Sök</Button>
                <Button variant="secondary" onClick={handleReset}>Återställ</Button>
          </InputGroup>
          </Form>  
      </Container>  
  );
};

export default LocationSearch;

