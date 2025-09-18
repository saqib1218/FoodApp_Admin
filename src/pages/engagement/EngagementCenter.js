import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PaperAirplaneIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const EngagementCenter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  // Get partner data from navigation state
  const partnerData = location.state || {};
  const { partnerId, partnerName, partnerEmail, partnerPhone, openChat } = partnerData;
  
  // Debug: Log the received data
  console.log('EngagementCenter - Received navigation data:', partnerData);
  console.log('Partner details:', { partnerId, partnerName, partnerEmail, partnerPhone, openChat });

  // Load conversations - handle partner data from navigation
  useEffect(() => {
    console.log('EngagementCenter useEffect - Checking partner data:', { partnerId, partnerName, openChat });
    
    // If coming from kitchen partners tab with specific partner data
    if (partnerId && partnerName && openChat) {
      console.log('Creating partner conversation for:', partnerName);
      const partnerConversation = {
        id: partnerId,
        customer: {
          id: partnerId,
          name: partnerName,
          email: partnerEmail,
          phone: partnerPhone,
          avatar: null
        },
        lastMessage: {
          text: 'Start a conversation with this partner',
          timestamp: new Date().toISOString(),
          isCustomer: false
        },
        unread: 0,
        isPartner: true // Flag to identify partner conversations
      };
      
      // Set this as the only conversation and auto-select it with messages
      setConversations([partnerConversation]);
      
      // Initialize messages for the partner conversation
      const initialMessages = [
        {
          id: 1,
          text: `Chat started with ${partnerName}`,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
          isCustomer: false,
          isSystem: true
        }
      ];
      
      const selectedConv = {
        ...partnerConversation,
        messages: initialMessages
      };
      
      console.log('Setting selected conversation:', selectedConv);
      setSelectedConversation(selectedConv);
    } else {
      // Load conversations from API or keep empty if no data
      // TODO: Replace with actual API call to fetch conversations
      setConversations([]);
    }
    
    setIsLoading(false);
  }, [partnerId, partnerName, partnerEmail, partnerPhone, openChat]);

  // Fetch messages for a conversation
  const fetchMessages = (conversationId) => {
    // TODO: Replace with actual API call to fetch messages for the conversation
    // For now, return empty array for regular conversations
    const conversation = conversations.find(c => c.id === conversationId);
    if (conversation?.isPartner) {
      return [
        {
          id: 1,
          text: `Chat started with ${conversation.customer.name}`,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
          isCustomer: false,
          isSystem: true
        }
      ];
    }
    return [];
  };

  const handleSelectConversation = (conversation) => {
    // Mark conversation as read when selected
    const updatedConversations = conversations.map(c => 
      c.id === conversation.id ? { ...c, unread: 0 } : c
    );
    setConversations(updatedConversations);
    
    // Fetch messages for the selected conversation
    const messages = fetchMessages(conversation.id);
    setSelectedConversation({
      ...conversation,
      messages: messages || []
    });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!message.trim() || !selectedConversation) return;

    // Add the new message to the conversation
    const newMessage = {
      id: Date.now(),
      text: message,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      isCustomer: false
    };

    setSelectedConversation({
      ...selectedConversation,
      messages: [...selectedConversation.messages, newMessage],
      lastMessage: newMessage
    });

    // Update the conversation in the list
    const updatedConversations = conversations.map(c => 
      c.id === selectedConversation.id 
        ? { 
            ...c, 
            lastMessage: newMessage
          } 
        : c
    );
    setConversations(updatedConversations);

    // Clear the message input
    setMessage('');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Engagement Center</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage customer communications and support
        </p>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Conversations List */}
          <div className="border-r border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Conversations</h2>
            </div>
            <div className="overflow-y-auto h-[calc(100vh-250px)]">
              {isLoading ? (
                <div className="p-4 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto"></div>
                  <p className="mt-2 text-sm text-gray-500">Loading conversations...</p>
                </div>
              ) : conversations.length === 0 ? (
                <div className="p-4 text-center">
                  <p className="text-gray-500">No conversations found.</p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {conversations.map((conversation) => (
                    <li 
                      key={conversation.id}
                      className={`hover:bg-gray-50 cursor-pointer ${selectedConversation?.id === conversation.id ? 'bg-gray-50' : ''}`}
                      onClick={() => handleSelectConversation(conversation)}
                    >
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <UserCircleIcon className="h-10 w-10 text-gray-400" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {conversation.customer.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {conversation.lastMessage.timestamp}
                              </div>
                            </div>
                          </div>
                          {conversation.unread > 0 && (
                            <div className="flex-shrink-0">
                              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary-100 text-primary-800 text-xs font-medium">
                                {conversation.unread}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="mt-2">
                          <p className="text-sm text-gray-600 truncate">
                            {conversation.lastMessage.isCustomer ? (
                              <span className="font-medium">Customer: </span>
                            ) : (
                              <span className="font-medium">You: </span>
                            )}
                            {conversation.lastMessage.text}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Conversation Messages */}
          <div className="col-span-2 flex flex-col h-[calc(100vh-200px)]">
            {selectedConversation ? (
              <>
                {/* Header */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <UserCircleIcon className="h-10 w-10 text-gray-400" />
                    </div>
                    <div className="ml-3">
                      <div className="text-lg font-medium text-gray-900">
                        {selectedConversation.customer.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        Customer ID: {selectedConversation.customer.id}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedConversation.messages.map((msg) => (
                    <div 
                      key={msg.id}
                      className={`flex ${msg.isCustomer ? 'justify-start' : 'justify-end'}`}
                    >
                      <div 
                        className={`max-w-xs sm:max-w-md px-4 py-2 rounded-lg ${
                          msg.isCustomer 
                            ? 'bg-gray-100 text-gray-900' 
                            : 'bg-primary-100 text-primary-900'
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <p className="text-xs text-gray-500 mt-1">{msg.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200">
                  <form onSubmit={handleSendMessage} className="flex">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="flex-1 focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Type your message..."
                    />
                    <button
                      type="submit"
                      className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      <PaperAirplaneIcon className="h-5 w-5 mr-1" />
                      Send
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <UserCircleIcon className="h-16 w-16 text-gray-400 mx-auto" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No conversation selected</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Select a conversation from the list to view messages
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngagementCenter;
