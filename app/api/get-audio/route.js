import { NextResponse } from "next/server";
import ytdl from "@distube/ytdl-core";

export async function GET(req) {
    console.log('yt backend started')
  try {
    const { searchParams } = new URL(req.url);
    const videoUrl = searchParams.get("url");

    if (!videoUrl) {
      return NextResponse.json({ error: "No URL provided" }, { status: 400 });
    }

    // Best audio-only format
    const info = await ytdl.getInfo(videoUrl);
    let audioFormats = ytdl.filterFormats(info.formats, "audioonly");
    if (!audioFormats.length) {
      return NextResponse.json({ error: "No audio format found" }, { status: 404 });
    }
    audioFormats = audioFormats.filter(
        f => f.audioTrack?.audioIsDefault || !f.audioTrack?.isAutoDubbed
    );

    // pick the best one (highest bitrate)
    const format = audioFormats.sort((a, b) => (b.audioBitrate || 0) - (a.audioBitrate || 0))[0];
    console.log('this is returned' ,format)

    // Instead of fetching & buffering, stream it back directly
    const audioStream = ytdl(videoUrl, { format });

    // Convert Node.js stream -> Web ReadableStream (for Next.js)
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of audioStream) {
          controller.enqueue(chunk);
        }
        controller.close();
      },
    });

    // Fetch the actual stream
    // const response = await fetch(format.url);
    // const buffer = await response.arrayBuffer();

     return new NextResponse(stream, {
      headers: {
        "Content-Type": format.mimeType || "audio/webm",
        "Content-Disposition": "inline; filename=audio.webm",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    console.error("Error fetching audio:", err);
    return NextResponse.json({ error: "Failed to fetch audio URL" }, { status: 500 });
  }
}

