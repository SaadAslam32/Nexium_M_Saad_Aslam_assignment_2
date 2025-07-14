export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-gray-50">
      <div className="container text-center">
        <h2 className="text-3xl font-bold mb-6 text-dark">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div>
            <h3 className="text-xl font-semibold mb-2">1. Paste URL</h3>
            <p className="text-gray-600">
              Enter the blog URL and hit summarize.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">2. AI Processing</h3>
            <p className="text-gray-600">
              Our AI reads and generates a summary.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">3. Get Results</h3>
            <p className="text-gray-600">
              Instantly view, copy, or share your summary.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
