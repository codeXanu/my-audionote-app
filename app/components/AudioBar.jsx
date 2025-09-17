"use client";

import { useEffect, useMemo, useRef, useState } from "react";

function formatTime(sec) {
  if (!isFinite(sec)) return "00:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function AudioBar({
  src,
  filename = "audio.mp3",
  className = "",
}) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);

  const pct = useMemo(
    () => (duration ? (current / duration) * 100 : 0),
    [current, duration]
  );

  useEffect(() => {
    const a = (audioRef.current = new Audio(src));
    const onLoaded = () => setDuration(a.duration || 0);
    const onTime = () => setCurrent(a.currentTime || 0);
    const onEnd = () => setIsPlaying(false);

    a.addEventListener("loadedmetadata", onLoaded);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("ended", onEnd);
    return () => {
      a.pause();
      a.removeEventListener("loadedmetadata", onLoaded);
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("ended", onEnd);
    };
  }, [src]); // basic React audio approach [16]

  // Media Session API (optional)
  useEffect(() => {
    if ("mediaSession" in navigator && audioRef.current) {
      const a = audioRef.current;
      if (window.MediaMetadata) {
        navigator.mediaSession.metadata = new window.MediaMetadata({
          title: filename,
          artist: "",
          album: "",
          artwork: [],
        });
      }
      navigator.mediaSession.setActionHandler?.("play", async () => {
        await a.play();
        setIsPlaying(true);
      });
      navigator.mediaSession.setActionHandler?.("pause", () => {
        a.pause();
        setIsPlaying(false);
      });
      navigator.mediaSession.setActionHandler?.("seekbackward", (details) => {
        a.currentTime = Math.max(
          0,
          a.currentTime - (details?.seekOffset || 10)
        );
      });
      navigator.mediaSession.setActionHandler?.("seekforward", (details) => {
        a.currentTime = Math.min(
          a.duration || Infinity,
          a.currentTime + (details?.seekOffset || 10)
        );
      });
      navigator.mediaSession.setActionHandler?.("seekto", (details) => {
        if (typeof details.seekTime === "number")
          a.currentTime = details.seekTime;
      });
    }
  }, [filename]); // Media Session behaviors per guidance [21][22]

  const toggle = async () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      await audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const onScrub = (e) => {
    if (!audioRef.current) return;
    const next = (Number(e.target.value) / 100) * (duration || 0);
    audioRef.current.currentTime = next;
    setCurrent(next);
  };

  const onDownload = async () => {
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div
      className={
        "w-full max-w-5xl rounded-full border border-gray-200 bg-white p-2 shadow-sm " +
        className
      }
      role="region"
      aria-label="Audio player"
    >
      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-black text-white hover:bg-gray-900 active:scale-95 "
        >
          {isPlaying ? (
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <div className="flex-1">
          <div className="relative">
            <div className="h-1.5 w-full rounded-full bg-gray-200 " />
            <div
              className="pointer-events-none absolute left-0 top-0 h-1.5 rounded-full bg-orange-500"
              style={{ width: `${pct}%` }}
            />
            <input
              type="range"
              min={0}
              max={100}
              step={0.1}
              value={pct}
              aria-label="Seek"
              onChange={onScrub}
              className="
                absolute inset-0 w-full appearance-none bg-transparent
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-orange-500
                [&::-webkit-slider-thumb]:border-2
                [&::-webkit-slider-thumb]:border-white
                [&::-webkit-slider-thumb]:shadow
                accent-orange-500
                cursor-pointer
              "
            />
          </div>
        </div>

        <div className="w-[86px] text-right text-sm tabular-nums text-gray-700 ">
          {formatTime(current)} / {formatTime(duration)}
        </div>

        <button
          onClick={onDownload}
          className="whitespace-nowrap rounded-full border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-900 hover:bg-gray-50 "
        >
          Download Audio
        </button>
      </div>
    </div>
  );
}
