var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var StudentModel = require('../models/Student');
var PatientModal = require('../models/Patient');
//
// Create a GraphQL Object Type for Student model
const patientType = new GraphQLObjectType({
    name: 'patient',
    fields: function () {
      return {
        _id: {
          type: GraphQLString
        },
        firstName: {
          type: GraphQLString
        },
        lastName: {
          type: GraphQLString
        },
        age: {
          type: GraphQLString
        },
        diagonosis: {
          type: GraphQLString
        },
        notes: {
          type: GraphQLString
        },
        hcnNo: {
          type: GraphQLInt
        }
        
        
      }
    }
  });
  //
  // create a GraphQL query type that returns all students or a student by id
  const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
      return {
        patients: {
          type: new GraphQLList(patientType),
          resolve: function () {
            const patients = PatientModal.find().exec()
            if (!patients) {
              throw new Error('Error')
            }
            return patients
          }
        },
        patient: {
          type: patientType,
          args: {
            id: {
              name: '_id',
              type: GraphQLString
            }
          },
          resolve: function (root, params) {
            const patientInfo = PatientModal.findById(params.id).exec()
            if (!studentInfo) {
              throw new Error('Error')
            }
            return patientInfo
          }
        }
      }
    }
  });
  //
  // add mutations for CRUD operations
  const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
      return {
        addPatient: {
          type: patientType,
          args: {
            firstName: {
              type: new GraphQLNonNull(GraphQLString)
            },
            lastName: {
              type: new GraphQLNonNull(GraphQLString)
            },
            age: {
              type: new GraphQLNonNull(GraphQLString)
            },
            diagonosis: {
              type: new GraphQLNonNull(GraphQLString)
            },
            notes: {
              type: new GraphQLNonNull(GraphQLString)
            },
            hcnNo: {
              type: new GraphQLNonNull(GraphQLInt)
            }
          },
          resolve: function (root, params) {
            const patientModel = new PatientModal(params);
            const newPatient = patientModel.save();
            if (!newPatient) {
              throw new Error('Error');
            }
            return newPatient
          }
        },
        updatePatient: {
          type: patientType,
          args: {
            id: {
              name: 'id',
              type: new GraphQLNonNull(GraphQLString)
            },
            firstName: {
              type: new GraphQLNonNull(GraphQLString)
            },
            lastName: {
              type: new GraphQLNonNull(GraphQLString)
            },
            age: {
              type: new GraphQLNonNull(GraphQLString)
            },
            diagonosis: {
              type: new GraphQLNonNull(GraphQLString)
            },
            notes: {
              type: new GraphQLNonNull(GraphQLString)
            },
            hcnNo: {
              type: new GraphQLNonNull(GraphQLInt)
            }
            
          },
          resolve(root, params) {
            return PatientModel.findByIdAndUpdate(params.id, { firstName: params.firstName, 
              lastName: params.lastName, age: params.age, diagonosis: params.diagonosis, 
              notes: params.notes, hcnNo: params.hcnNo 
               }, function (err) {
              if (err) return next(err);
            });
          }
        },
        deletePatient: {
          type: patientType,
          args: {
            id: {
              type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve(root, params) {
            const deletedPatient = PatientModal.findByIdAndRemove(params.id).exec();
            if (!deletedPatient) {
              throw new Error('Error')
            }
            return deletedPatient;
          }
        }
      }
    }
  });
  
  //
  module.exports = new GraphQLSchema({query: queryType, mutation: mutation});