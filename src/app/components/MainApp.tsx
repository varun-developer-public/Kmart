import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import HeroSection from './HeroSection';
import StatsSection from './StatsSection';
import CategoriesSection from './CategoriesSection';
import ProductGrid from './ProductGrid';
import DealOfTheDay from './DealOfTheDay';
import MobileNavigation from './MobileNavigation';
import Footer from './Footer';
import NotificationBanner from './NotificationBanner';
import SellerDashboardPreview from './SellerDashboardPreview';
import TrustSection from './TrustSection';
import SpecialOffersCarousel from './SpecialOffersCarousel';
import AppDownloadBanner from './AppDownloadBanner';
import LoginModal from './LoginModal';
import { useAuth } from '../contexts/AuthContext';

export default function MainApp() {
  const navigate = useNavigate();
  const { showLoginModal, setShowLoginModal } = useAuth();

  const handleProductClick = (product: any) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5ebe0] via-[#e8d7f1] to-[#d4c5f9]">
      <NotificationBanner />
      <Header />
      
      <main className="pb-24 md:pb-12">
        <HeroSection />
        <StatsSection />
        <CategoriesSection />
        <SpecialOffersCarousel />
        <ProductGrid 
          title="Best Selling" 
          onProductClick={handleProductClick}
        />
        <DealOfTheDay />
        <ProductGrid 
          title="Best Sellers" 
          showBadge={false}
          onProductClick={handleProductClick}
        />
        <TrustSection />
        <AppDownloadBanner />
        <SellerDashboardPreview />
      </main>

      <Footer />
      <MobileNavigation />

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
}