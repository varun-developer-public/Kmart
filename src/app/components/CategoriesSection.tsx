import { Smartphone, Headphones, Watch, Laptop, Monitor, Shirt, Home, Baby } from 'lucide-react';
import { useRef } from 'react';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const categories = [
  { name: 'Mobile Phones', icon: Smartphone, color: 'bg-purple-100' },
  { name: 'Headphones', icon: Headphones, color: 'bg-gray-100' },
  { name: 'Smartwatches', icon: Watch, color: 'bg-gray-100' },
  { name: 'Laptops', icon: Laptop, color: 'bg-blue-100' },
  { name: 'Displays', icon: Monitor, color: 'bg-blue-100' },
  { name: "Men's", icon: Shirt, color: 'bg-orange-100' },
  { name: "Women's", icon: Shirt, color: 'bg-pink-100' },
  { name: 'Kids', icon: Baby, color: 'bg-green-100' },
  { name: 'Home Appliances', icon: Home, color: 'bg-yellow-100' },
];

export default function CategoriesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl">Popular Categories</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('left')}
            className="rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('right')}
            className="rounded-full"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-3 cursor-pointer group flex-shrink-0"
          >
            <div className={`${category.color} w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
              <category.icon className="w-10 h-10 md:w-14 md:h-14 text-gray-700" />
            </div>
            <span className="text-sm text-center max-w-[100px]">{category.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}