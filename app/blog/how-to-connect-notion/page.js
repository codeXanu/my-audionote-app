import Image from "next/image"
import Header from "../../components/Header"
import FooterSection from "../../components/Footer"

export default function HowToConnectNotion() {
    return (
        <>
            <main className="bg-white font-sans">
                <Header />
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                    {/* Breadcrumbs */}
                    <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
                        <ol className="list-none p-0 inline-flex">
                            <li className="flex items-center">
                                <a href="#" className="hover:text-gray-700">Home</a>
                                <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" /></svg>
                            </li>
                            <li className="flex items-center">
                                <a href="#" className="hover:text-gray-700">Blog</a>
                                <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" /></svg>
                            </li>
                            <li>
                                <span className="text-gray-400">How to Connect with a Notion Page</span>
                            </li>
                        </ol>
                    </nav>

                    {/* Title */}
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 text-center leading-tight mb-4">
                        How to Connect Your Audio Notes to a Notion Page
                    </h1>

                    {/* Date */}
                    <p className="text-center text-gray-500 mb-8">
                        Sep 25, 2025
                    </p>

                    {/* Featured Image */}
                    <figure className="mb-12">
                        <img
                            className="w-full h-auto object-cover rounded-lg shadow-md"
                            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop"
                            alt="A person organizing notes on a desk with a laptop and coffee."
                            width={1200}
                            height={600}
                        />
                    </figure>

                    {/* Article Content */}
                    <article className="prose lg:prose-xl max-w-none text-gray-800 leading-relaxed">
                        <p className="mb-8 text-lg">
                            Connecting your audio notes directly to Notion creates a powerful, organized archive of all your thoughts, meetings, and ideas. This guide will walk you through the entire process from start to finish, ensuring a smooth and successful integration. Let&apos;s get started!
                        </p>

                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 border-b pb-2 mb-6">Step 1: Create Your Notion Database</h2>
                        <p className="mb-4">
                            The first and most crucial step is to create a dedicated home for your notes inside Notion. We&apos;ll be creating a special type of page called a Database. Think of it as a smart spreadsheet that will hold all your information.
                        </p>
                        <ol className="list-decimal list-inside space-y-4 mb-6">
                            <li className="mb-2">
                                <strong>Log in to Notion</strong> and navigate to the workspace where you want your notes to live. It&apos;s important to <strong>create this in a shared workspace, not in your private space</strong>, so our application can access it after you grant permission.
                            </li>
                            <li className="mb-2">
                                In the left-hand sidebar, click the <strong>&quot;+ New page&quot;</strong> button to create a new page.
                            </li>
                            <li className="mb-2">
                                You&apos;ll be presented with a new, empty page. Under the &quot;DATABASE&quot; section in the body of the page, click on the <strong>&quot;Table&quot;</strong> option.
                            </li>
                            <Image
                                src="/notion-database.PNG"
                                alt="Selecting &apos;Table&apos; from the database options in a new Notion page."
                                className="my-4 rounded-lg shadow-md border"
                                width={800}
                                height={450}
                            />
                            <li className="mb-2">
                                Notion will immediately generate a new full-page database. Give it a clear and memorable title, like <strong>&quot;My Quick Audio Notes&quot;</strong> or &quot;Meeting Transcripts&quot;. This is the name you&apos;ll look for when connecting our app.
                            </li>
                        </ol>

                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 border-b pb-2 mb-6">Step 2: Set Up the Correct Database Columns</h2>
                        <p className="mb-4">
                            For our application to correctly send data, your database needs specific columns with exact names and types. Your new database starts with &quot;Name&quot; and &quot;Tags&quot; columns by default. Let&apos;s configure them properly.
                        </p>
                        <ol className="list-decimal list-inside space-y-4 mb-6">
                            <li className="mb-2">
                                <strong>Configure the Title Column:</strong> The default &quot;Name&quot; column is almost perfect. Click on its header and rename it to <strong>`Title`</strong>. This column&apos;s property type must be &quot;Title&quot;.
                            </li>
                            <li className="mb-2">
                                <strong>Remove the Tags Column:</strong> We don&apos;t need the default &quot;Tags&quot; column. Click on its header, then click &quot;Delete property&quot; from the menu that appears.
                            </li>
                            <li className="mb-2">
                                <strong>Add New Columns:</strong> Click the <strong>&quot;+&quot;</strong> button to the right of the &quot;Title&quot; column to add the following three columns one by one:
                                <ul className="list-disc list-inside mt-4 pl-6 space-y-3 bg-gray-50 p-4 rounded-md">
                                    <li><strong>Name:</strong> `Title`, <strong>Type:</strong> `Text`</li>
                                    <li><strong>Name:</strong> `Summary`, <strong>Type:</strong> `Text`</li>
                                    <li><strong>Name:</strong> `Transcript`, <strong>Type:</strong> `Text`</li>
                                    <li><strong>Name:</strong> `CreatedAt`, <strong>Type:</strong> `Created time`</li>
                                </ul>
                            </li>
                            <li className="mb-2">
                                <strong>Final Check:</strong> When you&apos;re finished, your database should have exactly four columns in total: `Title`, `Summary`, `Transcript`, and `CreatedAt`.
                            </li>
                            <Image
                                src="/notion-home.PNG"
                                alt="Notion database with the required columns: Title, Summary, Transcript, and CreatedAt."
                                className="my-4 rounded-lg shadow-md border"
                                width={800}
                                height={450}
                            />
                        </ol>

                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 border-b pb-2 mb-6">Step 3: Connect and Authorize</h2>
                        <p className="mb-4">
                            Now that your Notion database is perfectly set up, it&apos;s time to link it with our application.
                        </p>
                        <ol className="list-decimal list-inside space-y-4 mb-6">
                            <li className="mb-2">
                                Return to our application&apos;s Notion Integration page and click the <strong>&quot;Connect&quot;</strong> button.
                            </li>
                            <li className="mb-2">
                                You&apos;ll be redirected to a secure Notion Authorization page. Here, Notion will ask you to grant our app permission to access your pages.
                            </li>
                            <li className="mb-2">
                                Click the &quot;Select pages&quot; dropdown and choose only the database you just created (e.g., &quot;My Quick Audio Notes&quot;). This is more secure than granting access to your entire workspace.
                            </li>
                            <li className="mb-2">
                                Click the <strong>&quot;Allow access&quot;</strong> button at the bottom. Once you do, you will be automatically redirected back to our application&apos;s &quot;notion-integration&quot; page.
                            </li>
                        </ol>

                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 border-b pb-2 mb-6">Step 4: Finalize the Connection</h2>
                        <p className="mb-4">
                            This is the last step! You just need to tell our app the precise address of your new database.
                        </p>
                        <ol className="list-decimal list-inside space-y-4 mb-6">
                            <li className="mb-2">
                                Go back to the Notion database page you created.
                            </li>
                            <li className="mb-2">
                                In the top-right corner of the page, click the <strong>&quot;Share&quot;</strong> button, then in the popup, click <strong>&quot;Copy link&quot;</strong>. The link is now copied to your clipboard.
                            </li>
                            <Image
                                src="/notion-copy-link.png"
                                alt="Copying the link from the Notion share menu."
                                className="my-4 rounded-lg shadow-md border"
                                width={800}
                                height={450}
                            />
                            <li className="mb-2">
                                Return to the Quick Audio Note&apos;s &quot;notion-integration&quot; page. Paste the link you just copied into the input box provided.
                            </li>
                            <li className="mb-2">
                                Click <strong>&quot;Submit&quot;</strong> to finalize the connection.
                            </li>
                        </ol>

                        <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-6 rounded-md my-10">
                            <h3 className="text-xl font-bold mb-2">You&apos;re All Set!</h3>
                            <p>
                                Congratulations! Your Notion integration is complete. All your future audio notes, summaries, and transcripts will now be automatically saved as new entries in your database.
                            </p>
                        </div>
                    </article>
                </div>
                <FooterSection />
            </main>
        </>
    )
}
