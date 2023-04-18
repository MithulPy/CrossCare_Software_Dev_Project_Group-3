import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner, Form, Button, Modal } from "react-bootstrap";

function DiseasePredictor(props) {
  const [showLoading, setShowLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState({
    title: "",
    probability: 0,
    bodyMsg: "",
  });
  const [modelAttr, setModelAttr] = useState({
    age: 0,
    cp: 0,
    sex: 1,
    trestbps: 120,
    chol: 200,
    thalach: 120,
    fbs: 0,
    exang: 0,
  });

 


  const apiUrl = "http://localhost:5000/api/ml/heartdisease";

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const predictDiseaseProbability = async (e) => {
    setShowLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post(apiUrl, modelAttr);
      console.log(response);
      setShowLoading(false);
      const probability = response.data;
      let title, bodyMsg;
      if (probability < 0.33) {
        title = "Good";
        bodyMsg = "You probably do not have heart disease!";
      } else if (probability < 0.66) {
        title = "Unsure";
        bodyMsg = "You might have heart disease.";
      } else {
        title = "Warning";
        bodyMsg = "You probably have heart disease - we suggest you seek a medical professional.";
      }
      setResult({
        probability: probability,
        title: title,
        bodyMsg: bodyMsg,
      });
      openModal();
    } catch (error) {
      setShowLoading(false);
      setShowError(true);
    }
  };

  const onChange = (e) => {
    e.persist();
    setModelAttr({ ...modelAttr, [e.target.name]: +e.target.value });
  };

  const onCheckChange = (e) => {
    e.persist();
    setModelAttr({ ...modelAttr, [e.target.name]: e.target.checked ? 1 : 0 });
  };

  const onCheckChangeOpp = (e) => {
    e.persist();
    setModelAttr({ ...modelAttr, [e.target.name]: e.target.checked ? 0 : 1 });
  };

  return (
    <div className="container-fluid d-flex justify-content-center margins">
      <div className="col-12">
        
      <div class="container-fluid text-sm-center p-5 bg-light"> 
          <h2 className="h3-style text-center bg-white text-black">
            Heart Disease
          </h2>
       </div>

        {showLoading && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
        <div className="container-fluid margins">
          {showError && (
            <span>
              Something went wrong. Our developers are working to fix it!
            </span>
          )}
          <div class="container-fluid text-sm-center p-5 bg-light"> 
            <Form onSubmit={predictDiseaseProbability}>
              <Form.Group>
                <Form.Label>Check the following:</Form.Label>
                <Form.Check
                  type="checkbox"
                  id="age"
                  name="age"
                  value={modelAttr.age === 1}
                  onChange={onCheckChange}
                  label="Older than 50 years old"
                />
                <Form.Check
                  type="checkbox"
                  id="cp"
                  name="cp"
                  value={modelAttr.cp === 1}
                  onChange={onCheckChange}
                  label="Have chest pains"
                />
                <Form.Check
                  type="checkbox"
                  id="fbs"
                  name="fbs"
                  value={modelAttr.fbs === 1}
                  onChange={onCheckChange}
                  label="Fasting blood sugar > 120 mg/dl"
                />
                <Form.Check
                  type="checkbox"
                  id="exang"
                  name="exang"
                  value={modelAttr.exang === 1}
                  onChange={onCheckChange}
                  label="Have angina from exercising"
                />
                <Form.Check
                  type="checkbox"
                  id="sex"
                  name="sex"
                  value={modelAttr.sex === 0}
                  onChange={onCheckChangeOpp}
                  label="Identify as a female"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Resting blood pressure (mmHg)</Form.Label>
                <Form.Control
                  type="number"
                  name="trestbps"
                  id="trestbps"
                  min="0"
                  max="300"
                  value={modelAttr.trestbps}
                  onChange={onChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Serum cholesterol in mg/dl</Form.Label>
                <Form.Control
                  type="number"
                  name="chol"
                  id="chol"
                  value={modelAttr.chol}
                  onChange={onChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Maximum heart rate achieved</Form.Label>
                <Form.Control
                  type="number"
                  name="thalach"
                  id="thalach"
                  value={modelAttr.thalach}
                  onChange={onChange}
                  required
                />
              </Form.Group>
              <div className="text-center">
                <Button variant="primary" type="submit">
                  Predict
                </Button>
              </div>
            </Form>
         </div>
        </div>

        <Modal show={showModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>{result.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Your heart disease probability is around{" "}
            {Math.round(result.probability * 100)}%.
            <br /> {result.bodyMsg}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default DiseasePredictor;
