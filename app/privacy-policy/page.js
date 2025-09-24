import Header from "../components/Header";
import FooterSection from "../components/Footer";
import Image from "next/image";

export default function Privacy() {
  return (
    <main className="bg-white font-sans">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Main Title */}
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 text-center leading-tight mb-4">
          Privacy Policy
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
              At <strong>Quick Audio Note</strong> (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), operated by <strong>codeXanuj</strong>, your privacy is fundamental to us. This Privacy Policy explains how we collect, use, store, and protect your information when you use our web application, mobile applications, and browser extensions (collectively, the &quot;Services&quot;).
            </p>
            <p className="mt-4">
              By accessing or using our Services, you acknowledge that you have read and understood this Privacy Policy. If you do not agree with its terms, please do not use the Services.
            </p>
          </section>

          {/* 1. Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-4">1. Information We Collect</h2>

            <h3 className="text-lg font-bold text-gray-800 mt-6 mb-2">1.1 Personal Information You Provide</h3>
            <p>When you create an account or interact with our Services, we may collect personal details you provide, such as:</p>
            <ul className="list-disc list-inside mt-2 pl-4 space-y-1">
              <li><strong>Name</strong></li>
              <li><strong>Email address</strong></li>
              <li><strong>Account credentials</strong> (username and encrypted password)</li>
            </ul>
            <p className="mt-4 text-sm text-gray-600">
              <strong>Payment Information:</strong> We do not collect or store your payment card details directly. If you subscribe to a paid plan, transactions are processed securely through third-party payment processors like Stripe, Google Play, or the Apple App Store, which operate under their own privacy policies.
            </p>

            <h3 className="text-lg font-bold text-gray-800 mt-6 mb-2">1.2 Your Voice Data</h3>
            <p>
              The core function of Quick Audio Note is to record and process audio. When you record or upload audio files, we collect and process that voice data to provide you with transcripts and summaries. This data is yours, and we handle it with the utmost care.
            </p>

            <h3 className="text-lg font-bold text-gray-800 mt-6 mb-2">1.3 Usage and Technical Data</h3>
            <p>We may automatically collect information related to your device and how you use our Services, including:</p>
            <ul className="list-disc list-inside mt-2 pl-4 space-y-1">
              <li>IP address</li>
              <li>Browser type and operating system</li>
              <li>Device identifiers</li>
              <li>Dates and times of access</li>
              <li>Crash reports and performance data</li>
            </ul>
          </section>

          {/* 2. How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-4">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc list-inside mt-2 pl-4 space-y-2">
              <li><strong>Provide and Improve the Services:</strong> Operate, maintain, and enhance our Services, including our AI-powered transcription and summarization features.</li>
              <li><strong>Manage Your Account:</strong> Register, authenticate, and manage your user account.</li>
              <li><strong>Communicate With You:</strong> Send you service-related notices, updates, security alerts, and respond to your support inquiries.</li>
              <li><strong>Ensure Security and Compliance:</strong> Monitor for fraudulent or illegal activity, comply with legal obligations, and enforce our terms of service.</li>
            </ul>
            <p className="mt-6 font-semibold text-gray-800">
              We will never sell your personal data to third parties. Your trust is our most important asset.
            </p>
          </section>

          {/* 3. How We Share Your Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-4">3. How We Share Your Information</h2>
            <p>We only share your information with trusted third parties under specific circumstances:</p>
            <ul className="list-disc list-inside mt-2 pl-4 space-y-2">
              <li>
                <strong>AI and Transcription Providers:</strong> To provide transcription and summarization, we may share your voice data with third-party AI service providers (such as OpenAI, Google Gemini, Deepgram, etc.). These providers are contractually bound to protect your data and are prohibited from using it for any other purpose.
              </li>
              <li>
                <strong>Service Providers:</strong> We work with vendors for hosting, cloud storage, analytics, and other infrastructure needs. We only share the minimum information necessary for them to perform their services for us.
              </li>
              <li>
                <strong>Legal Obligations:</strong> We may disclose your data if required by law, subpoena, or other legal process, or to protect the rights, property, or safety of Quick Audio Note, our users, or the public.
              </li>
              <li>
                <strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.
              </li>
            </ul>
          </section>

          {/* 4. Data Security and Retention */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-4">4. Data Security and Retention</h2>
            <p>
              We implement industry-standard technical and organizational measures to protect your information from unauthorized access, use, or disclosure. However, no internet transmission or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
            <p className="mt-4">
              We retain your personal information for as long as your account is active or as needed to provide you with the Services. You can delete your account and associated data at any time through your account settings or by contacting us.
            </p>
          </section>

          {/* 5. Children&apos;s Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-4">5. Children&apos;s Privacy</h2>
            <p>
              Our Services are not intended for or directed at children under the age of 13. We do not knowingly collect personal information from children. If we become aware that we have inadvertently collected such information, we will take steps to delete it.
            </p>
          </section>

          {/* 6. Changes to This Privacy Policy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-4">6. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. If we make material changes, we will notify you by email or through the Services. We encourage you to review this policy periodically.
            </p>
          </section>

          {/* 7. Contact Us */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-4">7. Contact Us</h2>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or your data, please contact us at:
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
