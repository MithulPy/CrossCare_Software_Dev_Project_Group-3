import React, { useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';


const GET_AMBULANCES = gql`
  {
    ambulances {
      _id
      crewMembers
      location
      status
      eta
    }
  }
`;

const UPDATE_AMBULANCE = gql`
  mutation updateAmbulance($id: ID!, $input: AmbulanceInput!) {
    updateAmbulance(id: $id, input: $input) {
      _id
      crewMembers
      location
      status
      eta
    }
  }
`;

const DELETE_AMBULANCE = gql`
  mutation deleteAmbulance($id: ID!) {
    deleteAmbulance(id: $id)
  }
`;


const AmbulanceList = () => {
  const { loading, error, data, refetch } = useQuery(GET_AMBULANCES);
  const [editingAmbulance, setEditingAmbulance] = useState(null);
  const [updateAmbulance] = useMutation(UPDATE_AMBULANCE);
  const statusOptions = ["Available", "Unavailable", "En Route"];
  const [deleteAmbulance] = useMutation(DELETE_AMBULANCE);

const handleDelete = async (id) => {
  await deleteAmbulance({
    variables: {
      id: id,
    },
  });
  refetch();
};



  const handleEdit = (ambulance) => {
    setEditingAmbulance(ambulance);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const { _id, crewMembers, location, status, eta } = editingAmbulance;
    await updateAmbulance({
      variables: {
        id: _id,
        input: { crewMembers, location, status, eta },
      },
    });
    setEditingAmbulance(null);
  };

  const handleCancel = () => {
    setEditingAmbulance(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Crew Members</th>
            <th>Location</th>
            <th>Status</th>
            <th>ETA</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.ambulances.map((ambulance, index) => {
            const isEditing = editingAmbulance && editingAmbulance._id === ambulance._id;
            return (
              <React.Fragment key={index}>
                <tr>
                  <td>{ambulance._id}</td>
                  <td>{ambulance.crewMembers}</td>
                  <td>{ambulance.location}</td>
                  <td>{ambulance.status}</td>
                  <td>{ambulance.eta}</td>
                  <td>
                    {isEditing ? (
                      <>
                        <Button variant="success" size="sm" className="mr-2" onClick={handleSave}>
                          Save
                        </Button>
                        <Button variant="secondary" size="sm" onClick={handleCancel}>
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="primary" size="sm" className="mr-2" onClick={() => handleEdit(ambulance)}>
                          Edit
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => handleDelete(ambulance._id)}>
      Delete
    </Button>
                      </>
                    )}
                  </td>
                </tr>
                {isEditing && (
                  <tr>
                    <td></td>
                    <td>
                      <input
                        type="text"
                        value={editingAmbulance.crewMembers}
                        onChange={(event) =>
                          setEditingAmbulance({ ...editingAmbulance, crewMembers: event.target.value })
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={editingAmbulance.location}
                        onChange={(event) =>
                          setEditingAmbulance({ ...editingAmbulance, location: event.target.value })
                        }
                      />
                    </td>
                    <td>
                    <select
  value={editingAmbulance.status}
  onChange={(event) => setEditingAmbulance({ ...editingAmbulance, status: event.target.value })}
>
  {statusOptions.map((option) => (
    <option key={option} value={option} style={{ color: option === "Available" ? "green" : option === "Unavailable" ? "red" : "blue" }}>
      {option}
    </option>
  ))}
</select>

</td>

                    <td>
                      <input
                        type="text"
                        value={editingAmbulance.eta}
                        onChange={(event) => setEditingAmbulance({ ...editingAmbulance, eta: event.target.value })}
                      />
                    </td>
                    <td></td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </Table>
      <div className="center">
        <Button variant="success" size="sm" onClick={() => refetch()}>
          Refresh
        </Button>

        <Link to="/addambulance">
          <Button variant="primary" size="sm" className="ml-2">
            Add Ambulance
          </Button>
        </Link>


      </div>
    </div>
  );
}

export default AmbulanceList