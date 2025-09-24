import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const videoUrl = searchParams.get("url");

    if (!videoUrl) {
      return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
    }

    // Extract videoId from standard or short URL
    let videoId;
    if (videoUrl.includes("youtu.be/")) {
      videoId = videoUrl.split("/").pop().split("?")[0];
    } else {
      videoId = new URL(videoUrl).searchParams.get("v");
    }

    if (!videoId) {
      return NextResponse.json({ error: "Cannot parse videoId" }, { status: 400 });
    }

    // List of Piped instances for fallback
    const PIPED_INSTANCES = [
      "https://piped.kavin.rocks",
      "https://pipedapi.kavin.rocks"
    ];

    let apiRes;
    for (const baseUrl of PIPED_INSTANCES) {
      try {
        apiRes = await fetch(`${baseUrl}/streams/${videoId}`);
        if (apiRes.ok) break;
      } catch (e) {
        console.warn(`Failed to fetch from ${baseUrl}:`, e);
      }
    }

    if (!apiRes || !apiRes.ok) {
      return NextResponse.json({ error: "All Piped instances failed" }, { status: 500 });
    }

    const data = await apiRes.json();
    if (!data.audioStreams || data.audioStreams.length === 0) {
      return NextResponse.json({ error: "No audio streams found" }, { status: 404 });
    }

    // Pick the highest bitrate audio
    const audioStream = data.audioStreams.sort((a, b) => b.bitrate - a.bitrate)[0];

    // Return JSON with audio URL — frontend will fetch as Blob
    return NextResponse.json({ audioUrl: audioStream.url });
  } catch (err) {
    console.error("Error in /api/get-audio:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
