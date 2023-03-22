var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var AmbulanceModel = require('../models/Ambulance');
var AmbulanceRequestModel = require('../models/AmbulanceRequest');

// Create a GraphQL Object Type for Ambulance model
const ambulanceType = new GraphQLObjectType({
  name: 'ambulance',
  fields: () => ({
    _id: { type: GraphQLString },
    crewMembers: { type: GraphQLString },
    location: { type: GraphQLString },
    status: { type: GraphQLString },
    eta: { type: GraphQLString }
  })
});

// Create a GraphQL query type that returns all ambulances or an ambulance by ID
const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: function () {
    return {
    ambulances: {
      type: new GraphQLList(ambulanceType),
      resolve: function () {
        const ambulances = AmbulanceModel.find().exec();
        if (!ambulances) {
          throw new Error('Error');
        }
        return ambulances;
      }
    },
    ambulance: {
      type: ambulanceType,
      args: {
        id: { name: '_id',
        type: GraphQLString }
      },
      resolve: function (root, params) {
        const ambulanceInfo = AmbulanceModel.findById(params.id).exec();
        if (!ambulanceInfo) {
          throw new Error('Error');
        }
        return ambulanceInfo;
      }
    }
  }
}
});

// Create a GraphQL mutation type for CRUD operations
const mutation = new GraphQLObjectType({
  name: 'MutationAmbulance',
  fields: function () {
    return {
    addAmbulance: {
      type: ambulanceType,
      args: {
        
        crewMembers: { type: new GraphQLNonNull(GraphQLString) },
        location: { type: new GraphQLNonNull(GraphQLString) },
        status: { type: new GraphQLNonNull(GraphQLString) },
        eta: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: function (root, params) {
        const ambulanceModel = new AmbulanceModel(params);
        const newAmbulance = ambulanceModel.save();
        if (!newAmbulance) {
          throw new Error('Error');
        }
        return newAmbulance;
      }
    },

    updateAmbulance: {
      type: ambulanceType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        crewMembers: { type: GraphQLString },
        location: { type: GraphQLString },
        status: { type: GraphQLString },
        eta: { type: GraphQLString }
      },
      resolve: function (root, params) {
        return AmbulanceModel.findByIdAndUpdate(
          params.id,
          { $set: params },
          { new: true }
        )
          .catch(err => new Error(err))
      }
    },
    deleteAmbulance: {
      type: ambulanceType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: function (root, params) {
        const removedAmbulance = AmbulanceModel.findByIdAndRemove(params.id).exec();
        if (!removedAmbulance) {
          throw new Error('Error')
        }
        return removedAmbulance;
      }
    },

    addAmbulanceRequest: {
        type: AmbulanceRequestType,
        args: {
          
            ambulanceRequestId: { type: new GraphQLNonNull(GraphQLString) },
            requesterName: { type: new GraphQLNonNull(GraphQLString) },
            location: { type: new GraphQLNonNull(GraphQLString) },
            status: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: function (root, params) {
          const ambulanceRequestModel = new AmbulanceRequestModel(params);
          console.log(params.ambulanceRequestId);
          const newAmbulanceRequest = ambulanceRequestModel.save();
          if (!newAmbulanceRequest) {
            throw new Error('Error');
          }
          return newAmbulanceRequest;
        }
      },
  
      updateAmbulanceRequest: {
        type: ambulanceType,
        args: {
            ambulanceRequestId: { type: new GraphQLNonNull(GraphQLString) },
            requesterName: { type:  new GraphQLNonNull(GraphQLString) },
            location: { type:  new GraphQLNonNull(GraphQLString) },
            status: { type:  new GraphQLNonNull(GraphQLString) },
        },
        resolve: function (root, params) {
          return AmbulanceRequestModel.findByIdAndUpdate(
            params.id,
            { $set: params },
            { new: true }
          )
            .catch(err => new Error(err))
        }
      },
      deleteAmbulanceRequest: {
        type: AmbulanceRequestType,
        args: {
          ambulanceRequestId: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve: function (root, params) {
          const removedAmbulance = AmbulanceRequestModel.findByIdAndRemove(params.ambulanceRequestId).exec();
          if (!removedAmbulance) {
            throw new Error('Error')
          }
          return removedAmbulance;
        }
      },
      assignAmbulance: {
        type: AmbulanceRequestType,
        args: {
          ambulanceRequestId: { type: new GraphQLNonNull(GraphQLString) },
          ambulanceId: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: async (parent, args) => {
          const updatedAmbulanceRequest = await AmbulanceRequestModel.findByIdAndUpdate(
            args.ambulanceRequestId,
            { assignedAmbulance: args.ambulanceId },
            { new: true }
          );
          if (!updatedAmbulanceRequest) {
            throw new Error('Error assigning ambulance to request');
          }
          return updatedAmbulanceRequest;
        },
      },


    }
     } });

    const AmbulanceRequestType = new GraphQLObjectType({
        name: 'AmbulanceRequest',
        fields: () => ({
          ambulanceRequestId: { type: GraphQLString },
          requesterName: { type: GraphQLString },
          location: { type: GraphQLString },
          status: { type: GraphQLString },
          assignedAmbulance: {
            type: ambulanceType,
            async resolve(parent) {
              if (!parent.assignedAmbulance) {
                console.log("hello")
                return null;
              }
              return await AmbulanceModel.findById(parent.assignedAmbulance);
            },
          },
        }),
      });
      
      
    const RootQueryType = new GraphQLObjectType({
        name: 'RootQuery',
        fields: {
          ambulanceRequests: {
            type: new GraphQLList(AmbulanceRequestType),
            async resolve() {
              return await AmbulanceRequestModel.find({});
            },
          },
          ambulanceRequest: {
            type: AmbulanceRequestType,
            args:  {
                ambulanceRequestId: { type: new GraphQLNonNull(GraphQLID) },
              },
            async resolve(parent, args) {
              return await AmbulanceRequestModel.findById(args.id);
            },
          },
        },
      });
      
      module.exports = RootQueryType;
;
// Export the GraphQL schema
module.exports = new GraphQLSchema({
  query: queryType,
  mutation: mutation
});
