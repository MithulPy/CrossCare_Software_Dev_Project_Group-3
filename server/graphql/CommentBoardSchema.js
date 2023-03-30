const { gql } = require('apollo-server-express');

const typeDefs = gql
  type Message {
    id: ID!
    conversationId: ID!
    authorId: ID!
    text: String!
    timestamp: String!
  }

  type Conversation {
    id: ID!
    name: String!
    members: [ID!]!
  }

  type Query {
    messages(conversationId: ID!): [Message]!
    conversations: [Conversation]!
  }

  type Mutation {
    createConversation(name: String!, members: [ID!]!): Conversation!
    sendMessage(conversationId: ID!, authorId: ID!, text: String!): Message!
  }
`;

module.exports = typeDefs;
