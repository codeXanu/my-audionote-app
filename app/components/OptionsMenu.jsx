'use client'
import React,{ useState } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems, MenuSeparator } from "@headlessui/react";
import { FaShare } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import deleteNoteById from '../lib/deleteNoteByNoteId';
import useStore from '../store/useStore';
import NoteShareDialog from './NoteShareDialog';

export default function OptionsMenu({ noteId }) {
    
    const { user, setCardsData } = useStore.getState();
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    


    async function handleDelete( noteId ) {
        try {
            const confirmDelete = window.confirm("Are you sure you want to delete this note?");
            if (!confirmDelete) return; // stop if user clicks cancel
    

            await deleteNoteById(user.uid, noteId);

            // frontend se bhi card remove kar do
            setCardsData((prev) => prev.filter((card) => card.id !== noteId));
            console.log("Note deleted successfully");
        } catch (err) {
            console.error("Failed to delete note:", err)
        }
    }
    return(
        <>
        
        <Menu>
            <MenuButton 
                className="p-2 rounded-full hover:bg-gray-100  text-gray-500"
                    onClick={(e) => {
                        e.stopPropagation();
                        // Your button-specific logic here
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
                
            </MenuButton>

            <MenuItems
                    anchor="right end"
                    transition
                    className=" z-55 w-30 origin-top-right rounded-xl bg-white text-black shadow-lg ring-1 ring-black/5
                               focus:outline-none
                               data-[closed]:scale-95 data-[closed]:opacity-0
                               transition duration-150 ease-out"
                  >
                    <div className="py-1">
                      <MenuItem>
                        <button className="w-full text-center px-4 py-2 flex items-center gap-3 data-[focus]:bg-gray-50"
                            onClick={(e) => {
                                e.stopPropagation();
                                // Your button-specific logic here
                                setIsShareModalOpen(true)
                            }}
                        >
                          <FaShare />
                          Share
                        </button>
                      </MenuItem>
            
                      <MenuItem 
                        
                      >
                        <button className="w-full text-center px-4 py-2 flex items-center gap-3 data-[focus]:bg-gray-50"
                            onClick={(e) => {
                                e.stopPropagation();
                                // Your button-specific logic here
                                handleDelete( noteId)
                            }}
                        >
                          <MdDelete />
                          Delete
                        </button>
                      </MenuItem>
    
                    </div>
            </MenuItems>
        </Menu>

        <NoteShareDialog
            noteId={noteId}
            isOpen={isShareModalOpen}
            onClose={() => setIsShareModalOpen(false)}
        />
            
        </>

    )

}

