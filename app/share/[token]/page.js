import { supabaseClient } from "@/app/lib/supabase";
import Link from "next/link";
import { FaMicrophoneAlt } from "react-icons/fa";



export default async function ShareNotePage({ params }) {
  const { token } = params;
  const now = new Date().toISOString();

  // Fetch the shared note by share_token, only if not expired
  const { data: note, error } = await supabaseClient
    .from("notes_metadata")
    .select("id, title, summary, date_time")
    .eq("share_token", token)
    .or(`share_token_expires_at.is.null,share_token_expires_at.gt.${now}`)
    .single();

  if (error || !note) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <h1 className="text-xl font-semibold text-gray-800 mb-2">Note Not Found or Sharing Expired</h1>
        <p className="text-gray-500">This note is not available or the share link has expired.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff] flex flex-col items-center">
      {/* Header */}
      <header className=" w-full flex justify-between items-center px-8 py-3 border-b border-gray-200">
        <div className="flex lg:flex-1">
            <Link href="/" className="flex items-center gap-3">
                {/* Mic inside red circle */}
                <div className="p-2 bg-[#FF3500] rounded-2xl flex items-center justify-center">
                    <FaMicrophoneAlt className="h-5 w-5 text-white" />
                </div>

                {/* Text */}
                <span className="text-lg font-semibold text-gray-900">
                    MyAudionotes
                </span>
            </Link>
            
        </div>
        <button className="px-4 py-1 bg-[#ff4b00] text-white rounded-full font-semibold text-base shadow-none outline-none hover:bg-[#ff4b00] cursor-default" disabled>
          Login
        </button>
      </header>

      {/* Content Card */}
      <main className="w-full flex flex-col items-center">
        <div className="bg-white  flex flex-col items-stretch w-full max-w-3xl p-0">
          <div className="w-full px-10 py-8">
            <h2 className="text-2xl font-semibold text-gray-900">{note.title}</h2>
            <div className="text-gray-400 text-base font-medium mt-2 mb-6">
              {new Date(note.date_time).toLocaleString("en-US", {
                weekday: undefined,
                month: "long",
                day: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
              })}
            </div>
            <div className="bg-[#f9f9f9] rounded-xl px-8 py-7 min-h-[60vh] border border-gray-200 text-gray-900 font-normal text-base leading-relaxed whitespace-pre-line relative overflow-y-auto">
              <div className="font-bold text-gray-800 mb-3">Your Notes</div>
              {note.summary}
            </div>
          </div>
          <footer className="w-full text-center text-gray-400 text-sm py-6 mt-2 ">
            © {new Date().getFullYear()} – Made with Audionotes
          </footer>
        </div>
      </main>
    </div>
  );
}
