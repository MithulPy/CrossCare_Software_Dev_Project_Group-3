import React, { useState } from 'react';
import './CreateIncident.css';

const CreateIncident = ({ onAddIncident }) => {
  const [newIncident, setNewIncident] = useState({
    caseNumber: '',
    medium: '',
    date: '',
    time: '',
    status: '',
    reporter: '',
    location: '',
    details: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewIncident((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddIncident(newIncident);
    setNewIncident({
      caseNumber: '',
      medium: '',
      date: '',
      time: '',
      status: '',
      reporter: '',
      location: '',
      details: '',
    });
  };

  return (
    <div className="create-incident-container">
      <h2>Create Incident</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="caseNumber">Case Number:</label>
          <input
            type="text"
            id="caseNumber"
            name="caseNumber"
            value={newIncident.caseNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="medium">Medium:</label>
          <input
            type="text"
            id="medium"
            name="medium"
            value={newIncident.medium}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="text"
            id="date"
            name="date"
            value={newIncident.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Time:</label>
          <input
            type="text"
            id="time"
            name="time"
            value={newIncident.time}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <input
            type="text"
            id="status"
            name="status"
            value={newIncident.status}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="reporter">Reporter:</label>
          <input
            type="text"
            id="reporter"
            name="reporter"
            value={newIncident.reporter}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={newIncident.location}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="details">Details:</label>
          <textarea
            id="details"
            name="details"
            value={newIncident.details}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateIncident;
