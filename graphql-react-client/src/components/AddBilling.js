import React, { Component } from "react";
import { gql, useMutation } from "@apollo/client";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//
import { useNavigate,useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./entryform.css";
//
//
const ADD_BILLING_RECORD = gql`
  mutation AddBillingRecord(
    $patientId: String!, $date: Date!, 
    $time: String!, $serviceType: String!, 
    $serviceProvider: String!, $serviceLocation: String!, 
    $totalBillAmount: Int!, $insuranceBilledAmount: Int!, $amountPaid: Int!, 
    $paymentMethod: String!, $paymentDate: Date!) {
    addBilling(patientId: $patientId,
         date: $date,
          time: $time, 
          serviceType: $serviceType,
          serviceProvider: $serviceProvider,
          serviceLocation: $serviceLocation,
          totalBillAmount: $totalBillAmount, 
          insuranceBilledAmount: $insuranceBilledAmount,
          amountPaid: $amountPaid,
          paymentMethod: $paymentMethod,
          paymentDate: $paymentDate) {
      _id
      patientId
      date
      time
      serviceType
      serviceProvider
      serviceLocation
      totalBillAmount
      insuranceBilledAmount
      amountPaid
      paymentMethod
      paymentDate
    }
  }
`;

//function component to add a student
const AddBilling = () => {
  //
  let navigate = useNavigate();
  //
  const { patientId } = useParams()
  let date, time, serviceType, serviceProvider, serviceLocation, totalBillAmount, insuranceBilledAmount, amountPaid, paymentMethod, paymentDate;
  const [createBilling, { data, loading, error }] = useMutation(ADD_BILLING_RECORD);

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  return (
    <div className="entryform">
      <form
        onSubmit={(e) => {
          console.log(patientId, date.value, time.value, serviceType.value, serviceProvider.value, serviceLocation.value, totalBillAmount.value, insuranceBilledAmount.value, amountPaid.value, paymentMethod.value, paymentDate.value)
          e.preventDefault();
          createBilling({
            variables: {
              patientId: patientId,
              date: date.value,
              time: time.value,
              serviceType: serviceType.value,
              serviceProvider: serviceProvider.value,
              serviceLocation: serviceLocation.value,
              totalBillAmount: parseInt(totalBillAmount.value),
              insuranceBilledAmount: parseInt(insuranceBilledAmount.value),
              amountPaid: parseInt(amountPaid.value),
              paymentMethod: paymentMethod.value,
              paymentDate: paymentDate.value

            },
          });
          //
            date.value = "";
            time.value = "";
            serviceType.value = "";
            serviceProvider.value = "";
            serviceLocation.value = "";
            totalBillAmount.value = "";
            insuranceBilledAmount.value = "";
            amountPaid.value = "";
            paymentMethod.value = "";
            paymentDate.value = "";
          navigate('/patientlist')
        }}
      >
        <Form.Group>
          <Form.Label> Date:</Form.Label>
          <Form.Control
            type="date"
            name="date"
            ref={(node) => {
              date = node;
            }}
            placeholder="Enter the date:"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label> Time:</Form.Label>
          <Form.Control
            type="text"
            name="time"
            ref={(node) => {
              time = node;
            }}
            placeholder="Enter the time:"
          />
        </Form.Group>

        <Form.Group>
            <Form.Label> Service Type:</Form.Label>
            <Form.Control as="select" name="serviceType" ref={(node) => {   serviceType = node; }} >
                <option>Choose...</option>
                <option>Emergency response</option>
                <option>Critical care transport</option>
            </Form.Control>
        </Form.Group>

        <Form.Group>
            <Form.Label> Service Provider:</Form.Label>
            <Form.Control as="select" name="serviceProvider" ref={(node) => {   serviceProvider = node; }} >
                <option>Choose...</option>
                <option>Hospital-based ambulance service</option>
                <option>Public ambulance service</option>
                <option>Private ambulance service</option>
            </Form.Control>
        </Form.Group>

        <Form.Group>
            <Form.Label> Service Location:</Form.Label>
            <Form.Control as="select" name="serviceLocation" ref={(node) => {   serviceLocation = node; }} >
                <option>Choose...</option>
                <option>Residence</option>
                <option>Outpatient clinic</option>
                <option>Hospital</option>
                <option>Other</option>
            </Form.Control>
        </Form.Group>

        <Form.Group>
            <Form.Label> Total Bill Amount:</Form.Label>
            <Form.Control type="text" name="totalBillAmount" ref={(node) => {   totalBillAmount = node; }} >
            </Form.Control>
        </Form.Group>

        <Form.Group>
            <Form.Label> Insurance Billed Amount:</Form.Label>
            <Form.Control type="text" name="insuranceBilledAmount" ref={(node) => {   insuranceBilledAmount = node; }} >
            </Form.Control>
        </Form.Group>

        <Form.Group>
            <Form.Label> Amount Paid:</Form.Label>
            <Form.Control type="text" name="amountPaid" ref={(node) => {   amountPaid = node; }} >
            </Form.Control>
        </Form.Group>

        <Form.Group>
            <Form.Label> Payment Method:</Form.Label>
            <Form.Control as="select" name="paymentMethod" ref={(node) => {   paymentMethod = node; }} >
                <option>Choose...</option>
                <option>Cash</option>
                <option>Credit Card</option>
                <option>Other</option>
        </Form.Control>
        </Form.Group>

        <Form.Group>
            <Form.Label> Payment Date:</Form.Label>
            <Form.Control type="date" name="paymentDate" ref={(node) => {   paymentDate = node; }} >
            </Form.Control>
        </Form.Group>

        

        <Button variant="primary" type="submit">
          {" "}
          Submit Billing Details{" "}
        </Button>
      </form>
    </div>
  );
};

export default AddBilling;
