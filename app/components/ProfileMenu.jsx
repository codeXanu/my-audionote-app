'use client'
import { Menu, MenuButton, MenuItem, MenuItems, MenuSeparator } from "@headlessui/react";
import { User } from "lucide-react";
import { handleLogout } from "../utils/handleLogout";
import { useRouter } from "next/navigation";



export default function ProfileMenu({ isOpen, user }) {
    const router = useRouter();

    // const handleLogout = async () => {
    //     await signOut(auth);
    //     router.push("/");
    // };

  return (
    <Menu as="div" className="relative ">
      <MenuButton className="w-full">
        <div className="p-4 border-t border-gray-100 flex items-center space-x-2 hover:bg-gray-50 transition">
          <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center">
            <User size={16} />
          </div>
          {isOpen && <span> {user} </span>}
        </div>
      </MenuButton>

      <MenuItems
        anchor="right end"
        transition
        className=" z-55 w-60 origin-top-right rounded-xl bg-white text-black shadow-lg ring-1 ring-black/5
                   focus:outline-none
                   data-[closed]:scale-95 data-[closed]:opacity-0
                   transition duration-150 ease-out"
      >
        <div className="py-2">
          <MenuItem>
            <button className="w-full text-left px-4 py-2 flex items-center gap-3 data-[focus]:bg-gray-50">
              <span className="i-lucide-user-circle w-5 h-5" />
              Account
            </button>
          </MenuItem>

          <MenuItem>
            <button className="w-full text-left px-4 py-2 flex items-center gap-3 data-[focus]:bg-gray-50">
              <span className="i-lucide-life-buoy w-5 h-5" />
              Support
            </button>
          </MenuItem>

          <MenuItem>
            <button className="w-full text-left px-4 py-2 flex items-center gap-3 data-[focus]:bg-gray-50">
              <span className="i-lucide-gem w-5 h-5" />
              Plans
            </button>
          </MenuItem>

          <MenuSeparator className="my-2 h-px bg-gray-100" />

          <MenuItem>
            <button className="w-full text-left px-4 py-2 flex items-center gap-3 text-red-600 data-[focus]:bg-red-50" onClick={() => handleLogout(router)} >
              <span className="i-lucide-log-out w-5 h-5" />
              Logout
            </button>
          </MenuItem>

          <div className="px-4 py-2 text-xs text-gray-500 flex gap-2">
            <a className="hover:underline">Privacy policy</a>
            <span>•</span>
            <a className="hover:underline">Terms & conditions</a>
          </div>
        </div>
      </MenuItems>
    </Menu>
  );
}






