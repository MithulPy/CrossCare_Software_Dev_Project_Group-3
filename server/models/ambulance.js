const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AmbulanceSchema = new Schema({
  ambulanceId: {
    type: String,
    //required: true
  },
  crewMembers: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  eta: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Ambulance', AmbulanceSchema);