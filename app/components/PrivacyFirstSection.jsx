import { MdPrivacyTip } from "react-icons/md";
import { MdAutoDelete } from "react-icons/md";
import { TbShareOff } from "react-icons/tb";
import { LuBrainCircuit } from "react-icons/lu";
import { SiPrivateinternetaccess } from "react-icons/si";




export default function PrivacyFirstSection() {
  return (
    <>
      <section class="bg-[#171413] text-white body-font mt-[-70] mb-10">
        <div class="container px-5 py-24 mx-auto">
          <div class="text-center mb-30">
            <h1 class="flex items-center justify-center gap-2 text-3xl font-bold leading-loose sm:text-3xl  title-font text-white mb-4 ">
              <SiPrivateinternetaccess className="text-red-500" />
              Privacy First
            </h1>
            <p class="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">
              We respect your space. Your privacy stays yours, always.
            </p>
            <div class="flex mt-6 justify-center">
              <div class="w-16 h-1 rounded-full bg-red-500 inline-flex"></div>
            </div>
          </div>

          <div class="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">

            <div class="p-4 md:w-1/4 flex flex-col text-center items-center">
              <div class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-red-500 mb-15 flex-shrink-0">
                <MdPrivacyTip className="text-white w-2xl h-10 " />

              </div>
              <div class="flex-grow">
                <h2 class="text-white text-3xl title-font font-medium mb-3">
                  Secure Data
                </h2>
                
              </div>
            </div>

            <div class="p-4 md:w-1/4 flex flex-col text-center items-center">
              <div class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-red-500 mb-15 flex-shrink-0">
                <MdAutoDelete className="text-white w-2xl h-10 " />

              </div>
              <div class="flex-grow">
                <h2 class="text-white text-3xl title-font font-medium mb-3">
                  Recordings and Files Periodically Deleted
                </h2>
                
              </div>
            </div>

            <div class="p-4 md:w-1/4 flex flex-col text-center items-center">
              <div class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-red-500 mb-15 flex-shrink-0">
                <TbShareOff className="text-white w-2xl h-10 " />

              </div>
              <div class="flex-grow">
                <h2 class="text-white text-3xl title-font font-medium mb-3">
                  No Third Party Sharing
                </h2>
                
              </div>
            </div>

            <div class="p-4 md:w-1/4 flex flex-col text-center items-center">
              <div class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-red-500 mb-15 flex-shrink-0">
                <LuBrainCircuit className="text-white w-2xl h-10 " />

              </div>
              <div class="flex-grow">
                <h2 class="text-white text-3xl title-font font-medium mb-3">
                  No LLM/AI Training
                </h2>
                
              </div>
            </div>

           
            
          </div>
          
        </div>
      </section>
    </>
  );
}
