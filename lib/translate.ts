const dictionary: Record<string, string> = {
  "hello": "ہیلو",
  "world": "دنیا",
  "blog": "بلاگ",
  "summary": "خلاصہ",
  // Add more mappings as needed
};

export function translateToUrdu(text: string): string {
  return text.split(" ").map(word => dictionary[word.toLowerCase()] || word).join(" ");
}
