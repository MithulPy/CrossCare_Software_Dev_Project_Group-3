import React from 'react';
import { gql, useQuery } from '@apollo/client';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

const GET_AMBULANCES = gql`
  {
    ambulances {
      _id
      crewMembers
      location
      status
      eta
    }
  }
`;

const AmbulanceList = () => {
  const { loading, error, data, refetch } = useQuery(GET_AMBULANCES);

  if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

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
          {data.ambulances.map((ambulance,index) => (
            <tr key={index}>
              <td>{ambulance._id}</td>
              <td>{ambulance.crewMembers}</td>
              <td>{ambulance.location}</td>
              <td>{ambulance.status}</td>
              <td>{ambulance.eta}</td>
              <td>
                <Button variant="primary" size="sm" className="mr-2">
                  Edit
                </Button>
                <Button variant="danger" size="sm">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="center">
        <Button variant="success" size="sm" onClick={() => refetch()}>
          Refresh
        </Button>
      </div>
    </div>
  );
}

export default AmbulanceList
