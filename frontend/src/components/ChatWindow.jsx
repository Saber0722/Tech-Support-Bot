import React from 'react';

const sentimentIcons = {
  positive: '😊👍',
  neutral: '🦊',
  negative: '😔',
  none: '',
};

const ChatWindow = ({ messages, isLoading, chatEndRef }) => {
  return (
    <div className="flex-1 bg-gradient-to-b from-gray-400 to-gray-800 p-4 overflow-y-auto">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`mb-4 flex ${
            msg.sender === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={`max-w-md p-4 rounded-lg ${
              msg.sender === 'user'
                ? 'bg-gradient-to-r from-gray-400 to-gray-600 text-white'
                : 'bg-gradient-to-r from-blue-400 to-blue-600 text-gray-1200 shadow-md'
            }`}
          >
            <p>{msg.text}</p>
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="flex justify-start mb-4">
          <div className="max-w-md p-4 rounded-lg bg-gray text-gray-900 shadow-md">
            <p><i className="fa-solid fa-circle-notch fa-spin"></i></p>
          </div>
        </div>
      )}
      <div ref={chatEndRef} />
    </div>
  );
};

export default ChatWindow;