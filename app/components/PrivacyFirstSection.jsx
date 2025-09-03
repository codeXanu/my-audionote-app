import { MdPrivacyTip } from "react-icons/md";
import { MdAutoDelete } from "react-icons/md";
import { TbShareOff } from "react-icons/tb";
import { LuBrainCircuit } from "react-icons/lu";



export default function PrivacyFirstSection() {
  return (
    <>
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="text-center mb-30">
            <h1 class="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
              Privacy First
            </h1>
            <p class="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">
              We care for your 100% privacy.
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
                <h2 class="text-gray-900 text-3xl title-font font-medium mb-3">
                  Secure Data
                </h2>
                
              </div>
            </div>

            <div class="p-4 md:w-1/4 flex flex-col text-center items-center">
              <div class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-red-500 mb-15 flex-shrink-0">
                <MdAutoDelete className="text-white w-2xl h-10 " />

              </div>
              <div class="flex-grow">
                <h2 class="text-gray-900 text-3xl title-font font-medium mb-3">
                  Recordings and Files Periodically Deleted
                </h2>
                
              </div>
            </div>

            <div class="p-4 md:w-1/4 flex flex-col text-center items-center">
              <div class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-red-500 mb-15 flex-shrink-0">
                <TbShareOff className="text-white w-2xl h-10 " />

              </div>
              <div class="flex-grow">
                <h2 class="text-gray-900 text-3xl title-font font-medium mb-3">
                  No Third Party Sharing
                </h2>
                
              </div>
            </div>

            <div class="p-4 md:w-1/4 flex flex-col text-center items-center">
              <div class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-red-500 mb-15 flex-shrink-0">
                <LuBrainCircuit className="text-white w-2xl h-10 " />

              </div>
              <div class="flex-grow">
                <h2 class="text-gray-900 text-3xl title-font font-medium mb-3">
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
