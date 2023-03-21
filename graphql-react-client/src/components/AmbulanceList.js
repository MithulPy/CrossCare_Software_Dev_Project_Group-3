import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

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
];

const AmbulanceList = () => {
  const [ambulances, setAmbulances] = useState(sampleData);

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
                <Button variant="primary" size="sm" className="mr-2">
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() =>
                    setAmbulances((prevAmbulances) =>
                      prevAmbulances.filter((a) => a._id !== ambulance._id)
                    )
                  }
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AmbulanceList;
