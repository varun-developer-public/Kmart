import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Wallet, Building2, Check, MapPin, Smartphone } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '../contexts/CartContext';
import Header from './Header';
import Footer from './Footer';
import { toast } from 'sonner';
import Autocomplete from 'react-google-autocomplete';

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [cardName, setCardName] = useState('');

  const total = getTotalPrice() + 20 + getTotalPrice() * 0.1;

  const handlePlaceChange = (place: any) => {
    if (place.formatted_address) {
      setAddress(place.formatted_address);
    }
    
    // Extract city and postal code from address components
    place.address_components?.forEach((component: any) => {
      if (component.types.includes('locality')) {
        setCity(component.long_name);
      }
      if (component.types.includes('postal_code')) {
        setZipCode(component.long_name);
      }
    });
    
    toast.success('Location added successfully!');
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (items.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const orderId = `ORD-${Date.now()}`;
      clearCart();
      setIsProcessing(false);
      navigate(`/order-confirmation/${orderId}`);
      toast.success('Order placed successfully!');
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f5ebe0] via-[#e8d7f1] to-[#d4c5f9]">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
            <h2 className="text-2xl mb-4">Your cart is empty</h2>
            <Button onClick={() => navigate('/')}>
              Continue Shopping
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5ebe0] via-[#e8d7f1] to-[#d4c5f9]">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/cart')}
            className="rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-3xl md:text-4xl">Checkout</h1>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Information */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl mb-6 font-semibold">Shipping Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Address (Search using Google Maps)
                    </label>
                    <Autocomplete
                      apiKey="YOUR_GOOGLE_MAPS_API_KEY"
                      onPlaceSelected={handlePlaceChange}
                      options={{
                        types: ['address'],
                        componentRestrictions: { country: 'in' },
                      }}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
                      placeholder="Search for your address..."
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Start typing to search for your address using Google Maps
                    </p>
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      id="city"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
                      placeholder="City"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
                      Zip Code
                    </label>
                    <input
                      id="zipCode"
                      type="text"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
                      placeholder="Zip Code"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl mb-6 font-semibold">Payment Method</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Credit/Debit Card */}
                  <div
                    onClick={() => setPaymentMethod('card')}
                    className={`relative border-2 rounded-2xl p-5 cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        paymentMethod === 'card' ? 'bg-blue-500' : 'bg-gray-100'
                      }`}>
                        <CreditCard className={`w-6 h-6 ${paymentMethod === 'card' ? 'text-white' : 'text-gray-600'}`} />
                      </div>
                      <div>
                        <p className="font-semibold">Credit/Debit Card</p>
                        <p className="text-sm text-gray-500">Visa, Mastercard, RuPay</p>
                      </div>
                    </div>
                    {paymentMethod === 'card' && (
                      <div className="absolute top-4 right-4">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Digital Wallet */}
                  <div
                    onClick={() => setPaymentMethod('wallet')}
                    className={`relative border-2 rounded-2xl p-5 cursor-pointer transition-all ${
                      paymentMethod === 'wallet'
                        ? 'border-purple-500 bg-purple-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        paymentMethod === 'wallet' ? 'bg-purple-500' : 'bg-gray-100'
                      }`}>
                        <Smartphone className={`w-6 h-6 ${paymentMethod === 'wallet' ? 'text-white' : 'text-gray-600'}`} />
                      </div>
                      <div>
                        <p className="font-semibold">Digital Wallet</p>
                        <p className="text-sm text-gray-500">Google Pay, PhonePe, Paytm</p>
                      </div>
                    </div>
                    {paymentMethod === 'wallet' && (
                      <div className="absolute top-4 right-4">
                        <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Net Banking */}
                  <div
                    onClick={() => setPaymentMethod('bank')}
                    className={`relative border-2 rounded-2xl p-5 cursor-pointer transition-all ${
                      paymentMethod === 'bank'
                        ? 'border-green-500 bg-green-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        paymentMethod === 'bank' ? 'bg-green-500' : 'bg-gray-100'
                      }`}>
                        <Building2 className={`w-6 h-6 ${paymentMethod === 'bank' ? 'text-white' : 'text-gray-600'}`} />
                      </div>
                      <div>
                        <p className="font-semibold">Net Banking</p>
                        <p className="text-sm text-gray-500">All major banks</p>
                      </div>
                    </div>
                    {paymentMethod === 'bank' && (
                      <div className="absolute top-4 right-4">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Cash on Delivery */}
                  <div
                    onClick={() => setPaymentMethod('cod')}
                    className={`relative border-2 rounded-2xl p-5 cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-orange-500 bg-orange-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        paymentMethod === 'cod' ? 'bg-orange-500' : 'bg-gray-100'
                      }`}>
                        <Wallet className={`w-6 h-6 ${paymentMethod === 'cod' ? 'text-white' : 'text-gray-600'}`} />
                      </div>
                      <div>
                        <p className="font-semibold">Cash on Delivery</p>
                        <p className="text-sm text-gray-500">Pay when you receive</p>
                      </div>
                    </div>
                    {paymentMethod === 'cod' && (
                      <div className="absolute top-4 right-4">
                        <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Details */}
                {paymentMethod === 'card' && (
                  <div className="mt-6 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg">Card Details</h3>
                      <div className="flex gap-2">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="h-6" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-2">
                          Cardholder Name
                        </label>
                        <input
                          id="cardName"
                          type="text"
                          placeholder="Name on card"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                          required={paymentMethod === 'card'}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                          Card Number
                        </label>
                        <input
                          id="cardNumber"
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          maxLength={19}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                          required={paymentMethod === 'card'}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-2">
                            Expiry Date
                          </label>
                          <input
                            id="cardExpiry"
                            type="text"
                            placeholder="MM/YY"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            maxLength={5}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                            required={paymentMethod === 'card'}
                          />
                        </div>
                        <div>
                          <label htmlFor="cardCVV" className="block text-sm font-medium text-gray-700 mb-2">
                            CVV
                          </label>
                          <input
                            id="cardCVV"
                            type="password"
                            placeholder="123"
                            value={cardCVV}
                            onChange={(e) => setCardCVV(e.target.value)}
                            maxLength={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                            required={paymentMethod === 'card'}
                          />
                        </div>
                      </div>
                      
                      <p className="text-xs text-gray-600 mt-4 flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        Your card information is encrypted and secure
                      </p>
                    </div>
                  </div>
                )}

                {/* Digital Wallet Instructions */}
                {paymentMethod === 'wallet' && (
                  <div className="mt-6 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
                    <p className="text-sm text-gray-700 mb-3">
                      You will be redirected to complete the payment with your selected digital wallet.
                    </p>
                    <div className="flex gap-3">
                      <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-purple-200">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="Google Pay" className="h-6" />
                      </div>
                      <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-purple-200">
                        <span className="text-sm font-semibold">PhonePe</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-purple-200">
                        <span className="text-sm font-semibold">Paytm</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Cash on Delivery Info */}
                {paymentMethod === 'cod' && (
                  <div className="mt-6 p-6 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl border border-orange-100">
                    <p className="text-sm text-gray-700">
                      <strong>Cash on Delivery</strong> - Pay in cash when your order is delivered. Additional charges of ₹50 may apply.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2 className="text-2xl mb-6 font-semibold">Order Summary</h2>
                
                <div className="space-y-3 mb-6 max-h-48 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-semibold">₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6 border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{getTotalPrice().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">₹20</span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">Tax (GST 10%)</span>
                    <span className="font-medium">₹{(getTotalPrice() * 0.1).toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-semibold">Total</span>
                      <span className="text-2xl font-bold text-red-600">
                        ₹{total.toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black text-base font-semibold py-6 rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  {isProcessing ? 'Processing...' : 'Place Order'}
                </Button>
                
                <p className="text-xs text-center text-gray-500 mt-4">
                  By placing your order, you agree to our terms and conditions
                </p>
              </div>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
