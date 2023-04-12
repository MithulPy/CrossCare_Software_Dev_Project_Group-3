import React, { useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
//import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import { makeStyles } from '@material-ui/core/styles';
import RefreshIcon from '@material-ui/icons/Refresh';
import AddIcon from '@material-ui/icons/Add';

import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Typography,
  CircularProgress,
  Button,
} from '@material-ui/core';
import { DirectionsCar, LocationOn, CheckCircle, Warning } from '@material-ui/icons';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableHead: {
    fontWeight: 'bold',
    backgroundColor: theme.palette.primary.light,
  },
  green: {
    color: 'green',
  },
  blue: {
    color: 'blue',
  },
  red: {
    color: 'red',
  },
  orange: {
    color: 'orange',
  },
  black: {
    color: 'black',
  },
}));
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
  const classes = useStyles();
  const { loading, error, data, refetch } = useQuery(GET_AMBULANCES);
  const statusOptions = ["Available", "Unavailable", "On-Route"];
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [dispatchedAmbulances, setDispatchedAmbulances] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedAmbulance, setSelectedAmbulance] = useState(null);

  const handleDispatch = (ambulance) => {
    const timestamp = Date.now();
    console.log('Dispatching ambulance', ambulance._id, 'at', timestamp);
  
    // Update the status of the ambulance to "En Route"
    ambulance.status = "On-Route";
  
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
        setShowNotification(true)
        clearInterval(intervalId);
        setDispatchedAmbulances(
          dispatchedAmbulances.filter((dispatched) => dispatched._id !== ambulance._id)
        );
        // Update the status of the ambulance to "Reached Destination"
        ambulance.status = "Reached Destination";
        setNotificationMessage(`Ambulance ${ambulance._id} has reached its destination!`);
        
        localStorage.removeItem(`dispatch_${ambulance._id}`);
  
        // Remove the dispatched ambulance record from the table
        const updatedData = data.ambulances.filter((a) => a._id !== ambulance._id);
        refetch({ ...data, ambulances: updatedData });
      }
    }, 1000);
  
    setNotificationMessage(`Ambulance ${ambulance._id} has been dispatched!`);
    setShowNotification(true);
  };
  
  
  

  const handleTrack = (ambulance) => {
    setSelectedAmbulance(ambulance);
    setShowDetails(true);
  }

  if (loading)
  return (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
  <CircularProgress />
  </div>
  );
  if (error) return <Typography variant="h6">Error: {error.message}</Typography>;

  return (
    
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
    <Button variant="contained" color="primary" startIcon={<RefreshIcon />} onClick={() => refetch()}>
      Refresh
    </Button>

    <Link to="/addambulance" style={{ textDecoration: 'none', marginLeft: '10px' }}>
      <Button variant="contained" startIcon={<AddIcon />} color="primary">
        Add Ambulance
      </Button>
    </Link>
  </div>

<TableContainer component={Paper}>
<Table className={classes.table} aria-label="ambulance table">
<TableHead>
<TableRow>
<TableCell className={classes.tableHead}>ID</TableCell>
<TableCell className={classes.tableHead}>Crew Members</TableCell>
<TableCell className={classes.tableHead}>Location</TableCell>
<TableCell className={classes.tableHead}>Status</TableCell>
<TableCell className={classes.tableHead}>ETA</TableCell>
<TableCell className={classes.tableHead}>Actions</TableCell>
</TableRow>
</TableHead>
<TableBody>
          {data.ambulances.map((ambulance, index) => {
            const dispatched = dispatchedAmbulances.find((dispatched) => dispatched._id === ambulance._id);
            const remainingTime = dispatched ? Math.max(
              (dispatched.eta * 60 - (Date.now() - Date.parse(dispatched.timestamp)) / 1000) / 60,
              0
            ).toFixed(0) : null;
            return (
              <TableRow key={index}>
<TableCell>{ambulance._id}</TableCell>
<TableCell>{ambulance.crewMembers}</TableCell>
<TableCell>
{ambulance.status === 'Unavailable' ? 'Off-Duty' : ambulance.location}
</TableCell>
<TableCell
className={
dispatched
? ambulance.status === 'Reached Destination'
? classes.black
: classes.orange
: ambulance.status === 'Available'
? classes.green
: ambulance.status === 'On-Route'
? classes.blue
: classes.red
}
>
{dispatched ? (
ambulance.status === 'Reached Destination' ? (
'Reached Destination'
) : (
'On-Route'
)
) : (
ambulance.status
)}
</TableCell>
<TableCell>
{dispatched ? (
<span>{ambulance.eta} minutes</span>
) : (
<span>{ambulance.eta} minutes</span>
)}
</TableCell>
<TableCell>
                    

<Tooltip title="Dispatch">
<span>
<IconButton
aria-label="dispatch"
disabled={ambulance.status === 'Unavailable'}
onClick={() =>
handleDispatch({
...ambulance,
dispatchedAt: new Date().toISOString(),
})
}
>
<DirectionsCar />
</IconButton>
</span>
</Tooltip>

<Tooltip title="Track">
                  <span>
                    <IconButton aria-label="track" onClick={() => handleTrack(ambulance)}>
                      <LocationOn />
                    </IconButton>
                  </span>
                  </Tooltip>

                  </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </TableContainer>

  

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