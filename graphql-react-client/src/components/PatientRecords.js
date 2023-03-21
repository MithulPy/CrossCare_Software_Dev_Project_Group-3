import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, Card, Form, Button } from 'react-bootstrap';

const departments = [
  { id: 1, name: 'Department 1' },
  { id: 2, name: 'Department 2' },
  { id: 3, name: 'Department 3' },
];

const appointments = [
  {
    id: 1,
    patientId: 1,
    patientName: 'Patient 1',
    date: '2023-03-21',
    doctor: 'Doctor 1',
    department: 'Department 1',
  },
  {
    id: 2,
    patientId: 2,
    patientName: 'Patient 2',
    date: '2023-03-22',
    doctor: 'Doctor 2',
    department: 'Department 2',
  },
  {
    id: 3,
    patientId: 1,
    patientName: 'Patient 1',
    date: '2023-03-23',
    doctor: 'Doctor 3',
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
                      <Col xs={3}>{appointment.patientId}</Col>
                      <Col xs={3}>{appointment.patientName}</Col>
                      <Col xs={3}>{appointment.date}</Col>
                      <Col xs={3}>{appointment.doctor}</Col>
                    </Row>
                  </ListGroup.Item>
                ))
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PatientRecords;
