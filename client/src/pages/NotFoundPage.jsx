import React, { useEffect, useState } from 'react';
import { 
  Heart, 
  Home, 
  Search, 
  ArrowLeft,
  Frown,
  MapPin,
  Users,
  AlertCircle,
  Droplets
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState([]);

  // Floating hearts animation
  useEffect(() => {
    setIsVisible(true);
    createFloatingHearts();
  }, []);

  const createFloatingHearts = () => {
    const hearts = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      size: 16 + Math.random() * 24,
      duration: 10 + Math.random() * 10
    }));
    setFloatingHearts(hearts);
  };

  // Quick links for redirection
  const quickLinks = [
    { path: '/', label: 'Home', icon: Home, color: 'bg-rose-500' },
    { path: '/find-blood', label: 'Find Blood', icon: Search, color: 'bg-red-500' },
    { path: '/become-donor', label: 'Become Donor', icon: Heart, color: 'bg-pink-500' },
    { path: '/urgent-requests', label: 'Urgent Requests', icon: AlertCircle, color: 'bg-orange-500' }
  ];

  // Popular search suggestions
  const popularSearches = [
    'Blood donation centers near me',
    'Blood type compatibility',
    'Donor eligibility criteria',
    'Emergency blood request',
    'Blood donation process',
    'Find O negative donors'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating hearts */}
        {floatingHearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute top-0 text-rose-200/30"
            style={{
              left: `${heart.left}%`,
              fontSize: `${heart.size}px`,
              animation: `floatUp ${heart.duration}s ease-in infinite ${heart.delay}s`
            }}
          >
            <Heart fill="currentColor" />
          </div>
        ))}
        
        {/* Gradient orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-rose-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-rose-300/10 to-red-300/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Error header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-8">
              <div className="relative">
                {/* Broken heart animation */}
                <div className="absolute inset-0 bg-rose-200 rounded-full blur-xl opacity-50"></div>
                <div className="relative bg-white w-32 h-32 rounded-full flex items-center justify-center shadow-2xl border-8 border-rose-100">
                  <div className="relative">
                    <Heart className="h-16 w-16 text-rose-300" fill="currentColor" />
                    <Frown className="absolute inset-0 h-16 w-16 text-rose-400 opacity-70" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Error code */}
            <div className="mb-6">
              <span className="text-9xl font-black bg-gradient-to-r from-rose-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
                404
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Oops! Page Not Found
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              The blood donation page you're looking for seems to have been 
              misplaced or doesn't exist. But don't worry, we can still help 
              you find what you need.
            </p>
          </div>

          {/* Main message card */}
          <div className="bg-white rounded-3xl shadow-2xl border border-rose-100 overflow-hidden mb-12">
            <div className="md:flex">
              {/* Left side - Illustration */}
              <div className="md:w-2/5 bg-gradient-to-br from-rose-50 to-pink-50 p-8 md:p-12 flex items-center justify-center">
                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <div className="absolute inset-0 bg-rose-400 rounded-full blur-2xl opacity-30"></div>
                    <div className="relative bg-gradient-to-r from-rose-500 to-rose-400 w-48 h-48 rounded-full flex items-center justify-center shadow-2xl">
                      <div className="text-white text-center">
                        <Droplets className="h-20 w-20 mx-auto mb-4" />
                        <div className="text-sm font-semibold">Missing Page</div>
                      </div>
                    </div>
                  </div>
                  <p className="text-rose-600 font-medium">
                    Let's find the right path together
                  </p>
                </div>
              </div>
              
              {/* Right side - Content */}
              <div className="md:w-3/5 p-8 md:p-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Don't Let This Stop Your Good Intentions
                </h2>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-rose-100 rounded-lg flex-shrink-0">
                      <Heart className="h-6 w-6 text-rose-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Your Donation Still Matters</h3>
                      <p className="text-gray-600">
                        Even if this page is missing, someone out there still needs your help. 
                        Every donation makes a difference.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-red-100 rounded-lg flex-shrink-0">
                      <Users className="h-6 w-6 text-red-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">We're Here to Help</h3>
                      <p className="text-gray-600">
                        Our support team is available 24/7 to assist you with any 
                        blood donation queries or issues.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-pink-100 rounded-lg flex-shrink-0">
                      <MapPin className="h-6 w-6 text-pink-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Find Alternative Routes</h3>
                      <p className="text-gray-600">
                        Use the quick links below to navigate to popular sections of our 
                        blood donation platform.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Back button */}
                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center space-x-2 text-rose-600 hover:text-rose-700 font-semibold"
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span>Go back to previous page</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Navigation Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Quick Navigation
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <button
                    key={index}
                    onClick={() => navigate(link.path)}
                    className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-lg 
                             hover:shadow-xl transition-all duration-300 hover:scale-105 
                             hover:border-rose-200 text-left"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-xl ${link.color} text-white 
                                    group-hover:scale-110 transition-transform`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{link.label}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Click to navigate
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 h-1 w-12 bg-gradient-to-r from-rose-400 to-pink-400 
                                  rounded-full transform scale-x-0 group-hover:scale-x-100 
                                  transition-transform duration-300"></div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Suggestions */}
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-3xl p-8 border border-rose-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Popular Searches
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {popularSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => navigate('/search?q=' + encodeURIComponent(search))}
                  className="group bg-white rounded-xl p-4 border border-rose-100 
                           hover:border-rose-300 hover:shadow-md transition-all duration-200 
                           flex items-center justify-between"
                >
                  <span className="text-gray-700 group-hover:text-gray-900">{search}</span>
                  <Search className="h-4 w-4 text-gray-400 group-hover:text-rose-500" />
                </button>
              ))}
            </div>
            
            {/* Search bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for blood donation centers, FAQs, or blood types..."
                  className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl 
                           focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent
                           shadow-sm hover:shadow-md transition-shadow"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      navigate('/search?q=' + encodeURIComponent(e.target.value));
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Emergency CTA */}
          <div className="mt-12 bg-gradient-to-r from-red-500 to-rose-500 rounded-3xl p-8 
                        text-center shadow-xl border border-red-400">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <AlertCircle className="h-8 w-8 text-white" />
                <h3 className="text-2xl font-bold text-white">Need Blood Urgently?</h3>
              </div>
              
              <p className="text-rose-100 mb-6 text-lg">
                If you or someone you know needs blood immediately, don't wait. 
                Use our emergency services now.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/emergency')}
                  className="px-8 py-3 bg-white text-red-600 rounded-xl font-bold 
                           hover:bg-rose-50 transition-colors shadow-lg"
                >
                  Emergency Blood Request
                </button>
                
                <button className="px-8 py-3 bg-transparent text-white border-2 border-white 
                                 rounded-xl font-bold hover:bg-white/10 transition-colors">
                  Call Emergency: 108
                </button>
              </div>
            </div>
          </div>

          {/* Report Issue */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Found a broken link or want to report an issue?
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="text-rose-600 hover:text-rose-700 font-medium underline"
            >
              Contact our support team
            </button>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes floatUp {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default NotFoundPage;