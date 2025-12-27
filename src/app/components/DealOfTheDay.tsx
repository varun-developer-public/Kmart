import { useState, useEffect } from 'react';

export default function DealOfTheDay() {
  const [timeLeft, setTimeLeft] = useState({
    days: 10,
    hours: 33,
    minutes: 39,
    seconds: 15,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-3xl p-8 shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl mb-2">DEAL OF THE DAY</h2>
            <p className="text-gray-600">Wireless Earbuds with Microphone...</p>
            <div className="mt-4">
              <span className="text-3xl text-red-600">₹19,495</span>
              <span className="text-lg text-gray-500 line-through ml-3">₹25,495</span>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="text-center">
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl p-4 min-w-[80px] shadow-lg">
                <div className="text-3xl text-black">{timeLeft.days}</div>
                <div className="text-xs text-black mt-1">DAYS</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl p-4 min-w-[80px] shadow-lg">
                <div className="text-3xl text-black">{timeLeft.hours}</div>
                <div className="text-xs text-black mt-1">HOURS</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl p-4 min-w-[80px] shadow-lg">
                <div className="text-3xl text-black">{timeLeft.minutes}</div>
                <div className="text-xs text-black mt-1">MINUTES</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl p-4 min-w-[80px] shadow-lg">
                <div className="text-3xl text-black">{timeLeft.seconds}</div>
                <div className="text-xs text-black mt-1">SECONDS</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}