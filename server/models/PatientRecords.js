const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  diagnosis: String,
  notes: String,
});

const appointmentSchema = new mongoose.Schema({
  patientId: mongoose.Schema.Types.ObjectId,
  date: Date,
  doctor: String,
  department: String,
});

const Patient = mongoose.model('Patient', patientSchema);
const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = { Patient, Appointment };
