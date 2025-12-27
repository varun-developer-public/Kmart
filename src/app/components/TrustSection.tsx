import { Shield, Truck, RefreshCcw, Headphones, Lock, CreditCard } from 'lucide-react';

const trustFeatures = [
  {
    icon: Shield,
    title: 'Secure Payments',
    description: 'Bank-level encryption for all transactions',
    color: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Track your order in real-time',
    color: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    icon: RefreshCcw,
    title: 'Easy Returns',
    description: '30-day hassle-free return policy',
    color: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Always here to help you',
    color: 'bg-orange-100',
    iconColor: 'text-orange-600',
  },
  {
    icon: Lock,
    title: 'Data Protection',
    description: 'Your privacy is our priority',
    color: 'bg-red-100',
    iconColor: 'text-red-600',
  },
  {
    icon: CreditCard,
    title: 'Multiple Payment Options',
    description: 'Pay the way you prefer',
    color: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
  },
];

export default function TrustSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl mb-3">Why Shop With Us?</h2>
        <p className="text-gray-600 text-lg">Your satisfaction and security are our top priorities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trustFeatures.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className={`${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-4`}>
              <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
            </div>
            <h3 className="text-xl mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
