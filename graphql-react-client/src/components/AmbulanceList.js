import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import EditPatient from './EditPatient';
import DispatchDetails from './DispatchDetails';
import DispatchSuccess from './DispatchSuccess';

const sampleData = [
  {
    _id: '1',
    crewMembers: ['John Doe', 'Jane Doe'],
    location: '123 Main St',
    status: 'en route',
    eta: '10 minutes',
  },
  {
    _id: '2',
    crewMembers: ['Bob Smith', 'Sara Johnson'],
    location: '456 Elm St',
    status: 'at scene',
    eta: 'n/a',
  },
  {
    _id: '3',
    crewMembers: ['Alice Lee', 'Tom Wong'],
    location: '789 Maple Ave',
    status: 'transporting patient',
    eta: '20 minutes',
  },
  {
    _id: '4',
    crewMembers: ['Jack Lee', 'Jill Wong'],
    location: '321 Oak St',
    status: 'en route',
    eta: '15 minutes',
  },
  {
    _id: '5',
    crewMembers: ['Mike Smith', 'Emily Johnson'],
    location: '654 Pine St',
    status: 'at scene',
    eta: 'n/a',
  },
];

const AmbulanceList = () => {
  const [ambulances, setAmbulances] = useState(sampleData);
  const [editing, setEditing] = useState(false);
  const [editingAmbulance, setEditingAmbulance] = useState({});
  const [tracking, setTracking] = useState(false);
  const [dispatching, setDispatching] = useState(false);

  const handleEdit = (ambulance) => {
    setEditing(true);
    setEditingAmbulance(ambulance);
  };

  const handleSave = (updatedAmbulance) => {
    setEditing(false);
    setAmbulances((prevAmbulances) =>
      prevAmbulances.map((a) =>
        a._id === updatedAmbulance._id ? updatedAmbulance : a
      )
    );
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleDelete = (ambulance) => {
    setAmbulances((prevAmbulances) =>
      prevAmbulances.filter((a) => a._id !== ambulance._id)
    );
  };

  const handleTrack = (ambulance) => {
    setTracking(true);
    setEditingAmbulance(ambulance);
  };

  const handleDispatch = (ambulance) => {
    setDispatching(true);
    setEditingAmbulance(ambulance);
  };

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Crew Members</th>
            <th>Location</th>
            <th>Status</th>
            <th>ETA</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ambulances.map((ambulance, index) => (
            <tr key={index}>
              <td>{ambulance._id}</td>
              <td>{ambulance.crewMembers.join(', ')}</td>
              <td>{ambulance.location}</td>
              <td>{ambulance.status}</td>
              <td>{ambulance.eta}</td>
              <td>
     
                <Button
                  variant="warning"
                  size="sm"
                  className="mr-2"
                  onClick={() => handleTrack(ambulance)}
                >
                  Track
                </Button>

                <Button
                  variant="success"
                  size="sm"
                  className="ml-2"
                  onClick={() => handleDispatch(ambulance)}
                >
                  Dispatch
                </Button>
              </td>
            </tr>
          ))}
          </tbody>
        </Table>
        {editing && (
          <EditPatient
            ambulance={editingAmbulance}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        )}
        {tracking && (
          <DispatchDetails
            ambulance={editingAmbulance}
            onClose={() => setTracking(false)}
          />
        )}
        {dispatching && (
          <DispatchSuccess
            ambulance={editingAmbulance}
            onClose={() => setDispatching(false)}
          />
        )}
      </div>
      );
    };
    
    export default AmbulanceList;