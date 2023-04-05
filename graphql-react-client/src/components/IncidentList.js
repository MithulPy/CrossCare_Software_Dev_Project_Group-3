import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './IncidentList.css';

const GET_INCIDENTS = gql`
  query {
    incidents {
      _id
      issue
      casenumber
      date
      medium
      reporter
      location
      status
    }
  }
`;

const IncidentList = () => {
  const { loading, error, data } = useQuery(GET_INCIDENTS);

  if (loading) return <Spinner animation="border" variant="primary" />;
  if (error) return `Error! ${error.message}`;

  return (
    <div className="incident-list-container">
      <h2>View Incident Report</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Case Number</th>
            <th>Location</th>
            <th>Description of Incident</th>
            <th>Date of Incident</th>
            <th>Medium</th>
            <th>Reported By</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.incidents.map((incident) => (
            <tr key={incident._id}>
              <td>{incident.casenumber}</td>
              <td>{incident.location}</td>
              <td>{incident.issue}</td>
              <td>{incident.date}</td>
              <td>{incident.medium}</td>
              <td>{incident.reporter}</td>
              <td>{incident.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Link to="/createincident">
        <Button className="create-incident-button" variant="primary">Create Incident</Button>
      </Link>
    </div>
  );
};

export default IncidentList;
