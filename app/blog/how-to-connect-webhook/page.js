import Header from "../../components/Header"
import FooterSection from "../../components/Footer"
import Image from "next/image"

export default function HowToConnectWebhook() {
    return (
        <main className="bg-white font-sans">
            <Header />
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* Breadcrumbs */}
                <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
                    <ol className="list-none p-0 inline-flex">
                        <li className="flex items-center">
                            <a href="#" className="hover:text-gray-700">Home</a>
                            <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569 9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" /></svg>
                        </li>
                        <li className="flex items-center">
                            <a href="#" className="hover:text-gray-700">Integrations</a>
                            <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569 9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" /></svg>
                        </li>
                        <li>
                            <span className="text-gray-400">How to Connect Your Webhook URL</span>
                        </li>
                    </ol>
                </nav>

                {/* Title */}
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 text-center leading-tight mb-4">
                    Automate Your Workflow: How to Connect a Webhook to Quick Audio Note
                </h1>

                {/* Date */}
                <p className="text-center text-gray-500 mb-8">
                    Sep 25, 2025
                </p>

                {/* Featured Image */}
                <figure className="mb-12">
                    <img
                        className="w-full h-auto object-cover rounded-lg shadow-md"
                        src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop"
                        alt="Code on a screen representing API and webhook integration."
                        width={1200}
                        height={600}
                    />
                </figure>

                {/* Article Content */}
                <article className="prose lg:prose-xl max-w-none text-gray-800 leading-relaxed">
                    <p className="mb-8 text-lg">
                        Webhooks are a powerful way to send real-time data from one application to another. By connecting a webhook to <strong>Quick Audio Note</strong>, you can instantly send your new notes, summaries, and transcripts to your own custom applications and services. This guide will show you exactly how to create a webhook endpoint and connect it to your account.
                    </p>

                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 border-b pb-2 mb-6">What is a Webhook?</h2>
                    <p className="mb-4">
                        Think of a webhook as an automated notification. Instead of your application constantly asking our server &quot;Is there a new note yet?&quot;, our server will automatically send a message to your application the moment a new note is created. This message is sent to a specific URL you provide—your &quot;webhook endpoint.&quot;
                    </p>

                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 border-b pb-2 mb-6">Step 1: Create a Webhook Endpoint on Your Server</h2>
                    <p className="mb-4">
                        Your endpoint is a URL on your server that is programmed to listen for incoming data. When Quick Audio Note sends a notification, it will be in the form of an HTTP <strong>POST</strong> request containing a JSON body. Your server needs to be ready to accept and process this.
                    </p>
                    <p className="mb-4">
                        Below is a basic example of how to create an endpoint using <strong>Node.js</strong> and the popular <strong>Express</strong> framework. The same principles apply to any language like Python (with Flask/Django), PHP (with Laravel), Ruby (with Rails), etc.
                    </p>
                    <div className="bg-gray-800 text-white p-4 rounded-md my-6 overflow-x-auto">
                        <pre><code>{`// server.js - A simple Express server for our webhook

const express = require('express');
const app = express();
const port = 3000;

// This is crucial! It tells Express to parse incoming JSON bodies.
app.use(express.json());

// Define our webhook endpoint URL: /webhook/new-note
app.post('/webhook/new-note', (req, res) => {
  // The note data from Quick Audio Note is in the request body.
  const noteData = req.body;

  console.log('Received new note:', JSON.stringify(noteData, null, 2));

  // Here, you would add your custom logic:
  // - Save the data to your own database
  // - Send a message to a Slack channel
  // - Create a task in Asana or Jira

  // It&apos;s important to send a success response back to Quick Audio Note.
  res.status(200).json({ message: 'Webhook received successfully!' });
});

app.listen(port, () => {
  console.log(\`Server listening at http://localhost:\${port}\`);
});`}</code></pre>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 border-b pb-2 mb-6">Step 2: Understand the JSON Payload</h2>
                    <p className="mb-4">
                        Every time you create a note, we will send a JSON payload to your endpoint. It will be structured like this, giving you everything you need to work with the note&apos;s content.
                    </p>
                    <div className="bg-gray-800 text-white p-4 rounded-md my-6 overflow-x-auto">
                        <pre><code>{`{
  "noteId": "a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8",
  "title": "Project Kickoff Meeting",
  "summary": "Key decisions were made about project timelines and team roles. The budget was approved and the next steps are to create the project plan.",
  "transcript": "John: Okay, let&apos;s start the meeting. The main goal today is to finalize the timeline...\\nSarah: I&apos;ve reviewed the proposal, and I think we can deliver phase one by the end of Q3...",
  "createdAt": "2025-09-25T14:30:00Z"
}`}</code></pre>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 border-b pb-2 mb-6">Step 3: Get a Publicly Accessible URL</h2>
                    <p className="mb-4">
                        For our servers to send you data, your webhook endpoint URL must be public. A <code>localhost</code> URL will not work.
                    </p>
                    <ul className="list-disc list-inside space-y-3 mb-6">
                        <li>
                            <strong>For Production:</strong> Deploy your server application to a cloud provider like Vercel, Heroku, AWS, or DigitalOcean. They will provide you with a permanent public URL.
                        </li>
                        <li>
                            <strong>For Testing &amp; Development:</strong> It&apos;s often easiest to use a tunneling service like <strong>ngrok</strong>. Ngrok creates a secure, public URL that forwards all traffic directly to your local server. It&apos;s free and simple to use:
                            <ol className="list-decimal list-inside mt-2 pl-6 space-y-2">
                                <li>Download and install ngrok.</li>
                                <li>Run your local server (e.g., <code>node server.js</code>).</li>
                                <li>In a new terminal, run the command: <code>ngrok http 3000</code> (replace <code>3000</code> with your server&apos;s port number).</li>
                                <li>Ngrok will give you a public &quot;Forwarding&quot; URL that looks like <code>https://random-string.ngrok.io</code>. This is the URL you will use!</li>
                            </ol>
                        </li>
                    </ul>
                    {/* === ADD YOUR SCREENSHOT HERE === */}
                    {/* <Image src="/path/to/your/image-of-ngrok-terminal.png" alt="An ngrok terminal showing a public forwarding URL pointing to localhost." width={800} height={400} className="my-4 rounded-lg shadow-md border" /> */}

                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 border-b pb-2 mb-6">Step 4: Connect the URL in Quick Audio Note</h2>
                    <p className="mb-4">
                        You&apos;re on the final step! Now you just need to tell Quick Audio Note where to send the data.
                    </p>
                    <ol className="list-decimal list-inside space-y-4 mb-6">
                        <li>Navigate to the &quot;Integrations&quot; or &quot;Settings&quot; section of your Quick Audio Note account.</li>
                        <li>Find the Webhook section.</li>
                        <li>Paste the full, public URL of your webhook endpoint (e.g., <code>https://your-domain.com/webhook/new-note</code> or your ngrok URL) into the input box.</li>
                        {/* === ADD YOUR SCREENSHOT HERE === */}
                        {/* <Image src="/path/to/your/image-of-webhook-input.png" alt="The input field in the Quick Audio Note app for pasting a webhook URL." width={800} height={400} className="my-4 rounded-lg shadow-md border" /> */}
                        <li>Click <strong>&quot;Save&quot;</strong> or &quot;Connect&quot;.</li>
                        <li>That&apos;s it! Your webhook is now active. You can test it by creating a new audio note. Check your server logs or ngrok&apos;s web interface to see the incoming data in real-time.</li>
                    </ol>
                </article>
            </div>

            <FooterSection />
        </main>
    )
}
