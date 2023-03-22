import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const departments = [
  { id: 1, name: 'Department 1' },
  { id: 2, name: 'Department 2' },
  { id: 3, name: 'Department 3' },
];

const appointments = [
  {
    id: 1,
    patientId: 1,
    patientName: 'Abby Smith',
    date: '2023-03-21',
    doctor: 'Dr.Jonathan Cherian',
    department: 'Department 1',
  },
  {
    id: 2,
    patientId: 2,
    patientName: 'Joe Lang',
    date: '2023-03-22',
    doctor: 'Dr.Phillip Matthew',
    department: 'Department 2',
  },
  {
    id: 3,
    patientId: 3,
    patientName: 'Tommy Johns',
    date: '2023-03-23',
    doctor: 'Dr.Grace Chacko',
    department: 'Department 3',
  },
  {
    id: 4,
    patientId: 4,
    patientName: 'Sarika Keety',
    date: '2021-05-22',
    doctor: 'Dr.Pillai',
    department: 'Department 2',
  },
  {
    id: 5,
    patientId: 5,
    patientName: 'Katy Homes',
    date: '2022-05-23',
    doctor: 'Dr.Martin',
    department: 'Department 3',
  },
];

const PatientRecords = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([]);

  useEffect(() => {
    // Filter appointments by selected department and sort by date
    const filtered = appointments
      .filter((appointment) => !selectedDepartment || appointment.department === selectedDepartment)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    setFilteredPatients(filtered);
  }, [selectedDepartment]);

  const handleDepartmentSelect = (event) => {
    setSelectedDepartment(event.target.value);
  };

  return (
    <div style={{ textAlign: "center", height: "700px",   }}>

    <Container fluid>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Header>Filter by Department and Date</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Department</Form.Label>
                  <Form.Control as="select" value={selectedDepartment} onChange={handleDepartmentSelect}>
                    <option value="">All Departments</option>
                    {departments.map((department) => (
                      <option key={department.id} value={department.name}>
                        {department.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Date Range</Form.Label>
                  <Form.Control type="date" />
                  <Form.Control type="date" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Apply Filters
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Header>Patient Records</Card.Header>
            <ListGroup variant="flush">
              {filteredPatients.length === 0 ? (
                <ListGroup.Item>No results found.</ListGroup.Item>
              ) : (
                filteredPatients.map((appointment) => (
                  <ListGroup.Item key={appointment.id}>
                    <Row>
                      <Col xs={2}>{appointment.patientId}</Col>
                      <Col xs={3}>{appointment.patientName}</Col>
                      <Col xs={2}>{appointment.date}</Col>
                      <Col xs={3}>{appointment.doctor}</Col>
                      <Col xs={2}>
                        <Link to={`/view-patient/${appointment.patientId}`}>
                          <Button variant="primary" size="sm" className="ml-2">View</Button>
                        </Link>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))
                
                
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default PatientRecords;
