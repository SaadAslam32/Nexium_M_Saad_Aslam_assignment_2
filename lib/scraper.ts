// lib/scraper.ts

import axios from 'axios';
import * as cheerio from 'cheerio';

export async function scrapeBlogText(url: string): Promise<string> {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Yeh selector tumhare blog structure pe depend karta hai
    // Yeh example sab <p> text ko join karta hai
    const paragraphs = $('p').map((_, el) => $(el).text()).get();
    const fullText = paragraphs.join('\n\n');

    return fullText || 'No text found!';
  } catch (error) {
    console.error('Scrape Error:', error);
    return 'Failed to scrape blog.';
  }
}
