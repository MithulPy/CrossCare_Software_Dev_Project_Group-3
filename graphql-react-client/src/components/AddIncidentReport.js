import React, { Component } from 'react';
import { gql, useMutation } from '@apollo/client';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

//
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./entryform.css"
//
//
const ADD_REPORT = gql`
    mutation addIncident(
        $issue: String!,
        $casenumber: String!,
        $date:Date! ,
        $medium:String!,
        $reporter:String! ,
        $location:String! ,
        $status:String!      
        
        ) {
        addIncident(
            issue:$issue,
            casenumber:$casenumber,
            date:$date,
            medium:$medium,
            reporter:$reporter,
            location:$location,
            status:$status
            ) {
            _id
        }
    }
`;
//function component to add a student
const AddIncidentReport = () => {
    //
    let navigate = useNavigate()
    //
    let  casenumber,issue,date,medium,reporter,location,status;
    const [addIncident, { data, loading, error }] = useMutation(ADD_REPORT);

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    return (
  <div className="entryform">
    <Container>
            <form
                onSubmit={ e => {    
                    e.preventDefault();
                    addIncident( { variables: { 
                        location:location.value, 
                        casenumber: casenumber.value,
                        issue: issue.value, 
                        date:date.value ,
                        medium:medium.value,
                        reporter:reporter.value,
                        status:'Pending'} 
                    });
                    //
                    location.value = '';
                    casenumber.value = '';
                    issue.value = '';
                    date.value = '';
                    medium.value = '';
                    reporter.value = '';
                    navigate('/incidentreportapproval')                    } 
                }
            >
                    <Form.Group>
                        <Form.Label> Case Mumber:</Form.Label>
                        <Form.Control type="string"  name="casenumber" ref={node => {casenumber = node; }} 
                            placeholder="Case Number" className="form-control"/>
                </Form.Group>
                
                <Form.Group>
                        <Form.Label> Incident Location:</Form.Label>
                        <Form.Control type="string"  name="location" ref={node => {location = node; }} 
                            placeholder="Location" className="form-control" />
                    </Form.Group>
                
                    <Form.Group>
                        <Form.Label>Description of incident:</Form.Label>
                    <Form.Control as="textarea" name="issue" rows={2} ref={node => { issue = node; }}
                    placeholder="Enter the description" className="form-control"/>
                </Form.Group>  

                <Form.Group>
                <Form.Label>Date of incident:</Form.Label>
                  <Form.Control type="date" name="date" ref={node => { date= node; }} className="form-control"/>
                    </Form.Group>

                <Form.Group>
                <Form.Label>Medium:</Form.Label>
                <Form.Control as="select" name="medium" ref={(node) => {   medium = node; }} >
                <option>Choose...</option>
                <option>Email</option>
                <option>Written-complaint</option>
                <option>Phone</option>
            </Form.Control>
                    </Form.Group>
                    
                    <Form.Group>
                <Form.Label>Reported By:</Form.Label>
                  <Form.Control type="text" name="reporter" ref={node => { reporter= node; }} className="form-control"/>
                </Form.Group>
                                         
                <br/>
                <Button variant="primary" type="submit" className="btn btn-primary">Submit</Button><span> </span><span>  </span>
                <Button variant="secondary" type="button" className="btn btn-secondary" aria-label="Cancel">Cancel</Button>

                </form>
                </Container>
        </div>
    );
}

export default AddIncidentReport
