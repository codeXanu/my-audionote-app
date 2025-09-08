import { useState, useRef } from "react";

export default function RecorderButton() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const animationRef = useRef(null);
  const canvasRef = useRef(null);

  /** 🎙 Start recording */
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Setup MediaRecorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => handleSaveRecording();

      mediaRecorder.start();
      setIsRecording(true);

      setupAudioVisualizer(stream);
      drawWaveform();

      // Auto stop after 1 min
      setTimeout(() => {
        if (mediaRecorder.state === "recording") stopRecording();
      }, 60_000);
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  /** ⏹ Stop recording */
  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    cancelAnimationFrame(animationRef.current);
    audioContextRef.current?.close();
  };

  /** 💾 Save recording to state */
  const handleSaveRecording = () => {
    const blob = new Blob(chunksRef.current, { type: "audio/webm" });
    const url = URL.createObjectURL(blob);
    setAudioURL(url);
    console.log(audioURL);

    // 👉 Here you can send `blob` to backend
    // Example:
    // const formData = new FormData();
    // formData.append("file", blob, "recording.webm");
    // fetch("/upload", { method: "POST", body: formData });
  };

  /** 📊 Setup analyser for waveform */
  const setupAudioVisualizer = (stream) => {
    audioContextRef.current = new (window.AudioContext ||
      window.webkitAudioContext)();
    const source = audioContextRef.current.createMediaStreamSource(stream);
    analyserRef.current = audioContextRef.current.createAnalyser();
    analyserRef.current.fftSize = 256;
    const bufferLength = analyserRef.current.frequencyBinCount;
    dataArrayRef.current = new Uint8Array(bufferLength);
    source.connect(analyserRef.current);
  };

  /** 🎶 Draw waveform on canvas */
  const drawWaveform = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;
    const bufferLength = analyser.frequencyBinCount;

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);

      analyser.getByteTimeDomainData(dataArray);

      ctx.fillStyle = "#111827"; // bg-gray-900
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 2;
      ctx.strokeStyle = "#f87171"; // red-400
      ctx.beginPath();

      const sliceWidth = (canvas.width * 1.0) / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    };

    draw();
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`px-6 py-3 rounded-full flex items-center font-medium shadow-lg transition-colors ${
          isRecording
            ? "bg-gray-500 text-white hover:bg-gray-600"
            : "bg-red-500 text-white hover:bg-red-600"
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-white mr-2"></span>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>

      {isRecording && (
        <canvas
          ref={canvasRef}
          width={300}
          height={80}
          className="border border-gray-300 rounded bg-amber-300"
        />
      )}

      {audioURL && (
        <audio controls src={audioURL} className="mt-2 w-full max-w-md" />
      )}
    </div>
  );
}
