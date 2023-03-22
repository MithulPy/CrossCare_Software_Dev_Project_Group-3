import './App.css';
//
import React from 'react';
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
//import UserList from './components/UserList';
import CreateUser from './components/CreateUser';
import PatientRecords from "./components/PatientRecords";

import AddAmbulance from './components/AddAmbulance';
import AmbulanceList from './components/AmbulanceList';


import Login from './components/Login';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import EditStudent from './components/EditStudent';
import DeleteStudent from './components/DeleteStudent';
import PatientList from './components/PatientList';
import AddPatient from './components/AddPatient';
import EditPatient from './components/EditPatient';
import Home from './components/Home';

//
function App() {

  return (
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
              {/* <Nav.Link as={Link} to="/userlist">User List</Nav.Link> */}


              <Nav.Link as={Link} to="/patientrecords">
                Patient Records
              </Nav.Link>
              <Nav.Link as={Link} to="/ambulancelist">Ambulance List</Nav.Link>

            

              {/* <Nav.Link as={Link} to="/addstudent">Add Student</Nav.Link>
              <Nav.Link as={Link} to="/studentlist">Student List</Nav.Link> */}

              <Nav.Link as={Link} to="/addpatient">Add Patient</Nav.Link>
              {/*<Nav.Link as={Link} to="/editpatient">Edit Patient</Nav.Link>*/}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div>
        <Routes>
          <Route index element={<Home />} />
          <Route path = "home" element={<Home />} /> 
          <Route path="login" element= {< Login />}  />
          {/* <Route path = "userlist" element={<UserList />} /> */}
          <Route path = "createuser" element={<CreateUser />} />
          

          <Route path="patientrecords" element={<PatientRecords />} />

          <Route path = "addambulance" element={<AddAmbulance />} />
          <Route path = "ambulancelist" element={<AmbulanceList />} />


          <Route path = "studentlist" element={<StudentList />} />
          <Route path = "addstudent" element={<AddStudent />} />
          <Route path = "editstudent" element={<EditStudent />} />
          <Route path = "deletestudent" element={<DeleteStudent />} />


              {/*PATIENT DETAILS*/ }
          <Route path="addPatient" element={<AddPatient/>}/>
          <Route path="editPatient" element={<EditPatient/>}/>
          <Route path = "patientlist" element={<PatientList />} />
        </Routes>
    </div>
      
      

    </Router>


  );
}
//<Route render ={()=> < App />} path="/" />
export default App;
