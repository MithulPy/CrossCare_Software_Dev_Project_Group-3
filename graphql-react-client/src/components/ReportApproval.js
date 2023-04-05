import React from 'react';
import { gql, useQuery } from "@apollo/client";
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';


const GET_REPORT = gql`
    query getReport($firstName: String!, $lastName: String!, $email: String!, $number: String!, $name: String!, $issue: String!, $date: String!,$reporter:String!) {
        issues(firstName: $firstName, lastName: $lastName, email: $email, number: $number, name: $name, issue: $issue, date: $date, reporter:$reporter) {
            _id
            firstName
            lastName
            email
            number
            name
            issue
            date
            reporter
        }
    }
`;

const ReportList = ({ reportData }) => {

    const { loading, error, data , refetch } = useQuery(GET_REPORT, {
        variables: {
            firstName: reportData.firstName,
            lastName: reportData.lastName,
            email: reportData.email,
            number: reportData.number,
            name: reportData.name,
            issue: reportData.issue,
            date: reportData.date,
            reporter:reportData.reporter
        }
    });

    if (loading) return <Spinner animation="border" />;
    if (error) return <p>Error: {error.message}</p>;

    return (
    <div className='App'>
      <Jumbotron>
                <h1>First Name: {reportData.firstName}</h1>
                <h1>Last Name: {reportData.lastName}</h1>
                <h1>Email: {reportData.email }</h1>  
                <h1>Number: { reportData.number}</h1>
                <h1>Location: {reportData.name }</h1>
                <p>Description of issue: {reportData.issue }</p>
                <h1>Date: {reportData.date}</h1>
                <h1>Reporter: { reportData.reporter}</h1>

        <p>
          <Button type="button" variant="primary" >Approve</Button>&nbsp;
          <Button type="button" variant="danger" >Reject</Button>
        </p>
      </Jumbotron>
    </div>
  );
}

export default ReportList;
