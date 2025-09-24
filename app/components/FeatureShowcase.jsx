"use client";

import { FaRegShareSquare } from "react-icons/fa";
import { IoServer } from "react-icons/io5";
import { LuFileText } from "react-icons/lu";
import { CgTranscript } from "react-icons/cg";
import { FaMicrophoneAlt } from "react-icons/fa";

import { useEffect, useState } from "react";

const features = [
  {
    id: 1,
    title: "Record, Write, Upload a File or add a YouTube video link",
    desc: "Capture and create notes from voice recordings, text notes, audio files, Pdfs or youtube links",
    icon: <FaMicrophoneAlt />,
    image: "/record2.jpg", // replace with your phone images
  },
  {
    id: 2,
    title: "Transcribe and/or Translate",
    desc: "Get transcripts in 30+ languages",
    icon: <CgTranscript />,
    image: "/transcribe.jpg",
  },
  {
    id: 3,
    title: "Summarize or create custom outputs",
    desc: "Get high quality summaries, meeting notes, lecture notes or even custom outputs",
    icon: <LuFileText />,
    image: "/summary.jpg",
  },
  {
    id: 4,
    title: "Integrate your notes instantly",
    desc: "Get your notes instantly on Notion and Webhook Url, by just to Connect you Notion account and Webhook Url.",
    icon: <IoServer />,
    image: "/integrate.jpg",
  },
  {
    id: 5,
    title: "Publish/Share your note",
    desc: "Publish a note and share your notes with your friends ",
    icon: <FaRegShareSquare />,
    image: "/share.jpg",
  },
];

export default function FeatureShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotate feature every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 flex flex-col md:flex-row gap-16 md:gap-10 items-stretch">
      {/* Left side cards (narrow on desktop) */}
      <div className="w-full md:w-4/12 space-y-11">
        {features.map((item, index) => (
          <div
            key={item.id}
            onClick={() => setActiveIndex(index)}
            className={`p-4 border rounded-xl cursor-pointer transition-all ${
              activeIndex === index
                ? "border-[#FFF8F6] bg-[#FFF8F6] shadow-md"
                : "border-gray-200 hover:border-orange-300"
            }`}
          >
            <div className="flex items-start gap-5">
              <span className={`text-2xl mt-2 ${activeIndex === index ? "text-red-500" : "text-gray-500 hover:border-orange-300"}`}>{item.icon}</span>
              <div>
                <h1 className="text-black text-lg mb-2 sm:text-xl title-font font-bold">
                  {item.title}
                </h1>
                <p className="text-gray-500 text-sm sm:text-base font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full p-0 md:w-8/12 flex justify-center items-center bg-[#FFF8F6] rounded-2xl">
        
        <div className="scale-70 m-0 sm:scale-50 md:scale-60 lg:scale-70">
          <div className="mockup-phone m-0">
            <div className="mockup-phone-camera"></div>
            <div className="mockup-phone-display bg-black rounded-2x flex items-center justify-center place-content-center">
              <img
                src={features[activeIndex].image}
                alt="Phone"
                className="max-w-full max-h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
     
    </div>

  );
}
