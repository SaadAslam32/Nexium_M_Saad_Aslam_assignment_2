// app/components/Header.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-8 h-8 rounded-lg" />
          <Link href="/" className="text-xl font-bold text-gray-900">Summaraize</Link>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
            Features
          </Link>
          <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
            How It Works
          </Link>
          <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
            Pricing
          </Link>
          <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
            API
          </Link>
        </nav>
        
        <div className="flex items-center space-x-3">
          <Button variant="ghost" className="text-gray-600 hover:bg-gray-100">
            Sign In
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}