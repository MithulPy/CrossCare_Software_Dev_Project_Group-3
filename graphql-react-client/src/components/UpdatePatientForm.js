import React, { useState } from "react";

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

export default UpdatePatientForm;
