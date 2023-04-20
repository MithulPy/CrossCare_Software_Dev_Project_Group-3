import React from 'react';
import { gql, useQuery ,useMutation} from "@apollo/client";
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';


const GET_INCIDENTS = gql`{
        incidents {
            _id
            issue
            casenumber
            date
            medium
            location
            reporter
            status
        }
    }
`;

const UPDATE_INCIDENT_STATUS = gql`
  mutation updateIncidentStatus($_id: String!, $status: String!) {
    updateIncidentStatus(id: $_id, status: $status) {
      _id
      issue
      casenumber
      date
      medium
      location
      reporter
      status
    }
  }
`;

const IncidentApprovalReject = ({ reportData }) => {

    const { loading, error, data , refetch } = useQuery(GET_INCIDENTS);
    const [updateIncidentStatus] = useMutation(UPDATE_INCIDENT_STATUS);

    if (loading) return <Spinner animation="border" />;
    if (error) return <p>Error: {error.message}</p>;

    const handleApprove = async (_id) => {
      await updateIncidentStatus({ variables: { _id, status: 'Approved' } });
      refetch();
    };
  
    const handleReject = async (_id) => {
      await updateIncidentStatus({ variables: { _id, status: 'Rejected' } });
      refetch();
    };

    return (
      <div className='App'>
      <table className="table table-striped table-bordered table-hover m-5" style={{backgroundColor: "#ffdab9", borderRadius: "10px"}}>
                        <thead style={{backgroundColor: "#f8d7ba", fontWeight: "bold"}}>
                            <tr>
                                <th scope="col">Case Number</th>
                                <th scope="col">Location</th>
                                <th scope="col">Description of Issue</th>
                                <th scope="col">Date</th>
                                <th scope="col">Reporter</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.incidents.map((elem, key) => {
                                    return (
                                        <tr key={elem._id}>
                                            <td>{elem.casenumber}</td>
                                            <td>{elem.location}</td>
                                            <td>{elem.issue}</td>
                                            <td>{elem.date}</td>
                                            <td>{elem.reporter}</td>
                                            <td>
                  {elem.status === 'Pending' && (
                    <>
                      <Button
                        type="button"
                        variant="outline-success"
                        onClick={() => handleApprove(elem._id)}
                      >
                        Approve
                      </Button>
                      <Button
                        type="button"
                        variant="outline-danger"
                        onClick={() => handleReject(elem._id)}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  {elem.status === 'Approved' && <span style={{color: "green", fontWeight: "bold"}}>Approved</span>}
                  {elem.status === 'Rejected' && <span style={{color: "red", fontWeight: "bold"}}>Rejected</span>}
                </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

      
</div>

  );
}

export default IncidentApprovalReject;
