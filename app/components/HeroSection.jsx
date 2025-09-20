'use client'
import Link from 'next/link';
import Button from '@mui/material/Button';
import { FaApple } from "react-icons/fa";
import { BiLogoPlayStore } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa";
import CardSection from './CardSection';




export default function HeroSection() {
  

  return (
    <>
   
    <div className="bg-white">
      
      <div className="relative isolate">
        
        <div className="mx-auto max-w-3xl py-12 sm:py-18 lg:py-16">
          <div className="text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl">
                Your cluttered{" "}
                <span className="text-red-500">Thoughts</span>{" "}
                into clear{" "}
                <span className="text-red-500">Text Notes</span>{" "}
                using AI
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
              Capture and turn your voice recordings, text notes, images, audio files, and YouTube videos into perfect notes for meetings, journals, lectures, emails, and more!
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-x-6">
              <Link href="/home" >
                <Button variant="contained" className='my-btn' sx={{ px: 5, py: 2, fontSize: "18px", borderRadius: "12px" }} endIcon={<FaArrowRight /> } >
                    Try For Free
                </Button>
              </Link>
              <div className='flex gap-6 mt-6'>
                <button className="flex items-center gap-1.5 bg-gray-200 text-black px-5 py-2 rounded-full font-medium hover:bg-gray-300 transition">
                    <BiLogoPlayStore />
                    Download on Android
                </button>

                <button className="flex items-center gap-1.5 bg-black text-white px-5 rounded-full font-medium hover:bg-gray-900 transition">
                    <FaApple />
                    Download on Apple
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


      <CardSection />

      <div className="flex flex-col text-center w-full mt-15 ">
          
          <h1 className="sm:text-3xl text-2xl font-bold text-gray-900 leading-loose">
                Take <span className="text-red-500">Perfect</span> Notes
            </h1>
            <p className="text-gray-500 text-lg font-medium text-pretty max-w-md mx-auto">
                See how Quick Audio Note turns your audio into clear, organized notes you can use anytime.
            </p>
        </div>
    </>
  )
}
