const { GraphQLDate, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList, GraphQLID, GraphQLInt } = require('graphql');
const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  diagnosis: String,
  notes: String,
});

const Patient = mongoose.model('Patient', patientSchema);

// Define the GraphQL Object Type for Patient
const patientType = new GraphQLObjectType({
  name: 'Patient',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    gender: { type: GraphQLString },
    diagnosis: { type: GraphQLString },
    notes: { type: GraphQLString },
  })
});

// Define the GraphQL Query Type
const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    patients: {
      type: new GraphQLList(patientType),
      resolve: async () => {
        try {
          const patients = await Patient.find();
          return patients;
        } catch (error) {
          throw new Error('Error fetching patients');
        }
      }
    },
    patient: {
      type: patientType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (parent, args) => {
        try {
          const patient = await Patient.findById(args.id);
          return patient;
        } catch (error) {
          throw new Error('Error fetching patient');
        }
      }
    }
  })
});

// Define the GraphQL Mutation Type
const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createPatient: {
      type: patientType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        gender: { type: new GraphQLNonNull(GraphQLString) },
        diagnosis: { type: new GraphQLNonNull(GraphQLString) },
        notes: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (parent, args) => {
        try {
          const newPatient = new Patient(args);
          const savedPatient = await newPatient.save();
          return savedPatient;
        } catch (error) {
          throw new Error('Error creating patient');
        }
      }
    },
    updatePatient: {
      type: patientType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        gender: { type: GraphQLString },
        diagnosis: { type: GraphQLString },
        notes: { type: GraphQLString }
      },
      resolve: async (parent, args) => {
        try {
          const updatedPatient = await Patient.findByIdAndUpdate(args.id, args, { new: true });
          return updatedPatient;
        } catch (error) {
          throw new Error('Error updating patient');
        }
      }
    },
    deletePatient: {
      type: patientType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (parent, args) => {
        try {
          const deletedPatient = await Patient.findByIdAndDelete(args.id);
          return deletedPatient;
        } catch (error) {
          throw new Error('Error deleting patient');
        }
      }
    }
  })
});

// Export the GraphQL Schema
module.exports = new GraphQLSchema({
  query: queryType,
  mutation: mutation
});