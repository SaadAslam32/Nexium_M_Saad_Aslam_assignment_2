import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-16 bg-primary text-white text-center">
      <div className="container">
        <h2 className="text-3xl font-bold mb-4">Start Summarizing Now</h2>
        <p className="mb-6">Save time and get key insights instantly.</p>
        <Link
          href="#"
          className="inline-block px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
}
