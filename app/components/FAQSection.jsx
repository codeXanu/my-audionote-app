"use client";
import "../globals.css"

import React, { useEffect, useRef, useState } from 'react';

// const FAQSection = () => {
//   return (
//     <div className="max-w-screen-2xl mx-auto px-5 bg-white min-h-screen text-black faq-noselect">
//       <div className="flex flex-col items-center">
//         <h2 className="font-bold text-5xl mt-5 tracking-tight">FAQ</h2>
//         <p className="text-neutral-500 text-xl mt-3">Frequently asked questions</p>
//       </div>

//       <div className="grid divide-y divide-neutral-200 max-w-3xl mx-auto mt-8">
//         {faqData.map((faq, idx) => (
//           <div key={idx} className="py-5">
//             <details className="group">
//               <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
//                 <span>{faq.question}</span>
//                 <span className="transition group-open:rotate-180">
//                   <svg
//                     fill="none"
//                     height="24"
//                     width="24"
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="1.5"
//                     viewBox="0 0 24 24"
//                   >
//                     <path d="M6 9l6 6 6-6"></path>
//                   </svg>
//                 </span>
//               </summary>
//               <p className="text-neutral-600 mt-3 ">
//                 {faq.answer}
//               </p>
//             </details>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };


export default function FAQSection() {
  return (
    <div className="max-w-screen-2xl mx-auto mt-24 px-5 bg-white min-h-screen text-black faq-noselect">
      <div className="flex flex-col items-center mb-20">
        <h2 className="font-bold text-5xl mt-5 tracking-tight">Frequently Asked Questions</h2>
        {/* <p className="text-neutral-500 text-xl mt-3">
          Frequently asked questions
        </p> */}
      </div>

      <div className="grid divide-y divide-neutral-200 max-w-3xl mx-auto mt-8">
        {faqData.map((faq, idx) => (
          <AccordionItem key={idx} q={faq.question} a={faq.answer} />
        ))}
      </div>
    </div>
  );
}

function AccordionItem({ q, a }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);

  // initialize inline styles on mount so measurements are predictable
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    el.style.overflow = "hidden";
    el.style.height = "0px";
    el.style.opacity = "0";
    el.style.display = "none";
    el.style.transition = "height 300ms ease, opacity 300ms ease";
  }, []);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    // cleanup any previous listener
    let finished = false;

    if (open) {
      // OPEN: show -> animate from 0 to content height -> set height:auto after transition
      el.style.display = "block";
      el.style.height = "0px";
      el.style.opacity = "0";

      // force reflow so the transition happens
      // eslint-disable-next-line no-unused-expressions
      el.offsetHeight;

      const target = el.scrollHeight + "px";
      el.style.height = target;
      el.style.opacity = "1";

      const onEnd = (ev) => {
        if (ev.propertyName !== "height") return;
        if (finished) return;
        finished = true;
        // after expand set height to auto so content can reflow naturally
        el.style.height = "auto";
        el.removeEventListener("transitionend", onEnd);
      };
      el.addEventListener("transitionend", onEnd);
    } else {
      // CLOSE: from current height (auto or px) -> animate to 0 -> hide after transition
      // if height is 'auto', use scrollHeight as starting px
      const startingHeight =
        el.style.height === "auto" || !el.style.height
          ? el.scrollHeight
          : parseFloat(el.style.height);

      el.style.height = startingHeight + "px";

      // force reflow
      // eslint-disable-next-line no-unused-expressions
      el.offsetHeight;

      el.style.height = "0px";
      el.style.opacity = "0";

      const onEndClose = (ev) => {
        if (ev.propertyName !== "height") return;
        if (finished) return;
        finished = true;
        el.style.display = "none";
        el.removeEventListener("transitionend", onEndClose);
      };
      el.addEventListener("transitionend", onEndClose);
    }

    // cleanup in case component unmounts mid-transition
    return () => {
      finished = true;
      // remove inline transitions/listeners by cloning (optional)
      try {
        el.removeEventListener("transitionend", () => {});
      } catch (e) {}
    };
  }, [open]);

  return (
    <div className="py-5">
      {/* NOTICE: type="button" prevents accidental form submission which can cause immediate close */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex justify-between items-center font-medium cursor-pointer w-full text-left"
      >
        <span>{q}</span>
        <span
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        >
          <svg
            fill="none"
            height="24"
            width="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path d="M6 9l6 6 6-6"></path>
          </svg>
        </span>
      </button>

      <div
        ref={contentRef}
        className="overflow-hidden"
        // inline styles are handled by the effect above
      >
        <p className="text-neutral-600 mt-3">{a}</p>
      </div>
    </div>
  );
}


// FAQ Data
const faqData = [
  {
    question: "How does Audionotes.app function?",
    answer:
      "Audionotes.app leverages advanced AI models, including OpenAI's Whisper and other audio models, to transcribe, summarize, and process the text efficiently and accurately.",
  },
  {
    question: "Can I record audio from two sources on my device simultaneously?",
    answer:
      "Our app captures audio input exclusively from your device's microphone. We do not support recording audio from other sources, such as speakers.",
  },
  {
    question: "Do you support languages other than English?",
    answer:
      "Yes, we support 30+ languages – Dutch, English (en, en-AU, en-US, en-GB, en-NZ, en-IN), French, Hindi, German, Indonesian, Italian, Japanese, Korean, Mandarin, Norwegian, Polish, Portuguese, Russian, Spanish, Swedish, Turkish, Ukrainian.",
  },
  {
    question: "Do you offer refunds for paid plans?",
    answer:
      "We don't provide refunds for paid subscriptions. We encourage you to try our free plan first to experience Audionotes and make an informed decision before upgrading. This way, you can ensure the features meet your needs before committing to a paid plan.",
  },
  {
    question: "How can I get support if I need help?",
    answer:
      "Our support team is readily available via email at{`support@myaudionoteapp.com`}",
  },
  {
    question: "What are the audio and file size limits for each plan?",
    answer:
      "We offer flexible limits based on your needs: Free Plan:- 1 minute per note. Personal Plan:- 15 minutes per note, 50MB file size limit. Pro Plan:- 30 minutes per note, 200MB file size limit ",
  },
  {
    question: "How do you protect my data privacy?",
    answer:
      "Your privacy is our top priority. We maintain strict data protection standards and never share your information with third-party services. Your notes and data remain completely confidential and secure within our platform."
  },
  {
    question: "Will my data be used to train AI models?",
    answer:
      "No. While we use OpenAI's models to power our AI features, we have explicitly opted out of data training programs. Your content remains private and is never used for AI model training purposes."
  },
  {
    question: "Can I switch between plans?",
    answer:
      "Yes! You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle."
  },
  {
    question: "Do you offer team/enterprise plans?",
    answer:
      "Yes, for teams of 5 or more users, please contact us at hello@audionotes.app for custom enterprise pricing and features."
  },
  {
    question: "Which devices and platforms do you support?",
    answer:
      "Audionotes works seamlessly across iOS, Android, Web, and Chrome extension. Your notes sync automatically across all devices."
  },
  {
    question: "How can I delete my account?",
    answer:
      "You can delete your account and all associated data from the settings menu. If you need assistance, our support team is here to help."
  },
  {
    question: "Do you offer special pricing for educational institutions?",
    answer:
      "Yes! We offer educational discounts and institutional licenses for schools. Contact us for details."
  }
];

// export default FAQSection;
