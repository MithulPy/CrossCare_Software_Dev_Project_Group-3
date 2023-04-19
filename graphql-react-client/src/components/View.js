import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddPatient from './AddPatient';
//
import './View.css'
import { useQuery, useMutation, gql } from '@apollo/client';
import IncidentApprovalReject from './IncidentApprovalReject';
import CreateAmbulanceRequest from './CreateAmbulanceRequest';
import CreateUser from './CreateUser';
import AmbulanceList2 from './AmbulanceList2';
import IncidentList from './IncidentList';
import DiseasePredictor from './DiseasePredictor';
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
  const userType = localStorage.getItem("userType");

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

  const handleLogOut = () => {
    logOut()
      .then(() => {
         //setScreen('auth')
         localStorage.removeItem('crosscarename') // navigate to the Login component after logging out
         localStorage.removeItem('userType')
         navigate('/home');
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
            
            case 'createuser':
              return <CreateUser/>  

            case 'ambulancelist':
              return <AmbulanceList2/>

            case 'incidentlist':
              return <IncidentList/>

            case 'diseaseprediction':
              return <DiseasePredictor/>
            default:
              return <div>
              {(userType === 'OperationCompliance' || userType === 'HealthcareProfessional') ? (
                <button onClick={() => setCourseOperation('addPatient')}>Add Patient</button>
              ) : null}
              {userType === 'OperationCompliance' ? (
                <button className="mx-2" onClick={() => setCourseOperation('approvedenyincident')}>
                  Approve or Deny Incident
                </button>
              ) : null}
              {(userType === 'OperationCompliance' || userType === 'EmergencyPersonnel') ? (
                <button className="mx-2" onClick={() => setCourseOperation('createambulancerequest')}>
                  Create Ambulance Request
                </button>
              ) : null}
              {userType === 'OperationCompliance' ? (
                <button className="mx-2" onClick={() => setCourseOperation('createuser')}>
                  Create User
                </button>
              ) : null}
              {userType === 'EmergencyPersonnel' ? (
                <button className="mx-2" onClick={() => setCourseOperation('ambulancelist')}>
                  Dispatch Ambulance List
                </button>
              ) : null}
              {userType === 'OperationCompliance' ? (
                <button className="mx-2" onClick={() => setCourseOperation('incidentlist')}>
                  Cross Care Incidents
                </button>
              ) : null}
              {userType === 'HealthcareProfessional' || userType === 'OperationCompliance' ? (
                <button className="mx-2" onClick={() => setCourseOperation('diseaseprediction')}>
                  Disease Prediction
                </button>
              ) : null}
              <button className="mx-2" onClick={handleLogOut}>
                Log out
              </button>
            </div>
                
           
          }
        })()
      }
    </div>
  );
}
//
export default View;
