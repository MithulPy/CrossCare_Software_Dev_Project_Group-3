import React, { Component } from 'react';
import { gql, useMutation } from '@apollo/client';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./entryform.css"
//
//
const ADD_AMBULANCE = gql`
  mutation AddAmbulance(
    $crewMembers: String!,
    $location: String!,
    $status: String!,
    $eta: Int!
  ) {
    addAmbulance(
      crewMembers: $crewMembers,
      location: $location,
      status: $status,
      eta: $eta
    ) {
      _id
    }
  }
`;

const AddAmbulance = () => {
    let navigate = useNavigate();
  
    let id, crewMembers, location, status, eta;
    const [addAmbulance, { data, loading, error }] = useMutation(ADD_AMBULANCE);

    const locationList = [
      { name: "Lawrence and Markham, Scarborough", eta: 20 },
      { name: "Finch East, Markham", eta: 45 },
      { name: "Progress Avenue, Scarborough", eta: 1 },
      { name: " Elsmere and Markham, Scarborough", eta: 10 },
    ];
    
  
    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;
  
    return (
      <div className="entryform">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          
            if (!crewMembers.value || !location.value || !status.value || !eta.value) {
              alert('Please fill in all fields');
              return;
            }
          
            const etaNum = parseInt(eta.value);
            if (isNaN(etaNum)) {
              alert('Please enter a valid number for ETA');
              return;
            }
          
            addAmbulance({
              variables: {
                crewMembers: crewMembers.value,
                location: location.value,
                status: status.value,
                eta: etaNum,
              },
            });
          
            crewMembers.value = '';
            location.value = '';
            status.value = '';
            eta.value = '';
            navigate('/ambulancelist2');
          }}
          
        >
          
  
          <Form.Group>
            <Form.Label>Crew Members (comma-separated):</Form.Label>
            <Form.Control
              type="text"
              name="crewMembers"
              ref={node => {crewMembers = node; }}
              placeholder="Crew Members"
            />
          </Form.Group>
  
          <Form.Group>
  <Form.Label>Location:</Form.Label>
  <Form.Control
    as="select"
    name="location"
    ref={node => {location = node; }}
    onChange={(e) => {
      const selectedLocation = locationList.find(l => l.name === e.target.value);
      eta.value = selectedLocation ? selectedLocation.eta : '';
    }}
  >
    <option value="">Select a location</option>
    {locationList.map((l, i) => (
      <option key={i} value={l.name}>{l.name}</option>
    ))}
  </Form.Control>
</Form.Group>
  
          <Form.Group>
  <Form.Label>Status:</Form.Label>
  <Form.Select name="status" ref={node => {status = node; }}>
    <option value="Available">Available</option>
    <option value="On-Route">On-Route</option>
    <option value="Unavailable">Unavailable</option>
    
  </Form.Select>
</Form.Group>

  
          <Form.Group>
            <Form.Label>ETA:</Form.Label>
            <Form.Control
              type="number"
              name="eta"
              ref={node => {eta = node; }}
              placeholder="ETA"
            />
          </Form.Group>
  
          <Button variant="primary" type="submit">
            Add Ambulance
          </Button>

          <Button variant="danger" onClick={() => navigate('/ambulancelist2')}>
            Cancel
          </Button>

        </form>
      </div>
    );
  }

  export default AddAmbulance
