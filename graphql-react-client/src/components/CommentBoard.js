import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_MESSAGES_BY_CONVERSATION_ID, CREATE_CONVERSATION, SEND_MESSAGE } from './queries';

function CommentBoard() {
  const [conversationId, setConversationId] = useState('');
  const [messageText, setMessageText] = useState('');
  const [members, setMembers] = useState([]);
  const [conversationName, setConversationName] = useState('');

  const { loading, error, data } = useQuery(GET_MESSAGES_BY_CONVERSATION_ID, {
    variables: { conversationId },
  });

  const [createConversation] = useMutation(CREATE_CONVERSATION, {
    update(cache, { data: { createConversation } }) {
      cache.modify({
        fields: {
          conversations(existingConversations = []) {
            const newConversationRef = cache.writeFragment({
              data: createConversation,
              fragment: gql`
                fragment NewConversation on Conversation {
                  id
                  name
                  members {
                    id
                  }
                }
              `,
            });
            return [...existingConversations, newConversationRef];
          },
        },
      });
    },
  });

  const [sendMessage] = useMutation(SEND_MESSAGE, {
    update(cache, { data: { sendMessage } }) {
      cache.modify({
        fields: {
          messages(existingMessages = []) {
            const newMessageRef = cache.writeFragment({
              data: sendMessage,
              fragment: gql`
                fragment NewMessage on Message {
                  id
                  conversationId
                  authorId
                  text
                  timestamp
                }
              `,
            });
            return [...existingMessages, newMessageRef];
          },
        },
      });
    },
  });

  useEffect(() => {
    if (data && data.messages) {
      // do something with the messages
    }
  }, [data]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (conversationId) {
      await sendMessage({ variables: { conversationId, authorId: 'my-user-id', text: messageText } });
    } else {
      await createConversation({ variables: { name: conversationName, members } });
    }
    setMessageText('');
    setConversationName('');
    setMembers([]);
  };

  return (
    <div>
      {loading && <p>Loading messages...</p>}
      {error && <p>Error loading messages</p>}
      {data && data.messages.map((message) => (
        <div key={message.id}>
          <p>{message.text}</p>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        {conversationId ? (
          <div>
            <input type="text" value={messageText} onChange={(e) => setMessageText(e.target.value)} />
            <button type="submit">Send</button>
          </div>
        ) : (
          <div>
            <input type="text" value={conversationName} onChange={(e) => setConversationName(e.target.value)} />
            <input type="text" value={members} onChange={(e) => setMembers(e.target.value)} />
            <button type="submit">Create conversation</button>
          </div>
        )}
      </form>
    </div>
  );
}
