import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Container, Row, Col, ListGroup, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';

const DEPARTMENTS_QUERY = gql`
  query {
    departments {
      id
      name
    }
  }
`;

const APPOINTMENTS_QUERY = gql`
  query Appointments($department: String) {
    appointments(department: $department) {
      id
      patientId
      patientName
      date
      doctor
      department
      diagnosis
      treatmentPlan
    }
  }
`;

const PatientRecords = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const { data: departmentsData } = useQuery(DEPARTMENTS_QUERY);

  const { data: appointmentsData } = useQuery(APPOINTMENTS_QUERY, {
    variables: { department: selectedDepartment },
  });

  const handleDepartmentSelect = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const filteredPatients = appointmentsData?.appointments || [];

  return (
    <div style={{ textAlign: "center", height: "700px", }}>
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
                      {departmentsData?.departments.map((department) => (
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
            <Link to="/addpatient">
              <Button variant="success" className="mt-3">Add Patient Record</Button>
            </Link>
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
