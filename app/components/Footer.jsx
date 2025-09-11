import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import React from "react";
import Button from "@mui/material/Button";
import { FaArrowRight } from "react-icons/fa";
import { FaMicrophoneAlt } from "react-icons/fa";

import Link from "next/link";

const FooterSection = () => {
  const footerLinks = {
    product: [
      { text: "Features", url: "#features" },
      { text: "Pricing", url: "/pricing" },
      { text: "FAQ", url: "/faq" },
      { text: "iOS App", url: "/ios" },
    ],
    support: [
      { text: "Support", url: "/support" },
      { text: "Privacy Policy", url: "/privacy" },
      { text: "Terms of Service", url: "/terms" },
      { text: "Refund Policy", url: "/refund" },
    ],
    useCases: [
      { text: "ADHD", url: "/use-cases/adhd" },
      { text: "Content Creation", url: "/use-cases/content-creation" },
      { text: "Journaling", url: "/use-cases/journaling" },
      { text: "Lecture Notes", url: "/use-cases/lecture-notes" },
      { text: "Meetings", url: "/use-cases/meetings" },
    ],
    audiNotesFor: [
      { text: "Doctors", url: "/for/doctors" },
      { text: "Entrepreneur", url: "/for/entrepreneurs" },
      { text: "Lawyers", url: "/for/lawyers" },
      { text: "Marketeers", url: "/for/marketeers" },
      { text: "Students", url: "/for/students" },
    ],
    blogs: [
      { text: "How to Write Meeting...", url: "/blog/meeting-notes" },
      { text: "Different Types...", url: "/blog/different-types" },
      { text: "Best Note...", url: "/blog/best-note-app" },
      { text: "Top 5 Note...", url: "/blog/top-5-notes" },
    ],
  };


  return (
    <div className="bg-[#171413] min-h-screen text-white font-sans flex flex-col items-center p-8 md:p-12 mt-20">
      <div className="mt-20 text-center mb-24">
        <h1 className="text-3xl font-semibold tracking-tight text-balance text-center mb-20 sm:text-8xl">
          {" "}
          Unleash the power of <br /> Voice Notes with AI{" "}
        </h1>
        <Button
          variant="contained"
          className="my-btn"
          sx={{
            px: 5,
            py: 2,
            fontSize: "20px",
            fontWeight: "700",
            borderRadius: "12px",
          }}
          endIcon={<FaArrowRight />}
        >
          Try For Free
        </Button>
      </div>
      {/* Spacer to push footer to the bottom */}
      <div className="flex-grow"></div>

      {/* Footer Content */}
      <footer className="w-full max-w-6xl px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:space-x-12 lg:space-x-24">
          {/* Left Section - Audionotes */}
          <div className="md:w-1/4 mb-10 md:mb-0">
            <Link
              href="/"
              scroll={true}
              className="flex items-center  space-x-2 mb-4 rounded-2xl "
            >
              <span className="p-2 bg-[#FF3500] rounded-2xl flex items-center justify-center">
                <FaMicrophoneAlt className="h-4 w-4 text-white" />
              </span>
              <div className="text-2xl font-semibold "> MyAudioNotes</div>
            </Link>
            <p className="text-sm text-neutral-400 mb-6">
              Capture and turn your voice notes, text notes, notes from images,
              audio/video files and youtube videos into clear structured notes
              with AI
            </p>
            <div className="flex space-x-4 text-neutral-500 cursor-pointer">
              {/* Social Icons - replaced with SVGs for demonstration */}
              <a href="https://x.com/codeXanuj" className="border rounded-xl p-2 " target="_blank" rel="noopener noreferrer">
                <FaXTwitter />
              </a>
              <a href="https://www.linkedin.com/in/codexanuj/" className="border rounded-xl p-2 " target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>

            </div>
          </div>

          {/* Right Section - Grid of links */}
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-semibold text-neutral-400 uppercase mb-4">
                  {title.replace(/([A-Z])/g, " $1").trim()}
                </h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.url}>
                      <a
                        href={link.url}
                        className="text-neutral-300 hover:text-white text-sm transition-colors duration-200"
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </footer>
        <div className="text-center text-neutral-500 text-sm mt-8">
          © {new Date().getFullYear()} MyAudioNote App. All rights reserved.
        </div>
    </div>
  );
};

export default FooterSection;
