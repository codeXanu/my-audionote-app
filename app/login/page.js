import { FcGoogle } from "react-icons/fc";
import MicIcon from '@mui/icons-material/Mic';
import { FaApple } from "react-icons/fa";
import { BiLogoPlayStore } from "react-icons/bi";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex lg:flex-row items-center justify-between text-black">
      {/* Left Section */}
        <div className="hidden bg-gray-50 h-screen lg:flex flex-[2]  flex-col  ">
            <div className="flex flex-col items-start lg:items-start px-8 lg:px-20 py-12">
                
            
                <h1 className="text-4xl md:text-5xl font-bold mb-4 ">
                Take <span className="text-red-500">Perfect</span> Notes
                </h1>
                <p className="text-neutral-600 max-w-2xl mb-6">
                Turn your Voice Notes, Text Notes, Audio/Video Files, Notes from YouTube
                videos, and Notes from Images into Smart Summaries, powered by AI
                </p>

                {/* Trusted by */}
                <div className="flex justify-between w-full">

                
                    <div className="flex items-center gap-3 mb-6">
                        <p className="text-sm text-neutral-500">Trusted by 1k+ users</p>
                        <div className="flex -space-x-2">
                            <img
                            src="https://randomuser.me/api/portraits/men/32.jpg"
                            alt="user1"
                            className="w-8 h-8 rounded-full border"
                            />
                            <img
                            src="https://randomuser.me/api/portraits/women/44.jpg"
                            alt="user2"
                            className="w-8 h-8 rounded-full border"
                            />
                            <img
                            src="https://randomuser.me/api/portraits/men/12.jpg"
                            alt="user3"
                            className="w-8 h-8 rounded-full border"
                            />
                        </div>
                    </div>
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-6 mr-20">
                    <p className="font-semibold text-lg">
                        Rated <span className="text-red-500">4.9+</span>
                    </p>
                    <span className="text-sm text-neutral-500">50k+ Notes Created</span>
                    </div>

                </div>
            </div>
            
            {/* Preview Images */}
            <div className="flex gap-4 overflow-hidden bg-white">
                <img
                    src="/hero-image.png"
                    alt="web preview"
                    className="rounded-xl shadow-lg h-[550px] object-contain relative w-full"
                />
            </div>
        </div>
        

      {/* Right Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 lg:px-20 py-12 bg-white">
        <div className="p-3 bg-[#FF3500] rounded-2xl flex items-center justify-center mb-3">
            <MicIcon className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-xl font-semibold mb-12">Welcome to MyAudioNote</h2>

        {/* Buttons */}
        <div className="flex flex-col gap-3 w-full max-w-sm mb-12">
          <button className="flex items-center justify-center gap-3 border rounded-3xl py-3 hover:bg-neutral-50 transition">
            <FcGoogle />
            Login with Google
          </button>
          <button className="flex items-center justify-center gap-3 border rounded-3xl py-3 hover:bg-neutral-50 transition">
            <FaApple className="text-black" />
            Login with Apple
          </button>
          {/* <button className="flex items-center justify-center gap-3 bg-black text-white rounded-xl py-3 hover:bg-neutral-800 transition">
            <FaEnvelope />
            Continue with Email
          </button> */}
        </div>

        {/* Download Apps */}
        <div className="mt-10 flex flex-col items-center mb-14">
          <p className="text-sm text-neutral-500 font-medium mb-3">Get the mobile app</p>
          <div className="flex flex-col gap-4">
            <button className="bg-black text-white px-4 py-2 rounded-4xl flex items-center gap-2 hover:bg-gray-900 transition">
              <FaApple /> Download on iOS
            </button>
            <button className="bg-neutral-100 text-black px-4 py-2 rounded-4xl flex items-center gap-2 hover:bg-gray-200 transition">
              <BiLogoPlayStore /> Download on Android
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-neutral-400 mt-8 text-center">
          By signing up, you agree to the{" "}
          <a href="#" className="underline">
            Terms of Use
          </a>{" "}
          and{" "}
          <a href="#" className="underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
