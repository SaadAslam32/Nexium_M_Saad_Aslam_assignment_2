interface Props {
  summary: string;
}

export default function SummaryCard({ summary }: Props) {
  return (
    <div className="border p-4 rounded-md bg-white shadow-sm mt-4">
      <h2 className="font-semibold mb-2">Summary</h2>
      <p>{summary}</p>
    </div>
  );
}
