'use client'
import {useEffect} from 'react'
import { FcGoogle } from "react-icons/fc";
import MicIcon from '@mui/icons-material/Mic';
import { FaApple } from "react-icons/fa";
import { BiLogoPlayStore } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth, provider, signInWithPopup } from "../lib/firebase";
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function saveUser(firebaseUser) {
  const { uid, displayName, email } = firebaseUser;

  const { data, error } = await supabase
    .from('users')
    .upsert(
      [
        {
          user_id: uid,
          name: displayName || "No Name",
          email: email,
        },
      ],
      { onConflict: 'user_id' } // this ensures duplicates are ignored
    );
    // console.log({ data, error });

  if (error) console.error("Error saving user:", error);
}

const LoginPage = () => {
  const router = useRouter();
  
  
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) router.replace("/home");                // already logged in → go to app
    });
    return () => unsub();
  }, [router]); // App Router redirect pattern [4]

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);         // sign in
    const user = result.user;
    // console.log("Firebase user:", user);
    await saveUser(user);
    
    router.replace("/home");                         // navigate after success
  };
  

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
            <div className="relative flex justify-center ">
                  <img
                      src="/home.png" // Assuming this is your web preview image
                      alt="web preview"
                      className="absolute right-0 rounded-tl-xl border-t-4 border-l-4  shadow-lg max-w-full h-[430px] object-cover overflow-hidden "
                      style={{ width: '830px' }} // Adjust width as needed
                  />
                  {/* <img
                      src="/record2.jpg" // You'll need a separate image for the mobile app preview
                      alt="mobile preview"
                      className="absolute right-10 top-33 -translate-y-1/2 rounded-xl border-4 shadow-lg h-[400px] object-cover z-20"
                      style={{ width: '200px' }} // Adjust width as needed
                  /> */}
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
          <button 
            className="flex items-center justify-center gap-3 border rounded-3xl py-3 hover:bg-neutral-50 transition"
            onClick={signInWithGoogle}
          >
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
