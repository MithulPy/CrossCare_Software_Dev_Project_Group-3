import React, { useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';

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

const DELETE_AMBULANCE = gql`
  mutation deleteAmbulance($id: ID!) {
    deleteAmbulance(id: $id)
  }
`;

const AmbulanceList2 = () => {
  const { loading, error, data, refetch } = useQuery(GET_AMBULANCES);
  const [deleteAmbulance] = useMutation(DELETE_AMBULANCE);
  const statusOptions = ["Available", "Unavailable", "En Route"];
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [dispatchedAmbulances, setDispatchedAmbulances] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedAmbulance, setSelectedAmbulance] = useState(null);

  const handleDispatch = (ambulance) => {
    const timestamp = Date.now();
    console.log('Dispatching ambulance', ambulance._id, 'at', timestamp);
  
    // Update the status of the ambulance to "En Route"
    ambulance.status = "En Route";
  
    setDispatchedAmbulances([...dispatchedAmbulances, { ...ambulance, timestamp }]);
  
    setTimeout(() => {
      setDispatchedAmbulances(
        dispatchedAmbulances.filter((dispatched) => dispatched._id !== ambulance._id)
      );
      // Update the status of the ambulance to "Reached Destination"
      ambulance.status = "Reached Destination";
      setNotificationMessage(`Ambulance ${ambulance._id} has reached its destination!`);
      setShowNotification(true);
    }, ambulance.eta * 60 * 1000); // convert ETA to milliseconds
    setNotificationMessage(`Ambulance ${ambulance._id} has been dispatched!`);
    setShowNotification(true);
  };
  
  

  const handleDelete = async (id) => {
    await deleteAmbulance({
      variables: {
        id: id,
      },
      refetchQueries: [{ query: GET_AMBULANCES }],
    });
  };

  const handleTrack = (ambulance) => {
    setSelectedAmbulance(ambulance);
    setShowDetails(true);
  }

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
          {data.ambulances.map((ambulance, index) => {
            const dispatched = dispatchedAmbulances.find((dispatched) => dispatched._id === ambulance._id);
            const remainingTime = dispatched ? Math.max(
              (dispatched.eta * 60 - (Date.now() - Date.parse(dispatched.timestamp)) / 1000) / 60,
              0
            ).toFixed(0) : null;
            return (
              <React.Fragment key={index}>
                <tr>
                  <td>{ambulance._id}</td>
                  <td>{ambulance.crewMembers}</td>
                  <td>{ambulance.location}</td>
                  <td>
                    {dispatched ? (
                      ambulance.status === "Reached Destination" ? "Reached Destination" : "En Route" // Display "Reached Destination" if ambulance has reached its destination
                    ) : (
                      ambulance.status
                    )}
                  </td>
                  <td>
                    {dispatched ? (
                      <span>{ambulance.eta} minutes</span>
                    ) : (
                      <span>{ambulance.eta} minutes</span>
                    )}
                  </td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(ambulance._id)}>
                      Delete
                    </Button>
                    <Button
                      variant="success"
                      size="sm"
                      className="ml-2"
                      onClick={() =>
                        handleDispatch({
                          ...ambulance,
                          dispatchedAt: new Date().toISOString(),
                        })
                      }
                    >
                      Dispatch
                    </Button>

                    <Button variant="info" size="sm" onClick={() => alert(`Details on ambulance ${ambulance._id}\n\nCrew Members: ${ambulance.crewMembers}\nLocation: ${ambulance.location}\nStatus: ${ambulance.status}\nETA: ${ambulance.eta} minutes`)} >
                      Track
                    </Button>
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </Table>
      <div className="center">
        <Button variant="success" size="sm" onClick={() => refetch()}>
          Refresh
        </Button>
  
        <Link to="/addambulance">
          <Button variant="primary" size="sm" className="ml-2">
            Add Ambulance
          </Button>
        </Link>
      </div>
      <Modal show={showNotification} onHide={() => setShowNotification(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>{notificationMessage}</Modal.Body>
      </Modal>
    </div>
  );
        };

export default AmbulanceList2;