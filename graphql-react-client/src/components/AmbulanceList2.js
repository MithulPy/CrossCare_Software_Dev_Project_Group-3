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
const AmbulanceList2 = () => {
  const { loading, error, data, refetch } = useQuery(GET_AMBULANCES);
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
  
    // Store the dispatch time and ETA in localStorage
    localStorage.setItem(`dispatch_${ambulance._id}`, JSON.stringify({timestamp, eta: ambulance.eta}));
  
    setDispatchedAmbulances([...dispatchedAmbulances, { ...ambulance, timestamp }]);
  
    // Update the remaining time of each dispatched ambulance every second
    const intervalId = setInterval(() => {
      const dispatched = dispatchedAmbulances.find((dispatched) => dispatched._id === ambulance._id);
      if (!dispatched) {
        clearInterval(intervalId);
        return;
      }
  
      const dispatchInfo = JSON.parse(localStorage.getItem(`dispatch_${ambulance._id}`));
      const remainingTime = Math.max(
        (dispatchInfo.eta * 60 - (Date.now() - Date.parse(dispatchInfo.timestamp)) / 1000) / 60,
        0
      ).toFixed(0);
  
      // Update the dispatch status and remaining time in localStorage
      localStorage.setItem(`dispatch_${ambulance._id}`, JSON.stringify({timestamp: dispatchInfo.timestamp, eta: dispatchInfo.eta, remainingTime}));
  
      if (remainingTime === 0) {
        clearInterval(intervalId);
        setDispatchedAmbulances(
          dispatchedAmbulances.filter((dispatched) => dispatched._id !== ambulance._id)
        );
        // Update the status of the ambulance to "Reached Destination"
        ambulance.status = "Reached Destination";
        setNotificationMessage(`Ambulance ${ambulance._id} has reached its destination!`);
        setShowNotification(true);
        localStorage.removeItem(`dispatch_${ambulance._id}`);
      }
    }, 1000);
  
    setNotificationMessage(`Ambulance ${ambulance._id} has been dispatched!`);
    setShowNotification(true);
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
                  <td>
                  {ambulance.status === "Unavailable" ? (
                    "Off-Duty"
                  ) : (
                    ambulance.location
                  )}
                </td>
                  <td style={{color:
  ambulance.status === "Available" ? "green" :
  ambulance.status === "On-Route" ? "blue" :
  ambulance.status === "Unavailable" ? "red" :
  dispatched && ambulance.status !== "Reached Destination" ? "orange" :
  "black"}}>
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
                    

                  <Button
  variant="success"
  size="sm"
  className="mx-2"
  onClick={() =>
    handleDispatch({
      ...ambulance,
      dispatchedAt: new Date().toISOString(),
    })
  }
  disabled={ambulance.status === "Unavailable"}
>
  Dispatch
</Button>

                    <Button
  variant="info"
  size="sm"
  onClick={() => handleTrack(ambulance)}
>
  Track
</Button>

                   
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center">
        <Button variant="success" size="sm" onClick={() => refetch()}>
          Refresh
        </Button>
  
        <Link to="/addambulance">
          <Button variant="primary" size="sm" className="mx-2">
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
      <Modal show={showDetails} onHide={() => setShowDetails(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Ambulance Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>ID: {selectedAmbulance && selectedAmbulance._id}</p>
        <p>Crew Members: {selectedAmbulance && selectedAmbulance.crewMembers}</p>
        <p>Location: {selectedAmbulance && selectedAmbulance.location}</p>
        <p>Status: {selectedAmbulance && selectedAmbulance.status}</p>
        <p>ETA: {selectedAmbulance && selectedAmbulance.eta} minutes</p>
      </Modal.Body>
    </Modal>
    </div>
  );
        };

export default AmbulanceList2;