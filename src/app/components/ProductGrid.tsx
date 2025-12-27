import { Star } from 'lucide-react';
import { Badge } from './ui/badge';

interface ProductGridProps {
  title: string;
  showBadge?: boolean;
  onProductClick?: (product: any) => void;
}

const products = [
  {
    id: 1,
    name: 'True Wireless Earbuds Urban 1',
    image: 'https://images.unsplash.com/photo-1695634463658-52463b8f2209?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGVhcmJ1ZHMlMjB3aGl0ZXxlbnwxfHx8fDE3NjY2ODYyMzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    price: 11100,
    originalPrice: 16466,
    rating: 4.8,
    reviews: 11,
    discount: 32,
  },
  {
    id: 2,
    name: 'Premium Water Bottle Urban Box 2',
    image: 'https://images.unsplash.com/photo-1643373976548-b6e76c05ef44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGJvdHRsZSUyMHBpbmt8ZW58MXx8fHwxNzY2Njg2MjM5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    price: 17500,
    originalPrice: null,
    rating: 4.8,
    reviews: 23,
    discount: null,
  },
  {
    id: 3,
    name: 'Electric Coffee Maker 12 Cups',
    image: 'https://images.unsplash.com/photo-1680539882932-559b099446cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBtYWtlciUyMGJsYWNrfGVufDF8fHx8MTc2NjY4NjI0MHww&ixlib=rb-4.1.0&q=80&w=1080',
    price: 18000,
    originalPrice: 21000,
    rating: 4.8,
    reviews: 47,
    discount: 14,
  },
  {
    id: 4,
    name: 'Happy Perfume for Men, 100 ML',
    image: 'https://images.unsplash.com/photo-1687202163645-8be2de10ba7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwYm90dGxlJTIwb3JhbmdlfGVufDF8fHx8MTc2NjY4NjI0MHww&ixlib=rb-4.1.0&q=80&w=1080',
    price: 23700,
    originalPrice: null,
    rating: 4.8,
    reviews: 5,
    discount: null,
  },
  {
    id: 5,
    name: 'Wireless Earbuds Redmi Buds 4 Lite',
    image: 'https://images.unsplash.com/photo-1597350584914-55bb62285896?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHNuZWFrZXJzfGVufDF8fHx8MTc2NjU5NjAwMHww&ixlib=rb-4.1.0&q=80&w=1080',
    price: 10995,
    originalPrice: 14069,
    rating: 4.8,
    reviews: 73,
    discount: 22,
  },
];

export default function ProductGrid({ title, showBadge = true, onProductClick }: ProductGridProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl mb-6">{title}</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => onProductClick?.(product)}
            className="bg-white rounded-2xl p-4 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:-translate-y-2"
          >
            {/* Badge */}
            {showBadge && product.discount && (
              <Badge className="bg-red-500 text-white mb-2 rounded-md">
                -{product.discount}%
              </Badge>
            )}

            {/* Product Image */}
            <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-gray-50">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-2">
              <h3 className="text-sm line-clamp-2 min-h-[2.5rem]">
                {product.name}
              </h3>

              {/* Price */}
              <div className="space-y-1">
                {product.originalPrice && (
                  <div className="text-sm text-gray-500 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </div>
                )}
                <div className="text-lg text-red-600">
                  ₹{product.price.toLocaleString()}
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-600">
                  {product.rating} ({product.reviews})
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}