import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

const offers = [
  {
    id: 1,
    title: 'Summer Sale',
    description: 'Up to 70% off on selected items',
    background: 'bg-gradient-to-r from-orange-400 to-pink-500',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800',
  },
  {
    id: 2,
    title: 'Tech Week',
    description: 'Latest gadgets at best prices',
    background: 'bg-gradient-to-r from-blue-500 to-purple-600',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800',
  },
  {
    id: 3,
    title: 'Home Essentials',
    description: 'Transform your space with amazing deals',
    background: 'bg-gradient-to-r from-green-400 to-cyan-500',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800',
  },
];

export default function SpecialOffersCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % offers.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % offers.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + offers.length) % offers.length);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[250px] md:h-[350px]">
        {/* Slides */}
        {offers.map((offer, index) => (
          <div
            key={offer.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            } ${offer.background}`}
          >
            <div className="h-full flex items-center justify-between px-8 md:px-16">
              <div className="text-white max-w-md">
                <h2 className="text-4xl md:text-5xl mb-4">{offer.title}</h2>
                <p className="text-lg md:text-xl mb-6">{offer.description}</p>
                <Button className="bg-white text-black hover:bg-gray-100 px-8 py-6 rounded-full">
                  Shop Now
                </Button>
              </div>
              <div className="hidden md:block w-64 h-64 bg-white/10 rounded-full"></div>
            </div>
          </div>
        ))}

        {/* Navigation Buttons */}
        <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            className="pointer-events-auto bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-sm"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            className="pointer-events-auto bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-sm"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {offers.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
