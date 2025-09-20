'use client'
import { useState } from "react";
import { FaMicrophoneAlt } from "react-icons/fa";
import { MdWorkspacePremium } from "react-icons/md";
import { Home, Star, Zap, Folder, Menu, X, User } from "lucide-react";
import { SidebarItem } from "./Sidebar";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from "@headlessui/react";

import BottomDrawer from "./BottomDrawer";

export default function MainHeader( { activeItem, setActiveItem, user } ) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bottomDrawerOpen, setBottomDrawerOpen] = useState(false)
  

  return (
    <>
      {/* ✅ Mobile Header (<1080px) */}
      <div className="hidden max-[1080px]:flex w-full px-4 py-3 items-center justify-between bg-white">
        {/* Left Hamburger */}
        <button onClick={() => setMobileOpen(true)}>
          <Menu className="w-6 h-6 text-gray-700" />
        </button>

        {/* Center App Icon */}
        <div className="p-2 bg-[#FF3500] rounded-2xl flex items-center justify-center">
          <FaMicrophoneAlt className="h-6 w-6 text-white" />
        </div>

        {/* Right Upgrade */}
        <button className="p-2 bg-red-50 rounded-3xl">
          <MdWorkspacePremium className="text-red-500 h-6 w-6 " />
        </button>
      </div>

      {/* ✅ Mobile Drawer (Headless UI) */}
      <Dialog open={mobileOpen} onClose={setMobileOpen} className=" relative z-60 text-black min-[1081px]:hidden ">
        {/* Backdrop */}
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/40 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            {/* 👉 Change side: left instead of right */}
            <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10 sm:pr-16">
              <DialogPanel
                transition
                className="pointer-events-auto relative w-64 max-w-md transform transition duration-500 ease-in-out data-[closed]:-translate-x-full sm:duration-700"
              >
                <TransitionChild>
                  {/* Close Button */}
                  <div className="absolute top-0 right-0 -mr-8 flex pt-4 pl-2 duration-500 ease-in-out data-[closed]:opacity-0 sm:-mr-10 sm:pl-4">
                    <button
                      type="button"
                      onClick={() => setMobileOpen(false)}
                      className="relative rounded-md text-gray-400 hover:text-gray-600"
                    >
                      <span className="sr-only">Close panel</span>
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </TransitionChild>

                {/* Drawer Content */}
                <div className="relative flex h-full flex-col overflow-y-auto bg-white py-6 shadow-xl after:absolute after:inset-y-0 after:right-0 after:w-px after:bg-gray-200">
                  <div className="px-4" >
                    <DialogTitle className="flex items-center text-base font-semibold text-gray-900">
                        <button onClick={() => setBottomDrawerOpen(true)} className=" px-8 p-3 rounded-full  border-gray-200 flex items-center justify-center space-x-2 hover:bg-gray-200 ">
                            <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center">
                              <User size={16} />
                            </div>
                            <span className="font-medium">{user}</span>
                        </button>
                        {/* <BottomDrawer /> */}
                        <BottomDrawer
                          bottomDrawerOpen={bottomDrawerOpen}
                          onClose={() => setBottomDrawerOpen(false)}
                          onAccount={() => console.log('Account')}
                          onSupport={() => console.log('Support')}
                          onPlans={() => console.log('Plans')}
                          
                        />
                    
                       
                    </DialogTitle>
                  </div>

                  <nav className="mt-6 flex flex-col flex-1 px-4 gap-2">
                      <SidebarItem icon={<Home size={20} />} label="Home" isOpen={true} onClick={() => setActiveItem("Home")} active={activeItem === "Home"}/>
                      <SidebarItem icon={<Star size={20} />} label="Favourites" isOpen={true} onClick={() => setActiveItem("Favourites")} active={activeItem === "Favourites"} />
                      <SidebarItem icon={<Zap size={20} />} label="Integrations" isOpen={true} onClick={() => setActiveItem("Integrations")} active={activeItem === "Integrations"} />
                      {/* <SidebarItem icon={<Folder size={20} />} label="Folders" isOpen={true} onClick={() => setActiveItem("Folders")} active={activeItem === "Folders"} /> */}
                  </nav>

                    <div className="bg-white p-4 rounded-4xl border border-gray-300 shadow-sm font-sans m-4">
                    <div>
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
                  </div>



                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
