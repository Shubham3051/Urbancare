




import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { MdSend, MdAttachFile } from "react-icons/md";
import { initializeSocket, recievemessage, sendmessage } from '../config/socket.js';

function Message() {
  const location = useLocation();
  const navigate = useNavigate();
  const [patientName, setPatientName] = useState(location.state?.name || "paras");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(location.state?.chatId || "");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fullScreenImage, setFullScreenImage] = useState(null);
  const messagesEndRef = useRef(null);
  

  useEffect(() => {
    if (!chatId.trim()) return;

    const socket = initializeSocket(chatId);
    socket.emit("join-room", chatId);

    const handleReceiveMessage = (data) => {
      setMessages((prevMessages) => {
        if (!prevMessages.some(msg => msg.time === data.time && msg.sender === data.sender)) {
          return [...prevMessages, data];
        }
        return prevMessages;
      });
    };

    const handleReceiveImage = (data) => {
      setMessages((prevMessages) => {
        if (!prevMessages.some(msg => msg.content === `data:image/png;base64,${data.image}`)) {
          return [...prevMessages, {
            sender: data.sender || "Patient",
            type: "image",
            content: `data:image/png;base64,${data.image}`,
            time: new Date().toLocaleTimeString()
          }];
        }
        return prevMessages;
      });
    };

    recievemessage("project-message", handleReceiveMessage);
    recievemessage("receive-image", handleReceiveImage);

    return () => {
      socket.disconnect();
    };
  }, [chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim() || selectedFile) {
      const newMessage = {
        chatId,
        sender: "Doctor",
        text: message,
        type: selectedFile ? "image" : "text",
        content: selectedFile ? `data:image/png;base64,${selectedFile}` : message,
        time: new Date().toLocaleTimeString(),
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      sendmessage("project-message", newMessage);

      if (selectedFile) {
        sendmessage("send-image", { chatId, image: selectedFile, sender: "Doctor" });
      }

      setMessage("");
      setSelectedFile(null);
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
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md max-w-3xl flex flex-col h-[80vh]">
      {fullScreenImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50" onClick={() => setFullScreenImage(null)}>
          <img src={fullScreenImage} alt="Full Screen" className="max-w-full max-h-full rounded-lg shadow-lg" />
          <button className="absolute top-5 right-5 bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => setFullScreenImage(null)}>Close</button>
        </div>
      )}

      <button onClick={() => navigate(-1)} className="border px-3 py-1 text-green-600 rounded-md hover:bg-green-100 mb-4 self-start text-sm">⬅ Back</button>

      <div className="flex-grow overflow-y-auto space-y-3">
        {messages.map((msg, index) => (
          <div key={index} className={`p-3 rounded-lg max-w-xs ${msg.sender === "Doctor" ? "ml-auto bg-green-50" : "bg-gray-100"}`}>
            <p className="font-semibold text-gray-700">{msg.sender}</p>
            {msg.type === "text" && <p className="text-gray-800">{msg.content}</p>}
            {msg.type === "image" && (
              <img
                src={msg.content}
                alt="Sent"
                className="w-40 rounded-md cursor-pointer shadow-md"
                onClick={() => setFullScreenImage(msg.content)}
              />
            )}
            <p className="text-sm text-gray-500 text-right">{msg.time}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold text-gray-700">{patientName}</h2>
          <button className="bg-green-500 text-white px-3 py-1 rounded-md shadow-md hover:bg-green-600 text-sm" onClick={() => window.open(`/docdashboard/room/${chatId}`, "_blank")}>Video Call</button>
        </div>

        <div className="flex items-center gap-2 border p-2 rounded-md shadow-md bg-white">
          <input type="text" placeholder="Type a message..." className="w-full focus:outline-none text-gray-700" value={message} onChange={(e) => setMessage(e.target.value)} />
          <button onClick={handleSendMessage} className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 shadow-md text-sm"><MdSend size={16}/></button>
        </div>
      </div>

      <div className="mt-2 flex justify-between items-center">
        <label htmlFor="fileInput" className="bg-green-100 text-green-700 px-3 py-1 rounded-md hover:bg-green-200 shadow-md cursor-pointer text-sm">
          <MdAttachFile size={16} className="inline mr-1" /> Attachment
        </label>
        <label htmlFor="fileInput" className="bg-green-100 text-green-700 px-3 py-1 rounded-md hover:bg-green-200 shadow-md cursor-pointer text-sm">
          <MdAttachFile size={16} className="inline mr-1" /> Add Prescription
        </label>
        <input type="file" onChange={handleFileChange} className="hidden" id="fileInput" />
        {selectedFile && <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 shadow-md text-sm" onClick={handleSendMessage}>Send Image</button>}
      </div>
    </div>
  );
}

export default Message;






// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate, useLocation } from "react-router-dom";
// import { MdSend, MdAttachFile } from "react-icons/md";
// import axios from "axios";
// import { initializeSocket, recievemessage, sendmessage } from '../config/socket.js';

// function Message() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [patientName, setPatientName] = useState(location.state?.name || "paras");
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [chatId, setChatId] = useState(location.state?.chatId || "");
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [prescriptionFile, setPrescriptionFile] = useState(null);
//   const [fullScreenImage, setFullScreenImage] = useState(null);
//   const messagesEndRef = useRef(null);
  
//   useEffect(() => {
//     if (!chatId.trim()) return;

//     const socket = initializeSocket(chatId);
//     socket.emit("join-room", chatId);

//     const handleReceiveMessage = (data) => {
//       setMessages((prevMessages) => {
//         if (!prevMessages.some(msg => msg.time === data.time && msg.sender === data.sender)) {
//           return [...prevMessages, data];
//         }
//         return prevMessages;
//       });
//     };

//     const handleReceiveImage = (data) => {
//       setMessages((prevMessages) => {
//         if (!prevMessages.some(msg => msg.content === `data:image/png;base64,${data.image}`)) {
//           return [...prevMessages, {
//             sender: data.sender || "Patient",
//             type: "image",
//             content: `data:image/png;base64,${data.image}`,
//             time: new Date().toLocaleTimeString()
//           }];
//         }
//         return prevMessages;
//       });
//     };

//     recievemessage("project-message", handleReceiveMessage);
//     recievemessage("receive-image", handleReceiveImage);

//     return () => {
//       socket.disconnect();
//     };
//   }, [chatId]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleSendMessage = () => {
//     if (message.trim() || selectedFile) {
//       const newMessage = {
//         chatId,
//         sender: "Doctor",
//         text: message,
//         type: selectedFile ? "image" : "text",
//         content: selectedFile ? `data:image/png;base64,${selectedFile}` : message,
//         time: new Date().toLocaleTimeString(),
//       };

//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//       sendmessage("project-message", newMessage);

//       if (selectedFile) {
//         sendmessage("send-image", { chatId, image: selectedFile, sender: "Doctor" });
//       }

//       setMessage("");
//       setSelectedFile(null);
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

//   const handlePrescriptionUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("prescription", file);
//     formData.append("chatId", chatId); // Assuming backend can use chatId to identify patient

//     try {
//       await axios.post("http://localhost:8080/upload-prescription", formData);
//       alert("Prescription uploaded successfully!");
//       setPrescriptionFile(null);
//     } catch (error) {
//       console.error("Upload failed:", error);
//       alert("Failed to upload prescription.");
//     }
//   };

//   return (
//     <div className="container mx-auto p-6 bg-white rounded-lg shadow-md max-w-3xl flex flex-col h-[80vh]">
//       {fullScreenImage && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50" onClick={() => setFullScreenImage(null)}>
//           <img src={fullScreenImage} alt="Full Screen" className="max-w-full max-h-full rounded-lg shadow-lg" />
//           <button className="absolute top-5 right-5 bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => setFullScreenImage(null)}>Close</button>
//         </div>
//       )}

//       <button onClick={() => navigate(-1)} className="border px-3 py-1 text-green-600 rounded-md hover:bg-green-100 mb-4 self-start text-sm">⬅ Back</button>

//       <div className="flex-grow overflow-y-auto space-y-3">
//         {messages.map((msg, index) => (
//           <div key={index} className={`p-3 rounded-lg max-w-xs ${msg.sender === "Doctor" ? "ml-auto bg-green-50" : "bg-gray-100"}`}>
//             <p className="font-semibold text-gray-700">{msg.sender}</p>
//             {msg.type === "text" && <p className="text-gray-800">{msg.content}</p>}
//             {msg.type === "image" && (
//               <img
//                 src={msg.content}
//                 alt="Sent"
//                 className="w-40 rounded-md cursor-pointer shadow-md"
//                 onClick={() => setFullScreenImage(msg.content)}
//               />
//             )}
//             <p className="text-sm text-gray-500 text-right">{msg.time}</p>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       <div className="mt-4">
//         <div className="flex justify-between items-center mb-2">
//           <h2 className="text-lg font-bold text-gray-700">{patientName}</h2>
//           <button className="bg-green-500 text-white px-3 py-1 rounded-md shadow-md hover:bg-green-600 text-sm" onClick={() => window.open(`/docdashboard/room/${chatId}`, "_blank")}>Video Call</button>
//         </div>

//         <div className="flex items-center gap-2 border p-2 rounded-md shadow-md bg-white">
//           <input type="text" placeholder="Type a message..." className="w-full focus:outline-none text-gray-700" value={message} onChange={(e) => setMessage(e.target.value)} />
//           <button onClick={handleSendMessage} className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 shadow-md text-sm"><MdSend size={16}/></button>
//         </div>
//       </div>

//       <div className="mt-2 flex justify-between items-center">
//         <label htmlFor="fileInput" className="bg-green-100 text-green-700 px-3 py-1 rounded-md hover:bg-green-200 shadow-md cursor-pointer text-sm">
//           <MdAttachFile size={16} className="inline mr-1" /> Attachment
//         </label>
//         <input type="file" onChange={handleFileChange} className="hidden" id="fileInput" />
        
//         <label htmlFor="prescriptionInput" className="bg-green-100 text-green-700 px-3 py-1 rounded-md hover:bg-green-200 shadow-md cursor-pointer text-sm">
//           <MdAttachFile size={16} className="inline mr-1" /> Add Prescription
//         </label>
//         <input type="file" onChange={handlePrescriptionUpload} className="hidden" id="prescriptionInput" />

//         {selectedFile && <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 shadow-md text-sm" onClick={handleSendMessage}>Send Image</button>}
//       </div>
//     </div>
//   );
// }

// export default Message;
