import React, { useState, useRef, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function Message({ type, username, children }) {
  const messageClass =
    type === 'inbound'
      ? 'bg-gradient-to-r from-gray-700 to-gray-900 text-white'
      : 'bg-gradient-to-r from-indigo-500 to-purple-700 text-white';

  return (
    <div
      className={`${messageClass} p-3 rounded-xl mb-2 max-w-xs ${type === 'outbound' ? 'ml-auto' : ''}`}
    >
      <strong>{type === 'inbound' ? 'ScopeBot' : username}</strong>
      <p className="break-words whitespace-normal">{children}</p>
    </div>
  );
}

function ChatuiApp() {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [username, setUsername] = useState('');
  const messagesEndRef = useRef(null);
  const auth = getAuth();

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, set the username
        // You can choose which property to use: displayName, email, etc.
        setUsername(user.displayName || user.email || 'User');
      } else {
        // No user is signed in
        setUsername('Guest');
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  const sendMessage = () => {
    if (messageText.trim() && username) {
      setMessages([...messages, { 
        type: 'outbound', 
        text: messageText.trim(),
        username: username
      }]);
      setMessageText('');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white font-sans h-screen flex flex-col pt-4">
      <div className="conversation-container flex-1 p-10 flex flex-col gap-4 overflow-hidden">
        <div className="messages-container bg-[#2f302f] p-4 rounded-xl flex-1 overflow-y-auto hide-scrollbar flex flex-col">
          <div className="flex-1 overflow-y-auto">
            {messages.map((message, index) => (
              <Message 
                key={index} 
                type={message.type}
                username={message.username || username}
              >
                {message.text}
              </Message>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="message-input-container mt-1 flex items-center gap-4 bg-[#2f302f] p-2.5 rounded-xl">
          <textarea
            id="prompt"
            className="prompt-input flex-1 p-3 border border-gray-700 rounded-lg resize-none shadow-md bg-[#2f302f] text-white focus:ring focus:ring-indigo-500 max-h-32"
            placeholder="Type your message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            rows={3}
            disabled={!username}
          ></textarea>
          <button
            id="send-button"
            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold p-4 rounded-full shadow-lg hover:opacity-90 transition-transform transform hover:scale-105"
            onClick={sendMessage}
            disabled={!messageText.trim() || !username}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatuiApp;



// import React, { useState, useRef, useEffect } from 'react';

// function Message({ type, children }) {
//   const messageClass =
//     type === 'inbound'
//       ? 'bg-gradient-to-r from-gray-700 to-gray-900 text-white'
//       : 'bg-gradient-to-r from-indigo-500 to-purple-700 text-white';

//   return (
//     <div
//       className={`${messageClass} p-3 rounded-xl mb-2 max-w-xs ${type === 'outbound' ? 'ml-auto' : ''}`}
//     >
//       <strong>{type === 'inbound' ? 'ScopeBot' : 'You'}</strong>
//       <p className="break-words whitespace-normal">{children}</p>
//     </div>
//   );
// }

// function ChatuiApp() {
//   const [messages, setMessages] = useState([
//     { type: 'inbound', text: 'Hello! How can I assist you today?' }
//   ]);
//   const [messageText, setMessageText] = useState('');
//   const messagesEndRef = useRef(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const simulateBotResponse = (userMessage) => {
//     // Simulated bot responses based on user input
//     const responses = {
//       deployment: "For deployment, we recommend using Docker containers with Kubernetes for scalability and easy management of your application infrastructure.",
//       help: "I'm here to help! What specific assistance do you need?",
//       default: "Interesting message! Could you tell me more about what you're looking for?"
//     };

//     // Simple keywords matching for bot response
//     const lowerMessage = userMessage.toLowerCase();
//     let botResponse = responses.default;

//     if (lowerMessage.includes('deployment')) {
//       botResponse = responses.deployment;
//     } else if (lowerMessage.includes('help')) {
//       botResponse = responses.help;
//     }

//     return botResponse;
//   };

//   const sendMessage = () => {
//     if (messageText.trim()) {
//       // Add user message
//       const newMessages = [...messages, { type: 'outbound', text: messageText.trim() }];
//       setMessages(newMessages);
      
//       // Simulate bot typing and response
//       setIsLoading(true);
      
//       setTimeout(() => {
//         // Generate bot response
//         const botResponse = simulateBotResponse(messageText);
        
//         // Add bot message
//         setMessages([
//           ...newMessages, 
//           { type: 'inbound', text: botResponse }
//         ]);
        
//         setIsLoading(false);
//       }, 1000); // Simulates typing delay

//       // Clear input
//       setMessageText('');
//     }
//   };

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   return (
//     <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white font-sans h-screen flex flex-col pt-4">
//       <div className="conversation-container flex-1 p-10 flex flex-col gap-4 overflow-hidden">
//         <div className="messages-container bg-[#2f302f] p-4 rounded-xl flex-1 overflow-y-auto hide-scrollbar flex flex-col">
//           <div className="flex-1 overflow-y-auto">
//             {messages.map((message, index) => (
//               <Message key={index} type={message.type}>
//                 {message.text}
//               </Message>
//             ))}
//             {isLoading && (
//               <Message type="inbound">
//                 <div className="animate-pulse">Typing...</div>
//               </Message>
//             )}
//             <div ref={messagesEndRef} />
//           </div>
//         </div>

//         <div className="message-input-container mt-1 flex items-center gap-4 bg-[#2f302f] p-2.5 rounded-xl">
//           <textarea
//             id="prompt"
//             className="prompt-input flex-1 p-3 border border-gray-700 rounded-lg resize-none shadow-md bg-[#2f302f] text-white focus:ring focus:ring-indigo-500 max-h-32"
//             placeholder="Type your message..."
//             value={messageText}
//             onChange={(e) => setMessageText(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === 'Enter' && !e.shiftKey) {
//                 e.preventDefault();
//                 sendMessage();
//               }
//             }}
//             rows={3}
//           ></textarea>
//           <button
//             id="send-button"
//             className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold p-4 rounded-full shadow-lg hover:opacity-90 transition-transform transform hover:scale-105"
//             onClick={sendMessage}
//             disabled={isLoading || !messageText.trim()}
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatuiApp;





// import React, { useState } from 'react';

// function Message({ type, children }) {
//   const messageClass =
//     type === 'inbound'
//       ? 'bg-gradient-to-r from-gray-700 to-gray-900 text-white'
//       : 'bg-gradient-to-r from-indigo-500 to-purple-700 text-white';

//   return (
//     <div
//       className={`${messageClass} p-3 rounded-xl mb-2 max-w-xs ${type === 'outbound' ? 'ml-auto' : ''}`}
//     >
//       <strong>{type === 'inbound' ? 'ScopeBot' : 'You'}</strong>
//       <p>{children}</p>
//     </div>
//   );
// }

// function ChatuiApp() {
//   const [messages, setMessages] = useState([
//     { type: 'inbound', text: 'Hello! How can I assist you today?' },
//     { type: 'outbound', text: 'I have a question about deployment.' },
//   ]);
//   const [messageText, setMessageText] = useState('');

//   const sendMessage = () => {
//     if (messageText.trim()) {
//       setMessages([...messages, { type: 'outbound', text: messageText.trim() }]);
//       setMessageText('');
//     }
//   };

//   return (
//     <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white font-sans h-screen flex flex-col pt-4">
//       <div className="conversation-container flex-1 p-10 flex flex-col gap-4 overflow-hidden">
//         <div className="messages-container bg-[#2f302f] p-4 rounded-xl flex-1 overflow-auto hide-scrollbar">
//           {messages.map((message, index) => (
//             <Message key={index} type={message.type}>
//               {message.text}
//             </Message>
//           ))}
//         </div>

//         <div className="message-input-container mt-1 flex items-center gap-4 bg-[#2f302f] p-2.5 rounded-xl">
//           <textarea
//             id="prompt"
//             className="prompt-input flex-1 p-3 border border-gray-700 rounded-lg resize-none shadow-md bg-[#2f302f] text-white focus:ring focus:ring-indigo-500"
//             placeholder="Type your message..."
//             value={messageText}
//             onChange={(e) => setMessageText(e.target.value)}
//           ></textarea>
//           <button
//             id="send-button"
//             className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold p-4 rounded-full shadow-lg hover:opacity-90 transition-transform transform hover:scale-105"
//             onClick={sendMessage}
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatuiApp;





// import React, { useState } from 'react';

// function Message({ type, children }) {
//   const messageClass =
//     type === 'inbound'
//       ? 'bg-gradient-to-r from-gray-700 to-gray-900 text-white'
//       : 'bg-gradient-to-r from-indigo-500 to-purple-700 text-white';

//   return (
//     <div
//       className={`${messageClass} p-3 rounded-xl mb-2 max-w-xs ${type === 'outbound' ? 'ml-auto' : ''}`}
//     >
//       <strong>{type === 'inbound' ? 'ScopeBot' : 'You'}</strong>
//       <p>{children}</p>
//     </div>
//   );
// }

// function ChatuiApp() {
//   const [messages, setMessages] = useState([
//     { type: 'inbound', text: 'Hello! How can I assist you today?' },
//     { type: 'outbound', text: 'I have a question about deployment.' },
//   ]);
//   const [messageText, setMessageText] = useState('');

//   const sendMessage = () => {
//     if (messageText.trim()) {
//       setMessages([...messages, { type: 'outbound', text: messageText.trim() }]);
//       setMessageText('');
//     }
//   };

//   return (
//     <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white font-sans h-screen flex flex-col">
//       <div className="conversation-container flex-1 p-4 flex flex-col gap-4 overflow-hidden">
//         <div className="messages-container bg-[#2f302f] p-4 rounded-xl flex-1 overflow-auto hide-scrollbar">
//           {messages.map((message, index) => (
//             <Message key={index} type={message.type}>
//               {message.text}
//             </Message>
//           ))}
//         </div>

//         <div className="message-input-container mt-1 flex items-center gap-4 bg-[#2f302f] p-2.5 rounded-xl">
//           <textarea
//             id="prompt"
//             className="prompt-input flex-1 p-3 border border-gray-700 rounded-lg resize-none shadow-md bg-[#2f302f] text-white focus:ring focus:ring-indigo-500"
//             placeholder="Type your message..."
//             value={messageText}
//             onChange={(e) => setMessageText(e.target.value)}
//           ></textarea>
//           <button
//             id="send-button"
//             className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold p-4 rounded-full shadow-lg hover:opacity-90 transition-transform transform hover:scale-105"
//             onClick={sendMessage}
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatuiApp;





// import React, { useState } from 'react';


// function Header({ name }) {
//   return (
//     <div className="header bg-gradient-to-r from-purple-700 to-indigo-700 p-4 flex justify-between items-center shadow-lg">
//       <span id="greeting" className="text-lg font-semibold">Hello, {name}!</span>
//       <div className="header-buttons flex gap-4">
//         <button id="logout" className="text-white font-bold rounded-full hover:shadow-md">Logout</button>
//       </div>
//     </div>
//   );
// }

// function Message({ type, children }) {
//   const messageClass =
//     type === 'inbound'
//       ? 'bg-gradient-to-r from-gray-700 to-gray-900 text-white'
//       : 'bg-gradient-to-r from-indigo-500 to-purple-700 text-white';

//   return (
//     <div
//       className={`${messageClass} p-3 rounded-xl mb-2 max-w-xs ${type === 'outbound' ? 'ml-auto' : ''}`}
//     >
//       <strong>{type === 'inbound' ? 'ScopeBot' : 'You'}</strong>
//       <p>{children}</p>
//     </div>
//   );
// }

// function ChatuiApp() {
//   const [messages, setMessages] = useState([
//     { type: 'inbound', text: 'Hello! How can I assist you today?' },
//     { type: 'outbound', text: 'I have a question about deployment.' },
//   ]);
//   const [messageText, setMessageText] = useState('');

//   const sendMessage = () => {
//     if (messageText.trim()) {
//       setMessages([...messages, { type: 'outbound', text: messageText.trim() }]);
//       setMessageText('');
//     }
//   };

//   return (
//     <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white font-sans h-screen flex flex-col">
//       <Header name="User" />

//       <div className="conversation-container flex-1 p-4 flex flex-col gap-4 overflow-hidden">
//         <div className="messages-container bg-[#2f302f] p-4 rounded-xl flex-1 overflow-auto hide-scrollbar">
//           {messages.map((message, index) => (
//             <Message key={index} type={message.type}>
//               {message.text}
//             </Message>
//           ))}
//         </div>

//         <div className="message-input-container mt-1 flex items-center gap-4 bg-[#2f302f] p-2.5 rounded-xl">
//           <textarea
//             id="prompt"
//             className="prompt-input flex-1 p-3 border border-gray-700 rounded-lg resize-none shadow-md bg-[#2f302f] text-white focus:ring focus:ring-indigo-500"
//             placeholder="Type your message..."
//             value={messageText}
//             onChange={(e) => setMessageText(e.target.value)}
//           ></textarea>
//           <button
//             id="send-button"
//             className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold p-4 rounded-full shadow-lg hover:opacity-90 transition-transform transform hover:scale-105"
//             onClick={sendMessage}
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatuiApp;
