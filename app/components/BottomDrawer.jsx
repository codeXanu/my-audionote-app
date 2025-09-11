
// BottomDrawer.jsx
'use client'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function BottomDrawer({
  bottomDrawerOpen,
  onClose,
  onAccount,
  onSupport,
  onPlans,
  onLogout,
  title = 'Menu',
}) {
  return (
    <Dialog
      open={bottomDrawerOpen}
      onClose={onClose}
      className="relative z-50"
    >
      {/* Backdrop */}
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/50 transition-opacity duration-300 ease-out data-[closed]:opacity-0"
      />{/* Uses Headless UI data-* transition API for simple fade. [8] */}

      {/* Sheet container */}
      <div className="fixed inset-0 overflow-hidden">
        {/* Center horizontally; stick to bottom */}
        <div className="absolute inset-x-0 bottom-0 flex justify-center p-0 sm:px-4 sm:pb-0">
          <DialogPanel
            transition
            /* Full width on small screens; fixed width with rounded corners on larger screens */
            className="
              w-full sm:w-[480px] md:w-[560px]
              pointer-events-auto
              bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl
              transform transition duration-300 ease-out
              data-[closed]:translate-y-full
            "
          >{/* Slide up from bottom using translate-y utilities. [13][8] */}
            {/* Drag handle / header */}
            <div className="pt-3 flex justify-center">
              <span className="h-1.5 w-12 rounded-full bg-gray-300" />
            </div>

            <div className="px-4 mb-4 sm:px-5 ">
              <div className="flex items-center justify-between py-2">
                <DialogTitle className="text-sm font-medium text-gray-600">{title}</DialogTitle>
                <button
                  onClick={onClose}
                  className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon className="size-5" />
                </button>
              </div>

              {/* Action buttons like the screenshot */}
              <div className="space-y-3">
                <button
                  onClick={onAccount}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                >
                  <span className="i-ph-user-circle-duotone text-lg" />
                  <span className="flex-1">Account</span>
                </button>

                <button
                  onClick={onSupport}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                >
                  <span className="i-ph-envelope-simple-duotone text-lg" />
                  <span className="flex-1 ">Support</span>
                </button>

                <button
                  onClick={onPlans}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                >
                  <span className="i-ph-diamonds-four-duotone text-lg" />
                  <span className="flex-1">Plans</span>
                </button>

                <button
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                >
                  <span className="i-ph-sign-out-duotone text-lg" />
                  <span className="flex-1">Logout</span>
                </button>
              </div>

              {/* Optional dismiss button */}
              
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
