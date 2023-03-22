import React, { Component } from "react";
import { gql, useMutation } from "@apollo/client";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./entryform.css";
//
//
const ADD_PATIENT = gql`
  mutation AddPatient(
    $firstName: String!
    $lastName: String!
    $age: String!
    $diagonosis: String!
    $notes: String!
    $hcnNo: Int!
  ) {
    addPatient(
      firstName: $firstName
      lastName: $lastName
      age: $age
      diagonosis: $diagonosis
      notes: $notes
      hcnNo: $hcnNo
    ) {
      _id
    }
  }
`;
//function component to add a student
const AddPatient = () => {
  //
  let navigate = useNavigate();
  //
  let firstName, lastName, age, diagonosis, notes, hcnNo;
  const [addPatient, { data, loading, error }] = useMutation(ADD_PATIENT);

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  return (
    <div className="entryform">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addPatient({
            variables: {
              firstName: firstName.value,
              lastName: lastName.value,
              age: age.value,
              diagonosis: diagonosis.value,
              notes: notes.value,
              hcnNo: parseInt(hcnNo.value),
            },
          });
          //
          firstName.value = "";
          lastName.value = "";
          age.value = "";
          diagonosis.value = "";
          notes.value = "";
          hcnNo.value = "";
          navigate('/patientlist')
        }}
      >
        <Form.Group>
          <Form.Label> First Name:</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            ref={(node) => {
              firstName = node;
            }}
            placeholder="First Name:"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label> Last Name:</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            ref={(node) => {
              lastName = node;
            }}
            placeholder="Last Name:"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label> AGE:</Form.Label>
          <Form.Control
            type="text"
            name="age"
            ref={(node) => {
              age = node;
            }}
            placeholder="Age:"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label> Diagonosis:</Form.Label>
          <Form.Control
            type="text"
            name="diagonosis"
            ref={(node) => {
              diagonosis = node;
            }}
            placeholder="Diagonosis:"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label> Notes:</Form.Label>
          <Form.Control
            type="text"
            name="notes"
            ref={(node) => {
              notes = node;
            }}
            placeholder="Notes:"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label> HCN No:</Form.Label>
          <Form.Control
            type="text"
            name="hcnNo"
            ref={(node) => {
              hcnNo = node;
            }}
            placeholder="HCN No:"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {" "}
          Add Patient{" "}
        </Button>
      </form>
    </div>
  );
};

export default AddPatient;
