"use client";
import showcase from "../../public/showcase.png";

import { useEffect, useState } from "react";

const features = [
  {
    id: 1,
    title: "Record, Write, Upload a File or add a YouTube video link",
    desc: "Capture and create notes from voice recordings, text notes, audio/video files, images or youtube links",
    icon: "🎤",
    image: "/showcase.png", // replace with your phone images
  },
  {
    id: 2,
    title: "Transcribe and/or Translate",
    desc: "Get transcripts in 30+ languages",
    icon: "📄",
    image: "/images/phone2.png",
  },
  {
    id: 3,
    title: "Summarize or create custom outputs",
    desc: "Get high quality summaries, meeting notes, lecture notes or even custom outputs",
    icon: "📝",
    image: "/images/phone3.png",
  },
  {
    id: 4,
    title: "Chat with your note",
    desc: "Ask questions and chat with your note",
    icon: "💬",
    image: "/images/phone4.png",
  },
  {
    id: 5,
    title: "Publish/Share your note",
    desc: "Publish a note and share your notes with your friends",
    icon: "🔗",
    image: "/images/phone5.png",
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
              <span className="text-2xl">{item.icon}</span>
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
            <div className="mockup-phone-display bg-black rounded-2x overflow-hidden flex items-center justify-center place-content-center">
              <img
                src={features[activeIndex].image}
                alt="Phone"
                className="w-full h-full object-cover overflow-hidden"
              />
            </div>
          </div>
        </div>
      </div>
     
    </div>

    // <div className="max-w-6xl mx-auto px-6 py-16 flex gap-10 items-stretch">
    //   {/* Left side cards */}
    //   <div className="w-150 space-y-4 sm: self-center">
    //     {features.map((item, index) => (
    //       <div
    //         key={item.id}
    //         onClick={() => setActiveIndex(index)}
    //         className={`p-4 border rounded-xl cursor-pointer transition-all ${
    //           activeIndex === index
    //             ? "border-[#FFF8F6] bg-orange-50 shadow-md"
    //             : "border-gray-200 hover:border-orange-300"
    //         }`}
    //       >
    //         <div className="flex items-start gap-3">
    //           <span className="text-2xl">{item.icon}</span>
    //           <div>
    //             <h1 className="text-black text-xl title-font font-bold">{item.title}</h1>
    //             <p className="text-gray-500 text-base font-medium text-pretty leading-relaxed">{item.desc}</p>
    //           </div>
    //         </div>
    //       </div>
    //     ))}
    //   </div>

    //   {/* Right side phone mockup */}
    //     <div className="w-7xl flex justify-center items-center bg-[#FFF8F6] rounded-2xl">

    //         <div >
    //             <div className="bg-red-50 rounded-3xl p-6 shadow-md">
    //             <img
    //                 src={features[activeIndex].image}
    //                 alt="Phone"
    //                 className="w-[300px] md:w-[350px] rounded-xl mx-auto"
    //             />
    //             </div>
    //         </div>
    //     </div>

    // </div>
  );
}
