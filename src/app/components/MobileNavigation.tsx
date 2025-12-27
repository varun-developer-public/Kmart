import { Home, Search, ShoppingCart, User, Heart } from 'lucide-react';
import { Badge } from './ui/badge';

export default function MobileNavigation() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg">
      <div className="flex items-center justify-around py-3 px-2">
        <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-yellow-500 transition-colors">
          <Home className="w-6 h-6" />
          <span className="text-xs">Home</span>
        </button>
        
        <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-yellow-500 transition-colors">
          <Search className="w-6 h-6" />
          <span className="text-xs">Search</span>
        </button>
        
        <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-yellow-500 transition-colors relative">
          <ShoppingCart className="w-6 h-6" />
          <span className="text-xs">Cart</span>
          <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-red-500 text-white rounded-full text-xs">
            0
          </Badge>
        </button>
        
        <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-yellow-500 transition-colors">
          <Heart className="w-6 h-6" />
          <span className="text-xs">Wishlist</span>
        </button>
        
        <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-yellow-500 transition-colors">
          <User className="w-6 h-6" />
          <span className="text-xs">Account</span>
        </button>
      </div>
    </div>
  );
}
