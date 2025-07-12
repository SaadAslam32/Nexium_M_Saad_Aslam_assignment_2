import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeBlogText(url: string): Promise<string> {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    let text = "";

    $("p").each((_, el) => {
      text += $(el).text() + "\n";
    });

    return text.trim();
  } catch (error) {
    console.error("Scraping failed:", error);
    return "Failed to scrape content.";
  }
}
