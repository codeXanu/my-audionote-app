import Header from "../components/Header";

export default function Privacy() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4 text-gray-700">
          <strong>Quick Audio Note</strong> (“we”, “our”, or “us”) respects your
          privacy. This Privacy Policy explains how we collect, use, and protect
          your information when you use our application.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Audio notes that you create and save using our app.</li>
          <li>Optional connection details when you link your Notion account, such as your Notion database ID and access token.</li>
          <li>Basic usage data to improve our services (non-personal and anonymous).</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>To store and manage your audio notes within our app.</li>
          <li>To sync your notes to your connected Notion database, if you choose to connect one.</li>
          <li>To maintain and improve the performance of our app.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Security</h2>
        <p className="text-gray-700 mb-4">
          We store your notes securely. Notion access tokens are only used to
          connect and sync your notes with your Notion workspace. We do not sell
          or share your data with third parties.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Your Choices</h2>
        <p className="text-gray-700 mb-4">
          You can disconnect your Notion integration at any time, and you can
          delete your notes from our app whenever you choose.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Changes to This Policy</h2>
        <p className="text-gray-700 mb-4">
          We may update this Privacy Policy from time to time. If significant
          changes are made, we will notify you through the app or our website.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">6. Contact Us</h2>
        <p className="text-gray-700">
          If you have any questions about this Privacy Policy, please contact us
          at: <a href="mailto:akhil24122001@gmail.com" className="text-blue-600">akhil24122001@gmail.com</a>
        </p>
      </main>
    </>
  );
}
