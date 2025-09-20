'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";

import Sidebar from "../components/Sidebar";
import CardsSection from "../components/CardsSection";
import IntegrationSection from "../components/IntegrationSection";
import InputBox from "../components/InputBox";
import { getGreetingAndDate } from "../utils/getGreeting";
import MainHeader from "../components/MainHeader";
import CardDialouge from "../components/CardDialouge";
import ScreenLoader from "../components/ScreenLoader";
import useStore from "../store/useStore";
import fetchNotesByUser from "../lib/fetchNotesByUser";
import createCardFromResponse from "../lib/createCardFromResponse";
import { checkNotionConnection } from "../lib/checkNotionConnection";



export default function HomePage() {

  const router = useRouter();
  const [checking, setChecking] = useState(true);

  const {user, cardsData, isLoadingDatabase, notionConnected  } = useStore();
  const { setUser, setCardsData, setIsLoadingDatabase, setNotionConnected } = useStore.getState();
  
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isDailougeOpen, setIsDailougeOpen] = useState(false);
  const { greeting, formattedDate } = getGreetingAndDate(user?.displayName);
  const [activeItem, setActiveItem] = useState("Home");

  useEffect(() => {
    let cancelled = false
    const unsub = onAuthStateChanged(auth, (u) => {
      if (cancelled) return;
      setUser(u)
      setChecking(false);
      if (!u) router.replace("/login");
    });
    return () => {
      cancelled = true
      unsub()
    }
  }, [router]); 


  // to load data from database....
  useEffect(() => {
    if (!user) return; // wait until user is available

    async function loadNotes() {
      try {
        setIsLoadingDatabase(true);
        const notes = await fetchNotesByUser(user.uid);
        const notesCard = notes.map((note) => createCardFromResponse(note) );
        setCardsData(notesCard);
        console.log("Fetched notes:", notes);
        setIsLoadingDatabase(false);
        
      } catch (err) {
        console.error("Failed to fetch notes:", err);
      }
    }

    loadNotes();
  }, [user]);

  //  to check notion connection
  useEffect(() => {
    if (!user) return;

    async function fetchNotionStatus() {
      const connected = await checkNotionConnection(user.uid);
      // update your local or global state
      setNotionConnected(connected)
    }

    fetchNotionStatus();
  }, [user]);

  

    // Disable background scroll when modal is open
    useEffect(() => {
      if (isDailougeOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    }, [isDailougeOpen]);

    if (checking || !user ) {
      return <ScreenLoader />;
    
    }

    // if (isFetching) {
    //   return <ScreenLoader />
    // }


  return (
    <>
     
   
    <div className="flex text-black bg-white h-full">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} activeItem={activeItem} setActiveItem={setActiveItem} user={user?.displayName} />

      {/* Main Content */}
      <div className={`flex-1 p-6 relative  ${isOpen ? "max-[1080px]:ml-0 min-[1080px]:ml-84" : "max-[1080px]:ml-0 min-[1080px]:ml-26"} transition-all duration-300 `}>

        <MainHeader activeItem={activeItem} setActiveItem={setActiveItem} user={user?.displayName} />
        <div className="mt-4">
          <h1 className="text-3xl font-medium text-gray-700 mb-2">{greeting}</h1>
          <p className="text-xl text-gray-400 font-medium mb-6">{formattedDate}</p>
        </div>

        {/* Cards Section */}
        <div className="" >

        
          {
            activeItem === "Home" && 
            <CardsSection setSelectedCard={setSelectedCard} setIsDailougeOpen={setIsDailougeOpen} cardsData={cardsData} />
          }
          {
            activeItem === "Favourites" && 
            
            <div className="flex justify-center items-center h-40 "> <h1 className="text-5xl font-medium text-gray-700" > This is Favourites Section </h1></div>
          }
          {
            activeItem === "Integrations" && 
            <IntegrationSection />
            // <div className="flex justify-center items-center h-40 "> <h1 className="text-5xl font-medium text-gray-700" > This is Integrations Section </h1></div>
          }
          {
            activeItem === "Folders" && 
            <div className="flex justify-center items-center h-40 "> <h1 className="text-5xl font-medium text-gray-700" > This is Floders Section </h1></div>
          }

          {/* <CardLoaderMockup /> */}
        </div>
        
        

        {/* Input Box */}
        <div className={`fixed bottom-0  ${isOpen ? "left-[20%]" : "left-[8%]"} right-0 flex justify-center transition-all duration-300 z-50 max-[1080px]:left-0  max-[1080px]:w-full`}
        >
          <InputBox userId={user?.uid} setCardsData={setCardsData} />
        </div>
      </div>

      <CardDialouge
          isOpen={!!selectedCard}
          selectedCard={selectedCard}
          onClose={() => setSelectedCard(null) }
          setIsDailougeOpen={setIsDailougeOpen}
      />
    </div>
    
    
     </>
  );
}
