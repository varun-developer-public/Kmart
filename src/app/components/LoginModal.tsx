import { useState } from 'react';
import { X, Mail, Phone, Eye, EyeOff, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import socialLoginButtons from 'figma:asset/a4fc0a96e456fa334cbffddc6cff187ab14c58b7.png';

interface LoginModalProps {
  onClose: () => void;
}

export default function LoginModal({ onClose }: LoginModalProps) {
  const { login } = useAuth();
  const [loginMethod, setLoginMethod] = useState<'select' | 'phone' | 'email'>('select');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({ code: '+91', flag: '🇮🇳', name: 'India' });
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');

  const countries = [
    { code: '+91', flag: '🇮🇳', name: 'India' },
    { code: '+1', flag: '🇺🇸', name: 'United States' },
    { code: '+44', flag: '🇬🇧', name: 'United Kingdom' },
    { code: '+61', flag: '🇦🇺', name: 'Australia' },
    { code: '+81', flag: '🇯🇵', name: 'Japan' },
    { code: '+86', flag: '🇨🇳', name: 'China' },
    { code: '+49', flag: '🇩🇪', name: 'Germany' },
    { code: '+33', flag: '🇫🇷', name: 'France' },
    { code: '+39', flag: '🇮🇹', name: 'Italy' },
    { code: '+34', flag: '🇪🇸', name: 'Spain' },
    { code: '+7', flag: '🇷🇺', name: 'Russia' },
    { code: '+82', flag: '🇰🇷', name: 'South Korea' },
    { code: '+55', flag: '🇧🇷', name: 'Brazil' },
    { code: '+52', flag: '🇲🇽', name: 'Mexico' },
    { code: '+27', flag: '🇿🇦', name: 'South Africa' },
    { code: '+971', flag: '🇦🇪', name: 'UAE' },
    { code: '+65', flag: '🇸🇬', name: 'Singapore' },
    { code: '+60', flag: '🇲🇾', name: 'Malaysia' },
    { code: '+62', flag: '🇮🇩', name: 'Indonesia' },
    { code: '+63', flag: '🇵🇭', name: 'Philippines' },
    { code: '+66', flag: '🇹🇭', name: 'Thailand' },
    { code: '+84', flag: '🇻🇳', name: 'Vietnam' },
    { code: '+880', flag: '🇧🇩', name: 'Bangladesh' },
    { code: '+92', flag: '🇵🇰', name: 'Pakistan' },
    { code: '+94', flag: '🇱🇰', name: 'Sri Lanka' },
    { code: '+977', flag: '🇳🇵', name: 'Nepal' },
  ];

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
    country.code.includes(countrySearch)
  );

  const handleGoogleLogin = () => {
    const user = {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Google',
      loginMethod: 'google' as const,
    };
    login(user);
    toast.success('Successfully logged in with Google!');
    onClose();
  };

  const handleAppleLogin = () => {
    const user = {
      name: 'John Doe',
      email: 'john.doe@apple.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Apple',
      loginMethod: 'apple' as const,
    };
    login(user);
    toast.success('Successfully logged in with Apple!');
    onClose();
  };

  const handleFacebookLogin = () => {
    const user = {
      name: 'John Doe',
      email: 'john.doe@facebook.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Facebook',
      loginMethod: 'facebook' as const,
    };
    login(user);
    toast.success('Successfully logged in with Facebook!');
    onClose();
  };

  const handleSendOTP = () => {
    if (phoneNumber.length !== 10) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }
    setOtpSent(true);
    toast.success('OTP sent to your phone!');
  };

  const handleVerifyOTP = () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }
    // Simulate OTP verification
    const user = {
      name: 'User',
      email: '',
      phone: phoneNumber,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Phone',
      loginMethod: 'phone' as const,
    };
    login(user);
    toast.success('Successfully logged in!');
    onClose();
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1);
    }
    
    if (!/^\d*$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleResendOTP = () => {
    setOtp(['', '', '', '', '', '']);
    toast.success('OTP resent to your phone!');
  };

  const handleEmailOrPhoneLogin = () => {
    if (!emailOrPhone || !password) {
      toast.error('Please enter both email/phone and password');
      return;
    }
    const user = {
      name: 'User',
      email: emailOrPhone.includes('@') ? emailOrPhone : '',
      phone: !emailOrPhone.includes('@') ? emailOrPhone : '',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Email',
      loginMethod: 'email' as const,
    };
    login(user);
    toast.success('Successfully logged in!');
    onClose();
  };

  const handleForgotPassword = () => {
    toast.info('Password reset link would be sent to your email/phone');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {loginMethod === 'select' && (
          <>
            <div className="text-center mb-8">
              <h2 className="mb-2">Sign In to Parik</h2>
              <p className="text-gray-600">Welcome back! Please enter your details</p>
            </div>

            {/* Email/Password Login Form */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm mb-2">Email or Phone</label>
                <input
                  type="text"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder="Enter email or phone number"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    type="button"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleForgotPassword}
                  className="text-sm text-yellow-600 hover:text-yellow-700 font-medium"
                  type="button"
                >
                  Forgot Password?
                </button>
              </div>
              <Button
                onClick={handleEmailOrPhoneLogin}
                className="w-full h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black"
              >
                Sign In
              </Button>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or Continue With</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="flex justify-center items-center gap-6 mb-4">
              <button
                onClick={handleGoogleLogin}
                className="w-14 h-14 rounded-full border-2 border-gray-200 hover:border-yellow-400 hover:shadow-md transition-all flex items-center justify-center bg-white"
              >
                <div className="w-6 h-6 bg-[url('https://www.google.com/favicon.ico')] bg-contain bg-center bg-no-repeat"></div>
              </button>
              
              <button
                onClick={handleAppleLogin}
                className="w-14 h-14 rounded-full bg-black hover:bg-gray-800 transition-all flex items-center justify-center shadow-md"
              >
                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
              </button>
              
              <button
                onClick={handleFacebookLogin}
                className="w-14 h-14 rounded-full bg-[#1877F2] hover:bg-[#1565D8] transition-all flex items-center justify-center shadow-md"
              >
                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
            </div>

            {/* Phone Number Button */}
            <Button
              onClick={() => setLoginMethod('phone')}
              className="w-full h-12 bg-white border-2 border-gray-200 hover:border-yellow-400 hover:bg-yellow-50 text-gray-800 flex items-center justify-center gap-3 transition-all mt-3"
            >
              <Phone className="w-5 h-5" />
              <span>Sign in with Phone Number</span>
            </Button>

            <p className="text-xs text-gray-500 text-center mt-6">
              By continuing, you agree to Parik's Terms of Service and Privacy Policy
            </p>
          </>
        )}

        {loginMethod === 'phone' && (
          <>
            <button
              onClick={() => setLoginMethod('select')}
              className="text-sm text-gray-600 hover:text-gray-800 mb-6"
            >
              ← Back
            </button>

            <div className="text-center mb-8">
              <h2 className="mb-2">Phone Login</h2>
              <p className="text-gray-600">
                {otpSent ? 'Enter the OTP sent to your phone' : 'Enter your phone number'}
              </p>
            </div>

            {!otpSent ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">Phone Number</label>
                  <div className="relative">
                    <button
                      onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                      type="button"
                      className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1 hover:bg-gray-50 px-2 py-1 rounded transition-colors z-10"
                    >
                      <span className="text-xl">{selectedCountry.flag}</span>
                      <span className="text-sm font-medium">{selectedCountry.code}</span>
                    </button>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                      placeholder="Enter 10-digit number"
                      className="w-full pl-28 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none"
                      maxLength={10}
                    />
                    {showCountryDropdown && (
                      <>
                        <div 
                          className="fixed inset-0 z-20" 
                          onClick={() => setShowCountryDropdown(false)}
                        ></div>
                        <div className="absolute left-0 top-full mt-2 w-full bg-white border-2 border-gray-200 rounded-xl shadow-lg z-30 overflow-hidden">
                          <div className="p-2 border-b border-gray-200">
                            <input
                              type="text"
                              value={countrySearch}
                              onChange={(e) => setCountrySearch(e.target.value)}
                              placeholder="Search countries..."
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none text-sm"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                          <div className="max-h-60 overflow-y-auto">
                            {filteredCountries.map(country => (
                              <button
                                key={country.code}
                                type="button"
                                onClick={() => {
                                  setSelectedCountry(country);
                                  setShowCountryDropdown(false);
                                  setCountrySearch('');
                                }}
                                className="w-full px-4 py-3 text-left hover:bg-yellow-50 transition-colors flex items-center gap-3"
                              >
                                <span className="text-2xl">{country.flag}</span>
                                <span className="text-sm font-medium min-w-[3rem]">{country.code}</span>
                                <span className="text-sm text-gray-700">{country.name}</span>
                              </button>
                            ))}
                            {filteredCountries.length === 0 && (
                              <div className="px-4 py-8 text-center text-gray-500 text-sm">
                                No countries found
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <Button
                  onClick={handleSendOTP}
                  className="w-full h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black"
                >
                  Send OTP
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2 text-center">Enter OTP</label>
                  <div className="flex justify-center gap-2 mb-4">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="w-12 h-12 text-center border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none text-xl font-semibold"
                      />
                    ))}
                  </div>
                  <div className="text-center text-sm text-gray-600">
                    Resend available: <button onClick={handleResendOTP} className="text-yellow-600 hover:text-yellow-700 font-medium">Resend OTP</button>
                  </div>
                </div>
                <Button
                  onClick={handleVerifyOTP}
                  className="w-full h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black"
                >
                  Verify & Login
                </Button>
                <button
                  onClick={() => {
                    setOtpSent(false);
                    setOtp(['', '', '', '', '', '']);
                  }}
                  className="w-full text-sm text-gray-600 hover:text-gray-800"
                >
                  Change phone number
                </button>
              </div>
            )}
          </>
        )}

        {loginMethod === 'email' && (
          <>
            <button
              onClick={() => setLoginMethod('select')}
              className="text-sm text-gray-600 hover:text-gray-800 mb-6"
            >
              ← Back
            </button>

            <div className="text-center mb-8">
              <h2 className="mb-2">Email/Phone Login</h2>
              <p className="text-gray-600">Enter your email or phone number</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Email or Phone</label>
                <input
                  type="text"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder="Enter email or phone number"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <Button
                onClick={handleEmailOrPhoneLogin}
                className="w-full h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black"
              >
                Login
              </Button>
              <button
                onClick={handleForgotPassword}
                className="w-full text-sm text-gray-600 hover:text-gray-800"
              >
                Forgot Password?
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
