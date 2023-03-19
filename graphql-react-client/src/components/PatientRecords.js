import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, Card, Form, Button } from 'react-bootstrap';

const PatientRecords = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);

  useEffect(() => {
    // Fetch departments and appointments data from API
    const fetchDepartments = async () => {
      try {
        const response = await fetch('/api/departments');
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchAppointments = async () => {
      try {
        const response = await fetch('/api/appointments');
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDepartments();
    fetchAppointments();
  }, []);

  useEffect(() => {
    // Filter appointments by selected department and sort by date
    const filtered = appointments
      .filter((appointment) => appointment.department === selectedDepartment)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    setFilteredPatients(filtered);
  }, [selectedDepartment, appointments]);

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
