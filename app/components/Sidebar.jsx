'use client'
import { useState } from "react";
import { BiSolidArrowFromLeft, BiSolidArrowToLeft } from "react-icons/bi";
import { FaMicrophoneAlt } from "react-icons/fa";
import { MdWorkspacePremium } from "react-icons/md";
import { User, Home, Star, Zap, Folder,Menu } from "lucide-react";
import ProfileMenu from "./ProfileMenu";


export default function Sidebar({ isOpen, setIsOpen, activeItem, setActiveItem, user }) {
  

  return (
    <>
    <div
      className={` max-[1080px]:hidden ${
        isOpen ? "w-74" : "w-20 items-center"
      } h-[93vh] fixed top-7  border border-gray-200 rounded-4xl bg-white ml-7   flex flex-col z-50 transition-all duration-300 overflow-hidden`}
    >
      {/* Logo + Toggle */}
      <div
        className={`${
          isOpen ? "flex-row" : "flex-col"
        } flex items-center justify-between p-4 border-b border-gray-100 gap-4`}
      >
        <div className="flex items-center space-x-2  transition-all duration-300">
          <div className="p-2 bg-[#FF3500] rounded-2xl flex items-center justify-center">
            <FaMicrophoneAlt className="h-5 w-5 text-white" />
          </div>
          {isOpen && <span className="font-bold text-lg whitespace-nowrap overflow-hidden transition-all duration-300 ">Quick Audio Note</span>}
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="text-red-500">
          {isOpen ? (
            <BiSolidArrowToLeft className="h-6 w-8" />
          ) : (
            <BiSolidArrowFromLeft className="h-6 w-8" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col flex-1 p-4 gap-1 mt-5">
        <SidebarItem icon={<Home size={20} />} label="Home" isOpen={isOpen} onClick={() => setActiveItem("Home")} active={activeItem === "Home"}/>
        <SidebarItem icon={<Star size={20} />} label="Favourites" isOpen={isOpen} onClick={() => setActiveItem("Favourites")} active={activeItem === "Favourites"} />
        <SidebarItem icon={<Zap size={20} />} label="Integrations" isOpen={isOpen} onClick={() => setActiveItem("Integrations")} active={activeItem === "Integrations"} />
        {/* <SidebarItem icon={<Folder size={20} />} label="Folders" isOpen={isOpen} onClick={() => setActiveItem("Folders")} active={activeItem === "Folders"} /> */}
      </nav>

      {/* Upgrade Box */}
      <div
        className={`${
          isOpen ? "bg-white" : "bg-red-50"
        } p-4 rounded-4xl border border-gray-300 shadow-sm font-sans m-4`}
      >
        {isOpen ? (
          <div className="animate-fadeIn">
            <div className="flex items-center justify-between text-sm mb-4">
              <span className="text-gray-500">Current Plan</span>
              <span className="text-orange-600 font-bold">FREE</span>
            </div>
            <a
              href="https://quick-audio-note.vercel.app/pricing"
              target="_blank"
              className="flex items-center justify-between p-3 rounded-4xl bg-red-50 text-red-600 font-medium transition-colors hover:bg-red-200"
            >
              <div className="flex items-center">
                <span className="text-xl mr-2">
                  <MdWorkspacePremium />
                </span>
                <span>Upgrade Now</span>
              </div>
              <span className="text-xl">&rarr;</span>
            </a>
          </div>
        ) : (
          <MdWorkspacePremium className="text-red-500 h-6 w-6" />
        )}
      </div>

      {/* User */}
      <ProfileMenu isOpen={isOpen} user={user} setActiveItem ={setActiveItem} />
      
    </div>


      

    </>
  );
}


export function SidebarItem({ icon, label, isOpen, active, onClick }) {
  return (
    <div onClick={onClick} className={`flex items-center rounded-full p-4 space-x-2 cursor-pointer transition-all duration-300 ${active ? "bg-red-50 font-semibold" : "hover:bg-gray-200"} `}>
      {icon}
      {isOpen && <span className={`transition-all duration-300 whitespace-nowrap overflow-hidden` } >{label}</span>}
    </div>
  );
}
