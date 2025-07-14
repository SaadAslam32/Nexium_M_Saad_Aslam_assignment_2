"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const [url, setUrl] = useState("");

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-24">
      <div className="container text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          Summarize Any Blog in Seconds
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Paste the URL below to get a clear, concise summary powered by AI.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
          <Input
            placeholder="Enter blog URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-grow"
          />
          <Button>Summarize</Button>
        </div>
      </div>
    </section>
  );
}
