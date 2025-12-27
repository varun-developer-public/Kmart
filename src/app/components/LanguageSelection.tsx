import { Globe } from 'lucide-react';
import { Button } from './ui/button';

interface LanguageSelectionProps {
  onLanguageSelect: (language: string) => void;
}

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
];

export default function LanguageSelection({ onLanguageSelect }: LanguageSelectionProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5ebe0] via-[#e8d7f1] to-[#d4c5f9] p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full mb-6">
              <Globe className="w-10 h-10 text-white" />
            </div>
            <h1 className="mb-2">Welcome to Parik</h1>
            <p className="text-gray-600">Select your preferred language</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                onClick={() => onLanguageSelect(lang.code)}
                variant="outline"
                className="h-auto py-6 flex flex-col items-center gap-2 hover:bg-gradient-to-br hover:from-yellow-50 hover:to-purple-50 hover:border-yellow-400 transition-all duration-300 hover:scale-105"
              >
                <span>{lang.nativeName}</span>
                <span className="text-xs text-gray-500">{lang.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}