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

const GET_BILLINGS = gql`
  {
    billings {
      _id
      patient {
        _id
        firstName
        lastName
        age
        diagonosis
        notes
        hcnNo
      }
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
//
const PatientList = () => {

    const navigate = useNavigate()
    const { loading, error, data , refetch } = useQuery(GET_PATIENTS);
    const [deletePatient] = useMutation(DELETE_PATIENT);
    const { loading: billingLoading, error: billingError, data: billingData } = useQuery(GET_BILLINGS);
    if (loading || billingLoading ) {
     // console.log(billingData.billing)
      return <p>Loading...</p>;
    }
    if (error || billingError) return <p>Error :(</p>;

    const handleAddBilling = (patientId) => {
      navigate(`/addbilling/${patientId}`);
    };
  
    const handleViewBilling = (patientId) => {
      navigate(`/viewbilling/${patientId}`);
    };

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
                {data.patients.map((patient) => {
            const billingExists = billingData?.billings?.some((billing) => {
              console.log(billing.patient._id, patient._id);
            return billing.patient._id === patient._id});
            return (
              <tr key={patient._id}>
                <td>{patient.firstName}</td>
                <td>{patient.lastName}</td>
                <td>{patient.age}</td>
                <td>{patient.diagonosis}</td>
                <td>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      deletePatient({ variables: { id: patient._id } });
                      navigate("/patientlist");
                    }}
                  >
                    <Link to={`/editpatient/${patient._id}`} className="btn btn-success">
                      Update
                    </Link><span>  </span><span>  </span>
                    <button type="submit" className="btn btn-danger">
                      Remove
                    </button><span>   </span><span>  </span>
                    {billingExists ? (
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => handleViewBilling(patient._id)}
                      >
                        View Billing Details
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => handleAddBilling(patient._id)}
                      >
                        Add Billing Details
                      </button>
                    )}
                  </form>
                </td>
              </tr>
            );
          })}
             </tbody>
            </Table>
            
            <div className="center">
                <button className = "center" onClick={() => refetch()}>Refetch</button>
            </div>
            
        </div>
        
    );
}

export default PatientList

