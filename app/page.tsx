"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SummaryCard from "@/components/SummaryCard";
import { scrapeBlogText } from "@/lib/scraper";
import { translateToUrdu } from "@/lib/translate";

export default function Home() {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullText = await scrapeBlogText(url);

    // Simulated AI summary: Take first 3 sentences
    const simulatedSummary = fullText.split(". ").slice(0, 3).join(". ") + ".";
    const urduSummary = translateToUrdu(simulatedSummary);

    setSummary(urduSummary);
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <Card className="p-4 space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Paste blog URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button type="submit">Summarise</Button>
        </form>
      </Card>

      {summary && <SummaryCard summary={summary} />}
    </main>
  );
}
