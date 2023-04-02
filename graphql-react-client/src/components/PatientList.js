import React from 'react';
import {gql, useQuery} from "@apollo/client";
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
//
//
// To parse the GraphQL operations, we use a special function
// called a tagged template literal to allow us to express them
// as JavaScript strings. This function is named gql
//
// note the backquotes here
const GET_PATIENTS = gql`
{
    patients{
        _id,
      firstName,
      lastName,
      age,
      diagonosis,
      notes,
      hcnNo
      
    }
}
`;
//
const PatientList = () => {

    const { loading, error, data , refetch } = useQuery(GET_PATIENTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (

        <div>
            
            <Table >
                <tbody>
                <tr>
                        <th>firstName</th>
                        <th>lastName</th>
                        <th>age</th>
                        <th>diagonosis</th>

                </tr>
                {data.patients.map((patient, index) => (
                        <tr key={index}>
                            <td>{patient.firstName}</td>
                            <td>{patient.lastName}</td>
                            <td>{patient.age}</td>
                            <td>{patient.diagonosis}</td>

                        </tr>
                ))}
             </tbody>
            </Table>
            
            <div className="center">
                <button className = "center" onClick={() => refetch()}>Refetch</button>
            </div>
            
        </div>
        
    );
}

export default PatientList

