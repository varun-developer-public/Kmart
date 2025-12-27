import { Smartphone, Star } from 'lucide-react';
import { Button } from './ui/button';

export default function AppDownloadBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8 md:p-12">
          <div className="text-white">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm">4.8 Rating</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl mb-4">
              Download the Parik App
            </h2>
            <p className="text-lg mb-6 text-purple-100">
              Shop on the go! Get exclusive app-only deals, faster checkout, and personalized recommendations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-black hover:bg-gray-900 text-white px-6 py-6 rounded-xl flex items-center justify-center gap-3">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-sm">App Store</div>
                </div>
              </Button>
              
              <Button className="bg-black hover:bg-gray-900 text-white px-6 py-6 rounded-xl flex items-center justify-center gap-3">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="text-sm">Google Play</div>
                </div>
              </Button>
            </div>
          </div>
          
          <div className="relative hidden md:flex justify-center items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-white/10 rounded-[3rem] blur-2xl"></div>
              <Smartphone className="relative w-64 h-64 text-white/20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
