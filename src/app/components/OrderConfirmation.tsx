import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle, Package, Truck, Home } from 'lucide-react';
import { Button } from './ui/button';
import Header from './Header';
import Footer from './Footer';

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5ebe0] via-[#e8d7f1] to-[#d4c5f9]">
      <Header />
      
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 text-center">
          <CheckCircle className="w-24 h-24 mx-auto mb-6 text-green-500" />
          
          <h1 className="text-3xl md:text-4xl mb-4">Order Confirmed!</h1>
          <p className="text-xl text-gray-600 mb-2">Thank you for your order</p>
          <p className="text-lg text-gray-500 mb-8">
            Order ID: <span className="font-mono">{orderId}</span>
          </p>

          <div className="bg-gray-50 rounded-2xl p-6 mb-8">
            <h2 className="text-xl mb-4">What happens next?</h2>
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-4">
                <Package className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium mb-1">Order Processing</h3>
                  <p className="text-sm text-gray-600">
                    We're preparing your items for shipment
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Truck className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium mb-1">Shipping</h3>
                  <p className="text-sm text-gray-600">
                    Your order will be shipped within 2-3 business days
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Home className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium mb-1">Delivery</h3>
                  <p className="text-sm text-gray-600">
                    Estimated delivery: 5-7 business days
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => navigate(`/order-tracking/${orderId}`)}
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black px-8"
            >
              Track Order
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/')}
            >
              Continue Shopping
            </Button>
          </div>

          <p className="text-sm text-gray-500 mt-8">
            A confirmation email has been sent to your email address
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
