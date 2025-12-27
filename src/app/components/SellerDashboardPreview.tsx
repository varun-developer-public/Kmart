import { TrendingUp, DollarSign, Package, Users, BarChart3 } from 'lucide-react';
import { Button } from './ui/button';

const sellerStats = [
  {
    icon: DollarSign,
    label: 'Total Sales',
    value: '€45,231',
    change: '+12.5%',
    color: 'bg-green-500',
  },
  {
    icon: Package,
    label: 'Products Sold',
    value: '1,234',
    change: '+8.2%',
    color: 'bg-blue-500',
  },
  {
    icon: Users,
    label: 'Total Customers',
    value: '892',
    change: '+15.3%',
    color: 'bg-purple-500',
  },
  {
    icon: TrendingUp,
    label: 'Conversion Rate',
    value: '3.2%',
    change: '+2.1%',
    color: 'bg-orange-500',
  },
];

export default function SellerDashboardPreview() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl mb-2">Seller Dashboard</h2>
            <p className="text-gray-600">Track your performance and grow your business</p>
          </div>
          <Button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black">
            <BarChart3 className="w-5 h-5 mr-2" />
            View Full Analytics
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sellerStats.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-green-600 text-sm">{stat.change}</span>
              </div>
              <div className="text-2xl mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 border-t">
          <div className="text-center p-4">
            <div className="text-xl mb-1">Quick Listing</div>
            <p className="text-sm text-gray-600 mb-3">Add products in under 2 minutes</p>
            <Button variant="outline" className="w-full">List Product</Button>
          </div>
          <div className="text-center p-4">
            <div className="text-xl mb-1">Order Management</div>
            <p className="text-sm text-gray-600 mb-3">Track and manage all orders</p>
            <Button variant="outline" className="w-full">View Orders</Button>
          </div>
          <div className="text-center p-4">
            <div className="text-xl mb-1">Performance Insights</div>
            <p className="text-sm text-gray-600 mb-3">Data-driven recommendations</p>
            <Button variant="outline" className="w-full">Get Insights</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
