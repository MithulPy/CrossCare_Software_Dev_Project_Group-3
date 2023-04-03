var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var PatientModal = require('../models/Patient');
var BillingInfoModal = require('../models/BillingInfo');
const BillingInfo = require('../models/BillingInfo');
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
          type: GraphQLString
        }
        
        
      }
    }
  });

  const billingType = new GraphQLObjectType({
    name: 'billing',
    fields: function () {
      return {
        _id: {
          type: GraphQLString
        },
        patient: {
          type: patientType,
          resolve(parent, args) {
            return PatientModal.findById(parent.patientId);
          }
        },
        date: {
            type: GraphQLDate
            },
        time: {
            type: GraphQLString
            },
        serviceType: {
            type: GraphQLString
            },
        serviceProvider: {
            type: GraphQLString
            },
        serviceLocation: {
            type: GraphQLString
            },
        totalBillAmount: {
            type: GraphQLInt
            },
        insuranceBilledAmount: {
            type: GraphQLInt
            },
        amountPaid: {
            type: GraphQLInt
            },
        paymentMethod: {
            type: GraphQLString
            },
        paymentDate: {
            type: GraphQLDate
        }, 
        
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
            console.log(patients)
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
            if (!patientInfo) {
              throw new Error('Error')
            }
            return patientInfo
          }
        },
        billingByPatientId : {
          type: billingType,
          args: {
            patientId: { type: GraphQLID }
          },
          resolve(parent, args) {
            return BillingInfo.find({ patientId: args.patientId });
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
              type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve: function (root, params) {
            const patientModel = new PatientModal(params);
            const newPatient = patientModel.save();
            console.log(newPatient)
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
              type: new GraphQLNonNull(GraphQLString)
            }
          },
          async resolve(parent, args) {
            const updatedPatient = await PatientModal.findByIdAndUpdate(
              args.id,
              {
                firstName: args.firstName,
                lastName: args.lastName,
                age: args.age,
                diagnosis: args.diagnosis,
                notes: args.notes,
                hcnNo: args.hcnNo
              },
              { new: true } // Returns the updated patient record instead of the old one
            ).exec();
        
            if (!updatedPatient) {
              throw new Error(`Patient with id ${args.id} not found`);
            }
        
            return updatedPatient;
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
        },

        addBilling: {
          type: billingType,
          args: {
            patientId: { type: GraphQLString },
            date: { type: GraphQLDate },
            time: { type: GraphQLString },
            serviceType: { type: GraphQLString },
            serviceProvider: { type: GraphQLString },
            serviceLocation: { type: GraphQLString },
            totalBillAmount: { type: GraphQLInt },
            insuranceBilledAmount: { type: GraphQLInt },
            amountPaid: { type: GraphQLInt },
            paymentMethod: { type: GraphQLString },
            paymentDate: { type: GraphQLDate },
          },
          resolve: async (root, args) => {
            try {
              const newBilling = new BillingInfo(args);
              const savedBilling = await newBilling.save();
              return savedBilling;
            } catch (error) {
              throw new Error(`Could not create billing: ${error.message}`);
            }
          },
        },
      }
    }
  });
  
  //
  module.exports = new GraphQLSchema({query: queryType, mutation: mutation});