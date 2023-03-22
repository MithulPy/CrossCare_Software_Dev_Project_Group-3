import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const DispatchDetails = ({ ambulance, onClose }) => {
  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Dispatch Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>ID: {ambulance._id}</p>
        <p>Crew Members: {ambulance.crewMembers.join(', ')}</p>
        <p>Location: {ambulance.location}</p>
        <p>Status: {ambulance.status}</p>
        <p>ETA: {ambulance.eta}</p>
        <p>Dispatch Details:</p>
        <ul>
          <li>Time: 10:00am</li>
          <li>Destination: St. Mary's Hospital</li>
          <li>Patient Info: John Smith, 35 years old, chest pains</li>
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DispatchDetails;
