import React, { useState } from 'react';
import './IncidentList.css';
import { Link } from 'react-router-dom';
// Sample incident data
const sampleData = [
  {
    id: 1,
    caseNumber: 'INC001',
    medium: 'Phone',
    date: '2023-03-31',
    time: '14:30',
    status: 'Open',
    reporter: 'John Doe',
    location: '123 Main St',
    details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 2,
    caseNumber: 'INC002',
    medium: 'Email',
    date: '2023-04-01',
    time: '10:15',
    status: 'Closed',
    reporter: 'Jane Smith',
    location: '456 Park Ave',
    details: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  // Add more incident objects here
];

// Component to display the list of incidents
const IncidentList = () => {
  const [selectedIncident, setSelectedIncident] = useState(null);

  // Handle click on a "View Details" button
  const handleViewDetails = (incident) => {
    setSelectedIncident(incident);
  };

 // Render a table with the incident data
 return (
    <div className="incident-list-container">
      <h2>Incident List</h2>
      <table className="incident-list-table">
        <thead>
          <tr>
            <th>Case Number</th>
            <th>Medium</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Reporter</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sampleData.map((incident) => (
            <tr key={incident.id}>
              <td>{incident.caseNumber}</td>
              <td>{incident.medium}</td>
              <td>{incident.date}</td>
              <td>{incident.time}</td>
              <td>{incident.status}</td>
              <td>{incident.reporter}</td>
              <td>
                <button
                  className="view-details-button"
                  onClick={() => handleViewDetails(incident)}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    
      {/* Show the selected incident's details in another component */}
      {selectedIncident && (
        <IncidentDetails
          incident={selectedIncident}
          setSelectedIncident={setSelectedIncident}
        />
      )}
    </div>
  );
};

const IncidentDetails = ({ incident, setSelectedIncident }) => {
    return (
      <div className="incident-details-container">
        <h2>Incident Details</h2>
        <p>
          <strong>Case Number:</strong> {incident.caseNumber}
        </p>
        <p>
          <strong>Medium:</strong> {incident.medium}
        </p>
        <p>
          <strong>Date:</strong> {incident.date}
        </p>
        <p>
          <strong>Time:</strong> {incident.time}
        </p>
        <p>
          <strong>Status:</strong> {incident.status}
        </p>
        <p>
          <strong>Reporter:</strong> {incident.reporter}
        </p>
        <p>
          <strong>Location:</strong> {incident.location}
        </p>
        <p>
          <strong>Details:</strong> {incident.details}
        </p>
        <button
          className="close-details-button"
          onClick={() => setSelectedIncident(null)}
        >
          Close Details
        </button>
              {/* Create Incident button */}
      <Link to="/createincident">
        <button className="create-incident-button">Create Incident</button>
      </Link>
      </div>
    );
  };
  

export default IncidentList;
