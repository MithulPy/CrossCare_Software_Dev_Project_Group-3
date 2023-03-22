import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const EditPatient = ({ user, onSave, onCancel }) => {
  const [crewMembers, setCrewMembers] = useState(user.crewMembers.join(', '));
  const [location, setLocation] = useState(user.location);
  const [status, setStatus] = useState(user.status);
  const [eta, setEta] = useState(user.eta);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...user,
      crewMembers: crewMembers.split(',').map((c) => c.trim()),
      location,
      status,
      eta,
    });
  };

  return (
    <Modal show={true} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Patient</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="crewMembers">Crew Members</label>
            <input
              type="text"
              className="form-control"
              id="crewMembers"
              value={crewMembers}
              onChange={(e) => setCrewMembers(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              className="form-control"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <input
              type="text"
              className="form-control"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="eta">ETA</label>
            <input
              type="text"
              className="form-control"
              id="eta"
              value={eta}
              onChange={(e) => setEta(e.target.value)}
            />
          </div>
          <Button variant="primary" type="submit">
            Save
          </Button>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditPatient;
