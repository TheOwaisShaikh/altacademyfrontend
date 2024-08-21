// // // import { useState } from 'react';
// // // import { useRouter } from 'next/router';

// // // export default function Home() {
// // //   const [email, setEmail] = useState('');
// // //   const [message, setMessage] = useState('');
// // //   const router = useRouter();

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     const res = await fetch('/api/login', {
// // //       method: 'POST',
// // //       headers: {
// // //         'Content-Type': 'application/json',
// // //       },
// // //       body: JSON.stringify({ email }),
// // //     });

// // //     const data = await res.json();
// // //     if (data.success) {
// // //       router.push(`/chat?email=${email}`);
// // //     } else {
// // //       setMessage('Failed to login.');
// // //     }
// // //   };

// // //   return (
// // //     <div>
// // //       <h1>Login</h1>
// // //       <form onSubmit={handleSubmit}>
// // //         <label>
// // //           Email:
// // //           <input
// // //             type="email"
// // //             value={email}
// // //             onChange={(e) => setEmail(e.target.value)}
// // //             required
// // //           />
// // //         </label>
// // //         <button type="submit">Login</button>
// // //       </form>
// // //       {message && <p>{message}</p>}
// // //     </div>
// // //   );
// // // }


// // import { useState, useEffect } from 'react';
// // import { useRouter } from 'next/router';

// // export default function Chat() {
// //   const [messages, setMessages] = useState([]);
// //   const [input, setInput] = useState('');
// //   const [image, setImage] = useState(null);
// //   const [sessions, setSessions] = useState([]);
// //   const [currentSessionId, setCurrentSessionId] = useState(null);
// //   const [isTyping, setIsTyping] = useState(false); // Add state for typing indicator

// //   const hardcodedEmail = 'kk@gmail.com'; // Hardcoded email

// //   useEffect(() => {
// //     console.log('Component mounted, fetching session history...');
// //     fetchChatHistory();  // Load session containers on mount
// //   }, []);

// //   const fetchChatHistory = async () => {
// //     try {
// //       console.log('Fetching chat history...');
// //       const res = await fetch(`/api/chat-history?email=${hardcodedEmail}&timestamp=${new Date().getTime()}`);
// //       const data = await res.json();

// //       if (data.success) {
// //         console.log('Fetched sessions:', data.history.sessions);
// //         setSessions(data.history.sessions || []);

// //         const storedSessionId = localStorage.getItem('currentSessionId');
// //         if (storedSessionId) {
// //           restoreSession(storedSessionId);  // Ensure this is called with a valid session ID
// //         }
// //       } else {
// //         console.error('Failed to fetch sessions:', data.message);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching chat history:', error);
// //     }
// //   };

// //   const restoreSession = async (sessionId) => {
// //     if (!sessionId) {
// //       console.log('No session ID provided for restore.');
// //       return;
// //     }

// //     const res = await fetch(`/api/chat-history?email=${hardcodedEmail}&sessionId=${sessionId}`);
// //     const data = await res.json();

// //     if (data.success) {
// //       console.log(`Restoring session with ID: ${sessionId}`);
// //       setMessages(data.history.messages || []);  // Restore messages from the session
// //       setCurrentSessionId(sessionId);
// //       localStorage.setItem('currentSessionId', sessionId);  // Persist session ID
// //     } else {
// //       console.log(`Session with ID: ${sessionId} could not be restored.`);
// //       localStorage.removeItem('currentSessionId');
// //     }
// //   };

// //   const handleSendMessage = async () => {
// //     if (!input && !image) return;

// //     const userMessage = { sender: 'user', text: input, image: image ? URL.createObjectURL(image) : null };
// //     setMessages([...messages, userMessage]);

// //     setIsTyping(true); // Set typing indicator to true before sending the message

// //     console.log('Sending message:', input, image);
// //     const formData = new FormData();
// //     formData.append('email', hardcodedEmail); // Use hardcoded email
// //     formData.append('text', input);
// //     if (image) {
// //       formData.append('image', image);
// //     }

// //     const res = await fetch('/api/chat', {
// //       method: 'POST',
// //       body: formData,
// //     });

// //     const data = await res.json();
// //     setIsTyping(false); // Set typing indicator to false after receiving the response

// //     if (data.success) {
// //       console.log('Message sent successfully, updating UI...');
// //       const botMessage = { sender: 'bot', text: data.reply };
// //       setMessages([...messages, userMessage, botMessage]);

// //       if (!currentSessionId) {
// //         console.log(`New session created with ID: ${data.sessionId}`);
// //         setCurrentSessionId(data.sessionId);  // Update the current session ID
// //         setSessions([...sessions, { id: data.sessionId, title: input }]);  // Add new session container
// //         localStorage.setItem('currentSessionId', data.sessionId);  // Persist session ID
// //       }
// //     }
// //     setInput('');
// //     setImage(null);
// //   };

// //   const handleNewChat = async () => {
// //     if (currentSessionId) {
// //       console.log(`Ending session with ID: ${currentSessionId}`);
// //       await fetch(`/api/end-session?sessionId=${currentSessionId}`, {
// //         method: 'POST',
// //       });

// //       console.log('Session ended, clearing local storage and UI...');
// //       localStorage.removeItem('currentSessionId');
// //       setCurrentSessionId(null);
// //     }

// //     setMessages([]);  // Clear chatbox but keep the session containers intact
// //     fetchChatHistory();  // Refresh session containers
// //   };

// //   const handleSessionClick = async (sessionId) => {
// //     console.log(`Session clicked with ID: ${sessionId}`);  // Ensure this ID is correct
// //     await restoreSession(sessionId);  // Restore the selected session
// //   };

// //   const handleDeleteSession = async (sessionId) => {
// //     console.log(`Deleting session with ID: ${sessionId}`);
// //     const res = await fetch(`/api/delete-session?sessionId=${sessionId}`, {
// //       method: 'DELETE',
// //     });

// //     if (res.ok) {
// //       console.log(`Session with ID: ${sessionId} deleted successfully.`);
// //       setSessions(sessions.filter(session => session.id !== sessionId));  // Remove the session from the state
// //       if (sessionId === currentSessionId) {
// //         setMessages([]);
// //         localStorage.removeItem('currentSessionId');
// //         setCurrentSessionId(null);
// //       }
// //     } else {
// //       console.error('Failed to delete session');
// //     }
// //   };

// //   return (
// //     <div style={{ display: 'flex' }}>
// //       <div style={{ width: '200px', borderRight: '1px solid #ccc' }}>
// //         <h2>Sessions</h2>
// //         {sessions.map((session) => (
// //           <div
// //             key={session.id}
// //             style={{
// //               cursor: 'pointer',
// //               padding: '10px',
// //               borderBottom: '1px solid #ccc',
// //               backgroundColor: session.id === currentSessionId ? '#f0f0f0' : 'white',
// //               position: 'relative',
// //             }}
// //           >
// //             <span onClick={() => handleSessionClick(session.id)}>
// //               {session.title} {/* Display the session title */}
// //             </span>
// //             <button
// //               onClick={() => handleDeleteSession(session.id)}
// //               style={{
// //                 position: 'absolute',
// //                 right: '10px',
// //                 top: '5px',
// //                 background: 'red',
// //                 color: 'white',
// //                 border: 'none',
// //                 cursor: 'pointer',
// //               }}
// //             >
// //               Delete
// //             </button>
// //           </div>
// //         ))}
// //         <button onClick={handleNewChat}>New Chat</button>
// //       </div>
// //       <div style={{ flex: 1, padding: '20px' }}>
// //         <h1>Chat with the Bot</h1>
// //         <div>
// //           {messages.map((message, index) => (
// //             <div key={index} style={{ textAlign: message.sender === 'user' ? 'right' : 'left' }}>
// //               <p><strong>{message.sender}:</strong> {message.text}</p>
// //               {message.image && <img src={message.image} alt="Uploaded" style={{ maxWidth: '200px' }} />}
// //             </div>
// //           ))}
// //           {isTyping && <p>Bot is typing...</p>} {/* Show typing indicator */}
// //         </div>
// //         <input
// //           type="text"
// //           value={input}
// //           onChange={(e) => setInput(e.target.value)}
// //           placeholder="Type your message..."
// //         />
// //         <input
// //           type="file"
// //           accept="image/*"
// //           onChange={(e) => setImage(e.target.files[0])}
// //         />
// //         <button onClick={handleSendMessage}>Send</button>
// //       </div>
// //     </div>
// //   );
// // }


// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';

// export default function Chat() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [image, setImage] = useState(null);
//   const [sessions, setSessions] = useState([]);
//   const [currentSessionId, setCurrentSessionId] = useState(null);
//   const [isTyping, setIsTyping] = useState(false); // Add state for typing indicator
//   const [isChatVisible, setIsChatVisible] = useState(false); // State for chat screen visibility

//   const hardcodedEmail = 'kk@gmail.com'; // Hardcoded email

//   useEffect(() => {
//     console.log('Component mounted, fetching session history...');
//     fetchChatHistory();  // Load session containers on mount
//   }, []);

//   const fetchChatHistory = async () => {
//     try {
//       console.log('Fetching chat history...');
//       const res = await fetch(`/api/chat-history?email=${hardcodedEmail}&timestamp=${new Date().getTime()}`);
//       const data = await res.json();

//       if (data.success) {
//         console.log('Fetched sessions:', data.history.sessions);
//         setSessions(data.history.sessions || []);

//         const storedSessionId = localStorage.getItem('currentSessionId');
//         if (storedSessionId) {
//           restoreSession(storedSessionId);  // Ensure this is called with a valid session ID
//         }
//       } else {
//         console.error('Failed to fetch sessions:', data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching chat history:', error);
//     }
//   };

//   const restoreSession = async (sessionId) => {
//     if (!sessionId) {
//       console.log('No session ID provided for restore.');
//       return;
//     }

//     const res = await fetch(`/api/chat-history?email=${hardcodedEmail}&sessionId=${sessionId}`);
//     const data = await res.json();

//     if (data.success) {
//       console.log(`Restoring session with ID: ${sessionId}`);
//       setMessages(data.history.messages || []);  // Restore messages from the session
//       setCurrentSessionId(sessionId);
//       localStorage.setItem('currentSessionId', sessionId);  // Persist session ID
//     } else {
//       console.log(`Session with ID: ${sessionId} could not be restored.`);
//       localStorage.removeItem('currentSessionId');
//     }
//   };

//   const handleSendMessage = async () => {
//     if (!input && !image) return;

//     const userMessage = { sender: 'user', text: input, image: image ? URL.createObjectURL(image) : null };
//     setMessages([...messages, userMessage]);

//     setIsTyping(true); // Set typing indicator to true before sending the message

//     console.log('Sending message:', input, image);
//     const formData = new FormData();
//     formData.append('email', hardcodedEmail); // Use hardcoded email
//     formData.append('text', input);
//     if (image) {
//       formData.append('image', image);
//     }

//     const res = await fetch('/api/chat', {
//       method: 'POST',
//       body: formData,
//     });

//     const data = await res.json();
//     setIsTyping(false); // Set typing indicator to false after receiving the response

//     if (data.success) {
//       console.log('Message sent successfully, updating UI...');
//       const botMessage = { sender: 'bot', text: data.reply };
//       setMessages([...messages, userMessage, botMessage]);

//       if (!currentSessionId) {
//         console.log(`New session created with ID: ${data.sessionId}`);
//         setCurrentSessionId(data.sessionId);  // Update the current session ID
//         setSessions([...sessions, { id: data.sessionId, title: input }]);  // Add new session container
//         localStorage.setItem('currentSessionId', data.sessionId);  // Persist session ID
//       }
//     }
//     setInput('');
//     setImage(null);
//   };

//   const handleNewChat = async () => {
//     if (currentSessionId) {
//       console.log(`Ending session with ID: ${currentSessionId}`);
//       await fetch(`/api/end-session?sessionId=${currentSessionId}`, {
//         method: 'POST',
//       });

//       console.log('Session ended, clearing local storage and UI...');
//       localStorage.removeItem('currentSessionId');
//       setCurrentSessionId(null);
//     }

//     setMessages([]);  // Clear chatbox but keep the session containers intact
//     fetchChatHistory();  // Refresh session containers
//   };

//   const handleSessionClick = async (sessionId) => {
//     console.log(`Session clicked with ID: ${sessionId}`);  // Ensure this ID is correct
//     await restoreSession(sessionId);  // Restore the selected session
//   };

//   const handleDeleteSession = async (sessionId) => {
//     console.log(`Deleting session with ID: ${sessionId}`);
//     const res = await fetch(`/api/delete-session?sessionId=${sessionId}`, {
//       method: 'DELETE',
//     });

//     if (res.ok) {
//       console.log(`Session with ID: ${sessionId} deleted successfully.`);
//       setSessions(sessions.filter(session => session.id !== sessionId));  // Remove the session from the state
//       if (sessionId === currentSessionId) {
//         setMessages([]);
//         localStorage.removeItem('currentSessionId');
//         setCurrentSessionId(null);
//       }
//     } else {
//       console.error('Failed to delete session');
//     }
//   };

//   const toggleChatVisibility = () => {
//     setIsChatVisible(!isChatVisible);  // Toggle the visibility state
//   };

//   return (
//     <div>
//       <button onClick={toggleChatVisibility} style={{ marginBottom: '10px' }}>
//         Bot
//       </button>
//       {isChatVisible && (
//         <div style={{ display: 'flex' }}>
//           <div style={{ width: '200px', borderRight: '1px solid #ccc' }}>
//             <h2>Sessions</h2>
//             {sessions.map((session) => (
//               <div
//                 key={session.id}
//                 style={{
//                   cursor: 'pointer',
//                   padding: '10px',
//                   borderBottom: '1px solid #ccc',
//                   backgroundColor: session.id === currentSessionId ? '#f0f0f0' : 'white',
//                   position: 'relative',
//                 }}
//               >
//                 <span onClick={() => handleSessionClick(session.id)}>
//                   {session.title} {/* Display the session title */}
//                 </span>
//                 <button
//                   onClick={() => handleDeleteSession(session.id)}
//                   style={{
//                     position: 'absolute',
//                     right: '10px',
//                     top: '5px',
//                     background: 'red',
//                     color: 'white',
//                     border: 'none',
//                     cursor: 'pointer',
//                   }}
//                 >
//                   Delete
//                 </button>
//               </div>
//             ))}
//             <button onClick={handleNewChat}>New Chat</button>
//           </div>
//           <div style={{ flex: 1, padding: '20px' }}>
//             <h1>Chat with the Bot</h1>
//             <div>
//               {messages.map((message, index) => (
//                 <div key={index} style={{ textAlign: message.sender === 'user' ? 'right' : 'left' }}>
//                   <p><strong>{message.sender}:</strong> {message.text}</p>
//                   {message.image && <img src={message.image} alt="Uploaded" style={{ maxWidth: '200px' }} />}
//                 </div>
//               ))}
//               {isTyping && <p>Bot is typing...</p>} {/* Show typing indicator */}
//             </div>
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Type your message..."
//             />
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => setImage(e.target.files[0])}
//             />
//             <button onClick={handleSendMessage}>Send</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// import { useState, useEffect, useRef } from 'react';
// import { FaPaperclip, FaPaperPlane, FaEllipsisV } from 'react-icons/fa'; // Import the icons
// import styles from '../styles/Chat.module.css'; // Import the CSS module
// import { IoAttachOutline } from "react-icons/io5";
// import { BsTrash3Fill } from "react-icons/bs";

// export default function Chat() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [image, setImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null); // New state for image preview
//   const [sessions, setSessions] = useState([]);
//   const [currentSessionId, setCurrentSessionId] = useState(null);
//   const [isTyping, setIsTyping] = useState(false);
//   const [isChatVisible, setIsChatVisible] = useState(true);
//   const [dropdownVisible, setDropdownVisible] = useState(null); // Track which session dropdown is visible

//   const fileInputRef = useRef(null); // Ref to handle file input
//   const inputRef = useRef(null); // Ref for the textarea
//   const dropdownRef = useRef(null); // Ref for the dropdown menu
//   const hardcodedEmail = 'p000@gmail.com';

//   useEffect(() => {
//     const storedVisibility = localStorage.getItem('isChatVisible');
//     if (storedVisibility !== null) {
//       setIsChatVisible(storedVisibility === 'true');
//     }

//     fetchChatHistory();
//   }, []);

//   useEffect(() => {
//     // Add event listener to close dropdown when clicking outside
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownVisible(null);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       // Remove event listener when component is unmounted
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [dropdownRef]);

//   useEffect(() => {
//     // Adjust the height of the textarea dynamically
//     if (inputRef.current) {
//       inputRef.current.style.height = 'auto'; // Reset height
//       inputRef.current.style.height = `${inputRef.current.scrollHeight}px`; // Set height based on content
//     }
//   }, [input]);

//   const fetchChatHistory = async () => {
//     try {
//       const res = await fetch(`/api/chat-history?email=${hardcodedEmail}&timestamp=${new Date().getTime()}`);
//       const data = await res.json();

//       if (data.success) {
//         setSessions(data.history.sessions || []);

//         const storedSessionId = localStorage.getItem('currentSessionId');
//         if (storedSessionId) {
//           restoreSession(storedSessionId);
//         }
//       } else {
//         console.error('Failed to fetch sessions:', data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching chat history:', error);
//     }
//   };

//   const restoreSession = async (sessionId) => {
//     if (!sessionId) return;

//     const res = await fetch(`/api/chat-history?email=${hardcodedEmail}&sessionId=${sessionId}`);
//     const data = await res.json();

//     if (data.success) {
//       setMessages(data.history.messages || []);
//       setCurrentSessionId(sessionId);
//       localStorage.setItem('currentSessionId', sessionId);
//     } else {
//       localStorage.removeItem('currentSessionId');
//     }
//   };

//   const maxTitleLength = 15; // Maximum number of characters to display in the title

//   const handleSendMessage = async () => {
//     // Ensure there's non-whitespace text or an image
//     if (!input.trim() && !image) {
//         console.error('No input or image provided');
//         return;
//     }

//     // Handle truncation for session titles
//     const truncatedTitle = input.trim().length > maxTitleLength 
//         ? input.trim().substring(0, maxTitleLength) + "..." 
//         : input.trim();

//     // Add the user's message to the state
//     const userMessage = { sender: 'user', text: input, image: imagePreview };
//     setMessages([...messages, userMessage]);

//     // Reset input fields after sending the message
//     setInput('');
//     setImage(null);
//     setImagePreview(null);

//     setIsTyping(true);

//     // Prepare the form data for submission
//     const formData = new FormData();
//     formData.append('email', hardcodedEmail); // Include email
//     formData.append('session_id', currentSessionId || ''); // Include session_id if available
//     formData.append('question', input.trim()); // Ensure input is properly passed
//     if (image) {
//         formData.append('image', image);
//     }

//     try {
//         // Send the form data to the server
//         const res = await fetch('/api/chat', {
//             method: 'POST',
//             body: formData,
//         });

//         // Process the server's response
//         const data = await res.json();
//         setIsTyping(false);

//         if (data.success) {
//             const botMessage = { sender: 'bot', text: data.reply };
//             setMessages((prevMessages) => [...prevMessages, botMessage]);

//             // Handle session management
//             if (!currentSessionId) {
//                 setCurrentSessionId(data.sessionId);
//                 setSessions([...sessions, { id: data.sessionId, title: truncatedTitle }]);
//                 localStorage.setItem('currentSessionId', data.sessionId);
//             }
//         } else {
//             console.error('Error from API:', data.message);
//         }
//     } catch (error) {
//         console.error('Error sending message:', error);
//         setIsTyping(false);
//     }
// };


//   const handleNewChat = async () => {
//     if (currentSessionId) {
//       await fetch(`/api/end-session?sessionId=${currentSessionId}`, {
//         method: 'POST',
//       });

//       localStorage.removeItem('currentSessionId');
//       setCurrentSessionId(null);
//     }

//     setMessages([]);
//     fetchChatHistory();
//   };

//   const handleSessionClick = async (sessionId) => {
//     await restoreSession(sessionId);
//   };

//   const handleDeleteSession = async (sessionId) => {
//     const res = await fetch(`/api/delete-session?sessionId=${sessionId}`, {
//       method: 'DELETE',
//     });

//     if (res.ok) {
//       setSessions(sessions.filter(session => session.id !== sessionId));
//       if (sessionId === currentSessionId) {
//         setMessages([]);
//         localStorage.removeItem('currentSessionId');
//         setCurrentSessionId(null);
//       }
//     }
//   };

//   const toggleChatVisibility = () => {
//     const newVisibility = !isChatVisible;
//     setIsChatVisible(newVisibility);
//     localStorage.setItem('isChatVisible', newVisibility);
//   };

//   const handleAttachmentClick = () => {
//     fileInputRef.current.click(); 
//   };

//   const handleFileChange = (e) => {
//     if (e.target.files.length > 0) {
//       const file = e.target.files[0];
//       setImage(file);
//       setImagePreview(URL.createObjectURL(file)); // Show image preview
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault(); // Prevent default behavior of Enter key
//       handleSendMessage(); // Send message on Enter key press
//     }
//   };

//   const inputContainerRef = useRef(null);

//   const toggleDropdown = (sessionId) => {
//     setDropdownVisible(dropdownVisible === sessionId ? null : sessionId);
//   };

//   return (
//     <div className={styles.container}>
//       <button onClick={toggleChatVisibility} className={styles.botButton}>
//         Bot
//       </button>
//       {isChatVisible && (
//         <div className={styles.chatContainer}>
//           <div className={styles.sessionContainer}>
//             <h2 className={styles.header} onClick={handleNewChat}>
//               Sessions
//             </h2>
//             {sessions.map((session) => (
//               <div
//                 key={session.id}
//                 className={`${styles.session} ${session.id === currentSessionId ? styles.activeSession : ''}`}
//                 onClick={() => handleSessionClick(session.id)} // Make the entire session container clickable
//               >
//                 <span>
//                   {session.title} {/* This will now display the truncated title */}
//                 </span>
//                 <button 
//                   className={styles.ellipsisButton} 
//                   onClick={(e) => { e.stopPropagation(); toggleDropdown(session.id); }} // Stop propagation to prevent session click
//                 >
//                   <FaEllipsisV />
//                 </button>
//                 {dropdownVisible === session.id && (
//   <div className={styles.dropdownMenu} ref={dropdownRef}>
//     <div
//       className={styles.dropdownItem}
//       onClick={() => handleDeleteSession(session.id)}
//     >
//       <BsTrash3Fill className={styles.trashIcon} />
//       <span className={styles.deleteText}>Delete</span>
//       </div>
//   </div>
// )}

//               </div>
//             ))}
//           </div>
//           <div className={styles.chatBox}>
//           <div className={styles.messagesContainer}>
//         {messages.map((message, index) => (
//           <div
//             key={index}
//             className={`${styles.message} ${
//               message.sender === 'user' ? styles.userMessage : styles.botMessage
//             }`}
//           >
//             {message.sender === 'bot' && (
//               <img src="/assets/alt.png" alt="Company Logo" />
//             )}

//         {message.image && (
//           <div className={styles.messageImageContainer}>
//             <img src={message.image} alt="Uploaded" className={styles.uploadedImage} />
//           </div>
//         )}
//         {message.text && (
//           <div className={styles.messageTextContainer}>
//             <p>{message.text}</p> {/* Removed the prefix "user:" */}
//           </div>
//         )}
//       </div>
//     ))}
//     {isTyping && <p className={styles.typingIndicator}>Bot is typing...</p>}
//     {/* Image preview container */}
//     {imagePreview && (
//       <div className={styles.imagePreviewContainer}>
//         <img src={imagePreview} alt="Preview" className={styles.imagePreview} />
//       </div>
//     )}
//     {/* Input container is now placed within messagesContainer */}
//     <div className={styles.inputContainer} ref={inputContainerRef}>
//       <IoAttachOutline className={styles.attachmentIcon} onClick={handleAttachmentClick} />
//       <input
//         type="file"
//         accept="image/*"
//         ref={fileInputRef} // Ref for file input
//         style={{ display: 'none' }}
//         onChange={handleFileChange}
//       />
//       <textarea
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         placeholder="Type your message..."
//         className={styles.inputField}
//         ref={inputRef} // Ref for textarea
//         onKeyPress={handleKeyPress} // Handle Enter key press
//       />
//       <button onClick={handleSendMessage} className={styles.sendButton}>
//         <FaPaperPlane className={styles.sendIcon} />
//       </button>
//     </div>
//   </div>
// </div>

//         </div>
//       )}
//     </div>
//   );
// }

import { useState, useEffect, useRef } from 'react';
import { FaPaperclip, FaPaperPlane, FaEllipsisV } from 'react-icons/fa';
import styles from '../styles/Chat.module.css';
import { IoAttachOutline } from "react-icons/io5";
import { BsTrash3Fill } from "react-icons/bs";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [userEmail, setUserEmail] = useState('');  // Add state for the dynamic email

  const fileInputRef = useRef(null);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Function to receive the email dynamically from the parent site
    const receiveEmail = (event) => {
      if (event.origin === 'https://altacademy.org') {  // Ensure you're only accepting messages from the trusted domain
        const { email } = event.data;
        if (email) {
          setUserEmail(email);
          fetchEmail(email);  // Fetch email and proceed
        }
      }
    };

    window.addEventListener('message', receiveEmail);

    return () => {
      window.removeEventListener('message', receiveEmail);
    };
  }, []);
  useEffect(() => {
    const handlePaste = (event) => {
      const items = event.clipboardData.items;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          setImage(file);
          setImagePreview(URL.createObjectURL(file));
        }
      }
    };
  
    inputRef.current.addEventListener('paste', handlePaste);
  
    return () => {
      inputRef.current.removeEventListener('paste', handlePaste);
    };
  }, []);
  const fetchEmail = async (email) => {
    try {
      const res = await fetch('/api/handle-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),  // Use dynamic email here
      });
      const data = await res.json();
      if (data.success) {
        setUserEmail(data.email);
        fetchChatHistory(data.email);  // Pass the email to fetchChatHistory
      } else {
        console.error('Failed to fetch email:', data.message);
      }
    } catch (error) {
      console.error('Error fetching email:', error);
    }
  };

  useEffect(() => {
    const storedVisibility = localStorage.getItem('isChatVisible');
    if (storedVisibility !== null) {
      setIsChatVisible(storedVisibility === 'true');
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [input]);

  const fetchChatHistory = async (email) => {
    try {
      const res = await fetch(`/api/chat-history?email=${email}&timestamp=${new Date().getTime()}`);
      const data = await res.json();

      if (data.success) {
        setSessions(data.history.sessions || []);

        const storedSessionId = localStorage.getItem('currentSessionId');
        if (storedSessionId) {
          restoreSession(storedSessionId, email);  // Pass the email to restoreSession
        }
      } else {
        console.error('Failed to fetch sessions:', data.message);
      }
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const restoreSession = async (sessionId, email) => {
    if (!sessionId) return;

    const res = await fetch(`/api/chat-history?email=${email}&sessionId=${sessionId}`);
    const data = await res.json();

    if (data.success) {
      setMessages(data.history.messages || []);
      setCurrentSessionId(sessionId);
      localStorage.setItem('currentSessionId', sessionId);
    } else {
      localStorage.removeItem('currentSessionId');
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() && !image) {
      console.error('No input or image provided');
      return;
    }
  
    // Prepare a title based on the input or fallback to the bot's reply later
    let truncatedTitle = input.trim().length > 15 ? input.trim().substring(0, 15) + "..." : input.trim();
  
    const userMessage = { sender: 'user', text: input, image: imagePreview };
    setMessages([...messages, userMessage]);
  
    setInput('');
    setImage(null);
    setImagePreview(null);
  
    setIsTyping(true);
  
    const formData = new FormData();
    formData.append('email', userEmail);  // Use dynamic email
    formData.append('session_id', currentSessionId || '');
    formData.append('question', input.trim());
    if (image) {
      formData.append('image', image);
    }
  
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        body: formData,
      });
  
      const data = await res.json();
      setIsTyping(false);
  
      if (data.success) {
        const botMessage = { sender: 'bot', text: data.reply };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
  
        // If the user's message was empty, use the bot's reply as the session title
        if (!truncatedTitle) {
          truncatedTitle = data.reply.length > 15 ? data.reply.substring(0, 15) + "..." : data.reply;
        }
  
        if (!currentSessionId) {
          setCurrentSessionId(data.sessionId);
          setSessions([...sessions, { id: data.sessionId, title: truncatedTitle }]);
          localStorage.setItem('currentSessionId', data.sessionId);
        }
      } else {
        console.error('Error from API:', data.message);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setIsTyping(false);
    }
  };
  

  const handleNewChat = async () => {
    if (currentSessionId) {
      await fetch(`/api/end-session?sessionId=${currentSessionId}`, { method: 'POST' });

      localStorage.removeItem('currentSessionId');
      setCurrentSessionId(null);
    }

    setMessages([]);
    fetchChatHistory(userEmail);  // Refetch chat history with the dynamic email
  };

  const handleSessionClick = async (sessionId) => {
    await restoreSession(sessionId, userEmail);
  };

  const handleDeleteSession = async (sessionId) => {
    const res = await fetch(`/api/delete-session?sessionId=${sessionId}`, { method: 'DELETE' });

    if (res.ok) {
      setSessions(sessions.filter(session => session.id !== sessionId));
      if (sessionId === currentSessionId) {
        setMessages([]);
        localStorage.removeItem('currentSessionId');
        setCurrentSessionId(null);
      }
    }
  };

  const toggleChatVisibility = () => {
    const newVisibility = !isChatVisible;
    setIsChatVisible(newVisibility);
    localStorage.setItem('isChatVisible', newVisibility);
  };

  const handleAttachmentClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const inputContainerRef = useRef(null);

  const toggleDropdown = (sessionId) => {
    setDropdownVisible(dropdownVisible === sessionId ? null : sessionId);
  };

  return (
    <div className={styles.container}>
      <button onClick={toggleChatVisibility} className={styles.botButton}>
        Bot
      </button>
      {isChatVisible && (
        <div className={styles.chatContainer}>
          <div className={styles.sessionContainer}>
            <h2 className={styles.header} onClick={handleNewChat}>
              Sessions
            </h2>
            {sessions.map((session) => (
              <div
                key={session.id}
                className={`${styles.session} ${session.id === currentSessionId ? styles.activeSession : ''}`}
                onClick={() => handleSessionClick(session.id)}
              >
                <span>{session.title}</span>
                <button 
                  className={styles.ellipsisButton} 
                  onClick={(e) => { e.stopPropagation(); toggleDropdown(session.id); }}
                >
                  <FaEllipsisV />
                </button>
                {dropdownVisible === session.id && (
                  <div className={styles.dropdownMenu} ref={dropdownRef}>
                    <div
                      className={styles.dropdownItem}
                      onClick={() => handleDeleteSession(session.id)}
                    >
                      <BsTrash3Fill className={styles.trashIcon} />
                      <span className={styles.deleteText}>Delete</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className={styles.chatBox}>
            <div className={styles.messagesContainer}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`${styles.message} ${
                    message.sender === 'user' ? styles.userMessage : styles.botMessage
                  }`}
                >
                  {message.sender === 'bot' && (
                    <img src="/assets/alt.png" alt="Company Logo" />
                  )}

                  {message.image && (
                    <div className={styles.messageImageContainer}>
                      <img src={message.image} alt="Uploaded" className={styles.uploadedImage} />
                    </div>
                  )}
                  {message.text && (
                    <div className={styles.messageTextContainer}>
                      <p>{message.text}</p>
                    </div>
                  )}
                </div>
              ))}
              {isTyping && <p className={styles.typingIndicator}>Bot is typing...</p>}
              {imagePreview && (
                <div className={styles.imagePreviewContainer}>
                  <img src={imagePreview} alt="Preview" className={styles.imagePreview} />
                </div>
              )}
              <div className={styles.inputContainer} ref={inputContainerRef}>
                <IoAttachOutline className={styles.attachmentIcon} onClick={handleAttachmentClick} />
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className={styles.inputField}
                  ref={inputRef}
                  onKeyPress={handleKeyPress}
                />
                <button onClick={handleSendMessage} className={styles.sendButton}>
                  <FaPaperPlane className={styles.sendIcon} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

