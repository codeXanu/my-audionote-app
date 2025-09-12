// async function saveSummaryToDB(summaryData, audioUrl) {
//   const { data, error } = await supabase
//     .from("summaries")
//     .insert([
//       {
//         id: summaryData.id,
//         type: summaryData.type,
//         createdAt: summaryData.createdAt,
//         title: summaryData.title,
//         transcript: summaryData.transcript,
//         summary: summaryData.summary,
//         audio_url: audioUrl, // link to storage
//       },
//     ]);

//   if (error) throw error;
//   return data;
// }
