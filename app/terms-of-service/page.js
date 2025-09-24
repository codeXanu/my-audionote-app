import FooterSection from "../components/Footer";
import Header from "../components/Header";
import Image from "next/image";

export default function Terms() {
  return (
    <main className="bg-white font-sans">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Main Title */}
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 text-center leading-tight mb-4">
          Terms of Service
        </h1>

        {/* Last Updated Date */}
        <p className="text-center text-gray-500 mb-10">
          Last updated: September 25, 2025
        </p>

        {/* Article Content */}
        <article className="space-y-8 text-gray-700 leading-relaxed">
          {/* Introduction */}
          <section>
            <p>
              Welcome to <strong>Quick Audio Note</strong> (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), operated by <strong>codeXanuj</strong>. These Terms of Service (&quot;Terms&quot;) govern your access to and use of our applications across the Web, mobile, and browser extensions (collectively, the &quot;Services&quot;).
            </p>
            <p className="mt-4">
              By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, please do not use the Services.
            </p>
          </section>

          {/* 1. Acceptance and Changes to Terms */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-4">1. Acceptance and Changes to Terms</h2>
            <p>
              By creating an account or using our Services, you confirm your agreement to these Terms. We reserve the right to modify these Terms at any time. We will post the revised Terms on this page and update the &quot;Last updated&quot; date. Your continued use of the Services after any changes constitutes your acceptance of the new Terms.
            </p>
          </section>

          {/* 2. Eligibility */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-4">2. Eligibility</h2>
            <p>
              You must be at least 13 years old (or the minimum age of digital consent in your country) to use the Services. By using the Services, you represent that you have the legal capacity to enter into a binding agreement.
            </p>
          </section>

          {/* 3. User Accounts */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-4">3. User Accounts</h2>
            <p>
              <strong>3.1 Registration:</strong> To access most features, you must create an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate.
            </p>
            <p className="mt-2">
              <strong>3.2 Account Security:</strong> You are responsible for safeguarding your password and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.
            </p>
          </section>

          {/* 4. Acceptable Use Policy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-4">4. Acceptable Use Policy</h2>
            <p>You agree not to misuse the Services or help anyone else to do so. You agree not to:</p>
            <ul className="list-disc list-inside mt-2 pl-4 space-y-1">
              <li>Upload or share content that is unlawful, harmful, defamatory, obscene, or infringing on others&apos; rights.</li>
              <li>Interfere with or disrupt the integrity or performance of the Services.</li>
              <li>Attempt to gain unauthorized access to the Services or their related systems.</li>
              <li>Introduce viruses, bots, scrapers, or other malicious code.</li>
              <li>Use the Services to violate any applicable laws or regulations.</li>
            </ul>
          </section>

          {/* 5. Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-4">5. Intellectual Property</h2>
            <p>
              <strong>5.1 Our Rights:</strong> All rights, title, and interest in and to the Services (excluding User Content) are and will remain the exclusive property of codeXanuj and its licensors. The Quick Audio Note name and logo are our trademarks and may not be used without our prior written permission.
            </p>
            <p className="mt-2">
              <strong>5.2 Your Content (User Content):</strong> You retain ownership of all intellectual property rights in your audio recordings and notes (&quot;User Content&quot;). By using the Services, you grant us a limited, worldwide, non-exclusive, royalty-free license to use, process, and display your User Content solely as necessary to provide, maintain, and improve the Services for you.
            </p>
          </section>

          {/* 6. Termination */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-4">6. Termination</h2>
            <p>
              You are free to stop using our Services at any time. We reserve the right to suspend or terminate your access to the Services without notice if you violate these Terms or for any other lawful reason. Upon termination, certain provisions, including those related to intellectual property, disclaimers, and limitation of liability, will survive.
            </p>
          </section>

          {/* 7. Disclaimers and Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-4">7. Disclaimers and Limitation of Liability</h2>
            <p>
              <strong>Disclaimer of Warranties:</strong> The Services are provided &quot;AS IS&quot; and &quot;AS AVAILABLE,&quot; without any warranties of any kind, express or implied. We do not warrant that the Services will be uninterrupted, secure, or error-free.
            </p>
            <p className="mt-4">
              <strong>Limitation of Liability:</strong> TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL QUICK AUDIO NOTE, CODEXANUJ, OR ITS AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR USE OF THE SERVICES.
            </p>
          </section>

          {/* 8. Indemnification */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-4">8. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Quick Audio Note and codeXanuj from and against any claims, liabilities, damages, losses, and expenses, including legal fees, arising out of or in any way connected with your access to or use of the Services or your violation of these Terms.
            </p>
          </section>

          {/* 9. Governing Law and Dispute Resolution */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-4">9. Governing Law and Dispute Resolution</h2>
            <p>
              These Terms shall be governed by the laws of India. Any disputes arising from or relating to these Terms shall be subject to the exclusive jurisdiction of the courts located in <strong>Kanpur, Uttar Pradesh, India</strong>.
            </p>
          </section>

          {/* 10. General Terms */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-4">10. General Terms</h2>
            <p>
              These Terms, together with our Privacy Policy, constitute the entire agreement between you and Quick Audio Note. If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions will remain in full force and effect. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
            </p>
          </section>

          {/* 11. Contact Us */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-4">11. Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <a href="mailto:codexanuj@gmail.com" className="text-blue-600 hover:underline font-medium mt-2 inline-block">
              codexanuj@gmail.com
            </a>
          </section>
        </article>
      </div>

      <FooterSection />
    </main>
  );
}
