'use client';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PricingModal({ isOpen, onClose }: PricingModalProps) {
  if (!isOpen) return null;

  const plans = [
    {
      name: 'Free',
      price: '$0',
      description: 'Perfect for individuals getting started',
      features: [
        '5 summaries per day',
        'English & Urdu summaries',
        'Basic AI processing',
        'No credit card required'
      ]
    },
    {
      name: 'Pro',
      price: '$9',
      period: '/month',
      description: 'For power users and professionals',
      features: [
        'Unlimited summaries',
        'Priority processing',
        'Longer content support',
        'Multi-language support',
        'API access'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For businesses and teams',
      features: [
        'Custom volume',
        'Dedicated support',
        'Advanced analytics',
        'White-label options',
        'SLA guarantees'
      ]
    }
  ];

  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Pricing Plans</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className={`bg-gray-50 dark:bg-gray-700 rounded-xl border ${
                  plan.popular 
                    ? 'border-blue-500 dark:border-blue-400 ring-2 ring-blue-500/20 dark:ring-blue-400/20' 
                    : 'border-gray-200 dark:border-gray-600'
                } p-6 flex flex-col h-full`}
              >
                {plan.popular && (
                  <div className="bg-blue-500 dark:bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 self-start">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                  {plan.period && <span className="text-gray-600 dark:text-gray-300">{plan.period}</span>}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round"  strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-200">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  className={`mt-auto w-full py-2 px-4 rounded-lg font-medium ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-500'
                  } transition-colors`}
                >
                  {plan.name === 'Free' ? 'Get Started' : 'Choose Plan'}
                </button>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              All plans include a 14-day money-back guarantee
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Have questions? <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Contact us</a>
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}