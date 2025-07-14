export default function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="container text-center">
        <h2 className="text-3xl font-bold mb-6 text-dark">Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg border hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">Instant Summaries</h3>
            <p className="text-gray-600">
              Get a summary of any blog article in seconds with powerful AI.
            </p>
          </div>
          <div className="p-6 rounded-lg border hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">Bilingual Support</h3>
            <p className="text-gray-600">
              Summaries available in both English and Urdu.
            </p>
          </div>
          <div className="p-6 rounded-lg border hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">API Access</h3>
            <p className="text-gray-600">
              Integrate our summarization API with your own tools.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
