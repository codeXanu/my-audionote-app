'use client'
import { useState } from "react";
import { TiTick } from "react-icons/ti";


export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12 mt-10">
        
      {/* Toggle */}
        <div className="flex flex-col items-center mb-10">
            <h2 className="text-3xl font-semibold tracking-tight text-balance text-gray-900 mb-20 sm:text-5xl">
                Our <span className="text-red-500"> Plans </span>  & <span className="text-red-500"> Pricing </span> 
            </h2>
            <p className="text-gray-400 text-lg mb-7">
            Explore features designed to make your notes smarter and more organized.
            </p>

            <div className="relative flex bg-gray-100 rounded-full p-1">
                {/* Sliding indicator */}
                <span
                    className={`absolute top-1 bottom-1 w-1/2 rounded-full bg-white shadow transition-all duration-300 ease-in-out ${
                    isAnnual ? "left-1/2" : "left-0"
                    }`}
                ></span>

                <button
                    className={`relative flex-1 pl-8 pr-4 py-3 text-xl font-medium rounded-full transition-colors duration-300 ${
                    !isAnnual ? "text-black" : "text-gray-500"
                    }`}
                    onClick={() => setIsAnnual(false)}
                >
                    Monthly
                </button>

                <button
                    className={`relative flex items-center gap-1 pl-10 pr-1.5 py-3 text-xl font-medium rounded-full transition-colors duration-300 ${
                    isAnnual ? "text-black" : "text-gray-500"
                    }`}
                    onClick={() => setIsAnnual(true)}
                >
                    Annual <span className="text-xs text-red-500">Upto 35% off</span>
                </button>
            </div>

        </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Personal */}
        <PricingCard
          title="Personal"
          price={isAnnual ? "69.99" : "9.99"}
          duration={isAnnual ? "/year" : "/month"}
          saveText={isAnnual && "Save upto 35%"}
          desc="Basic access with core features."
          button="Get Started"
          features={[
            { text: "Unlimited Voice Notes upto 30 mins/note", included: true },
            { text: "Unlimited File Uploads upto 50 Mb/file", included: true },
            { text: "Unlimited Text Notes", included: true },
            {
              text: "Unlimited Notes from YouTube Video upto 30 mins/video",
              included: true,
            },
            { text: "Notion and Zapier Integrations", included: false },
            { text: "Mind Maps", included: false },
            { text: "Chat with Notes", included: false },
            { text: "Notes from Images", included: false },
            { text: "Whatsapp Bot", included: false },
          ]}
        />

        {/* Pro */}
        <PricingCard
          title="Pro"
          price={isAnnual ? "129.99" : "19.99"}
          duration={isAnnual ? "/year" : "/month"}
          saveText={isAnnual && "Save upto 35%"}
          desc="Advanced access to boost productivity."
          button="Get Started"
          popular
          features={[
            { text: "Unlimited Voice Notes", included: true },
            { text: "Unlimited File Uploads", included: true },
            { text: "Unlimited Text Notes", included: true },
            { text: "Unlimited Notes from YouTube Video", included: true },
            { text: "Notion and Zapier Integrations", included: true },
            { text: "Mind Maps", included: true },
            { text: "Chat with Notes", included: true },
            { text: "Notes from Images", included: true },
            { text: "WhatsApp Bot", included: true },
          ]}
        />
      </div>
    </div>
  );
}

function PricingCard({
  title,
  price,
  duration,
  saveText,
  desc,
  button,
  features,
  popular,
}) {
  return (
    <div
      className={`relative rounded-2xl text-black border p-6 bg-white shadow-sm ${
        popular ? "border-red-500" : "border-gray-200"
      }`}
    >
      {popular && (
        <span className="absolute top-3 right-3 bg-gray-800 text-white text-xs font-medium px-3 py-1 rounded-full">
          Most Popular
        </span>
      )}
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="flex items-end gap-1 mt-2">
        <span className="text-3xl font-bold">${price}</span>
        <span className="text-gray-600">{duration}</span>
      </div>
      <div className="text-red-500 text-xs font-medium mt-1">
        {saveText}
      </div>
      <p className="text-gray-600 text-sm mt-2">{desc}</p>
      <button className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-full mt-6">
        {button}
      </button>

      <div className="mt-6">
        <h4 className="font-bold text-gray-900 mb-3">What's Included</h4>
        <ul className="space-y-2 text-lg font-medium">
          {features.map((f, i) => (
            <li key={i} className="flex items-center gap-2">
              {f.included ? (
                <span className="text-red-500 text-xl"><TiTick /></span>
              ) : (
                <span className="text-gray-400">✘</span>
              )}
              <span
                className={f.included ? "text-gray-800" : "text-gray-400"}
              >
                {f.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
