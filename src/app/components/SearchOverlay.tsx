import { useState } from 'react';
import { Search, X, TrendingUp, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface SearchOverlayProps {
  onClose: () => void;
}

const trendingSearches = [
  'Wireless Earbuds',
  'Laptop',
  'Smartwatch',
  'Coffee Maker',
  'Running Shoes',
];

const recentSearches = [
  'iPhone 15',
  'Gaming Mouse',
  'Bluetooth Speaker',
];

export default function SearchOverlay({ onClose }: SearchOverlayProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="bg-white min-h-screen md:min-h-0 md:max-w-2xl md:mx-auto md:mt-20 md:rounded-3xl shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 p-4 border-b md:rounded-t-3xl">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-6 rounded-full border-gray-300 focus:border-yellow-400"
                autoFocus
              />
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
              <X className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Trending Searches */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg">Trending Searches</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {trendingSearches.map((term, index) => (
                <button
                  key={index}
                  className="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-yellow-100 transition-colors"
                  onClick={() => setSearchQuery(term)}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Recent Searches */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg">Recent Searches</h3>
            </div>
            <div className="space-y-2">
              {recentSearches.map((term, index) => (
                <button
                  key={index}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between group"
                  onClick={() => setSearchQuery(term)}
                >
                  <span>{term}</span>
                  <Search className="w-4 h-4 text-gray-400 group-hover:text-yellow-500" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
