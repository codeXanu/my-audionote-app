'use client'
import { useState } from "react";
import { BiSolidArrowFromLeft, BiSolidArrowToLeft } from "react-icons/bi";
import { FaMicrophoneAlt } from "react-icons/fa";
import { MdWorkspacePremium } from "react-icons/md";
import { User, Home, Star, Zap, Folder,Menu } from "lucide-react";
// import SidebarItem from "./SidebarItem";

export default function Sidebar({ isOpen, setIsOpen }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
    <div
      className={` max-[1080px]:hidden ${
        isOpen ? "w-74" : "w-20 items-center"
      } h-[93vh] sticky top-6 border border-gray-200 rounded-4xl bg-white ml-7 mt-6 mb-6 flex flex-col transition-all duration-300 overflow-hidden`}
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
          {isOpen && <span className="font-bold text-lg ">Audionotes</span>}
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
        <SidebarItem icon={<Home size={20} />} label="Home" isOpen={isOpen} />
        <SidebarItem icon={<Star size={20} />} label="Favourites" isOpen={isOpen} />
        <SidebarItem icon={<Zap size={20} />} label="Integrations" isOpen={isOpen} />
        <SidebarItem icon={<Folder size={20} />} label="Folders" isOpen={isOpen} />
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
              href="#"
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
      <div className="p-4 border-t border-gray-100 flex items-center space-x-2">
        <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center">
          <User size={16} />
        </div>
        {isOpen && <span>Anuj Maurya</span>}
      </div>
    </div>


      

    </>
  );
}


export function SidebarItem({ icon, label, isOpen }) {
  return (
    <div className="flex items-center rounded-full p-4 space-x-2 cursor-pointer hover:bg-gray-200 transition-all duration-300">
      {icon}
      {isOpen && <span >{label}</span>}
    </div>
  );
}
