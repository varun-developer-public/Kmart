import { useState } from 'react';
import { X, Heart, Share2, Star, Minus, Plus, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';

interface ProductDetailModalProps {
  product: any;
  onClose: () => void;
}

export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id || `${product.name}-${Date.now()}`,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
      });
    }
    toast.success(`${quantity} ${quantity === 1 ? 'item' : 'items'} added to cart!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 p-0 md:p-4">
      <div className="bg-white w-full max-w-md md:max-w-2xl rounded-t-3xl md:rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Mobile Header */}
        <div className="sticky top-0 bg-white z-10 px-4 py-4 border-b flex items-center justify-between md:hidden">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-6 h-6" />
          </Button>
          <h2 className="text-lg">Product Details</h2>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <Heart className="w-6 h-6" />
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl">Product Details</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-6 h-6" />
          </Button>
        </div>

        <div className="p-6">
          {/* Product Image */}
          <div className="relative mb-6">
            {product.discount && (
              <Badge className="absolute top-4 left-4 bg-red-500 text-white rounded-md z-10">
                Deal
              </Badge>
            )}
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image Dots Indicator */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    selectedImage === index ? 'bg-black w-6' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <div className="mt-4 text-center">
              <button className="text-blue-600 text-sm">Watch Video ▶</button>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <h3 className="text-xl">{product.name}</h3>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm">
                {product.rating} ({product.reviews})
              </span>
            </div>

            {/* Price */}
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl text-red-600">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <div className="text-sm text-gray-600">
                +₹20 shipping
              </div>
              <div className="text-sm text-green-600">
                Available
              </div>
            </div>

            {/* Quantity Selector - Desktop */}
            <div className="hidden md:flex items-center gap-4 py-4">
              <span className="text-sm">Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-6">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 10}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex gap-3">
              <Button 
                className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black py-6"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" size="icon" className="w-12 h-12">
                <Heart className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Bar */}
        <div className="md:hidden sticky bottom-0 bg-white border-t p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center border rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="h-10 w-10"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="px-4">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= 10}
                className="h-10 w-10"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <Button 
              className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black py-6"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}