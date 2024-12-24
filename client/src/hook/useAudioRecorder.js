import { useState, useRef } from "react";
import { blobToBase64 } from "../utils/convertToBase64";

const useAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/mp3" });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);

        console.log({ audioUrl });
        

        const response = await fetch(audioUrl);
        const blob = await response.blob();
        const base64Data = await blobToBase64(blob);
        localStorage.setItem("savedAudio", base64Data);
        audioChunks.current = [];
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      setErrorMessage("Không thể truy cập micro: " + error.message);
    }
  };

  const stopRecording = () => {

    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {

      mediaRecorderRef.current.stop();
      setIsRecording(false);
      console.log("stop recording", mediaRecorderRef.current.state);

        // Close the stream to release the microphone
        const stream = mediaRecorderRef.current.stream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        console.log("Microphone stream stopped.");
 
    }

  };

  return {
    isRecording,
    audioURL,
    errorMessage,
    startRecording,
    stopRecording,
  };
};

export default useAudioRecorder;
