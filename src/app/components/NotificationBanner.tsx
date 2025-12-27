import { useState } from 'react';
import { Bell, X, Tag, TrendingDown, Package } from 'lucide-react';
import { Button } from './ui/button';

const notifications = [
  {
    id: 1,
    icon: TrendingDown,
    title: 'Price Drop Alert!',
    message: 'Wireless Earbuds now 30% off',
    color: 'bg-green-500',
  },
  {
    id: 2,
    icon: Tag,
    title: 'New Deal',
    message: 'Flash Sale: Up to 50% off on Electronics',
    color: 'bg-yellow-500',
  },
  {
    id: 3,
    icon: Package,
    title: 'New Arrivals',
    message: 'Check out the latest products in your favorite categories',
    color: 'bg-blue-500',
  },
];

export default function NotificationBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const notification = notifications[currentIndex];

  return (
    <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <div className={`${notification.color} w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0`}>
            <notification.icon className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm truncate">
              <span className="font-semibold">{notification.title}</span> {notification.message}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-black hover:bg-black/10 text-xs"
          >
            View All
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-black hover:bg-black/10 h-8 w-8"
            onClick={() => setIsVisible(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
