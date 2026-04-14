
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from "react-router-dom";
// import { MdSend } from "react-icons/md";
// import { initializeSocket, recievemessage, sendmessage } from '../config/socket.js';
// import RatingComponent from './RatingComponent';

// function Message() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [doctorName, setDoctorName] = useState(location.state?.name || "Dr. John Doe");
//   const [chatId, setChatId] = useState(location.state?.id || "");

//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [showRatingForm, setShowRatingForm] = useState(false);
//   const [fullScreenImage, setFullScreenImage] = useState(null);

//   useEffect(() => {
//     if (!chatId) return;

//     const socket = initializeSocket(chatId);
//     socket.emit("join-room", chatId);

//     recievemessage("project-message", (data) => {
//       setMessages((prevMessages) => {
//         if (!prevMessages.some(msg => msg.time === data.time && msg.sender === data.sender)) {
//           return [...prevMessages, data];
//         }
//         return prevMessages;
//       });
//     });

//     recievemessage("receive-image", (data) => {
//       console.log("Received image:", data.image);
//       setMessages((prevMessages) => {
//         if (!prevMessages.some(msg => msg.content === `data:image/png;base64,${data.image}`)) {
//           return [...prevMessages, { sender: data.sender || "Doctor", type: "image", content: `data:image/png;base64,${data.image}`, time: new Date().toLocaleTimeString() }];
//         }
//         return prevMessages;
//       });
//     console.log("Chat ID:", chatId);

//     if (doctorName) {
//       setMessages([]);
//     }
//   }, [doctorName]);

//   useEffect(() => {
//     if (!chatId) return;

//     const socket = initializeSocket(chatId);
//     socket.emit("join-room", chatId); // Join the chat room

//     recievemessage("project-message", (data) => {
//       console.log("Received message:", data);  // Verify incoming data
//       setMessages((prevMessages) => [...prevMessages, data.message]);
//     });

//     return () => socket.disconnect();
//   }, [chatId]);

//   const handleSendMessage = () => {
//     if (message.trim() || selectedFile) {
//       const newMessage = {
//         chatId,
//         sender: "Patient",
//         text: message || "",
//         type: selectedFile ? "image" : "text",
//         content: selectedFile ? `data:image/png;base64,${selectedFile}` : message,
//         time: new Date().toLocaleTimeString(),
//       };

//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//       sendmessage("project-message", newMessage);

//       if (selectedFile) {
//         sendmessage("send-image", { chatId, image: selectedFile, sender: "Patient" });
//       }

//       setMessage("");
//       setSelectedFile(null);
//       setShowRatingForm(true);
//     }
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64String = reader.result.split(",")[1];
//         setSelectedFile(base64String);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//       setShowRatingForm(true); // Show rating form after sending a message
//     }
//   };

//   return (
//     <div className="ml-40 flex justify-center items-center min-h-screen bg-green-50">
//       <div className="mt-5 max-w-3xl w-full p-6 bg-white rounded-2xl shadow-lg border border-green-300">
//         <button
//           onClick={() => navigate(-1)}
//           className="border px-3 py-1 text-green-600 rounded-md mb-4 hover:bg-green-100"
//         >
//           ⬅ Back
//         </button>

//         <div className="border-b pb-4 mb-4 max-h-60 overflow-y-auto">
//           {messages.map((msg, index) => (
//             <div key={index} className={`p-3 rounded-md ${msg.sender === "Patient" ? "bg-green-100 text-right" : "bg-blue-100 text-left"}`}>
//               <p className="font-semibold">{msg.sender}</p>
//               {msg.text && <p className="text-gray-700">{msg.text}</p>}
//               {msg.type === "image" && (
//                 <img 
//                   src={msg.content} 
//                   alt="Sent" 
//                   className="w-40 rounded-md mx-auto cursor-pointer" 
//                   onClick={() => setFullScreenImage(msg.content)}
//                 />
//               )}
//             <div
//               key={index}
//               className={`p-3 rounded-md ${msg.sender === "Patient"
//                 ? "bg-green-100 text-right"
//                 : "bg-blue-100 text-left"}`
//               }
//             >
//               <p className="font-semibold">{msg.name}</p>
//               <p className="text-gray-700">{msg.text}</p>
//               <p className="text-sm text-gray-500">{msg.time}</p>
//             </div>
//           ))}
//         </div>

//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-bold">{doctorName}</h2>
//         </div>

//         <div>
//           <label className="block font-semibold mb-1">Message Input Area</label>
//           <div className="flex items-center gap-2">
//             <input
//               type="text"
//               placeholder="Type a message..."
//               className="border rounded-md px-3 py-2 w-full"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//             />
//             <button onClick={handleSendMessage} className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center">
//             <button
//               onClick={handleSendMessage}
//               className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center"
//             >
//               <MdSend />
//             </button>
//           </div>
//         </div>

//         <div className="mt-4 flex justify-between items-center">
//           <input type="file" onChange={handleFileChange} className="hidden" id="fileInput" />
//           <button 
//             className="bg-green-100 text-green-700 px-4 py-2 rounded-md"
//             onClick={() => document.getElementById("fileInput").click()}
//           >
//             Add Attachment
//           </button>
//           {showRatingForm && <RatingComponent doctorName={doctorName} />}
//         {showRatingForm && (
//           <div className="mt-4">
//             <RatingComponent doctorName={doctorName} />
//           </div>
//         )}

//         <div className="mt-4 text-right">
//           <button className="bg-green-100 text-green-700 px-4 py-2 rounded-md">
//             Request Prescription
//           </button>
//           <button className="ml-5 bg-green-100 text-green-700 px-4 py-2 rounded-md">
//             Request Test
//           </button>
//         </div>
//       </div>

//       {fullScreenImage && (
//         <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center" onClick={() => setFullScreenImage(null)}>
//           <img src={fullScreenImage} alt="Full Screen" className="max-w-full max-h-full" />
//         </div>
//       )}
//     </div>
//   );
// }

// export default Message;





// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from "react-router-dom";
// import { MdSend } from "react-icons/md";
// import { initializeSocket, recievemessage, sendmessage } from '../config/socket.js';
// import RatingComponent from './RatingComponent';

// function Message() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [doctorName, setDoctorName] = useState(location.state?.name || "Dr. John Doe");
//   const [chatId, setChatId] = useState(location.state?.id || "");
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [showRatingForm, setShowRatingForm] = useState(false);
//   const [fullScreenImage, setFullScreenImage] = useState(null);

//   useEffect(() => {
//     if (!chatId) return;

//     const socket = initializeSocket(chatId);
//     socket.emit("join-room", chatId);

//     recievemessage("project-message", (data) => {
//       setMessages((prevMessages) => [...prevMessages, data]);
//     });

//     recievemessage("receive-image", (data) => {
//       setMessages((prevMessages) => [...prevMessages, { sender: data.sender || "Doctor", type: "image", content: `data:image/png;base64,${data.image}`, time: new Date().toLocaleTimeString() }]);
//     });

//     return () => socket.disconnect();
//   }, [chatId]);

//   const handleSendMessage = () => {
//     if (message.trim() || selectedFile) {
//       const newMessage = {
//         chatId,
//         sender: "Patient",
//         text: message || "",
//         type: selectedFile ? "image" : "text",
//         content: selectedFile ? `data:image/png;base64,${selectedFile}` : message,
//         time: new Date().toLocaleTimeString(),
//       };

//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//       sendmessage("project-message", newMessage);

//       if (selectedFile) {
//         sendmessage("send-image", { chatId, image: selectedFile, sender: "Patient" });
//       }

//       setMessage("");
//       setSelectedFile(null);
//       setShowRatingForm(true);
//     }
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64String = reader.result.split(",")[1];
//         setSelectedFile(base64String);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="ml-40 flex justify-center items-center min-h-screen bg-green-50">
//       <div className="mt-5 max-w-3xl w-full p-6 bg-white rounded-2xl shadow-lg border border-green-300">
//         <button onClick={() => navigate(-1)} className="border px-3 py-1 text-green-600 rounded-md mb-4 hover:bg-green-100">
//           ⬅ Back
//         </button>

//         <div className="border-b pb-4 mb-4 max-h-60 overflow-y-auto">
//           {messages.map((msg, index) => (
//             <div key={index} className={`p-3 rounded-md ${msg.sender === "Patient" ? "bg-green-100 text-right" : "bg-blue-100 text-left"}`}>
//               <p className="font-semibold">{msg.sender}</p>
//               {msg.text && <p className="text-gray-700">{msg.text}</p>}
//               {msg.type === "image" && (
//                 <img 
//                   src={msg.content} 
//                   alt="Sent" 
//                   className="w-40 rounded-md mx-auto cursor-pointer" 
//                   onClick={() => setFullScreenImage(msg.content)}
//                 />
//               )}
//               <p className="text-sm text-gray-500">{msg.time}</p>
//             </div>
//           ))}
//         </div>

//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-bold">{doctorName}</h2>
//         </div>

//         <div>
//           <label className="block font-semibold mb-1">Message Input Area</label>
//           <div className="flex items-center gap-2">
//             <input
//               type="text"
//               placeholder="Type a message..."
//               className="border rounded-md px-3 py-2 w-full"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//             />
//             <button onClick={handleSendMessage} className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center">
//               <MdSend />
//             </button>
//           </div>
//         </div>

//         <div className="mt-4 flex justify-between items-center">
//           <input type="file" onChange={handleFileChange} className="hidden" id="fileInput" />
//           <button className="bg-green-100 text-green-700 px-4 py-2 rounded-md" onClick={() => document.getElementById("fileInput").click()}>
//             Add Attachment
//           </button>
//           {showRatingForm && <RatingComponent doctorName={doctorName} />}
//         </div>

//         <div className="mt-4 text-right">
//           <button className="bg-green-100 text-green-700 px-4 py-2 rounded-md">Request Prescription</button>
//           <button className="ml-5 bg-green-100 text-green-700 px-4 py-2 rounded-md">Request Test</button>
//         </div>
//       </div>

//       {fullScreenImage && (
//         <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center" onClick={() => setFullScreenImage(null)}>
//           <img src={fullScreenImage} alt="Full Screen" className="max-w-full max-h-full" />
//         </div>
//       )}
//     </div>
//   );
// }

// export default Message;





// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from "react-router-dom";
// import { MdSend } from "react-icons/md";
// import { initializeSocket, recievemessage, sendmessage } from '../config/socket.js';
// import RatingComponent from './RatingComponent';

// function Message() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [doctorName, setDoctorName] = useState(location.state?.name || "Dr. John Doe");
//   const [chatId, setChatId] = useState(location.state?.id || "");
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [showRatingForm, setShowRatingForm] = useState(false);
//   const [fullScreenImage, setFullScreenImage] = useState(null);

//   useEffect(() => {
//     if (!chatId) return;

//     const socket = initializeSocket(chatId);
//     socket.emit("join-room", chatId);

//     recievemessage("project-message", (data) => {
//       setMessages((prevMessages) => [...prevMessages, data]);
//     });

//     recievemessage("receive-image", (data) => {
//       setMessages((prevMessages) => [...prevMessages, { sender: data.sender || "Doctor", type: "image", content: `data:image/png;base64,${data.image}`, time: new Date().toLocaleTimeString() }]);
//     });

//     return () => socket.disconnect();
//   }, [chatId]);

//   const handleSendMessage = () => {
//     if (message.trim() || selectedFile) {
//       const newMessage = {
//         chatId,
//         sender: "Patient",
//         text: message || "",
//         type: selectedFile ? "image" : "text",
//         content: selectedFile ? `data:image/png;base64,${selectedFile}` : message,
//         time: new Date().toLocaleTimeString(),
//       };

//       sendmessage("project-message", newMessage);

//       if (selectedFile) {
//         sendmessage("send-image", { chatId, image: selectedFile, sender: "Patient" });
//       }

//       setMessage("");
//       setSelectedFile(null);
//       setShowRatingForm(true);
//     }
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64String = reader.result.split(",")[1];
//         setSelectedFile(base64String);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="ml-40 flex justify-center items-center min-h-screen bg-green-50">
//       <div className="mt-5 max-w-3xl w-full p-6 bg-white rounded-2xl shadow-lg border border-green-300">
//         <button onClick={() => navigate(-1)} className="border px-3 py-1 text-green-600 rounded-md mb-4 hover:bg-green-100">
//           ⬅ Back
//         </button>

//         <div className="border-b pb-4 mb-4 max-h-60 overflow-y-auto">
//           {messages.map((msg, index) => (
//             <div key={index} className={`p-3 rounded-md ${msg.sender === "Patient" ? "bg-green-100 text-right" : "bg-blue-100 text-left"}`}>
//               <p className="font-semibold">{msg.sender}</p>
//               {msg.text && <p className="text-gray-700">{msg.text}</p>}
//               {msg.type === "image" && (
//                 <img 
//                   src={msg.content} 
//                   alt="Sent" 
//                   className="w-40 rounded-md mx-auto cursor-pointer" 
//                   onClick={() => setFullScreenImage(msg.content)}
//                 />
//               )}
//               <p className="text-sm text-gray-500">{msg.time}</p>
//             </div>
//           ))}
//         </div>

//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-bold">{doctorName}</h2>
//         </div>

//         <div>
//           <label className="block font-semibold mb-1">Message Input Area</label>
//           <div className="flex items-center gap-2">
//             <input
//               type="text"
//               placeholder="Type a message..."
//               className="border rounded-md px-3 py-2 w-full"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//             />
//             <button onClick={handleSendMessage} className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center">
//               <MdSend />
//             </button>
//           </div>
//         </div>

//         <div className="mt-4 flex justify-between items-center">
//           <input type="file" onChange={handleFileChange} className="hidden" id="fileInput" />
//           <button className="bg-green-100 text-green-700 px-4 py-2 rounded-md" onClick={() => document.getElementById("fileInput").click()}>
//             Add Attachment
//           </button>
//           {showRatingForm && <RatingComponent doctorName={doctorName} />}
//         </div>

//         <div className="mt-4 text-right">
//           {/* <button className="bg-green-100 text-green-700 px-4 py-2 rounded-md">Request Prescription</button>
//           <button className="ml-5 bg-green-100 text-green-700 px-4 py-2 rounded-md">Request Test</button> */}
//         </div>
//       </div>

//       {fullScreenImage && (
//         <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center" onClick={() => setFullScreenImage(null)}>
//           <img src={fullScreenImage} alt="Full Screen" className="max-w-full max-h-full" />
//         </div>
//       )}
//     </div>
//   );
// }

// export default Message;




// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from "react-router-dom";
// import { MdSend } from "react-icons/md";
// import { initializeSocket, recievemessage, sendmessage } from '../config/socket.js';
// import RatingComponent from './RatingComponent';

// function Message() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [doctorName, setDoctorName] = useState(location.state?.name || "Dr. John Doe");
//   const [chatId, setChatId] = useState(location.state?.id || "");
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [showRatingForm, setShowRatingForm] = useState(false);
//   const [fullScreenImage, setFullScreenImage] = useState(null);

//   useEffect(() => {
//     if (!chatId) return;

//     const socket = initializeSocket(chatId);
//     socket.emit("join-room", chatId);

//     recievemessage("project-message", (data) => {
//       setMessages((prevMessages) => [...prevMessages, data]);
//     });

//     recievemessage("receive-image", (data) => {
//       if (data.sender !== "Patient") { // Prevent duplicate display of sent image
//         setMessages((prevMessages) => [...prevMessages, { sender: data.sender || "Doctor", type: "image", content: `data:image/png;base64,${data.image}`, time: new Date().toLocaleTimeString() }]);
//       }
//     });

//     return () => socket.disconnect();
//   }, [chatId]);

//   const handleSendMessage = () => {
//     if (message.trim() || selectedFile) {
//       const newMessage = {
//         chatId,
//         sender: "Patient",
//         text: message || "",
//         type: selectedFile ? "image" : "text",
//         content: selectedFile ? `data:image/png;base64,${selectedFile}` : message,
//         time: new Date().toLocaleTimeString(),
//       };

//       sendmessage("project-message", newMessage);

//       if (selectedFile) {
//         sendmessage("send-image", { chatId, image: selectedFile, sender: "Patient" });
//       }

//       setMessage("");
//       setSelectedFile(null);
//       setShowRatingForm(true);
//     }
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64String = reader.result.split(",")[1];
//         setSelectedFile(base64String);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="ml-40 flex justify-center items-center min-h-screen bg-green-50">
//       <div className="mt-5 max-w-3xl w-full p-6 bg-white rounded-2xl shadow-lg border border-green-300">
//         <button onClick={() => navigate(-1)} className="border px-3 py-1 text-green-600 rounded-md mb-4 hover:bg-green-100">
//           ⬅ Back
//         </button>

//         <div className="border-b pb-4 mb-4 max-h-60 overflow-y-auto">
//           {messages.map((msg, index) => (
//             <div key={index} className={`p-3 rounded-md ${msg.sender === "Patient" ? "bg-green-100 text-right" : "bg-blue-100 text-left"}`}>
//               <p className="font-semibold">{msg.sender}</p>
//               {msg.text && <p className="text-gray-700">{msg.text}</p>}
//               {msg.type === "image" && (
//                 <img 
//                   src={msg.content} 
//                   alt="Sent" 
//                   className="w-40 rounded-md mx-auto cursor-pointer" 
//                   onClick={() => setFullScreenImage(msg.content)}
//                 />
//               )}
//               <p className="text-sm text-gray-500">{msg.time}</p>
//             </div>
//           ))}
//         </div>

//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-bold">{doctorName}</h2>
//         </div>

//         <div>
//           <label className="block font-semibold mb-1">Message Input Area</label>
//           <div className="flex items-center gap-2">
//             <input
//               type="text"
//               placeholder="Type a message..."
//               className="border rounded-md px-3 py-2 w-full"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//             />
//             <button onClick={handleSendMessage} className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center">
//               <MdSend />
//             </button>
//           </div>
//         </div>

//         <div className="mt-4 flex justify-between items-center">
//           <input type="file" onChange={handleFileChange} className="hidden" id="fileInput" />
//           <button className="bg-green-100 text-green-700 px-4 py-2 rounded-md" onClick={() => document.getElementById("fileInput").click()}>
//             Add Attachment
//           </button>
//           {showRatingForm && <RatingComponent doctorName={doctorName} />}
//         </div>

//         <div className="mt-4 text-right">
//           <button className="bg-green-100 text-green-700 px-4 py-2 rounded-md">Request Prescription</button>
//           <button className="ml-5 bg-green-100 text-green-700 px-4 py-2 rounded-md">Request Test</button>
//         </div>
//       </div>

//       {fullScreenImage && (
//         <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center" onClick={() => setFullScreenImage(null)}>
//           <img src={fullScreenImage} alt="Full Screen" className="max-w-full max-h-full" />
//         </div>
//       )}
//     </div>
//   );
// }

// export default Message;





// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from "react-router-dom";
// import { MdSend } from "react-icons/md";
// import { initializeSocket, recievemessage, sendmessage } from '../config/socket.js';
// import RatingComponent from './RatingComponent';

// function Message() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [doctorName, setDoctorName] = useState(location.state?.name || "Dr. John Doe");
//   const [chatId, setChatId] = useState(location.state?.id || "");
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [showRatingForm, setShowRatingForm] = useState(false);
//   const [fullScreenImage, setFullScreenImage] = useState(null);

//   useEffect(() => {
//     if (!chatId) return;

//     const socket = initializeSocket(chatId);
//     socket.emit("join-room", chatId);

//     recievemessage("project-message", (data) => {
//       setMessages((prevMessages) => [...prevMessages, data]);
//     });

//     recievemessage("receive-image", (data) => {
//       setMessages((prevMessages) => {
//         if (!prevMessages.some(msg => msg.content === `data:image/png;base64,${data.image}`)) {
//           return [...prevMessages, { sender: data.sender || "Doctor", type: "image", content: `data:image/png;base64,${data.image}`, time: new Date().toLocaleTimeString() }];
//         }
//         return prevMessages;
//       });
//     });

//     return () => socket.disconnect();
//   }, [chatId]);

//   const handleSendMessage = () => {
//     if (message.trim() || selectedFile) {
//       const newMessage = {
//         chatId,
//         sender: "Patient",
//         text: message || "",
//         type: selectedFile ? "image" : "text",
//         content: selectedFile ? `data:image/png;base64,${selectedFile}` : message,
//         time: new Date().toLocaleTimeString(),
//       };

//       sendmessage("project-message", newMessage);

//       if (selectedFile) {
//         sendmessage("send-image", { chatId, image: selectedFile, sender: "Patient" });
//       }

//       setMessage("");
//       setSelectedFile(null);
//       setShowRatingForm(true);
//     }
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64String = reader.result.split(",")[1];
//         setSelectedFile(base64String);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="ml-40 flex justify-center items-center min-h-screen bg-green-50">
//       <div className="mt-5 max-w-3xl w-full p-6 bg-white rounded-2xl shadow-lg border border-green-300">
//         <button onClick={() => navigate(-1)} className="border px-3 py-1 text-green-600 rounded-md mb-4 hover:bg-green-100">
//           ⬅ Back
//         </button>

//         <div className="border-b pb-4 mb-4 max-h-60 overflow-y-auto">
//           {messages.map((msg, index) => (
//             <div key={index} className={`p-3 rounded-md ${msg.sender === "Patient" ? "bg-green-100 text-right" : "bg-blue-100 text-left"}`}>
//               <p className="font-semibold">{msg.sender}</p>
//               {msg.text && <p className="text-gray-700">{msg.text}</p>}
//               {msg.type === "image" && (
//                 <img 
//                   src={msg.content} 
//                   alt="Sent" 
//                   className="w-40 rounded-md mx-auto cursor-pointer" 
//                   onClick={() => setFullScreenImage(msg.content)}
//                 />
//               )}
//               <p className="text-sm text-gray-500">{msg.time}</p>
//             </div>
//           ))}
//         </div>

//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-bold">{doctorName}</h2>
//         </div>

//         <div>
//           <label className="block font-semibold mb-1">Message Input Area</label>
//           <div className="flex items-center gap-2">
//             <input
//               type="text"
//               placeholder="Type a message..."
//               className="border rounded-md px-3 py-2 w-full"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//             />
//             <button onClick={handleSendMessage} className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center">
//               <MdSend />
//             </button>
//           </div>
//         </div>

//         <div className="mt-4 flex justify-between items-center">
//           <input type="file" onChange={handleFileChange} className="hidden" id="fileInput" />
//           <button className="bg-green-100 text-green-700 px-4 py-2 rounded-md" onClick={() => document.getElementById("fileInput").click()}>
//             Add Attachment
//           </button>
//           {showRatingForm && <RatingComponent doctorName={doctorName} />}
//         </div>

//         <div className="mt-4 text-right">
//           <button className="bg-green-100 text-green-700 px-4 py-2 rounded-md">Request Prescription</button>
//           <button className="ml-5 bg-green-100 text-green-700 px-4 py-2 rounded-md">Request Test</button>
//         </div>
//       </div>

//       {fullScreenImage && (
//         <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center" onClick={() => setFullScreenImage(null)}>
//           <img src={fullScreenImage} alt="Full Screen" className="max-w-full max-h-full" />
//         </div>
//       )}
//     </div>
//   );
// }

// export default Message;
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { MdSend } from "react-icons/md";
import { initializeSocket, recievemessage, sendmessage } from '../config/socket.js';
import RatingComponent from './RatingComponent';

function Message() {
  const location = useLocation();
  const navigate = useNavigate();
  const [doctorName, setDoctorName] = useState(location.state?.name || "Dr. John Doe");
  const [chatId, setChatId] = useState(location.state?.id || "");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState(null);

  useEffect(() => {
    if (!chatId) return;

    const socket = initializeSocket(chatId);
    socket.emit("join-room", chatId);

    recievemessage("project-message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    recievemessage("receive-image", (data) => {
      setMessages((prevMessages) => {
        if (!prevMessages.some(msg => msg.content === `data:image/png;base64,${data.image}`)) {
          return [...prevMessages, { sender: data.sender || "Doctor", type: "image", content: `data:image/png;base64,${data.image}`, time: new Date().toLocaleTimeString() }];
        }
        return prevMessages;
      });
    });

    return () => socket.disconnect();
  }, [chatId]);

  const handleSendMessage = () => {
    if (message.trim() || selectedFile) {
      const newMessage = {
        chatId,
        sender: "Patient",
        text: message || "",
        type: selectedFile ? "image" : "text",
        content: selectedFile ? `data:image/png;base64,${selectedFile}` : message,
        time: new Date().toLocaleTimeString(),
      };

      sendmessage("project-message", newMessage);

      if (selectedFile) {
        sendmessage("send-image", { chatId, image: selectedFile, sender: "Patient" });
      }

      setMessage("");
      setSelectedFile(null);
      setShowRatingForm(true);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];
        setSelectedFile(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="ml-40 flex justify-center items-center min-h-screen bg-green-50">
      <div className="mt-5 max-w-3xl w-full p-6 bg-white rounded-2xl shadow-lg border border-green-300">
        <button onClick={() => navigate(-1)} className="border px-3 py-1 text-green-600 rounded-md mb-4 hover:bg-green-100">
          ⬅ Back
        </button>

        <div className="border-b pb-4 mb-4 max-h-60 overflow-y-auto">
          {messages.map((msg, index) => {
            const isLink = msg.text && msg.text.includes("https://hackathontesting-1-l1av.onrender.com/docdashboard/room");

            return (
              <div key={index} className={`p-3 rounded-md ${msg.sender === "Patient" ? "bg-green-100 text-right" : "bg-blue-100 text-left"}`}>
                <p className="font-semibold">{msg.sender}</p>
                {msg.text && (
                  isLink ? (
                    <a
                      href={msg.text}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline break-all"
                    >
                      {msg.text}
                    </a>
                  ) : (
                    <p className="text-gray-700">{msg.text}</p>
                  )
                )}
                {msg.type === "image" && (
                  <img
                    src={msg.content}
                    alt="Sent"
                    className="w-40 rounded-md mx-auto cursor-pointer"
                    onClick={() => setFullScreenImage(msg.content)}
                  />
                )}
                <p className="text-sm text-gray-500">{msg.time}</p>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{doctorName}</h2>
        </div>

        <div>
          <label className="block font-semibold mb-1">Message Input Area</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="border rounded-md px-3 py-2 w-full"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleSendMessage} className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center">
              <MdSend />
            </button>
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <input type="file" onChange={handleFileChange} className="hidden" id="fileInput" />
          <button className="bg-green-100 text-green-700 px-4 py-2 rounded-md" onClick={() => document.getElementById("fileInput").click()}>
            Add Attachment
          </button>
          {showRatingForm && <RatingComponent doctorName={doctorName} />}
        </div>

        <div className="mt-4 text-right">
          <button className="bg-green-100 text-green-700 px-4 py-2 rounded-md">Request Prescription</button>
          <button className="ml-5 bg-green-100 text-green-700 px-4 py-2 rounded-md">Request Test</button>
        </div>
      </div>

      {fullScreenImage && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center" onClick={() => setFullScreenImage(null)}>
          <img src={fullScreenImage} alt="Full Screen" className="max-w-full max-h-full" />
        </div>
      )}
    </div>
  );
}

export default Message;

