// ... existing imports ...
import { NextResponse } from "next/server";
import OpenAI from "openai";
import Blog from "@/models/Blog";
import { supabase } from "@/lib/supabase";
import * as cheerio from 'cheerio';
import connectToDatabase from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    console.log("MONGODB_URI:", process.env.MONGODB_URI ? "***REDACTED***" : "MISSING");
  
    const { url } = await request.json();
    if (!url) {
      return NextResponse.json({ error: "Missing URL" }, { status: 400 });
    }

    // Scrape blog content
    const fetchRes = await fetch(url);
    if (!fetchRes.ok) throw new Error(`HTTP error! status: ${fetchRes.status}`);
    const html = await fetchRes.text();
    const $ = cheerio.load(html);
    
    // Remove unnecessary elements
    $('script, style, noscript, iframe, header, footer').remove();
    
    // Extract main content
    let textContent = $('body').text().replace(/\s+/g, ' ').trim();
    
    // Fallback if content is too short
    if (textContent.length < 500) {
      textContent = $('article').text() || $('main').text() || textContent;
    }

    // Initialize Gemini client
    const openai = new OpenAI({
      apiKey: process.env.GEMINI_API_KEY,
      baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
    });

    // Generate summaries
    const [englishResp, urduResp] = await Promise.all([
      openai.chat.completions.create({
        model: "gemini-2.0-flash",
        messages: [
          { 
            role: "user", 
            content: `Create a concise 100-word summary in English of this blog post:\n\n${textContent.slice(0, 15000)}` 
          }
        ],
        max_tokens: 200,
      }),
      openai.chat.completions.create({
        model: "gemini-2.0-flash",
        messages: [
          { 
            role: "user", 
            content: `Create a concise Urdu summary (اردو میں خلاصہ) of this blog post:\n\n${textContent.slice(0, 15000)}` 
          }
        ],
        max_tokens: 250,
      })
    ]);

    const englishSummary = englishResp.choices[0]?.message?.content?.trim() || "";
    const urduSummary = urduResp.choices[0]?.message?.content?.trim() || "";

    // Save to MongoDB
    await connectToDatabase();
    await Blog.findOneAndUpdate(
      { url },
      { content: textContent },
      { upsert: true, new: true }
    );

    // Save to Supabase
    const { error } = await supabase.from("summaries").upsert({
      blog_url: url,
      english_summary: englishSummary,
      urdu_summary: urduSummary,
      created_at: new Date().toISOString()
    }, { onConflict: 'blog_url' });

    if (error) throw error;

    return NextResponse.json({ englishSummary, urduSummary });
    
  } catch (error: any) {
    console.error("Summarization error:", error);
    return NextResponse.json(
      { error: error.message || "Processing failed" },
      { status: 500 }
    );
  }
}