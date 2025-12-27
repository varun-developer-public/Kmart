import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, Star, Minus, Plus, ShoppingCart, Truck, Shield, RotateCcw, StarIcon, Camera, Upload, X } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { toast } from 'sonner';
import Header from './Header';
import Footer from './Footer';

// Mock product data - in real app this would come from API
const productsData = [
  {
    id: '1',
    name: 'True Wireless Earbuds Urban 1',
    image: 'https://images.unsplash.com/photo-1695634463658-52463b8f2209?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGVhcmJ1ZHMlMjB3aGl0ZXxlbnwxfHx8fDE3NjY2ODYyMzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1695634463658-52463b8f2209?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGVhcmJ1ZHMlMjB3aGl0ZXxlbnwxfHx8fDE3NjY2ODYyMzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800',
      'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800',
    ],
    price: 11100,
    originalPrice: 16466,
    rating: 4.8,
    reviews: 11,
    discount: 32,
    description: 'Experience premium sound quality with these True Wireless Earbuds. Featuring active noise cancellation, touch controls, and up to 24 hours of battery life with the charging case.',
    features: [
      'Active Noise Cancellation',
      'Touch Controls',
      'IPX4 Water Resistance',
      '24 Hours Battery Life',
      'Fast Charging - 10min = 2hrs',
      'Bluetooth 5.2',
    ],
    inStock: true,
  },
  {
    id: '2',
    name: 'Premium Water Bottle Urban Box 2',
    image: 'https://images.unsplash.com/photo-1643373976548-b6e76c05ef44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGJvdHRsZSUyMHBpbmt8ZW58MXx8fHwxNzY2Njg2MjM5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1643373976548-b6e76c05ef44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGJvdHRsZSUyMHBpbmt8ZW58MXx8fHwxNzY2Njg2MjM5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800',
      'https://images.unsplash.com/photo-1553835973-dec43bfddbeb?w=800',
    ],
    price: 17500,
    originalPrice: null,
    rating: 4.8,
    reviews: 23,
    discount: null,
    description: 'Stay hydrated in style with this premium insulated water bottle. Keeps drinks cold for 24 hours or hot for 12 hours.',
    features: [
      'Double Wall Insulation',
      'BPA Free',
      '750ml Capacity',
      'Leak Proof Design',
      'Easy Grip',
      'Dishwasher Safe',
    ],
    inStock: true,
  },
  {
    id: '3',
    name: 'Electric Coffee Maker 12 Cups',
    image: 'https://images.unsplash.com/photo-1680539882932-559b099446cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBtYWtlciUyMGJsYWNrfGVufDF8fHx8MTc2NjY4NjI0MHww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1680539882932-559b099446cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBtYWtlciUyMGJsYWNrfGVufDF8fHx8MTc2NjY4NjI0MHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
    ],
    price: 18000,
    originalPrice: 21000,
    rating: 4.8,
    reviews: 47,
    discount: 14,
    description: 'Brew perfect coffee every time with this 12-cup electric coffee maker. Features programmable timer and auto shut-off.',
    features: [
      '12 Cup Capacity',
      'Programmable Timer',
      'Auto Shut-off',
      'Anti-Drip Function',
      'Permanent Filter',
      'Keep Warm Function',
    ],
    inStock: true,
  },
  {
    id: '4',
    name: 'Happy Perfume for Men, 100 ML',
    image: 'https://images.unsplash.com/photo-1687202163645-8be2de10ba7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwYm90dGxlJTIwb3JhbmdlfGVufDF8fHx8MTc2NjY4NjI0MHww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1687202163645-8be2de10ba7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwYm90dGxlJTIwb3JhbmdlfGVufDF8fHx8MTc2NjY4NjI0MHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800',
      'https://images.unsplash.com/photo-1588405748880-12d1d2a59c75?w=800',
    ],
    price: 23700,
    originalPrice: null,
    rating: 4.8,
    reviews: 5,
    discount: null,
    description: 'A fresh and uplifting fragrance for men. Perfect for everyday wear with long-lasting notes.',
    features: [
      '100 ML Bottle',
      'Long Lasting',
      'Fresh Citrus Notes',
      'Woody Base',
      'Gift Box Included',
      'Cruelty Free',
    ],
    inStock: true,
  },
  {
    id: '5',
    name: 'Wireless Earbuds Redmi Buds 4 Lite',
    image: 'https://images.unsplash.com/photo-1597350584914-55bb62285896?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHNuZWFrZXJzfGVufDF8fHx8MTc2NjU5NjAwMHww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1597350584914-55bb62285896?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHNuZWFrZXJzfGVufDF8fHx8MTc2NjU5NjAwMHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800',
    ],
    price: 10995,
    originalPrice: 14069,
    rating: 4.8,
    reviews: 73,
    discount: 22,
    description: 'Affordable wireless earbuds with great sound quality. Lightweight and comfortable for all-day wear.',
    features: [
      'Lightweight Design',
      '20 Hours Total Playback',
      'Quick Pairing',
      'Touch Controls',
      'Voice Assistant Support',
      'Type-C Charging',
    ],
    inStock: true,
  },
];

// Mock reviews data
const mockReviews = [
  {
    id: 1,
    userName: 'Rahul Sharma',
    rating: 5,
    date: '2 days ago',
    comment: 'Excellent product! The quality is amazing and it exceeded my expectations. Highly recommended!',
    verified: true,
  },
  {
    id: 2,
    userName: 'Priya Patel',
    rating: 4,
    date: '1 week ago',
    comment: 'Very good product. Works as described. Fast delivery and well packaged.',
    verified: true,
  },
  {
    id: 3,
    userName: 'Amit Kumar',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Best purchase ever! The features are great and the price is reasonable. Worth every rupee!',
    verified: true,
  },
  {
    id: 4,
    userName: 'Sneha Reddy',
    rating: 4,
    date: '3 weeks ago',
    comment: 'Good quality product. Minor issue with delivery but customer service was very helpful.',
    verified: false,
  },
  {
    id: 5,
    userName: 'Vikram Singh',
    rating: 5,
    date: '1 month ago',
    comment: 'Outstanding! Exactly what I was looking for. Will definitely buy again.',
    verified: true,
  },
];

export default function ProductPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState<any>(null);
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [showTryOnModal, setShowTryOnModal] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [comparisonImage, setComparisonImage] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Find product by ID
    const foundProduct = productsData.find(p => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      // If product not found, redirect to home
      navigate('/');
    }
  }, [productId, navigate]);

  if (!product) {
    return null;
  }

  const inWishlist = isInWishlist(product.id);

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
      });
    }
    toast.success(`${quantity} ${quantity === 1 ? 'item' : 'items'} added to cart!`);
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        originalPrice: product.originalPrice,
        rating: product.rating,
        reviews: product.reviews,
      });
      toast.success('Added to wishlist');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} on Parik`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const handleTryOn = () => {
    setShowTryOnModal(true);
    setCameraError(false);
    setComparisonImage(null);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraActive(true);
        setCameraError(false);
      }
    } catch (error) {
      console.error('Camera error:', error);
      setCameraError(true);
      setIsCameraActive(false);
      
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          toast.error('Camera access denied. Please allow camera permissions or upload an image.');
        } else if (error.name === 'NotFoundError') {
          toast.error('No camera found on this device. Please upload an image instead.');
        } else if (error.name === 'NotReadableError') {
          toast.error('Camera is already in use by another application.');
        } else {
          toast.error('Unable to access camera. Please try uploading an image.');
        }
      }
    }
  };

  const handleUpload = () => {
    const input = fileInputRef.current;
    if (input) {
      input.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (typeof result === 'string') {
          setComparisonImage(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTryOnClose = () => {
    setShowTryOnModal(false);
    const stream = streamRef.current;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
    }
    setComparisonImage(null);
    setCameraError(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5ebe0] via-[#e8d7f1] to-[#d4c5f9]">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-12">
            {/* Left Side - Images */}
            <div className="space-y-4">
              {/* Main Image with Zoom */}
              <div className="relative">
                <div 
                  className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 cursor-crosshair"
                  onMouseEnter={() => setShowZoom(true)}
                  onMouseLeave={() => setShowZoom(false)}
                  onMouseMove={handleMouseMove}
                >
                  {product.discount && (
                    <Badge className="absolute top-4 left-4 bg-red-500 text-white rounded-md z-10 px-3 py-1">
                      -{product.discount}% OFF
                    </Badge>
                  )}
                  
                  {/* AR Try-On Button */}
                  <Button
                    onClick={handleTryOn}
                    className="absolute top-4 right-4 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white rounded-full px-4 py-2 shadow-lg z-10 flex items-center gap-2"
                    size="sm"
                  >
                    <Camera className="w-4 h-4" />
                    <span className="text-sm">Try On</span>
                  </Button>
                  
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Zoomed View - Appears on right side when hovering */}
                {showZoom && (
                  <div className="hidden lg:block absolute left-full top-0 ml-4 w-96 h-96 rounded-2xl overflow-hidden border-2 border-gray-200 shadow-2xl bg-white z-20">
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundImage: `url(${product.images[selectedImage]})`,
                        backgroundSize: '250%',
                        backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                        backgroundRepeat: 'no-repeat',
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-3 gap-4">
                {product.images.map((img: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-yellow-500 ring-2 ring-yellow-200' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl">
                  <Truck className="w-8 h-8 text-blue-600 mb-2" />
                  <span className="text-xs">Free Delivery</span>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl">
                  <Shield className="w-8 h-8 text-green-600 mb-2" />
                  <span className="text-xs">1 Year Warranty</span>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl">
                  <RotateCcw className="w-8 h-8 text-orange-600 mb-2" />
                  <span className="text-xs">7 Days Return</span>
                </div>
              </div>
            </div>

            {/* Right Side - Details */}
            <div className="space-y-6">
              {/* Product Title */}
              <div>
                <h1 className="text-3xl lg:text-4xl mb-3">{product.name}</h1>
                
                {/* Rating */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating) 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl text-red-600">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-2xl text-gray-500 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                  {product.discount && (
                    <span className="text-lg text-green-600">
                      Save {product.discount}%
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  Inclusive of all taxes
                </p>
                <p className="text-sm text-green-600 font-medium">
                  {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                </p>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xl mb-2">Description</h3>
                <p className="text-gray-700">{product.description}</p>
              </div>

              {/* Key Features */}
              <div>
                <h3 className="text-xl mb-3">Key Features</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {product.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700">
                      <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 py-4 border-y">
                <span className="text-lg">Quantity:</span>
                <div className="flex items-center border-2 rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="h-12 w-12"
                  >
                    <Minus className="w-5 h-5" />
                  </Button>
                  <span className="px-8 text-xl">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 10}
                    className="h-12 w-12"
                  >
                    <Plus className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button 
                  className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black text-lg py-6"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className={`w-14 h-14 ${inWishlist ? 'bg-red-50 border-red-300' : ''}`}
                  onClick={handleWishlistToggle}
                >
                  <Heart className={`w-6 h-6 ${inWishlist ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-14 h-14"
                  onClick={handleShare}
                >
                  <Share2 className="w-6 h-6" />
                </Button>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="border-t bg-gray-50 p-6 lg:p-12">
            <h2 className="text-2xl lg:text-3xl mb-6">Customer Reviews</h2>
            
            {/* Rating Summary */}
            <div className="bg-white rounded-2xl p-6 mb-6 flex flex-col md:flex-row gap-6 items-center">
              <div className="text-center">
                <div className="text-5xl mb-2">{product.rating}</div>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600">{product.reviews} reviews</p>
              </div>
              
              <div className="flex-1 space-y-2 w-full">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center gap-3">
                    <span className="text-sm w-12">{stars} star</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{ width: `${stars === 5 ? 70 : stars === 4 ? 20 : 5}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">
                      {stars === 5 ? 70 : stars === 4 ? 20 : 5}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-4">
              {mockReviews.map((review) => (
                <div key={review.id} className="bg-white rounded-2xl p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{review.userName}</h4>
                        {review.verified && (
                          <Badge className="bg-green-100 text-green-700 text-xs">
                            Verified Purchase
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating 
                                  ? 'fill-yellow-400 text-yellow-400' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Try On Modal */}
      {showTryOnModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Try On Product</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleTryOnClose}
                className="hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Camera/Upload Side */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-900">
                {!isCameraActive && !comparisonImage && (
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col items-center justify-center gap-4 p-8">
                    <div className="w-20 h-20 rounded-full bg-cyan-500/20 flex items-center justify-center">
                      <Camera className="w-10 h-10 text-cyan-400" />
                    </div>
                    <div className="text-center space-y-2">
                      <p className="text-white font-medium">Camera Not Active</p>
                      <p className="text-gray-400 text-sm max-w-xs">
                        Click the camera button below to start or upload an image to compare
                      </p>
                    </div>
                  </div>
                )}
                {isCameraActive && !comparisonImage && (
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    autoPlay
                    playsInline
                  />
                )}
                {comparisonImage && (
                  <div className="w-full h-full relative">
                    <img
                      src={comparisonImage}
                      alt="Uploaded comparison"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      ✓ Your Image
                    </div>
                  </div>
                )}
                {cameraError && (
                  <div className="absolute inset-0 bg-gradient-to-br from-red-900 to-gray-900 flex flex-col items-center justify-center gap-4 p-8">
                    <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                      <Camera className="w-10 h-10 text-red-400" />
                    </div>
                    <div className="text-center space-y-2">
                      <p className="text-red-300 font-medium">Camera Access Denied</p>
                      <p className="text-gray-400 text-sm max-w-xs">
                        Please enable camera permissions or upload an image instead
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Product Side */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50">
                <img
                  src={product.images[selectedImage]}
                  alt="Product"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-medium">
                  Product Image
                </div>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-center gap-3">
              <Button
                onClick={startCamera}
                disabled={isCameraActive}
                className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white px-6 py-6 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Camera className="w-5 h-5 mr-2" />
                {isCameraActive ? 'Camera Active' : 'Start Camera'}
              </Button>
              <Button
                onClick={handleUpload}
                variant="outline"
                className="px-6 py-6 rounded-full border-2"
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload Image
              </Button>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}