import Header from "../components/Header";

export default function Terms() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">Terms of Use</h1>
        <p className="mb-4 text-gray-700">
          Welcome to <strong>Quick Audio Note</strong>. By accessing or using our
          application, you agree to comply with and be bound by these Terms of Use.
          Please read them carefully.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Use of the App</h2>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>The app allows you to create, store, and manage audio notes.</li>
          <li>You may connect your Notion account to sync your notes with a Notion database.</li>
          <li>You agree to use the app only for lawful purposes.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. User Responsibilities</h2>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>You are responsible for the security of your account and connected services.</li>
          <li>You must not misuse the app or attempt to disrupt its functionality.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Notion Integration</h2>
        <p className="text-gray-700 mb-4">
          If you choose to connect your Notion account, you authorize us to access
          your Notion database to sync your notes. You can disconnect this
          integration at any time. We are not responsible for issues caused by
          Notion’s platform or service interruptions.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Intellectual Property</h2>
        <p className="text-gray-700 mb-4">
          All content, design, and code of the app are the property of Quick Audio
          Note (or its developers). You may not copy, modify, or distribute the
          app without permission.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Limitation of Liability</h2>
        <p className="text-gray-700 mb-4">
          We are not liable for any damages arising from the use or inability to
          use the app, including data loss, errors, or interruptions.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">6. Changes to the Terms</h2>
        <p className="text-gray-700 mb-4">
          We may update these Terms of Use from time to time. Continued use of the
          app after updates constitutes acceptance of the revised terms.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">7. Contact Us</h2>
        <p className="text-gray-700">
          If you have any questions about these Terms of Use, please contact us at:{" "}
          <a href="mailto:akhil24122001@gmail.com" className="text-blue-600">
            akhil24122001@gmail.com
          </a>
        </p>
      </main>
    </>
  );
}
