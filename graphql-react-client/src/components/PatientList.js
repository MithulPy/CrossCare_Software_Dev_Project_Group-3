import React from 'react';
import {gql, useQuery,useMutation} from "@apollo/client";
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate ,useParams,Link} from 'react-router-dom'


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

const DELETE_PATIENT = gql`
  mutation deletePatient($id: String!) {
    deletePatient(id:$id) {
      _id
    }
  }
`;
//
const PatientList = () => {

    const navigate = useNavigate()
    const { loading, error, data , refetch } = useQuery(GET_PATIENTS);
    const [deletePatient] = useMutation(DELETE_PATIENT);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (

        <div>
            
            <Table >
                <tbody>
                <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Diagonosis</th>

                </tr>
                {data.patients.map((patient, index) => (
                        <tr key={index}>
                            <td>{patient.firstName}</td>
                            <td>{patient.lastName}</td>
                            <td>{patient.age}</td>
                            <td>{patient.diagonosis}</td>
                            <td>
                            <form
                                onSubmit={e => {
                                                    e.preventDefault();
                                                    deletePatient({ variables: { id: patient._id } });
                                                    navigate("/patientlist")}
                                               }>
                                                <Link to={`/editpatient/${patient._id}`} className="btn btn-success">Update</Link>&nbsp;
                                                <button type="submit" className="btn btn-danger">Remove</button>&nbsp;
                                                <Link to={`/addbilling/${patient._id}`} className="btn btn-primary">Add Billing Details</Link>&nbsp;
                            </form>
                            </td>
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

