import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Form, Button } from 'react-bootstrap';
import gql from 'graphql-tag';

const ADD_PATIENT_RECORD = gql`
  mutation AddPatientRecord(
    $patientName: String!,
    $dateOfBirth: String!,
    $gender: String!,
    $phone: String!,
    $email: String!,
    $address: String!,
  ) {
    addPatientRecord(
      patientName: $patientName,
      dateOfBirth: $dateOfBirth,
      gender: $gender,
      phone: $phone,
      email: $email,
      address: $address,
    ) {
      id
      patientName
      dateOfBirth
      gender
      phone
      email
      address
    }
  }
`;

const AddPatientRecord = () => {
  const [patientName, setPatientName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const [addPatientRecord, { loading }] = useMutation(ADD_PATIENT_RECORD);

  const handleSubmit = async (event) => {
    event.preventDefault();

    await addPatientRecord({
      variables: {
        patientName,
        dateOfBirth,
        gender,
        phone,
        email,
        address,
      },
      update: (cache, { data: { addPatientRecord } }) => {
        cache.modify({
          fields: {
            patients(existingPatients = []) {
              const newPatientRef = cache.writeFragment({
                data: addPatientRecord,
                fragment: gql`
                  fragment NewPatient on Patient {
                    id
                    patientName
                    dateOfBirth
                    gender
                    phone
                    email
                    address
                  }
                `
              });
              return [...existingPatients, newPatientRef];
            }
          }
        });
      }
    });

    setPatientName('');
    setDateOfBirth('');
    setGender('');
    setPhone('');
    setEmail('');
    setAddress('');
  };

  return (
    <div>
      <h2>Add Patient Record</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="patientName">
          <Form.Label>Patient Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter patient name"
            value={patientName}
            onChange={(event) => setPatientName(event.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="dateOfBirth">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            value={dateOfBirth}
            onChange={(event) => setDateOfBirth(event.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="gender">
          <Form.Label>Gender</Form.Label>
          <Form.Control
            as="select"
            value={gender}
            onChange={(event) => setGender(event.target.value)}
            required
          >
            <option value="">-- Select Gender --</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter phone number"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            required
            />
            </Form.Group>
        
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </Form.Group>
        
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                required
              />
            </Form.Group>
        
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add'}
            </Button>
          </Form>
        </div>
);
};

export default AddPatientRecord;        