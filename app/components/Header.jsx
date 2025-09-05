'use client'
import MicIcon from '@mui/icons-material/Mic';
import Button from '@mui/material/Button';
import Link from 'next/link';


import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
  PopoverGroup,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'


export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
            <Link href="/" className="flex items-center gap-3">
                {/* Mic inside red circle */}
                <div className="p-2 bg-[#FF3500] rounded-2xl flex items-center justify-center">
                    <MicIcon className="h-5 w-5 text-white" />
                </div>

                {/* Text */}
                <span className="text-lg font-semibold text-gray-900">
                    MyAudionotes
                </span>
            </Link>
            
        </div>
        <div className="flex lg:hidden">
            
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>

        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Link href="#features" scroll={true} className="text-sm/6 font-semibold rounded-lg px-3 py-2 text-black hover:bg-gray-100">
            Features
          </Link>
          <a href="/pricing" className="text-sm/6 font-semibold rounded-lg px-3 py-2 text-black hover:bg-gray-100">
            Pricing
          </a>
          <a href="#faq"  className="text-sm/6 font-semibold rounded-lg px-3 py-2 text-black hover:bg-gray-100">
            FAQ
          </a>
          <a href="#" className="text-sm/6 font-semibold rounded-lg px-3 py-2 text-black hover:bg-gray-100">
            Mobile App
          </a>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="/login">
            <Button variant="contained" className="my-btn">
                Log in
            </Button>
          </a>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-100"
                >
                  Features
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Pricing
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  FAQ
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Mobile App
                </a>
              </div>
              <div className="py-6">
                <a
                  href="#"
                  
                >
                 <Button variant="contained" className="my-btn">
                    Log in
                </Button>
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
