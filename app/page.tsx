'use client';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles, Globe, Zap, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    englishSummary: string;
    urduSummary: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const summariesRef = useRef<HTMLDivElement>(null);
  
  // Scroll to summaries when they are generated
  useEffect(() => {
    if (result && summariesRef.current) {
      // Small delay to ensure the element is fully rendered
      setTimeout(() => {
        summariesRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  }, [result]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would call your API here:
      // const response = await fetch('/api/summarize', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ url }),
      // });
      
      // For demo purposes, use mock data
      setResult({
        englishSummary: "This article explores the latest advancements in AI technology, focusing on natural language processing. Researchers have developed new models that can understand context better than ever before. These innovations could revolutionize how we interact with technology, making digital assistants more intuitive and helpful. The future looks promising as AI continues to evolve at a rapid pace.",
        urduSummary: "یہ مضمون مصنوعی ذہانت کی تازہ ترین ترقیات پر روشنی ڈالتا ہے، خاص طور پر قدرتی زبان کی پروسیسنگ پر توجہ مرکوز کرتا ہے۔ محققین نے نئے ماڈل تیار کیے ہیں جو پہلے سے کہیں بہتر سیاق و سباق کو سمجھ سکتے ہیں۔ یہ جدتیں انقلاب لا سکتی ہیں کہ ہم ٹیکنالوجی کے ساتھ کیسے تعامل کرتے ہیں، ڈیجیٹل معاونوں کو زیادہ بدیہی اور مددگار بنا سکتے ہیں۔ مستقبل روشن دکھائی دیتا ہے کیونکہ مصنوعی ذہانت تیزی سے ترقی کرتی رہتی ہے۔"
      });
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-[calc(100vh-64px)]">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div 
            className="flex flex-col items-center text-center"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={item} className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Summarize Any Blog in <span className="text-blue-600">Seconds</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Extract key insights from articles instantly with AI-powered summaries in English and Urdu
              </p>
            </motion.div>
            
            <motion.div variants={item} className="w-full max-w-2xl">
              <form onSubmit={handleSubmit} className="mb-8">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com/blog-post"
                    required
                    className="py-5 px-4 text-base border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                  />
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="py-5 px-8 text-base bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    {loading ? (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                      <Sparkles className="mr-2 h-5 w-5" />
                    )}
                    {loading ? 'Processing...' : 'Summarize'}
                  </Button>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Paste the URL of any blog article to get started
                </p>
              </form>
            </motion.div>
            
            <motion.div 
              variants={item}
              className="flex flex-wrap justify-center gap-4"
            >
              {[
                'Free to use',
                'No registration required',
                'Privacy focused',
                'Multi-language support'
              ].map((text, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm"
                >
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-gray-600 dark:text-gray-300">{text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Use Summaraize?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Save time and get to the point with our powerful summarization technology
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="h-6 w-6" />,
                title: "Lightning Fast",
                description: "Get summaries in seconds, not minutes. Our AI processes content at incredible speed."
              },
              {
                icon: <Globe className="h-6 w-6" />,
                title: "Multilingual",
                description: "Receive summaries in both English and Urdu to reach a wider audience."
              },
              {
                icon: <Sparkles className="h-6 w-6" />,
                title: "AI-Powered",
                description: "Advanced algorithms extract key points while preserving the original meaning."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Get your summaries in just three simple steps
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Paste URL",
                description: "Copy and paste the URL of the blog article you want to summarize"
              },
              {
                step: 2,
                title: "AI Processing",
                description: "Our AI analyzes the content and extracts key insights"
              },
              {
                step: 3,
                title: "Get Summary",
                description: "Receive concise summaries in English and Urdu"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold">{step.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      {loading && (
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-6"></div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Processing Your Request</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our AI is analyzing the content and generating summaries
              </p>
            </motion.div>
          </div>
        </section>
      )}
      
      {error && (
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-red-800 dark:text-red-400 mb-2">Something went wrong</h3>
              <p className="text-red-700 dark:text-red-300 mb-4">{error}</p>
              <Button 
                onClick={() => setError(null)}
                className="bg-red-600 hover:bg-red-700"
              >
                Try Again
              </Button>
            </div>
          </div>
        </section>
      )}
      
      {result && (
        <section 
          ref={summariesRef} 
          id="summaries" 
          className="py-16 bg-white dark:bg-gray-900"
        >
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Your Summaries
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                AI-generated summaries of your blog content
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border border-gray-200 dark:border-gray-700 shadow-sm dark:bg-gray-800">
                  <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                    <CardTitle className="flex items-center">
                      <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 px-3 py-1 rounded-full text-sm mr-2">
                        English
                      </span>
                      Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                      {result.englishSummary}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="border border-gray-200 dark:border-gray-700 shadow-sm dark:bg-gray-800">
                  <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                    <CardTitle className="flex items-center">
                      <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-400 px-3 py-1 rounded-full text-sm mr-2">
                        Urdu
                      </span>
                      Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p 
                      className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed whitespace-pre-line urdu-text"
                    >
                      {result.urduSummary}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
            
            <motion.div 
              className="mt-12 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Button 
                variant="outline"
                onClick={() => {
                  setResult(null);
                  setUrl('');
                }}
                className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 dark:border-blue-400 dark:text-blue-400"
              >
                Summarize Another Article
              </Button>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {!result && !loading && (
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Ready to save hours of reading time?
            </motion.h2>
            <motion.p 
              className="text-xl mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Join thousands of professionals who use Summaraize to stay informed without the time commitment.
            </motion.p>
            <motion.div 
              className="flex justify-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-base font-medium">
                Get Started Free
              </Button>
              <Button variant="outline" className="text-white border-white hover:bg-blue-700 px-8 py-4 text-base font-medium">
                View Demo
              </Button>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}