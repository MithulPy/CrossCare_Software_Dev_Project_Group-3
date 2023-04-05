var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var IncidentModal = require('../models/IncidentReport');
//
// Create a GraphQL Object Type for Student model
const incidentType = new GraphQLObjectType({
    name: 'incident',
    fields: function () {
      return {
        _id: {
          type: GraphQLString
        },
         issue:{
            type: GraphQLString
         },
         casenumber:{
            type: GraphQLString
            },
        date:{
            type: GraphQLDate
            },
        medium:{
            type: GraphQLString
            },
        location:{
            type: GraphQLString
            },
        reporter:{
            type: GraphQLString
            },
        status:{
            type: GraphQLString
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
        incidents: {
          type: new GraphQLList(incidentType),
          resolve: function () {
            const incidents = IncidentModal.find().exec()
            console.log(incidents)
            if (!incidents) {
              throw new Error('Error')
            }
            return incidents
          }
        },
        incident: {
          type: incidentType,
          args: {
            id: {
              name: '_id',
              type: GraphQLString
            }
          },
          resolve: function (root, params) {
            const incidentInfo = IncidentModal.findById(params.id).exec()
            if (!incidentInfo) {
              throw new Error('Error')
            }
            return incidentInfo
          }
        },
      }
    }
  });
  //
  // add mutations for CRUD operations
  const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
      return {
        addIncident: {
          type: incidentType,
          args: {
            issue: {
                type: new GraphQLNonNull(GraphQLString)
            },
            casenumber: {
                type: new GraphQLNonNull(GraphQLString)
            },
            date: {
                type: new GraphQLNonNull(GraphQLDate)
            },
            medium: {
                type: new GraphQLNonNull(GraphQLString)
            },
            location: {
                type: new GraphQLNonNull(GraphQLString)
            },
            reporter: {
                type: new GraphQLNonNull(GraphQLString)
            },
            status: {
                type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve: function (root, params) {
            const incidentModel = new IncidentModal(params);
            const newIncident = incidentModel.save();
            console.log(newIncident)
            if (!newIncident) {
              throw new Error('Error');
            }
            return newIncident
          }
        },
      }
    }
  });
  
  //
  module.exports = new GraphQLSchema({query: queryType, mutation: mutation});