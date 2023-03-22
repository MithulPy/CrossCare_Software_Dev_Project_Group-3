import './App.css';
//
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
//import UserList from './components/UserList';
import CreateUser from './components/CreateUser';
import PatientRecords from "./components/PatientRecords";

import AddAmbulance from './components/AddAmbulance';
import AmbulanceList from './components/AmbulanceList';


import Login from './components/Login';
import Home from './components/Home';

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
              {/* <Nav.Link as={Link} to="/userlist">User List</Nav.Link> */}


              <Nav.Link as={Link} to="/patientrecords">
                Patient Records
              </Nav.Link>
              <Nav.Link as={Link} to="/ambulancelist">Ambulance List</Nav.Link>
              

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


        </Routes>
    </div>
      
      

    </Router>

</div>
  );
}
//<Route render ={()=> < App />} path="/" />
export default App;
