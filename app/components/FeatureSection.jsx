export default function FeatureSection() {
  
  return (
    <div className="bg-[#171413] min-h-screen py-26 mt-26">
      {/* Header */}
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold text-white">
          Best <span className="text-orange-500">AI</span> Note taking <span className="text-orange-500">Assistant</span>
        </h1>
        <p className="text-gray-400 mt-3 text-lg">
          Explore features designed to make your notes smarter and more organized.
        </p>
      </div>
      {/* Cards */}
      <div className="flex flex-col flex-wrap md:flex-row gap-8 max-w-7xl mx-auto">
        {/* Card 1: Record, Upload, Write */}
        <div className="bg-[#23201F] rounded-2xl p-8 flex-1 flex flex-col gap-7 justify-between shadow-xl min-w-[320px]">
          <h2 className="text-white text-2xl font-bold mb-2">Record, Upload or Write</h2>
          <p className="text-gray-400 text-base mb-8">
            Capture audio, text, or upload files and get clear structured notes
          </p>
          <div className="flex flex-col gap-4">
            <button className="bg-white text-black font-semibold rounded-full px-6 py-3 shadow flex items-center justify-center gap-2">
              ⤴️ Upload Audio
            </button>
            <button className="bg-white text-black font-semibold rounded-full px-6 py-3 shadow flex items-center justify-center gap-2">
              ✏️ Enter Text
            </button>
            <button className="bg-red-500 text-white font-semibold rounded-full px-6 py-3 shadow flex items-center justify-center gap-2">
              ● Record
            </button>
          </div>
        </div>
        {/* Card 2: Upload Images */}
        <div className="bg-[#23201F] rounded-2xl p-8 flex-1 flex flex-col justify-between shadow-xl min-w-[320px] items-center relative">
          <h2 className="text-white text-2xl font-bold mb-2">Upload Images</h2>
          <p className="text-gray-400 text-base mb-8 text-center">
            Generate detailed notes directly from your images and photos.
          </p>
          <div className="w-56 h-40 relative flex justify-center items-center mb-2">
            <img
              src="/image2.png"
              alt="Book"
              className="rounded-lg shadow-lg w-full h-full object-cover"
            />
          </div>
        </div>
        {/* Card 3: YouTube Videos */}
        <div className="bg-[#23201F] rounded-2xl p-8 flex-1 flex flex-col justify-between shadow-xl min-w-[320px] items-center">
          <h2 className="text-white text-2xl font-bold mb-2">YouTube Videos</h2>
          <p className="text-gray-400 text-base mb-8 text-center">
            Turn YouTube videos into summaries, lecture notes and much more directly from a link
          </p>
          <div className="w-full flex flex-col gap-4 items-center">
            <div className="w-76 h-48 relative flex justify-center items-center mb-2">
            <img
              src="/image3.png"
              alt="Book"
              className="rounded-lg shadow-lg w-full h-full object-fit"
            />
          </div>
          </div>
        </div>

            {/* Card 4: Transcribe */}

        <div className="bg-[#23201F] rounded-2xl p-8 flex-1 flex flex-col justify-between shadow-xl min-w-[320px] items-center">
          <h2 className="text-white text-2xl font-bold mb-2">Transcribe</h2>
          <p className="text-gray-400 text-base mb-8 text-center">
            Get high quality transcripts and translations for all your recordings, files and videos
          </p>
          <div className="w-72 bg-white rounded-2xl shadow-md p-4">
            <div className="text-black font-semibold mb-2">Team Meeting – Q4 Strategy</div>
            <div className="text-xs text-gray-500 mb-2">Sept 16, 2024 · 10:00 AM</div>
            <div className="flex items-center gap-2 mb-2">
              <button className="bg-black rounded-full w-7 h-7 flex items-center justify-center text-white">▶️</button>
              <span className="text-gray-700 text-sm">3:00 / 8:00</span>
            </div>
            <div className="flex gap-2 mb-2">
              <button className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">All Notes</button>
              <button className="text-xs bg-gray-200 text-black px-2 py-1 rounded-full font-bold">Transcript</button>
              <button className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">Speaker Distinction</button>
            </div>
            <div className="bg-white rounded-xl p-2 mt-2 text-gray-800 text-xs">
              <b>Transcript</b><br />
              Welcome, everyone. Today, we'll cover our Q4 strategy and align on key goals and priorities...
            </div>
          </div>
        </div>

            {/* Card 5: Summarize */}

  {/* <div className="bg-[#23201F] rounded-2xl p-8 flex-1 flex flex-col justify-between shadow-xl min-w-[320px] items-center">
          <h2 className="text-white text-2xl font-bold mb-2">Summarize</h2>
          <p className="text-gray-400 text-base mb-8 text-center">
            Get high-quality AI summaries in different styles for all your notes
          </p>
          <div className="w-72 relative flex flex-col items-center">
            <div className="bg-white rounded-2xl shadow-md p-4 w-full relative z-0">
              <div className="text-black font-semibold mb-2">Team Meeting – Q4 Strategy</div>
              <div className="text-xs text-gray-500 mb-2">Sept 16, 2024 · 10:00 AM</div>
              <div className="flex items-center gap-2 mb-2">
                <button className="bg-black rounded-full w-7 h-7 flex items-center justify-center text-white">▶️</button>
                <span className="text-gray-700 text-sm">3:00 / 8:00</span>
              </div>
              <div className="flex gap-2 mb-2">
                <button className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">All Notes</button>
                <button className="text-xs bg-gray-200 text-black px-2 py-1 rounded-full font-bold">Transcript</button>
                <button className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">Speaker Distinction</button>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg mt-[-16px] w-[90%] z-10 text-gray-800 text-xs font-semibold">
              <b>Summary</b>
              <br />
              The team discussed key objectives for Q4, focusing on specific areas to drive growth and efficiency...
            </div>
          </div>
        </div> */}



          <div className="bg-[#23201F] rounded-2xl p-8 flex flex-col items-center shadow-xl min-w-[320px] max-w-md mx-auto">
  <h2 className="text-white text-2xl font-bold mb-2 text-left w-full">Summarize</h2>
  <p className="text-gray-400 text-base mb-8 text-left w-full">
    Get high-quality AI summaries in different styles for all your notes
  </p>
  <div className="relative w-[350px] flex flex-col items-center">
    {/* Card mockup */}
    <div className="bg-white rounded-2xl shadow-md p-6 w-full flex flex-col justify-start items-start">
      {/* Header and controls mimic screenshot */}
      <div className="text-black font-semibold mb-1">Team Meeting – Q4 Strategy</div>
      <div className="text-xs text-gray-500 mb-3">Sept 16, 2024 · 10:00 AM</div>
      <div className="flex items-center gap-2 mb-3">
        <button className="bg-black rounded-full w-8 h-8 flex items-center justify-center text-white text-lg">▶️</button>
        <span className="text-gray-700 text-base font-medium">3:00 / 8:00</span>
      </div>
      <div className="flex gap-2 mb-2">
        <button className="text-xs bg-gray-100 text-gray-700 px-4 py-2 rounded-full">All Notes</button>
        <button className="text-xs bg-gray-200 text-black px-4 py-2 rounded-full font-bold">Transcript</button>
        <button className="text-xs bg-gray-100 text-gray-700 px-4 py-2 rounded-full">Speaker Distinction</button>
      </div>
    </div>
    {/* Floating summary card overlays bottom of mockup */}
    <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 w-[300px] bg-white rounded-t-2xl shadow-2xl py-5 px-6"
         style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.18)' }}>
      <div className="text-black text-[16px] font-bold mb-2">Summary</div>
      <div className="text-gray-800 text-[15px] font-normal leading-snug">
        The team discussed key objectives for Q4, focusing on specific areas to drive growth and efficiency. An action plan was outlined, assigning tasks and timelines to each...
      </div>
    </div>
    {/* Spacer div for correct bottom padding */}
    <div className="h-12"></div>
  </div>
</div>






        {/* === NEW CARD END: SUMMARIZE === */}

        {/* === NEW CARD START: CUSTOM PROMPTS === */}
        {/* Card 6: Custom Prompts */}
        <div className="bg-[#23201F] rounded-2xl p-8 flex-1 flex flex-col justify-between shadow-xl min-w-[320px] items-center">
          <h2 className="text-white text-2xl font-bold mb-2">Custom Prompts</h2>
          <p className="text-gray-400 text-base mb-8 text-center">
            Choose from 100+ output prompts or use your own ChatGPT prompts
          </p>
          <div className="grid grid-cols-2 gap-4 w-full">
            <button className="bg-white text-black text-base font-bold rounded-xl py-4 shadow flex items-center justify-center gap-2">
              ✏️ Blog
            </button>
            <button className="bg-white text-black text-base font-bold rounded-xl py-4 shadow flex items-center justify-center gap-2">
              📄 News Article
            </button>
            <button className="bg-white text-black text-base font-bold rounded-xl py-4 shadow flex items-center justify-center gap-2">
              📝 Summary
            </button>
            <button className="bg-zinc-800 text-white text-base font-bold rounded-xl py-4 shadow flex items-center justify-center gap-2">
              ➕ Generate Other
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
