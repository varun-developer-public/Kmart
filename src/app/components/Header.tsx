import { Search, User, Heart, ShoppingCart, Menu, Star, Phone, LogOut, ChevronDown, Globe, Camera, Upload, X } from 'lucide-react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from './LoginModal';
import logo from 'figma:asset/e9a08efa76ab6f92d8722dc30ba6a6f878d31c96.png';
import { toast } from 'sonner';

const categories = [
  'Menu',
  'Bedding & Mattresses',
  'TV, Audio & Smart Home',
  'Office & Printing',
  'Home',
  'Sports & Gaming',
  'Stationery',
  'More',
  'Toys',
  'Deals',
];

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी (Hindi)' },
  { code: 'es', name: 'Español (Spanish)' },
  { code: 'fr', name: 'Français (French)' },
  { code: 'de', name: 'Deutsch (German)' },
  { code: 'zh', name: '中文 (Chinese)' },
  { code: 'ja', name: '日本語 (Japanese)' },
  { code: 'ar', name: 'العربية (Arabic)' },
  { code: 'pt', name: 'Português (Portuguese)' },
  { code: 'ru', name: 'Русский (Russian)' },
];

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { getTotalItems } = useCart();
  const { getTotalItems: getTotalWishlistItems } = useWishlist();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, setShowLoginModal } = useAuth();

  const handleCameraClick = () => {
    setShowCameraModal(true);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageUrl = event.target?.result as string;
          setCapturedImage(imageUrl);
          setShowCameraModal(true);
          toast.success('Image uploaded! Searching for similar products...');
          // Simulate image search
          setTimeout(() => {
            toast.info('Found 12 similar products');
          }, 1500);
        };
        reader.readAsDataURL(file);
      } else {
        toast.error('Please upload a valid image file');
      }
    }
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
          toast.error('Camera access denied. Please allow camera permissions in your browser settings.');
        } else if (error.name === 'NotFoundError') {
          toast.error('No camera found on this device.');
        } else if (error.name === 'NotReadableError') {
          toast.error('Camera is already in use by another application.');
        } else {
          toast.error('Unable to access camera. Please check your device settings.');
        }
      }
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageUrl = canvas.toDataURL('image/png');
        setCapturedImage(imageUrl);
        stopCamera();
        toast.success('Photo captured! Searching for similar products...');
        // Simulate image search
        setTimeout(() => {
          toast.info('Found 8 similar products');
        }, 1500);
      }
    }
  };

  const closeModal = () => {
    stopCamera();
    setShowCameraModal(false);
    setCapturedImage(null);
    setCameraError(false);
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setCameraError(false);
    startCamera();
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      {/* Top Bar */}
      <div className="bg-black text-white px-4 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <span>Service 4.8 of 5</span>
              <div className="flex items-center ml-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>Call us 11 PM 4100-7676</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-yellow-400 transition-colors">Favorites</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">Parik Business</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">Membership GO</a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="px-4 py-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-6 h-6" />
          </Button>

          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer flex items-center gap-2" onClick={() => navigate('/')}>
            <h1 className="text-2xl md:text-3xl">Parik</h1>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl relative">
            <Input
              type="text"
              placeholder="Search in Parik"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full pr-32 pl-6 py-6 border-gray-300 focus:border-yellow-400"
            />
            <div className="absolute right-14 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
              <Button 
                size="icon"
                variant="ghost"
                onClick={handleCameraClick}
                className="rounded-full hover:bg-gray-100 w-9 h-9"
                title="Search by camera"
              >
                <Camera className="w-5 h-5 text-gray-600" />
              </Button>
              <Button 
                size="icon"
                variant="ghost"
                onClick={handleUploadClick}
                className="rounded-full hover:bg-gray-100 w-9 h-9"
                title="Upload image"
              >
                <Upload className="w-5 h-5 text-gray-600" />
              </Button>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleFileUpload}
              />
            </div>
            <Button 
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full bg-cyan-500 hover:bg-cyan-600 w-10 h-10"
            >
              <Search className="w-5 h-5 text-white" />
            </Button>
          </div>

          {/* Search Icon for Mobile */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="w-6 h-6" />
          </Button>

          {/* Action Icons */}
          <div className="flex items-center gap-1">
            {/* Language Selector */}
            <div className="relative hidden md:block">
              <Button 
                variant="ghost" 
                className="flex items-center gap-1 h-auto py-2 px-3"
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              >
                <Globe className="w-5 h-5" />
                <span className="text-sm font-medium">{selectedLanguage.toUpperCase()}</span>
                <ChevronDown className="w-4 h-4" />
              </Button>

              {/* Language Dropdown Menu */}
              {showLanguageMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowLanguageMenu(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 shadow-lg rounded-xl z-50 overflow-hidden max-h-96 overflow-y-auto">
                    <div className="p-2 bg-gradient-to-br from-yellow-50 to-purple-50 border-b border-gray-200">
                      <p className="text-sm font-medium px-2 py-1">Select Language</p>
                    </div>
                    
                    <div className="py-1">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          className={`w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center justify-between transition-colors ${
                            selectedLanguage === lang.code ? 'bg-yellow-50 text-yellow-700' : ''
                          }`}
                          onClick={() => {
                            setSelectedLanguage(lang.code);
                            setShowLanguageMenu(false);
                          }}
                        >
                          <span className="text-sm">{lang.name}</span>
                          {selectedLanguage === lang.code && (
                            <span className="text-yellow-500 text-lg">✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* User Account Area */}
            {!isAuthenticated ? (
              <Button 
                variant="ghost" 
                className="hidden md:flex flex-col items-center h-auto py-2 px-3"
                onClick={() => setShowLoginModal(true)}
              >
                <User className="w-5 h-5" />
                <span className="text-xs mt-1">Sign In</span>
              </Button>
            ) : (
              <div className="relative">
                <Button 
                  variant="ghost" 
                  className="hidden md:flex items-center gap-2 h-auto py-2 px-3"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center text-white">
                      {user?.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">{user?.name}</span>
                    <span className="text-xs text-gray-500">My Account</span>
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </Button>

                {/* User Dropdown Menu */}
                {showUserMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowUserMenu(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 shadow-lg rounded-xl z-50 overflow-hidden">
                      <div className="p-4 bg-gradient-to-br from-yellow-50 to-purple-50 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                          {user?.avatar ? (
                            <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full" />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center text-white text-xl">
                              {user?.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{user?.name}</p>
                            <p className="text-xs text-gray-600 truncate">
                              {user?.email || user?.phone}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="py-2">
                        <button
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 transition-colors"
                          onClick={() => {
                            setShowUserMenu(false);
                            navigate('/orders');
                          }}
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span className="text-sm">My Orders</span>
                        </button>
                        <button
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 transition-colors"
                          onClick={() => {
                            setShowUserMenu(false);
                            navigate('/wishlist');
                          }}
                        >
                          <Heart className="w-4 h-4" />
                          <span className="text-sm">My Wishlist</span>
                        </button>
                      </div>

                      <div className="border-t border-gray-200 py-2">
                        <button
                          className="w-full px-4 py-2 text-left hover:bg-red-50 flex items-center gap-3 transition-colors text-red-600"
                          onClick={() => {
                            logout();
                            setShowUserMenu(false);
                          }}
                        >
                          <LogOut className="w-4 h-4" />
                          <span className="text-sm">Logout</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            <Button 
              variant="ghost" 
              className="relative hidden md:flex flex-col items-center h-auto py-2 px-3"
              onClick={() => navigate('/wishlist')}
            >
              <Heart className="w-5 h-5" />
              <span className="text-xs mt-1">Wishlist</span>
              {getTotalWishlistItems() > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-red-500 text-white rounded-full text-xs">
                  {getTotalWishlistItems()}
                </Badge>
              )}
            </Button>
            <Button 
              variant="ghost" 
              className="relative flex flex-col items-center h-auto py-2 px-3"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="text-xs mt-1 hidden md:block">Cart</span>
              <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-red-500 text-white rounded-full text-xs">
                {getTotalItems()}
              </Badge>
            </Button>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="border-b border-gray-200 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-1 py-3 min-w-max">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant="ghost"
                className="rounded-full px-4 py-2 whitespace-nowrap hover:bg-gray-100 text-sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Camera Modal */}
      {showCameraModal && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-20 p-4">
          <div 
            className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-300"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white z-10 rounded-t-2xl">
              <h3 className="text-xl font-semibold">Visual Search</h3>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-500 hover:bg-gray-100 rounded-full"
                onClick={closeModal}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="p-4">
              <div className="relative bg-gray-900 rounded-xl overflow-hidden">
                {!capturedImage && isCameraActive && (
                  <video 
                    ref={videoRef} 
                    className="w-full h-80 object-cover"
                    autoPlay
                    playsInline
                  />
                )}
                {!capturedImage && !isCameraActive && !cameraError && (
                  <div className="w-full h-80 bg-gradient-to-br from-yellow-50 via-purple-50 to-cyan-50 flex flex-col items-center justify-center gap-6 p-8">
                    <div className="text-center space-y-3">
                      <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center">
                        <Camera className="w-10 h-10 text-white" />
                      </div>
                      <h4 className="text-xl font-semibold text-gray-800">Search by Image</h4>
                      <p className="text-gray-600 text-sm max-w-xs">
                        Take a photo or upload an image to find similar products
                      </p>
                    </div>
                    
                    <div className="flex flex-col gap-3 w-full max-w-xs">
                      <Button 
                        onClick={startCamera}
                        className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black py-6 rounded-full w-full"
                      >
                        <Camera className="w-5 h-5 mr-2" />
                        Open Camera
                      </Button>
                      <Button 
                        onClick={handleUploadClick}
                        variant="outline"
                        className="py-6 rounded-full w-full border-2 hover:bg-gray-50"
                      >
                        <Upload className="w-5 h-5 mr-2" />
                        Upload Image
                      </Button>
                    </div>
                  </div>
                )}
                {!capturedImage && !isCameraActive && cameraError && (
                  <div className="w-full h-80 bg-gradient-to-br from-red-900 to-gray-900 flex flex-col items-center justify-center gap-4 p-8">
                    <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                      <Camera className="w-10 h-10 text-red-400" />
                    </div>
                    <div className="text-center space-y-2">
                      <p className="text-red-300 font-medium">Camera Access Denied</p>
                      <p className="text-gray-400 text-sm max-w-xs">
                        Please enable camera permissions in your browser settings and try again, or upload an image instead.
                      </p>
                    </div>
                  </div>
                )}
                {capturedImage && (
                  <div className="w-full h-80">
                    <img 
                      src={capturedImage} 
                      alt="Captured" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </div>

              {!capturedImage && isCameraActive && !cameraError && (
                <p className="text-center text-gray-600 text-sm mt-4">
                  Position the product in the frame and capture
                </p>
              )}

              {capturedImage && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 text-sm text-center">
                    ✓ Image captured! We're searching for similar products...
                  </p>
                </div>
              )}

              {!capturedImage && cameraError && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800 text-sm text-center">
                    💡 Tip: You can still upload an image from your device to search for products
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-center gap-3 p-4 border-t border-gray-200 bg-gray-50">
              {!capturedImage && isCameraActive && (
                <Button 
                  onClick={capturePhoto}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black px-8 py-6 rounded-full"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Capture Photo
                </Button>
              )}

              {capturedImage && (
                <>
                  <Button 
                    onClick={retakePhoto}
                    variant="outline"
                    className="px-6 py-6 rounded-full"
                  >
                    <Camera className="w-5 h-5 mr-2" />
                    Retake
                  </Button>
                  <Button 
                    onClick={closeModal}
                    className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white px-8 py-6 rounded-full"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Search Products
                  </Button>
                </>
              )}

              <Button 
                onClick={handleUploadClick}
                variant="outline"
                className="px-6 py-6 rounded-full"
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload Image
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}