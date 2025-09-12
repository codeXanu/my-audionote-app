'use client'
import { useState, useRef, forwardRef, useImperativeHandle } from "react";
import { buildAudioFormData } from "../lib/buildAudioFromData";
import { fetchSummary } from "../lib/fetchSummary";
import { getAudioURL } from "../utils/makeAudioUrl";
import { getAudioDuration } from "../utils/getAudioDuration";


const RecorderModal = forwardRef(({userId, setCardsData}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [timer, setTimer] = useState(0);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const animationRef = useRef(null);
  const canvasRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const isCancelledRef = useRef(false);
  const streamRef = useRef(null);


  

  /** Allow parent to open recorder */
  useImperativeHandle(ref, () => ({
    openRecorder: () => startRecording(),
  }));

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const cleanupRecording = () => {
    clearInterval(timerIntervalRef.current);
    cancelAnimationFrame(animationRef.current);
    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      audioContextRef.current.close();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  };


const startRecording = async () => {
    try {
        isCancelledRef.current = false;
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        cleanupRecording();
        // clearInterval(timerIntervalRef.current);
        if (!isCancelledRef.current) {
            handleSaveRecording();
        }
        // if (streamRef.current) {
        //     streamRef.current.getTracks().forEach((t) => t.stop());
        //     streamRef.current = null;
        // }
      };

      mediaRecorder.start();
      setIsRecording(true);
      setIsOpen(true);
      setAudioURL(null);
      setTimer(0);
      
      timerIntervalRef.current = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer + 1 >= 60) {
            stopRecording(); // ⏱ auto stop at 1 min
          }
          return prevTimer + 1;
        });
      }, 1000);

      await setupAudioVisualizer(stream);
      drawWaveform();
    } catch (err) {
      console.error("Error accessing microphone:", err);
      window.alert("Error accessing your microphone. Please check your browser permissions.");
      setIsOpen(false);
    }
  };



const togglePause = () => {
    if (!mediaRecorderRef.current) return;
    if (!isPaused) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      clearInterval(timerIntervalRef.current);
      cancelAnimationFrame(animationRef.current);
    } else {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      timerIntervalRef.current = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer + 1 >= 60) {
            stopRecording(); // auto stop if resume crosses 1 min
          }
          return prevTimer + 1;
        });
      }, 1000);
      drawWaveform(); // Restart drawing when resuming
    }
  };


const stopRecording = () => {
    if (mediaRecorderRef.current?.state === 'recording' || mediaRecorderRef.current?.state === 'paused') {
      mediaRecorderRef.current.stop();
    }
    // if (streamRef.current) {
    //     streamRef.current.getTracks().forEach((t) => t.stop());
    //     streamRef.current = null;
    // }
    setIsRecording(false);
    cleanupRecording();
    // clearInterval(timerIntervalRef.current);
    // cancelAnimationFrame(animationRef.current);
    // if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
    //   audioContextRef.current.close();
    // }
    setIsOpen(false);
  };


const cancelRecording = () => {
    if (mediaRecorderRef.current?.state === 'recording' || mediaRecorderRef.current?.state === 'paused') {
        isCancelledRef.current = true;
        mediaRecorderRef.current.stop();
    }
    // if (streamRef.current) {
    //     streamRef.current.getTracks().forEach((t) => t.stop());
    //     streamRef.current = null;
    // }
    chunksRef.current = [];
    setIsRecording(false);
    setIsOpen(false);
    cleanupRecording();
    // clearInterval(timerIntervalRef.current);
    // cancelAnimationFrame(animationRef.current);
    // if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
    //   audioContextRef.current.close();
    // }
  };

const handleSaveRecording = async () => {
    console.log("handleSaveRecordingRun")
    if (chunksRef.current.length === 0) return;
    const blob = new Blob(chunksRef.current, { type: "audio/webm" });
    const file = new File([blob], "recording.webm", { type: "audio/webm" });
    const url = URL.createObjectURL(blob);
    setAudioURL(url);
    const formData = buildAudioFormData(file, userId);
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    try {
      console.log("i am fetching")
      const response = await fetchSummary(formData);
      const newCard = {
        id: response.id,
        date: response.createdAt,
        title: response.title || "Untitled",
        type: response.type || "Audio",
        duration: "00:13", // 👉 optional, if you want to calculate add here
        audioUrl: getAudioURL(response.audioFile),
        transcript: response.transcript,
        content: response.summary,
      };
      setCardsData(prev => [newCard, ...prev])
      console.log("Backend response:", response);
    } catch (error) {
      console.error("Error:", error);
    }
  };


const setupAudioVisualizer = async (stream) => {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioContextClass();

      if (audioContextRef.current.state === "suspended") {
        await audioContextRef.current.resume();
      }

      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 2048; // Use larger size for smoother waveform
      const bufferLength = analyserRef.current.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(bufferLength);
      source.connect(analyserRef.current);
    } catch (error) {
      console.error("Error setting up audio visualizer:", error);
    }
  };




  const drawWaveform = () => {
  const canvas = canvasRef.current;
  const analyser = analyserRef.current;
  const dataArray = dataArrayRef.current;

  if (!canvas || !analyser || !dataArray) {
    animationRef.current = requestAnimationFrame(drawWaveform);
    return;
  }

  const ctx = canvas.getContext("2d");
  const bufferLength = analyser.frequencyBinCount;

  const draw = () => {
    animationRef.current = requestAnimationFrame(draw);

    analyser.getByteTimeDomainData(dataArray);


    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;


    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const dotSpacing = 6;      // distance between dots/bars
    const dotSize = 2;         // baseline dot radius
    const barWidth = 4;        // thickness of bars (↑ increased)
    const heightBoost = 1.8;   // amplify bar height
    const totalDots = Math.floor(canvas.width / dotSpacing);
    const step = Math.floor(bufferLength / totalDots);

    for (let i = 0; i < totalDots; i++) {
      const v = dataArray[i * step] / 128.0;
      const y = (v * canvas.height) / 2;

      // amplify height
      const barHeight = Math.abs(y - canvas.height / 2) * heightBoost;

      const x = i * dotSpacing;
      const centerY = canvas.height / 2;

      ctx.beginPath();

      if (barHeight < 2) {
        // baseline dot
        ctx.arc(x, centerY, dotSize, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(107, 114, 128, 0.7)";
        ctx.fill();
      } else {
        // vertical bar
        ctx.fillStyle ="rgba(107, 114, 128, 0.7)";
        ctx.fillRect(
          x - barWidth / 2,        // center the bar on the dot
          centerY - barHeight,     // top Y
          barWidth,                // thicker bar
          barHeight * 2            // extend up & down
        );
      }
    }
  };

  draw();
};




  return (
    <>
      {/* Recorder Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-999 p-4">
          <div className="bg-white rounded-2xl lg:rounded-full shadow-xl p-8 w-full max-w-4xl">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-2">
              
              {/* Cancel Button */}
              <div className="flex justify-center gap-2 lg:gap-1 lg:w-auto w-full">
                    <button
                        onClick={cancelRecording}
                        className="flex items-center justify-center space-x-2 px-4 py-2 rounded-full border border-gray-300 text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors shadow-sm text-sm lg:text-base"
                        title="Cancel Recording"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-400">
                        <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                        </svg>
                        <span>Cancel</span>
                    </button>

                    {/* Pause Button */}
                    <button
                        onClick={togglePause}
                        className="flex items-center space-x-2 px-6 py-2 rounded-full border border-gray-300 text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors shadow-sm text-sm lg:text-base"
                        title={isPaused ? "Resume Recording" : "Pause Recording"}
                    >
                        {isPaused ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-400">
                            <path fillRule="evenodd" d="M4.5 5.653c0-1.083 1.125-1.75 2.062-1.213l9.55 5.25a2.25 2.25 0 010 3.926l-9.55 5.25c-.937.537-2.062-.13-2.062-1.214V5.653z" clipRule="evenodd" />
                        </svg>
                        ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-400">
                            <path fillRule="evenodd" d="M15.75 5.25a.75.75 0 01.75.75v12.75a.75.75 0 01-1.5 0V6a.75.75 0 01.75-.75zm-7.5 0A.75.75 0 019 6v12.75a.75.75 0 01-1.5 0V6a.75.75 0 01.75-.75z" clipRule="evenodd" />
                        </svg>
                        )}
                        <span>{isPaused ? "Resume" : "Pause"}</span>
                    </button>
              </div>

              {/* Visualizer and Timer */}
              <div className="flex flex-col items-center gap-2 lg:flex-row lg:flex-grow lg:mx-6 mx-8">
                <div className="flex-grow relative h-16 lg:h-8">
                  <div className="inset-0 "></div>
                  <canvas ref={canvasRef} className="inset-0 w-full h-16 lg:h-full"></canvas>
                  
                </div>
                <div className="text-xs lg:text-sm text-gray-600 font-mono whitespace-nowrap">
                  {formatTime(timer)} / 01:00
                </div>
              </div>

              {/* Stop Recording Button */}
              <div className="flex justify-center lg:w-auto w-full">

              
                <button
                    onClick={stopRecording}
                    className="flex items-center justify-center space-x-2 px-2 py-2 rounded-full text-white bg-gray-800 hover:bg-gray-900 transition-colors shadow-sm text-sm lg:text-base"
                    title="Stop Recording"
                >
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                    <span>Stop Recording</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Audio Preview */}
      {/* {audioURL && (
        <div className="mt-4 w-full flex flex-col items-center">
          <p className="text-sm font-medium mb-2">Recording saved!</p>
          <audio controls src={audioURL} className="w-full max-w-lg rounded-lg" />
        </div>
      )} */}
    </>
  );
});

export default RecorderModal;
