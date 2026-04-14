import { useState, useEffect, useRef } from "react";
import { FaMicrophone, FaStop } from "react-icons/fa";
import output from "../assets/output.jpg";
import { apiClient } from "../../axios/axios.js";
import 'regenerator-runtime/runtime';
import "./doco.css";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function Doco() {
    const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    const [messages, setMessages] = useState([
        { text: "Hi, I'm Doco. How can I help you today? Tell your symptoms so I can assign you a doctor.", sender: "bot" },
    ]);

    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => inputRef.current.focus(), []);

    useEffect(() => {
        if (listening) setInput(transcript);
        console.log(transcript);
    }, [transcript, listening]);

    const getBotResponse = async (userMessage) => {
        try {
            setLoading(true);
            const response = await apiClient.post(
                `/ai/get-result?da=${userMessage}`,
                { message: userMessage },
                { headers: { "Content-Type": "application/json" } }
            );

            const data = response.data;
            console.log("Response Data:", data);

            let appointmentLink = "";
            if (data.doctor?.id) {
                const doctorId = data.doctor.id;
                appointmentLink = `https://hackathontesting-1-l1av.onrender.com/appointment/${doctorId}`;
            }

            setMessages((prev) => [
                ...prev,
                { text: data.message, sender: "bot" },
                {
                    text: (
                        <div className="appointment-card">
                            <p className="font-bold text-blue-500">✅ Appointment Booking Available!</p>
                            <p>
                                Book your appointment here:{" "}
                            <h2>   <a
                                    href={appointmentLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="appointment-link"
                                >
                                    {appointmentLink}
                                </a></h2> 
                            </p>
                        </div>
                    ),
                    sender: "bot"
                }
            ]);

        } catch (error) {
            console.error("Error fetching data:", error);
            setMessages((prev) => [...prev, { text: "Error fetching data", sender: "bot" }]);
        } finally {
            setLoading(false);
        }
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = input.trim();
        setMessages([...messages, { text: userMessage, sender: "user" }]);

        await getBotResponse(userMessage);

        setInput("");
        resetTranscript();
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") handleSend();
    };

    const handleMicStart = () => SpeechRecognition.startListening({ continuous: true, language: "en-US" });

    const handleMicStop = () => {
        console.log("Speech recognition stopped.");
        console.log("Transcript before stopping:", transcript);
        SpeechRecognition.stopListening();
    };

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    return (
        <div className="doco-container">
            <div className="chat-container">
                <div className="chat-header">Doco - Virtual Assistant</div>
                <div className="chat-messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.sender}`}>
                            {msg.text}
                        </div>
                    ))}
                    {loading && <div className="message bot">Loading...</div>}
                </div>

                <div className="chat-input">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Type a message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value.trimStart())}
                        onKeyDown={handleKeyPress}
                    />
                    <button onClick={handleSend} className="send-btn">Send</button>

                    <button
                        onClick={listening ? handleMicStop : handleMicStart}
                        className={`mic-btn ${listening ? "active" : ""}`}
                    >
                        {listening ? <FaStop /> : <FaMicrophone />}
                    </button>
                </div>
            </div>

            <img src={output} alt="Doco AI" className="doco-avatar" />
        </div>
    );
}

export default Doco;
