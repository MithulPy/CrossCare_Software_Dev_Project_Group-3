const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AmbulanceRequestSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
      location: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: ['pending', 'assigned', 'completed', 'cancelled'],
        default: 'pending',
      },
      emergencyInfo:{
        type: String,
        required: true,
      },
      requesterName:{
        type: String,
        required: true,
      },
      assignedAmbulance: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ambulance',
      },
});

module.exports = mongoose.model('AmbulanceRequest', AmbulanceRequestSchema);