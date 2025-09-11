'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";


const cardsData = [
   {
    id: 1,
    date: "Sep 6, 2025 • 9:27 PM",
    title: "Job Inquiry from Anuj Kumar Maurya",
    type: "Text",
    transcript:
      "Hello, my name is Anuj Kumar Maurya. I am a software engineer and I am looking for a job opportunity. Could you please help me with that?",
    content:
      "Hello, my name is Anuj Kumar Maurya. I am a software engineer and I am looking for a job opportunity. Could you please help me with that?",
  },
  {
    id: 2,
    date: "Aug 28, 2025 • 11:08 PM",
    title: "Night Out Invitation",
    type: "Audio",
    duration: "00:13",
    audioUrl: "https://www.kozco.com/tech/piano2-CoolEdit.mp3", // original URL kept
    transcript:
      "Hello. How are you? What are you doing? Are you free today for a night out?",
    content: 
      `Hello. How are you? What are you doing? Are you free today for a night out? 
      Hello. How are you? What are you doing? Are you free today for a night out? 
      Hello. How are you? What are you doing? Are you free today for a night out? 
      Hello. How are you? What are you doing? Are you free today for a night out? 
      Hello. How are you? What are you doing? Are you free today for a night out? 
      Hello. How are you? What are you doing? Are you free today for a night out? 
      Hello. How are you? What are you doing? Are you free today for a night out? 
      Hello. How are you? What are you doing? Are you free today for a night out? 
      Hello. How are you? What are you doing? Are you free today for a night out? 
      Hello. How are you? What are you doing? Are you free today for a night out? 
      Hello. How are you? What are you doing? Are you free today for a night out? 
      Hello. How are you? What are you doing? Are you free today for a night out? 
      Hello. How are you? What are you doing? Are you free today for a night out? 
      Hello. How are you? What are you doing? Are you free today for a night out? 
      Hello. How are you? What are you doing? Are you free today for a night out? 
      Hello. How are you? What are you doing? Are you free today for a night out? 
      Hello. How are you? What are you doing? Are you free today for a night out? 
      Hello. How are you? What are you doing? Are you free today for a night out? 
      Hello. How are you? What are you doing? Are you free today for a night out? 
      Hello. How are you? What are you doing? Are you free today for a night out? 
      Hello. How are you? What are you doing? Are you free today for a night out? 
      Hello. How are you? What are you doing? Are you free today for a night out? 
      Hello. How are you? What are you doing? Are you free today for a night out? 
      Hello. How are you? What are you doing? Are you free today for a night out? 
      Hello. How are you? What are you doing? Are you free today for a night out? 
      Hello. How are you? What are you doing? Are you free today for a night out? 
      Hello. How are you? What are you doing? Are you free today for a night out? `,
  },
  {
    id: 3,
    date: "Aug 20, 2025 • 4:15 PM",
    title: "Vacation Picture",
    type: "Image",
    imageUrl: "/uploads/images/vacation.png", // original URL kept
    transcript: "Extracted text from vacation image using OCR.",
    content: "Extracted text from vacation image using OCR.",
  },
  {
    id: 4,
    date: "Aug 18, 2025 • 6:30 PM",
    title: "AI Tutorial",
    type: "Youtube",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // original URL kept
    transcript:
      "This YouTube video explains the basics of building an AI assistant...",
    content: "This YouTube video explains the basics of building an AI assistant...",
  },
  {
    id: 5,
    date: "Aug 28, 2025 • 11:08 PM",
    title: "Night Out Invitation",
    content:
      "Hello. How are you? What are you doing? Are you free today for a night out?",
    duration: "00:13",
    type: "Audio",
  },
  {
    id: 6,
    date: "Aug 28, 2025 • 11:08 PM",
    title: "Night Out Invitation",
    content:
      "Hello. How are you? What are you doing? Are you free today for a night out?",
    duration: "00:13",
    type: "Audio",
  },
  {
    id: 7,
    date: "Aug 28, 2025 • 11:08 PM",
    title: "Night Out Invitation",
    content:
      "Hello. How are you? What are you doing? Are you free today for a night out?",
    duration: "00:13",
    type: "Audio",
  },
];


import Sidebar from "../components/Sidebar";
import CardsSection from "../components/CardsSection";
import InputBox from "../components/InputBox";
import { getGreetingAndDate } from "../utils/getGreeting";
import MainHeader from "../components/MainHeader";
import CardDialouge from "../components/CardDialouge";




export default function HomePage() {
  
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const { greeting, formattedDate } = getGreetingAndDate("Anuj Maurya");
  const [selectedCard, setSelectedCard] = useState(null);
  const [isDailougeOpen, setIsDailougeOpen] = useState(false);
  const [user, setUser] = useState(null);

  const [activeItem, setActiveItem] = useState("Home");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setChecking(false);
      if (!u) router.replace("/login");                 // block unauthenticated
    });
    return () => unsub();
  }, [router]); // consistent top-level hook [7][4]

  

    // Disable background scroll when modal is open
    useEffect(() => {
      if (isDailougeOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    }, [isDailougeOpen]);

    if (checking ) {
    <div className="p-6">Loading...</div>;
    return ;
  }


  return (
    <>
   { user &&
   
    <div className="flex text-black">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} activeItem={activeItem} setActiveItem={setActiveItem} />

      {/* Main Content */}
      <div className="flex-1 p-6 relative">
        <MainHeader activeItem={activeItem} setActiveItem={setActiveItem} />
        <div className="mt-4">
          <h1 className="text-3xl font-medium text-gray-700 mb-2">{greeting} !</h1>
          <p className="text-xl text-gray-400 font-medium mb-6">{formattedDate}</p>
        </div>

        {/* Cards Section */}
        {
           activeItem === "Home" && 
          <CardsSection cards={cardsData} setSelectedCard={setSelectedCard} setIsDailougeOpen={setIsDailougeOpen} />
        }
        {
           activeItem === "Favourites" && 
          <div className="flex justify-center items-center h-40 "> <h1 className="text-5xl font-medium text-gray-700" > This is Favourites Section </h1></div>
        }
        {
           activeItem === "Integrations" && 
           <div className="flex justify-center items-center h-40 "> <h1 className="text-5xl font-medium text-gray-700" > This is Integrations Section </h1></div>
        }
        {
           activeItem === "Folders" && 
           <div className="flex justify-center items-center h-40 "> <h1 className="text-5xl font-medium text-gray-700" > This is Floders Section </h1></div>
        }
        
        

        {/* Input Box */}
        <div className={`fixed bottom-0  ${isOpen ? "left-[20%]" : "left-[5%]"} right-0 flex justify-center transition-all duration-300 z-50 max-[1080px]:left-0  max-[1080px]:w-full`}
        >
          <InputBox />
        </div>
      </div>

      <CardDialouge
          isOpen={!!selectedCard}
          selectedCard={selectedCard}
          onClose={() => setSelectedCard(null) }
          setIsDailougeOpen={setIsDailougeOpen}
        />
    </div>}
     </>
  );
}
