import { Package, ShoppingBag, Star } from 'lucide-react';

const stats = [
  {
    icon: Package,
    value: '300,000',
    label: 'Over 300K Stores in India',
    color: 'bg-red-500',
  },
  {
    icon: ShoppingBag,
    value: '750,000',
    label: 'Products',
    color: 'bg-orange-500',
  },
  {
    icon: Star,
    value: 'Excellent',
    label: 'Service',
    color: 'bg-yellow-500',
  },
];

export default function StatsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center gap-4"
          >
            <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}