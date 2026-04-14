import { useState, useEffect } from "react";

const useSpeechRecognition = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");

    useEffect(() => {
        if (!("webkitSpeechRecognition" in window)) {
            console.error("Speech recognition is not supported in this browser.");
            return;
        }

        const recognition = new window.webkitSpeechRecognition();

        recognition.lang = "en-US";
        recognition.continuous = true; // Keeps listening until stopped
        recognition.interimResults = true; // Shows partial results for real-time effect

        recognition.onresult = (event) => {
            let currentTranscript = "";
            for (let i = event.resultIndex; i < event.results.length; i++) {
                currentTranscript += event.results[i][0].transcript;
            }
            setTranscript(currentTranscript);
        };

        recognition.onerror = (event) => {
            console.error("Speech Recognition Error: ", event.error);
        };

        if (isListening) {
            recognition.start();
        } else {
            recognition.stop();
        }

        return () => recognition.abort();
    }, [isListening]);

    return { transcript, isListening, setIsListening };
};

export default useSpeechRecognition;
