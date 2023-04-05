import './App.css';
//
import Footer from './components/footer';

import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Routes
} from "react-router-dom";
//
// This app requires react-bootstrap and bootstrap installed: 
//  npm install react-bootstrap bootstrap
//
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import './App.css';
//
import UserList from './components/UserList';
import CreateUser from './components/CreateUser';
import PatientRecords from "./components/PatientRecords";
import CreateAmbulanceRequest from './components/CreateAmbulanceRequest';

import AddAmbulance from './components/AddAmbulance';
import AmbulanceList from './components/AmbulanceList';
import ViewPatientDetails from './components/ViewPatientDetails';
import DispatchDetails from './components/DispatchDetails';


import Login from './components/Login';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import EditStudent from './components/EditStudent';
import DeleteStudent from './components/DeleteStudent';
import PatientList from './components/PatientList';
import AddPatient from './components/AddPatient';
import EditPatient from './components/EditPatient';
import Home from './components/Home';
import DispatchSuccess from './components/DispatchSuccess';
import IncidentList from './components/IncidentList';
import CreateIncident from './components/CreateIncident';
import AddBilling from './components/AddBilling';
import ViewBillingInfo from './components/ViewBillingInfo';
//
function App() {
const [color,changeColor] =useState("#FFDAB9");
  return (
    <div style={{background: color}}>
    <Router>
      
      <Navbar bg="danger" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="home">Crosscare Ambulance Service System</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/home" >Home</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/createuser">Create User</Nav.Link>
              <Nav.Link as={Link} to="/createambulancerequest">Create Ambulance Request</Nav.Link>
              {/* <Nav.Link as={Link} to="/userlist">User List</Nav.Link> */}


              <Nav.Link as={Link} to="/patientrecords">
                Patient Records
              </Nav.Link>
              <Nav.Link as={Link} to="/ambulancelist">Ambulance List</Nav.Link>
              <Nav.Link as={Link} to="/incidentlist">Incident List</Nav.Link>



            

              {/* <Nav.Link as={Link} to="/addstudent">Add Student</Nav.Link>
              <Nav.Link as={Link} to="/studentlist">Student List</Nav.Link> */}

              
              {/*<Nav.Link as={Link} to="/addpatient">Add Patient</Nav.Link>*/}
              {/*<Nav.Link as={Link} to="/editpatient">Edit Patient</Nav.Link>*/}
              <Nav.Link as={Link} to="/patientlist">Patient List</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div>
        <Routes>
          <Route index element={<Home />} />
          <Route path = "home" element={<Home />} /> 
          <Route path="login" element= {< Login />}  />
          <Route path = "createuser" element={<CreateUser />} />
          <Route path = "createambulancerequest" element={<CreateAmbulanceRequest />} />

          <Route path="patientrecords" element={<PatientRecords />} />

          <Route path = "addambulance" element={<AddAmbulance />} />
          <Route path = "ambulancelist" element={<AmbulanceList />} />
          <Route exact path="/" component={PatientRecords} />
        <Route exact path="/view-patient/:patientId" element={<ViewPatientDetails/>} />
        <Route exact path="/dispatchdetails" element={<DispatchDetails/>} />
        <Route exact path="/dispatchsuccess" element={<DispatchSuccess/>} />
        <Route path = "incidentlist" element={<IncidentList />} />
        <Route path = "createincident" element={<CreateIncident />} />


          <Route path = "studentlist" element={<StudentList />} />
          <Route path = "addstudent" element={<AddStudent />} />
          <Route path = "editstudent" element={<EditStudent />} />
          <Route path = "deletestudent" element={<DeleteStudent />} />


              {/*PATIENT DETAILS*/ }
          <Route path="addPatient" element={<AddPatient/>}/>
          <Route path="editpatient/:patientId" element={<EditPatient />} />
          <Route path = "patientlist" element={<PatientList />} />
          <Route path="addbilling/:patientId" element={<AddBilling />} />
          <Route path="viewbilling/:billingId" element={<ViewBillingInfo />} />
        </Routes>
    </div>
      
      

    </Router>
    <Footer />

</div>
  );
}
//<Route render ={()=> < App />} path="/" />
export default App;
