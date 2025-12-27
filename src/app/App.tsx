import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import LanguageSelection from './components/LanguageSelection';
import MainApp from './components/MainApp';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import OrderConfirmation from './components/OrderConfirmation';
import OrderTracking from './components/OrderTracking';
import ProductPage from './components/ProductPage';
import WishlistPage from './components/WishlistPage';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { WishlistProvider } from './contexts/WishlistContext';

export default function App() {
  const [showLanguageSelection, setShowLanguageSelection] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    setShowLanguageSelection(false);
  };

  // Show language selection after first login
  if (showLanguageSelection) {
    return <LanguageSelection onLanguageSelect={handleLanguageSelect} />;
  }

  // Show main app by default (no login required)
  return (
    <BrowserRouter>
      <AuthProvider onFirstLogin={() => setShowLanguageSelection(true)}>
        <WishlistProvider>
          <CartProvider>
            <Toaster position="top-right" richColors />
            <Routes>
              <Route path="/" element={<MainApp />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
              <Route path="/order-tracking/:orderId" element={<OrderTracking />} />
              <Route path="/product/:productId" element={<ProductPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}