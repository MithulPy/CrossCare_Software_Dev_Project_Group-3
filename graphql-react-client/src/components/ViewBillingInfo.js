import React, { useEffect, useState } from 'react'
import { useNavigate ,useParams} from 'react-router-dom'
import { gql, useQuery, useMutation } from "@apollo/client"
import { Link } from 'react-router-dom';

const GET_BILLING = gql`
    query billing($billingId: String) {
        billing(id: $billingId) {
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


const ViewBillingInfo = () => {
    const navigate = useNavigate()

    const { billingId } = useParams()
    const { loading, error, data } = useQuery(GET_BILLING, { variables: { billingId } });


    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

        
    return (
                    <div className="container">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                            <br/>
                            <h6><Link to="/patientlist">Back to Patient List</Link></h6>
                                <h3 className="panel-title">
                                {data.billing.patient.firstName} {data.billing.patient.lastName}
                                </h3>
                            </div>
                            <div className="panel-body">
                                <dl>
                                    <dt>Date:</dt>
                                    <dd>{data.billing.date}</dd>
                                    <dt>Time:</dt>
                                    <dd>{data.billing.time}</dd>
                                    <dt>Service Type:</dt>
                                    <dd>{data.billing.serviceType}</dd>
                                    <dt>Service Provider:</dt>
                                    <dd>{data.billing.serviceProvider}</dd>
                                    <dt>Service Location:</dt>
                                    <dd>{data.billing.serviceLocation}</dd>
                                    <dt>Total Bill Amount:</dt>
                                    <dd>{data.billing.totalBillAmount}</dd>
                                    <dt>Insurance Billed Amount:</dt>
                                    <dd>{data.billing.insuranceBilledAmount}</dd>
                                    <dt>Amount Paid:</dt>
                                    <dd>{data.billing.amountPaid}</dd>
                                    <dt>Payment Method:</dt>
                                    <dd>{data.billing.paymentMethod}</dd>
                                    <dt>Payment Date:</dt>
                                    <dd>{data.billing.paymentDate}</dd>
                                </dl>
                                   
                            </div>
                        </div>
                    </div>
                );
            
  }


export default ViewBillingInfo;