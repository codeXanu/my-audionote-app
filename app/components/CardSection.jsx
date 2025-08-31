import { IoPersonSharp } from "react-icons/io5";
import { MdOutlineMenuBook } from "react-icons/md";
import { LuNotebookText } from "react-icons/lu";
import { MdEmail } from "react-icons/md";
import { MdOutlineNotes } from "react-icons/md";
import { FaBriefcaseMedical } from "react-icons/fa";
import { VscLaw } from "react-icons/vsc";
import { GiBrain } from "react-icons/gi";
import { GiNotebook } from "react-icons/gi";



export default function CardSection() {
  return (
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-col text-center w-full mb-20">
          
          <h1 class="sm:text-3xl text-2xl font-bold text-gray-900 leading-loose">
                Never take notes <span class="text-orange-600">manually</span>
            </h1>
            <p class="mt-4 text-gray-500 text-lg font-medium text-pretty max-w-xl mx-auto">
                From busy professionals to creative writers, students to entrepreneurs, 
                lawyers to content creators, Audionotes is the only note-taking tool 
                and AI assistant you’ll ever need.
            </p>
        </div>
        <div class="flex flex-wrap -m-4 max-w-6xl mx-auto">
            <div class="p-4 md:w-1/3">
                <div class="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                <div class="flex items-center mb-3">
                    <div class="w-14 h-14 mr-3 inline-flex items-center justify-center rounded-full text-red flex-shrink-0">
                    <IoPersonSharp className="text-red-500 w-3xl h-10 " />
                    <IoPersonSharp className="text-red-500 w-3xl h-10" />
                    </div>
                </div>
                <div class="flex-grow">
                    <h1 class="text-black text-xl title-font font-bold mb-2.5">
                    Meetings
                    </h1>
                    <p class="text-gray-500 text-base font-medium text-pretty leading-relaxed ">
                    Meeting Minutes, Summaries, Action Items and much more for your online and offline meetings.
                    </p>
                </div>
                </div>
            </div>

            <div class="p-4 md:w-1/3">
                <div class="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                <div class="flex items-center mb-3">
                    <div class="w-10 h-10 mr-3 inline-flex items-center justify-center rounded-full text-red flex-shrink-0">
                    <MdOutlineMenuBook className="text-red-500 w-3xl h-10" />
                    </div>
                </div>
                <div class="flex-grow">
                    <h1 class="text-black text-xl title-font font-bold mb-2.5">
                        Lecture Notes
                    </h1>
                    <p class="text-gray-500 text-base font-medium text-pretty leading-relaxed ">
                        Record lectures, upload recordings or turn YouTube videos into detailed Lecture Notes, Quizzes and Flashcards.
                    </p>
                </div>
                </div>
            </div>

            <div class="p-4 md:w-1/3">
                <div class="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                <div class="flex items-center mb-3">
                    <div class="w-10 h-10 mr-3 inline-flex items-center justify-center rounded-full text-red flex-shrink-0">
                    <LuNotebookText className="text-red-500 w-3xl h-8" />
                    
                    </div>
                </div>
                <div class="flex-grow">
                    <h1 class="text-black text-xl title-font font-bold mb-2.5">
                        Journaling & Note-taking
                    </h1>
                    <p class="text-gray-500 text-base font-medium text-pretty leading-relaxed ">
                        Capture your thoughts on the go to create Journal Entries, Task Lists, Work Notes, Reminder Notes & much more
                    </p>
                </div>
                </div>
            </div>

            <div class="p-4 md:w-1/3">
                <div class="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                <div class="flex items-center mb-3">
                    <div class="w-10 h-10 mr-3 inline-flex items-center justify-center rounded-full text-red flex-shrink-0">
                    <MdEmail className="text-red-500 w-3xl h-8" />
                    
                    </div>
                </div>
                <div class="flex-grow">
                    <h1 class="text-black text-xl title-font font-bold mb-2.5">
                        E-mail
                    </h1>
                    <p class="text-gray-500 text-base font-medium text-pretty leading-relaxed ">
                        Don't write emails, just speak and Audionotes will turn your cluttered ideas into amazingl good emails.
                    </p>
                </div>
                </div>
            </div>

            <div class="p-4 md:w-1/3">
                <div class="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                <div class="flex items-center mb-3">
                    <div class="w-10 h-10 mr-3 inline-flex items-center justify-center rounded-full text-red flex-shrink-0">
                    <MdOutlineNotes className="text-red-500 w-3xl h-8" />
                    
                    </div>
                </div>
                <div class="flex-grow">
                    <h1 class="text-black text-xl title-font font-bold mb-2.5">
                        Content Creation
                    </h1>
                    <p class="text-gray-500 text-base font-medium text-pretty leading-relaxed ">
                        Turn your content ideas into high quality Linkedin Posts, Tweets, Youtube video Ideas, Tiktok Scripts & more.
                    </p>
                </div>
                </div>
            </div>

            <div class="p-4 md:w-1/3">
                <div class="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                <div class="flex items-center mb-3">
                    <div class="w-10 h-10 mr-3 inline-flex items-center justify-center rounded-full text-red flex-shrink-0">
                    <FaBriefcaseMedical className="text-red-500 w-3xl h-8" />
                    
                    </div>
                </div>
                <div class="flex-grow">
                    <h1 class="text-black text-xl title-font font-bold mb-2.5">
                        Medical Notes
                    </h1>
                    <p class="text-gray-500 text-base font-medium text-pretty leading-relaxed ">
                        Save time by creating high quality SOAP Notes, Medical Notes, Patient entries and other Documentaiton.
                    </p>
                </div>
                </div>
            </div>

            <div class="p-4 md:w-1/3">
                <div class="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                <div class="flex items-center mb-3">
                    <div class="w-10 h-10 mr-3 inline-flex items-center justify-center rounded-full text-red flex-shrink-0">
                    <VscLaw className="text-red-500 w-3xl h-8" />
                    
                    </div>
                </div>
                <div class="flex-grow">
                    <h1 class="text-black text-xl title-font font-bold mb-2.5">
                        Legal Notes
                    </h1>
                    <p class="text-gray-500 text-base font-medium text-pretty leading-relaxed ">
                        Generate Client Meeting Notes, Legal Documents, Work Notes and much more.
                    </p>
                </div>
                </div>
            </div>

            <div class="p-4 md:w-1/3">
                <div class="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                <div class="flex items-center mb-3">
                    <div class="w-10 h-10 mr-3 inline-flex items-center justify-center rounded-full text-red flex-shrink-0">
                    <GiBrain className="text-red-500 w-3xl h-8" />
                    
                    </div>
                </div>
                <div class="flex-grow">
                    <h1 class="text-black text-xl title-font font-bold mb-2.5">
                        Brain Dumps
                    </h1>
                    <p class="text-gray-500 text-base font-medium text-pretty leading-relaxed ">
                        Unload your thoughts, and we’ll turn them into clear, actionable notes and ideas.
                    </p>
                </div>
                </div>
            </div>

            <div class="p-4 md:w-1/3">
                <div class="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                <div class="flex items-center mb-3">
                    <div class="w-10 h-10 mr-3 inline-flex items-center justify-center rounded-full text-red flex-shrink-0">
                    <GiNotebook className="text-red-500 w-3xl h-8" />
                    
                    </div>
                </div>
                <div class="flex-grow">
                    <h1 class="text-black text-xl title-font font-bold mb-2.5">
                        Writing
                    </h1>
                    <p class="text-gray-500 text-base font-medium text-pretty leading-relaxed ">
                        Capture your ideas anytime, anywhere, and we'll turn them into organized, searchable notes.
                    </p>
                </div>
                </div>
            </div>
          
          
          
        </div>
      </div>
    </section>
  );
}
