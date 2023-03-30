// Load the Mongoose module and Schema object
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Message = new Schema({
    id: ID,
    conversationId: ID,
    authorId: ID,
    text: String,
    timestamp: String,
	
});
const Conversation = new Schema({
    id: ID,
    name: String,
    members: [ID,],	
});
const Query = new Schema({
    messages(conversationId)
    conversations: [Conversation],	
});
const Mutation = new Schema({
    createConversation(name, members)
    sendMessage(conversationId, authorId, text)	
});
// Create the  model out of the Schema'
module.exports = mongoose.model('Message', CommentBoardSchema);



module.exports = typeDefs;
