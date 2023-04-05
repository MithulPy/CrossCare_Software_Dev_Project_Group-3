import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { gql, useQuery, useMutation } from "@apollo/client"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const GET_PATIENT_EDIT = gql`
    query patient($patientId: String) {
        patient(id: $patientId) {
            _id
            firstName
            lastName
            age
            diagonosis
            notes
            hcnNo
        }
    }
`;

const EDIT_PATIENT = gql`
    mutation updatePatient(
        $id: String!,
        $firstName: String!,
        $lastName:String!,
        $age: String!,
        $diagonosis: String!, 
        $notes: String!,
        $hcnNo: String!)
        {
            updatePatient(
            id: $id , 
            firstName: $firstName,
            lastName: $lastName,
            age: $age,
            diagonosis: $diagonosis,
            notes: $notes,
            hcnNo: $hcnNo)
            {
                firstName,
                lastName,
                age,
                diagonosis,
                notes,
                hcnNo
        }
    }
`;
const EditPatient = () => {
    
    const { patientId } = useParams()
    const navigate = useNavigate()

    const { loading, error, data } = useQuery(GET_PATIENT_EDIT, { variables: { patientId } });
    const [updatePatient] = useMutation(EDIT_PATIENT);
    let firstName, lastName, age, diagonosis, notes, hcnNo;

    if (loading) return <p>Loading...</p>;
    const handleSubmit =async (e)=>{
        console.log(firstName.value ,",",lastName.value,",",age.value,",",diagonosis.value,",",hcnNo.value,",",notes.value);
        e.preventDefault()
        updatePatient({
            variables: { 
                id: patientId,
                firstName: firstName.value,
                lastName: lastName.value,
                age: age.value,
                diagonosis: diagonosis.value,
                notes: notes.value,
                hcnNo: hcnNo.value}
        })
        if(data){
            console.log(data.patient)
            navigate("/patientlist")
        }
        
    }

    return (
        <div>

            <div className='container'>
                
                <div className='row d-flex justify-content-center'>
                    <form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>First Name:</Form.Label>
                        <Form.Control type="text"  name="firstName" ref={node => { firstName = node;}}
                            placeholder="Enter the first name:"   defaultValue={data.patient.firstName}  />
                    </Form.Group>                   
              
                    <Form.Group>
                        <Form.Label>Last Name:</Form.Label>
                        <Form.Control type="text"  name="lastName"  ref={node => { lastName = node;}}
                            placeholder="Enter the last name:" defaultValue={data.patient.lastName}  />
                    </Form.Group>  

                    
                    <Form.Group>
                        <Form.Label>Age:</Form.Label>
                        <Form.Control type="text"  name="age" ref={node => { age = node;}} 
                        placeholder="Enter the age:" defaultValue={data.patient.age} />
                    </Form.Group>  

                    
                    <Form.Group>
                        <Form.Label>Diagonosis:</Form.Label>
                        <Form.Control type="text"  name="diagonosis" ref={node => { diagonosis = node;}}
                            placeholder="Enter the Diagonosis:" defaultValue={data.patient.diagonosis}  />
                    </Form.Group>  

                    <Form.Group>
                        <Form.Label>Notes:</Form.Label>
                        <Form.Control type="text"  name="notes" ref={node => { notes = node;}}
                            placeholder="Enter the Notes:" defaultValue={data.patient.notes}  />
                    </Form.Group>  

                    <Form.Group>
                        <Form.Label>Hcn No:</Form.Label>
                        <Form.Control type="text"  name="hcnNo" ref={node => { hcnNo = node;}}
                            placeholder="Enter the Notes:" defaultValue={data.patient.hcnNo}  />
                    </Form.Group>  

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default EditPatient