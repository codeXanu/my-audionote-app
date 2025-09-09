'use client'

const cardsData = [
  {
    id: 1,
    date: "Sep 6, 2025 • 9:27 PM",
    title: "Job Inquiry from Anuj Kumar Maurya",
    content:
      "Hello, my name is Anuj Kumar Maurya. I am a software engineer and I am looking for a job opportunity. Could you please help me with that?",
    type: "Text",
  },
  {
    id: 2,
    date: "Aug 28, 2025 • 11:08 PM",
    title: "Night Out Invitation",
    content:
      "Hello. How are you? What are you doing? Are you free today for a night out?",
    duration: "00:13",
    type: "Audio",
  },
  {
    id: 3,
    date: "Aug 28, 2025 • 11:08 PM",
    title: "Night Out Invitation",
    content:
      "Hello. How are you? What are you doing? Are you free today for a night out?",
    duration: "00:13",
    type: "Audio",
  },
  {
    id: 4,
    date: "Aug 28, 2025 • 11:08 PM",
    title: "Night Out Invitation",
    content:
      "Hello. How are you? What are you doing? Are you free today for a night out?",
    duration: "00:13",
    type: "Audio",
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

// export default function HomePage() {
//   const [isOpen, setIsOpen] = useState(true);
//   const { greeting, formattedDate } = getGreetingAndDate("Anuj Maurya");

//   const truncateContent = (text, wordLimit) => {
//     const words = text.split(' ');
//     if (words.length > wordLimit) {
//       return words.slice(0, wordLimit).join(' ') + '...';
//     }
//     return text;
//   };


//   const [blink, setBlink] = useState(false);

//   useEffect(() => {
//     setBlink(true);
//     const timer = setTimeout(() => setBlink(false), 300);
//     return () => clearTimeout(timer);
//   }, [isOpen]);



//   return (
//     <div className="flex text-black  ">
//       {/* Sidebar */}
//       <div className={`${isOpen ? "w-74" : "w-20 items-center"} h-[93vh] sticky top-6 border border-gray-200 rounded-4xl bg-white ml-7 mt-6 mb-6 flex flex-col transition-all duration-300`} >
//         <div className={`${isOpen ? "flex-row" : " flex-col"} flex items-center justify-between p-4 border-b border-gray-100 gap-4`}>
//           <div className="flex items-center space-x-2">
//             <div className="p-2 bg-[#FF3500] rounded-2xl flex items-center justify-center">
//               <FaMicrophoneAlt className="h-5 w-5 text-white" />
//             </div>
//             {isOpen && <span className="font-bold text-lg">Audionotes</span>}
//           </div>
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className=" text-red-500"
//           >
//             {isOpen ? <BiSolidArrowToLeft className="h-6 w-8" /> : <BiSolidArrowFromLeft className="h-6 w-8" />}
//           </button>
//         </div>

//         <nav className="flex flex-col flex-1 p-4 gap-1 mt-5">
//           <div  >
//             <SidebarItem icon={<Home size={20} />} label="Home" isOpen={isOpen} />
//           </div>
//           <SidebarItem
//             icon={<Star size={20} />}
//             label="Favourites"
//             isOpen={isOpen}
//           />
//           <SidebarItem
//             icon={<Zap size={20} />}
//             label="Integrations"
//             isOpen={isOpen}
//           />
//           <SidebarItem
//             icon={<Folder size={20} />}
//             label="Folders"
//             isOpen={isOpen}
//           />
//         </nav>

//         <div className={`${isOpen ? "bg-white" : " bg-red-50"} p-4 rounded-4xl border border-gray-300 shadow-sm font-sans m-4 `} >
//           {isOpen ?
//             <>
//               <div className="animate-fadeIn" >


//                 <div class="flex items-center justify-between text-sm mb-4">
//                   <span class="text-gray-500">Current Plan</span>
//                   <span class="text-orange-600 font-bold">FREE</span>
//                 </div>
//                 <a href="#" class="flex items-center justify-between p-3 rounded-4xl bg-red-50 text-red-600 font-medium transition-colors hover:bg-red-200">
//                   <div class="flex items-center">
//                     <span class="text-xl mr-2"><MdWorkspacePremium /></span>
//                     <span>Upgrade Now</span>
//                   </div>
//                   <span class="text-xl">&rarr;</span>
//                 </a>
//               </div>
//             </>
//             :
//             <MdWorkspacePremium className=" text-red-500 h-6 w-6" />
//           }
//         </div>

//         <div className="p-4 border-t border-gray-100 flex items-center space-x-2">
//           <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center">
//             <User size={16} />
//           </div>
//           {isOpen && <span>Anuj Maurya</span>}
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1">


//         <div className="p-6  relative">
//           <div className="mt-4 ">
//             <h1 className="text-3xl font-medium text-gray-700 mb-2">{greeting} !</h1>
//             <p className="text-xl text-gray-400 font-medium mb-6">{formattedDate}</p>
//           </div>


//           <div className="flex flex-wrap gap-6">
//             {cardsData.map((card) => (
//               <div
//                 key={card.id}
//                 className="bg-white p-4 rounded-xl shadow-md overflow-hidden border border-gray-300 w-full sm:w-[calc(50%-12px)] lg:w-[30%] flex flex-col min-h-[180px] md:min-h-[400px] hover:shadow-lg transition-shadow"
//               >
//                 <div className="flex justify-between items-center text-xs text-gray-500">
//                   <span>{card.date}</span>
//                   {card.type === 'Audio' && (
//                     <span className="flex items-center ml-2">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1 text-gray-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-12.5V7.5c0-.28.22-.5.5-.5s.5.22.5.5v5.79l3.5 2.58c.27.2.36.57.2.88-.16.31-.53.42-.88.2L11 12.5z" /></svg>
//                       {card.duration}
//                     </span>
//                   )}
//                 </div>
//                 <h2 className="font-semibold text-lg mt-2">{card.title}</h2>
//                 <p className="text-gray-600 mt-2 text-sm flex-grow overflow-hidden leading-relaxed">
//                   {truncateContent(card.content, 35)}
//                   <button className="text-orange-600 font-medium ml-1">Read more</button>
//                 </p>
//                 <div className="mt-4 flex justify-end items-center space-x-2">
//                   <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" /></svg>
//                   </button>
//                   <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg>
//                   </button>
//                   <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className={`fixed bottom-0  ${isOpen ? "left-[20%]" : " left-[5%] "} right-0 flex justify-center transition-all duration-300 z-50`}>
//             <InputBox />

//           </div>


//         </div>


//       </div>

//     </div>
//   );
// }

// function SidebarItem({ icon, label, isOpen }) {
//   return (
//     <div className="flex items-center rounded-full p-4 space-x-2 cursor-pointer hover:bg-gray-200 ">
//       {icon}
//       {isOpen && <span>{label}</span>}
//     </div>
//   );
// }




// const InputBox = () => {
//   return (
//     <div className="w-full flex justify-center z-50  ">
//       <div className="w-full max-w-4xl px-4 ">
//         <div className="p-4 bg-white rounded-full border border-gray-100 mb-4 shadow-2xl">
//           <div className="flex items-center justify-between">
//             {/* Left-side icons */}
//             <div className="flex space-x-2">

//               <button className="flex items-center p-3 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-500 group transition-all ">
//                 <TbWriting className="w-6 h-6" />
//                 <span className="max-w-0 max-h-6 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all ">
//                   Text Note
//                 </span>
//               </button>

//               <button className="flex items-center p-3 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-500 group transition-all ">
//                 <FaYoutube className="w-6 h-6" />
//                 <span className="max-w-0 max-h-6 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all ">
//                   YouTube Link
//                 </span>
//               </button>

//               <button className="flex items-center p-3 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-500 group transition-all ">
//                 <IoImage className="w-6 h-6" />
//                 <span className="max-w-0 max-h-6 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all ">
//                   Upload Image
//                 </span>
//               </button>

//               <button className="flex items-center p-3 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-500 group transition-all ">
//                 <GrFormUpload className="w-6 h-6" />
//                 <span className="max-w-0 max-h-6 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all ">
//                   Upload audio file
//                 </span>
//               </button>

//             </div>

//             {/* Right-side button */}
//             <button className="p-3 px-6 rounded-full bg-red-500 text-white flex items-center font-medium shadow-lg hover:bg-red-600 transition-colors">
//               <span className="w-2 h-2 rounded-full bg-white mr-2"></span>
//               Start recording
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>

//   );
// };




import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import CardsSection from "../components/CardsSection";
import InputBox from "../components/InputBox";
import { getGreetingAndDate } from "../utils/getGreeting";
import MainHeader from "../components/MainHeader";
import { Main } from "next/document";



export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const { greeting, formattedDate } = getGreetingAndDate("Anuj Maurya");

  const [blink, setBlink] = useState(false);
  useEffect(() => {
    setBlink(true);
    const timer = setTimeout(() => setBlink(false), 300);
    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    <div className="flex text-black">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content */}
      <div className="flex-1 p-6 relative">
        <MainHeader />
        <div className="mt-4">
          <h1 className="text-3xl font-medium text-gray-700 mb-2">{greeting} !</h1>
          <p className="text-xl text-gray-400 font-medium mb-6">{formattedDate}</p>
        </div>

        {/* Cards Section */}
        <CardsSection cards={cardsData} />

        {/* Input Box */}
        <div className={`fixed bottom-0 ${isOpen ? "left-[20%]" : "left-[5%]"} right-0 flex justify-center transition-all duration-300 z-50 max-[1080px]:left-0  max-[1080px]:w-full`}
        >
          <InputBox />
        </div>
      </div>
    </div>
  );
}
