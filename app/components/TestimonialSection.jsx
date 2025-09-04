import React from "react";
import { FaStar } from "react-icons/fa";
import "../testimonial.css";

const testimonials = [
  {
    id: 198,
    name: "Growing_Up",
    avatar: "👤",
    badge: "✒️",
    rating: 4,
    text: "Bought MyAudioNote and I’m blown away. I use it mostly to record my own voice notes and it automatically turns them into clean, structured summaries. This alone saves me hours every week. The app feels smooth and reliable, and I can’t believe how much time I wasted writing before. Highly recommended!",
  },
  {
    id: 2,
    name: "TechieSam",
    avatar: "🧑‍💻",
    badge: "⭐",
    rating: 5,
    text: "The PDF summarization feature is a life saver. I upload long research papers and within seconds MyAudioNote gives me a clear breakdown of the key points. No more spending hours reading through dense text. I’ve used other tools, but none feel as seamless and accurate as this one.",
  },
  {
    id: 3,
    name: "Creative_Mind",
    avatar: "🎨",
    badge: "💡",
    rating: 4,
    text: "I love that I can snap photos of notes or slides and the app extracts and summarizes everything for me. It’s like having a personal assistant in my pocket. I often use it during workshops to capture whiteboard notes without worrying about missing anything important.",
  },
  {
    id: 4,
    name: "PrivateThinker",
    avatar: "🔒",
    badge: "✔️",
    rating: 5,
    text: "Privacy was my biggest concern with apps like this. MyAudioNote keeps everything private and secure, which gives me peace of mind. I can store all my ideas, summaries, and notes without fear of them leaking or being used somewhere else. That alone makes this app invaluable.",
  },
  {
    id: 5,
    name: "EduLearner",
    avatar: "📚",
    badge: "🎓",
    rating: 4,
    text: "The YouTube summary feature is simply magical. I paste a link to any lecture or documentary, and within moments I get a precise and well-structured summary. As a student, this makes revision so much easier. It feels like I can finally consume knowledge at 10x the speed.",
  },
  {
    id: 6,
    name: "PodcastGuru",
    avatar: "🎤",
    badge: "🎧",
    rating: 5,
    text: "Transcription is spot on. I record interviews for my podcast and MyAudioNote instantly gives me an accurate transcript and a neat summary of the key moments. It’s like having a free editor working for me. This has improved my workflow and production speed dramatically.",
  },
  {
    id: 7,
    name: "BusyMom",
    avatar: "👩‍👧",
    badge: "💖",
    rating: 4,
    text: "As a mom, I barely get time to sit and write. I use MyAudioNote to record my thoughts while cooking or traveling, and later I get beautifully structured notes. It feels like magic, turning my scattered voice notes into proper journals that I can look back on. Total game changer!",
  },
  {
    id: 8,
    name: "StartupDreamer",
    avatar: "🚀",
    badge: "🔥",
    rating: 5,
    text: "Running a startup means juggling meetings, pitches, and endless documents. MyAudioNote helps me capture meeting discussions, summarize PDFs from investors, and even generate transcripts of brainstorming sessions. Honestly, I don’t know how I managed before discovering this app.",
  },
];

const testimonials2 = [
  {
    id: 11,
    name: "Growing_Up",
    avatar: "👤",
    badge: "✒️",
    rating: 5,
    text: "Bought MyAudioNote and I’m blown away. I use it mostly to record my own voice notes and it automatically turns them into clean, structured summaries. This alone saves me hours every week. The app feels smooth and reliable, and I can’t believe how much time I wasted writing before. Highly recommended!",
  },
  {
    id: 12,
    name: "TechieSam",
    avatar: "🧑‍💻",
    badge: "⭐",
    rating: 5,
    text: "The PDF summarization feature is a life saver. I upload long research papers and within seconds MyAudioNote gives me a clear breakdown of the key points. No more spending hours reading through dense text. I’ve used other tools, but none feel as seamless and accurate as this one.",
  },
  {
    id: 13,
    name: "Creative_Mind",
    avatar: "🎨",
    badge: "💡",
    rating: 5,
    text: "I love that I can snap photos of notes or slides and the app extracts and summarizes everything for me. It’s like having a personal assistant in my pocket. I often use it during workshops to capture whiteboard notes without worrying about missing anything important.",
  },
  {
    id: 14,
    name: "PrivateThinker",
    avatar: "🔒",
    badge: "✔️",
    rating: 5,
    text: "Privacy was my biggest concern with apps like this. MyAudioNote keeps everything private and secure, which gives me peace of mind. I can store all my ideas, summaries, and notes without fear of them leaking or being used somewhere else. That alone makes this app invaluable.",
  },
  {
    id: 15,
    name: "EduLearner",
    avatar: "📚",
    badge: "🎓",
    rating: 5,
    text: "The YouTube summary feature is simply magical. I paste a link to any lecture or documentary, and within moments I get a precise and well-structured summary. As a student, this makes revision so much easier. It feels like I can finally consume knowledge at 10x the speed.",
  },
  {
    id: 16,
    name: "PodcastGuru",
    avatar: "🎤",
    badge: "🎧",
    rating: 5,
    text: "Transcription is spot on. I record interviews for my podcast and MyAudioNote instantly gives me an accurate transcript and a neat summary of the key moments. It’s like having a free editor working for me. This has improved my workflow and production speed dramatically.",
  },
  {
    id: 17,
    name: "BusyMom",
    avatar: "👩‍👧",
    badge: "💖",
    rating: 5,
    text: "As a mom, I barely get time to sit and write. I use MyAudioNote to record my thoughts while cooking or traveling, and later I get beautifully structured notes. It feels like magic, turning my scattered voice notes into proper journals that I can look back on. Total game changer!",
  },
  {
    id: 18,
    name: "StartupDreamer",
    avatar: "🚀",
    badge: "🔥",
    rating: 5,
    text: "Running a startup means juggling meetings, pitches, and endless documents. MyAudioNote helps me capture meeting discussions, summarize PDFs from investors, and even generate transcripts of brainstorming sessions. Honestly, I don’t know how I managed before discovering this app.",
  },
];



const loopTestimonials = [...testimonials, ...testimonials];
const loopTestimonials2 = [ ...testimonials2, ...testimonials2];


export default function TestimonialSection() {
  return (
    <div className="testimonial-section">
        
      <h2 className="text-3xl font-semibold tracking-tight text-balance text-gray-900 mb-20 sm:text-5xl">Loved by 700+ Happy Users ❤️</h2>

      {/* Top row (right to left) */}
      <div className="scroll-container scroll-left">
        <div className="scroll-content">
         
          {/* <div className="flex flex-wrap gap-6 justify-center"> */}
          {loopTestimonials.map((t, index) => (
            <div
              key={index}
              className="bg-white border border-gray-400 rounded-2xl p-4 w-[300px] mx-2 flex-shrink-0 flex flex-col gap-3 text-left"
            >
              {/* Header: Avatar + Name + Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold">
                    {t.avatar}
                  </div>
                  <span className="font-semibold text-gray-800">{t.name}</span>
                </div>
                {t.badge && <span className="text-yellow-500">{t.badge}</span> }
              </div>

              {/* Rating */}
              <div className="flex text-yellow-400">
                {[...Array(t.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-600 text-wrap text-sm leading-relaxed">{t.text}</p>

              
            </div>
          ))}
          {/* </div> */}
        </div>
      </div>

      {/* Bottom row (left to right) */}
  

      <div className="scroll-container scroll-right">
        <div className="scroll-content">
          {loopTestimonials2.map((t, index) => (
            <div
              key={ index }
              className="bg-white border border-gray-400 rounded-2xl  p-4 w-[300px] mx-2 flex-shrink-0 flex flex-col gap-3 text-left"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold">
                    {t.avatar}
                  </div>
                  <span className="font-semibold text-gray-800">{t.name}</span>
                </div>
                <span className="text-yellow-500">{t.badge}</span>
              </div>

              {/* Stars */}
              <div className="flex text-yellow-400">
                {[...Array(t.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-600 text-wrap text-sm leading-relaxed">{t.text}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
