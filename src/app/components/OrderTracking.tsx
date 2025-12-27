import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Package, Truck, MapPin, CheckCircle, Clock } from 'lucide-react';
import { Button } from './ui/button';
import Header from './Header';
import Footer from './Footer';

export default function OrderTracking() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  
  // Mock tracking data
  const [trackingData] = useState({
    status: 'in_transit',
    estimatedDelivery: '2-3 business days',
    currentLocation: 'Distribution Center, New York',
    timeline: [
      {
        status: 'Order Placed',
        description: 'Your order has been confirmed',
        timestamp: '2 hours ago',
        completed: true,
        icon: CheckCircle,
      },
      {
        status: 'Processing',
        description: 'Your items are being prepared',
        timestamp: '1 hour ago',
        completed: true,
        icon: Package,
      },
      {
        status: 'Shipped',
        description: 'Your order has been shipped',
        timestamp: '30 minutes ago',
        completed: true,
        icon: Truck,
      },
      {
        status: 'In Transit',
        description: 'Your package is on its way',
        timestamp: 'Now',
        completed: true,
        icon: MapPin,
        current: true,
      },
      {
        status: 'Out for Delivery',
        description: 'Your package is out for delivery',
        timestamp: 'Pending',
        completed: false,
        icon: Truck,
      },
      {
        status: 'Delivered',
        description: 'Package delivered successfully',
        timestamp: 'Pending',
        completed: false,
        icon: CheckCircle,
      },
    ],
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5ebe0] via-[#e8d7f1] to-[#d4c5f9]">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-3xl md:text-4xl">Track Your Order</h1>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Order ID</p>
              <p className="font-mono">{orderId}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Estimated Delivery</p>
              <p>{trackingData.estimatedDelivery}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Current Location</p>
              <p>{trackingData.currentLocation}</p>
            </div>
          </div>

          <h2 className="text-2xl mb-6">Order Timeline</h2>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            <div className="space-y-6">
              {trackingData.timeline.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="relative flex gap-4">
                    {/* Icon */}
                    <div
                      className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full ${
                        item.current
                          ? 'bg-yellow-400 text-black animate-pulse'
                          : item.completed
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {item.completed ? (
                        <CheckCircle className="w-8 h-8" />
                      ) : (
                        <Clock className="w-8 h-8" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-8">
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h3 className="text-lg mb-1">{item.status}</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {item.description}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl mb-4">Need Help?</h2>
          <p className="text-gray-600 mb-6">
            If you have any questions about your order, please contact our customer support team.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black">
              Contact Support
            </Button>
            <Button variant="outline" onClick={() => navigate('/')}>
              Back to Home
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
