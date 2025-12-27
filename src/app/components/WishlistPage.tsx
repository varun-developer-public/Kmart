import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, ArrowLeft, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import Header from './Header';
import Footer from './Footer';
import { toast } from 'sonner';
import { Star } from 'lucide-react';

export default function WishlistPage() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleRemoveFromWishlist = (id: string, name: string) => {
    removeFromWishlist(id);
    toast.success(`${name} removed from wishlist`);
  };

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      description: '',
    });
    toast.success(`${item.name} added to cart!`);
  };

  const handleMoveToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      description: '',
    });
    removeFromWishlist(item.id);
    toast.success(`${item.name} moved to cart!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5ebe0] via-[#e8d7f1] to-[#d4c5f9]">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-3xl md:text-4xl">My Wishlist</h1>
          <span className="text-gray-600">({items.length} {items.length === 1 ? 'item' : 'items'})</span>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
            <Heart className="w-24 h-24 mx-auto mb-4 text-gray-300" />
            <h2 className="text-2xl mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">Save items you love to your wishlist!</p>
            <Button
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black px-8"
            >
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Wishlist Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                >
                  {/* Product Image */}
                  <div 
                    className="relative aspect-square overflow-hidden bg-gray-50 cursor-pointer"
                    onClick={() => navigate(`/product/${item.id}`)}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    
                    {/* Remove from Wishlist Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFromWishlist(item.id, item.name);
                      }}
                      className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-red-50 transition-all group/btn"
                    >
                      <Heart className="w-5 h-5 fill-red-500 text-red-500 group-hover/btn:scale-110 transition-transform" />
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="p-4 space-y-3">
                    <h3 
                      className="text-sm line-clamp-2 min-h-[2.5rem] cursor-pointer hover:text-yellow-600 transition-colors"
                      onClick={() => navigate(`/product/${item.id}`)}
                    >
                      {item.name}
                    </h3>

                    {/* Rating */}
                    {item.rating && (
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(item.rating!) 
                                  ? 'fill-yellow-400 text-yellow-400' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        {item.reviews && (
                          <span className="text-xs text-gray-600">
                            ({item.reviews})
                          </span>
                        )}
                      </div>
                    )}

                    {/* Price */}
                    <div className="space-y-1">
                      {item.originalPrice && (
                        <div className="text-sm text-gray-500 line-through">
                          ₹{item.originalPrice.toLocaleString()}
                        </div>
                      )}
                      <div className="text-xl text-red-600">
                        ₹{item.price.toLocaleString()}
                      </div>
                      {item.originalPrice && (
                        <div className="text-xs text-green-600">
                          Save ₹{(item.originalPrice - item.price).toLocaleString()}
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <Button
                        className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black"
                        onClick={() => handleAddToCart(item)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleRemoveFromWishlist(item.id, item.name)}
                        className="hover:bg-red-50 hover:border-red-300"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Action Buttons */}
            <div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="text-center sm:text-left">
                <p className="text-lg">
                  <span className="font-medium">{items.length}</span> {items.length === 1 ? 'item' : 'items'} in your wishlist
                </p>
                <p className="text-sm text-gray-600">
                  Total Value: ₹{items.reduce((sum, item) => sum + item.price, 0).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <Button
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="flex-1 sm:flex-none"
                >
                  Continue Shopping
                </Button>
                <Button
                  className="flex-1 sm:flex-none bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black"
                  onClick={() => {
                    items.forEach(item => handleAddToCart(item));
                  }}
                >
                  Add All to Cart
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
