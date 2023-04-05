//View.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddPatient from './AddPatient';
//
import { useQuery, useMutation, gql } from '@apollo/client';
import IncidentApprovalReject from './IncidentApprovalReject';
import CreateAmbulanceRequest from './CreateAmbulanceRequest';
// mutation to log the user out
const LOG_OUT_MUTATION = gql`
  mutation LogOut {
    logOut
  }
`;
// query to check if user is logged in
const LOGGED_IN_USER = gql`
  query IsLoggedIn {
    isLoggedIn
      
  }
`;
//
function View (props) {
  //
  const navigate = useNavigate();
  // read the info from props, coming from the ancestor component
  const { screen, setScreen } = props;
  // return a stateful value and funcion to update it
  const [data, setData] = useState();
  const [courseOperation, setCourseOperation] = useState('no-op');

  //
  const [logOut, { loading, error }] = useMutation(LOG_OUT_MUTATION);
  //
  const { data: isLoggedInData, loading: isLoggedInLoading, error: isLoggedInError } = useQuery(LOGGED_IN_USER);
      console.log('isLoggedInData: ',isLoggedInData)
    // Show loading indicator if data is still being fetched
    if (isLoggedInLoading) return <p>Loading...</p>;

    // Show error message if there was an error fetching the data
    if (isLoggedInError) return <p>Error: {isLoggedInError.message}</p>;
  //
  
  // called when user clicks on Verify Cookie button
  // end-point demonstrates another example for the use
  // of cookie specific response from the server.
  const verifyToken = async () => {
    try {
      const isLoggedIn = isLoggedInData.isLoggedIn;
      console.log('isLoggedIn:', isLoggedIn);
    } catch (err) {
      console.error(err.message);
    }
  };
  //
  /*
  const handleLogOut = async () => {
    try {
      await logOut();
      setScreen('auth')
      navigate('/login'); // navigate to the Login component after logging out
    } catch (err) {
      console.error(err.message);
    }
  };
  */
  const handleLogOut = () => {
    logOut()
      .then(() => {
        setScreen('auth')
        navigate('/login'); // navigate to the Login component after logging out
      })
      .catch((err) => {
        console.error(err.message);
      });
  };
  //
  return (
    <div className="App">
      {
        (() => {
          switch (courseOperation) {
            case 'addPatient':
              return <AddPatient/>
            case 'approvedenyincident':
              return <IncidentApprovalReject />

            case 'createambulancerequest':
            return <CreateAmbulanceRequest/>
            
            default:
              return <div>

       <p>{screen}</p>
      <p>{data}</p>

      <button onClick={() => setCourseOperation('addPatient')}>Add Patient</button>
      <button  className="mx-2" onClick={() => setCourseOperation('approvedenyincident')}>Approve or Deny Incident</button>
      <button  className="mx-2" onClick={() => setCourseOperation('createambulancerequest')}>Create Ambulance Request</button>
      <button  className="mx-2" onClick={handleLogOut}>Log out</button>   
              </div>         
           
          }
        })()
      }
    </div>
  );
}
//
export default View;
