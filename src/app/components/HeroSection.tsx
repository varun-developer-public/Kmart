import hero2 from '../../assets/hero2.png';
import { Button } from './ui/button';
import { ArrowRight, Tag, Truck, Shield } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_50%)]"></div>
        
        {/* Decorative circles */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-yellow-200/40 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-gradient-to-br from-orange-300/30 to-transparent rounded-full blur-2xl"></div>

        <div className="relative z-10 px-4 md:px-8 py-6 md:py-8 flex flex-col md:flex-row items-center justify-between gap-6 h-100">
          {/* Left Side - Promotional Content */}
          <div className="flex-1 max-w-lg">
            <div className="inline-flex items-center gap-2 bg-black/10 backdrop-blur-sm px-3 py-1.5 rounded-full mb-4">
              <Tag className="w-3.5 h-3.5 text-black" />
              <span className="text-xs font-medium text-black">Limited Time Offer</span>
            </div>

            <h1 className="text-3xl md:text-4xl mb-3 text-black leading-tight">
              The Perfect Gift<br />
              <span className="text-black/90">You'll Find Here</span>
            </h1>
            
            <p className="text-base md:text-lg mb-6 text-black/80 max-w-md">
              Discover amazing deals on premium products. Shop now and save up to 50% on selected items!
            </p>
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Button 
                className="bg-black text-white hover:bg-gray-800 px-6 py-4 rounded-full shadow-xl text-base h-auto group"
              >
                Shop Now
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline"
                className="bg-white/90 text-black hover:bg-white border-2 border-black/20 px-6 py-4 rounded-full shadow-lg text-base h-auto backdrop-blur-sm"
              >
                View All Deals
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                <Truck className="w-4 h-4 text-black" />
                <span className="text-xs font-medium text-black">Free Delivery</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                <Shield className="w-4 h-4 text-black" />
                <span className="text-xs font-medium text-black">Secure Payment</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                <Tag className="w-4 h-4 text-black" />
                <span className="text-xs font-medium text-black">Best Prices</span>
              </div>
            </div>
          </div>

          {/* Right Side - Large Product Image */}
          <div className="flex-1 relative flex items-end justify-center md:justify-end">
            <div className="relative w-full max-w-xs md:max-w-sm">
              {/* Animated glow effect behind person */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-300/50 via-yellow-200/50 to-pink-300/50 blur-3xl rounded-full scale-110 animate-glow"></div>
              
              {/* Product Image */}
              <img 
                src={hero2}
                alt="Happy woman with gift" 
                className="relative z-10 w-full h-full object-cover object-bottom animate-float scale-78"
              />
              
              {/* Floating badge */}
              <div className="absolute top-20 right-2 bg-red-500 text-white px-4 py-2 rounded-full shadow-xl transform rotate-12 z-20">
                <span className="text-base font-bold">50% OFF</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes glow {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
