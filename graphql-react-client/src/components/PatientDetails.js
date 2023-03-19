import React, { useState, useEffect } from "react";

const PatientDetails = ({ patientId }) => {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await fetch(`/api/patients/${patientId}`);
        const data = await response.json();
        setPatient(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientDetails();
  }, [patientId]);

  const handleUpdate = async (updatedData) => {
    try {
      const response = await fetch(`/api/patients/${patientId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      const data = await response.json();
      setPatient(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading patient details...</div>;
  }

  if (!patient) {
    return <div>Patient not found.</div>;
  }

  return (
    <div>
      <h1>Patient Details</h1>
      <p>Name: {patient.name}</p>
      <p>Age: {patient.age}</p>
      <p>Gender: {patient.gender}</p>
      <p>Diagnosis: {patient.diagnosis}</p>
      <p>Notes: {patient.notes}</p>
      <UpdatePatientForm onUpdate={handleUpdate} initialValues={patient} />
    </div>
  );
};

const UpdatePatientForm = ({ onUpdate, initialValues }) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdate(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Patient Details</h2>
      <div>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={values.age}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Gender:
          <input
            type="text"
            name="gender"
            value={values.gender}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Diagnosis:
          <input
            type="text"
            name="diagnosis"
            value={values.diagnosis}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Notes:
          <textarea
            name="notes"
            value={values.notes}
            onChange={handleChange}
          />
        </label>
      </div>
      <button type="submit">Update</button>
    </form>
  );
};

export default PatientDetails;
