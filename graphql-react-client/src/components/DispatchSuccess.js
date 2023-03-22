import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const DispatchSuccess = ({ ambulance, onClose }) => {
  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Dispatch Success</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>ID: {ambulance._id}</p>
        <p>Crew Members: {ambulance.crewMembers.join(', ')}</p>
        <p>Location: {ambulance.location}</p>
        <p>Status: Dispatched</p>
        <p>ETA: {ambulance.eta}</p>
        <p>The ambulance has been dispatched successfully!</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DispatchSuccess;
