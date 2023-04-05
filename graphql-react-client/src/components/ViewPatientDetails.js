import React from 'react';
import { useParams } from 'react-router-dom';
import { Card } from 'react-bootstrap';

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
    diagnosis: 'Common cold',
    treatmentPlan: 'Rest and plenty of fluids',
  },
  {
    id: 2,
    patientId: 2,
    patientName: 'Joe Lang',
    date: '2023-03-22',
    doctor: 'Dr.Phillip Matthew',
    department: 'Department 2',
    diagnosis: 'High blood pressure',
    treatmentPlan: 'Prescription medication and lifestyle changes',
  },
  {
    id: 3,
    patientId: 3,
    patientName: 'Tommy Johns',
    date: '2023-03-23',
    doctor: 'Dr.Grace Chacko',
    department: 'Department 3',
    diagnosis: 'Broken arm',
    treatmentPlan: 'X-rays and surgery',
  },
  {
    id: 4,
    patientId: 4,
    patientName: 'Sarika Keety',
    date: '2021-05-22',
    doctor: 'Dr.Pillai',
    department: 'Department 2',
    diagnosis: 'Migraine',
    treatmentPlan: 'Prescription medication and lifestyle changes',
  },
  {
    id: 5,
    patientId: 5,
    patientName: 'Katy Homes',
    date: '2022-05-23',
    doctor: 'Dr.Martin',
    department: 'Department 3',
    diagnosis: 'Sprained ankle',
    treatmentPlan: 'Rest and physical therapy',
  },
];

const ViewPatientDetails = () => {
  const { patientId } = useParams();
  const patient = appointments.find((appointment) => appointment.patientId.toString() === patientId);
  if (!patient) {
    return <p>No patient found with ID {patientId}</p>;
  }
  return (
    <div style={{ height: "700px"  }}>
      <Card className="mt-4">
        <Card.Header>
          <h2>Patient Details</h2>
        </Card.Header>
        <Card.Body>
          <ul>
            <li>Patient ID: {patient.patientId}</li>
            <li>Name: {patient.patientName}</li>
            <li>Date: {patient.date}</li>
            <li>Doctor: {patient.doctor}</li>
            <li>Department: {patient.department}</li>
            <li>Diagnosis: {patient.diagnosis}</li>
            <li>Treatment Plan: {patient.treatmentPlan}</li>
          </ul>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ViewPatientDetails;
