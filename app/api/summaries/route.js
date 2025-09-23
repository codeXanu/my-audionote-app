import { NextResponse } from "next/server";
import OpenAI from "openai";
import uploadFileToSupabase from "@/app/lib/uploadFileToSupabase";
import { saveNoteMetadata } from "@/app/lib/saveNoteMetadata";
import crypto from "crypto";
import { syncNoteToNotion } from "@/app/lib/syncNoteToNotion";
import { sendNoteToWebhook } from "@/app/lib/sendNoteToWebhook";
import getWebhookUrl from "@/app/lib/getWebhookUrl";


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})




export async function POST(req) {
  try {
    const formData = await req.formData();

    const file = formData.get("file");
    const userId = formData.get("userId");
    const createdAt = formData.get("createdAt");
    const type = file.type
    const cardType = formData.get("type");
    const duration = parseInt(formData.get("duration"), 10);
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const noteId = crypto.randomUUID(); // generate once in backend
    let fileUrl, filePath;

    let transcriptText = "";

    // --- Case 1: Audio file ---
    if (type.startsWith("audio")) {
      // Convert file to Buffer
      const buffer = Buffer.from(await file.arrayBuffer());

      // Keep base64 for frontend reconstruction
      const base64Audio = buffer.toString("base64");

      // Transcribe using Whisper
      const transcription = await openai.audio.transcriptions.create({
        file: file,
        model: "whisper-1",
      });

      // const buffer = Buffer.from(await file.arrayBuffer());
      // const stream = Readable.from(buffer);

      // Convert audio → base64 (so frontend can reconstruct)
      // Or can uplaod to supabase storage and  the get public Url

      // const base64Audio = buffer.toString("base64");

      // --- Step 1: Transcribe using Whisper ---
      // const transcription = await openai.audio.transcriptions.create({
      //   file: file,
      //   model: "whisper-1",
      // });

      transcriptText = transcription.text;

    

     // Attach audio details for response
      var audioFilePayload = {
        base64: base64Audio,
        mimeType: file.type,
        name: file.name,
      };
    }


    // --- Case 2: Text file ---
    else if (type.startsWith("text")) {
      const textBuffer = await file.text(); // reads text file directly
      console.log(textBuffer)
      transcriptText = textBuffer;

      // No audio payload here
      var audioFilePayload = null;
    }


    // --- Step 2: Summarize with Chat Completions ---
    const summaryPrompt = `
        You are an assistant that processes and summarizes audio transcripts. 
        I will give you a transcript of a conversation/recording. 

        Return the result as a JSON object with exactly two keys:
        1. "title": A very short, clear topic title (max 7 words).
        2. "summary": A concise, human-friendly summary of the transcript in the same language.

        Transcript:
        ${transcriptText}
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a summarizer assistant." },
        { role: "user", content: summaryPrompt },
      ],
      response_format: { type: "json_object" }, // force JSON output
    });

    const result = JSON.parse(completion.choices[0].message.content);


    // --- Save data in supabase Database

    // const { fileUrl, filePath } = await uploadFileToSupabase( noteId, file );
    let currentSavedNote;

    if (type.startsWith("audio")) {
      // Upload the file only for audio
      const uploadResult = await uploadFileToSupabase(userId, noteId, file);
      // noteId = uploadResult.noteId;
      fileUrl = uploadResult.fileUrl;
      filePath = uploadResult.filePath;

      // Save metadata
      currentSavedNote = await saveNoteMetadata({
        noteId,
        userId: userId,
        type: type,
        createdAt,
        title: result.title,
        transcript: transcriptText,
        summary: result.summary,
        duration: duration,
        filePath,
        fileUrl,
        cardType: cardType
      });
    } else {
      // For non-audio types, you can skip upload for now
      currentSavedNote = await saveNoteMetadata({
        noteId,
        userId,
        type,
        createdAt,
        title: result.title,
        transcript: transcriptText,
        summary: result.summary,
        duration,
        filePath: null,
        fileUrl: null,
        cardType: cardType
      });
    }
    console.log("✅ Note metadata saved successfully", currentSavedNote);


    const notionResult = await syncNoteToNotion(currentSavedNote, userId);
    console.log("Notion sync result:", notionResult);

    const noteToWebhook = {
        noteId,
        type: cardType,
        createdAt,
        title: result.title,
        transcript: transcriptText,
        summary: result.summary,
        duration: duration,
        fileUrl,
    }

    const webhookUrl = await getWebhookUrl(userId);
    console.log("finally", webhookUrl)
    const webhoookResult = await sendNoteToWebhook(webhookUrl, noteToWebhook);


    // --- Step 3: Build response object ---
    const responsePayload = {
      id: noteId,
      type,
      createdAt,
      duration,
      title: result.title,
      transcript: transcriptText,
      summary: result.summary,
      audioFile: audioFilePayload // or upload to Supabase and store URL,,,, will be null for text files
    };

    return NextResponse.json({
      ...currentSavedNote,
      notionSync: notionResult,
      webhookSync: webhoookResult,
    });
  } catch (err) {
    console.error("Error in /api/summaries:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
