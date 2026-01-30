import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Droplets, 
  ArrowRight, 
  MapPin,
  Shield,
  Clock,
  Users,
  Sparkles,
  ChevronRight,
  Zap,
  AlertCircle,
  X,
  CheckCircle,
  User,
  Phone,
  Mail,
  Calendar,
  FileText,
  Thermometer
} from 'lucide-react';

const BloodHeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [bloodDropPosition, setBloodDropPosition] = useState(0);
  const [pulse, setPulse] = useState(false);
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [currentBg, setCurrentBg] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    bloodGroup: '',
    phone: '',
    email: '',
    donationDate: '',
    address: '',
    previousDonation: 'no',
    healthCondition: ''
  });

  // Background images array
  const backgroundImages = [
    'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
  ];

  // Initialize animations and background slideshow
  useEffect(() => {
    setIsVisible(true);
    
    // Animate blood drop
    const dropInterval = setInterval(() => {
      setBloodDropPosition(prev => {
        if (prev >= 100) return 0;
        return prev + 10;
      });
    }, 300);

    // Pulse animation
    const pulseInterval = setInterval(() => {
      setPulse(prev => !prev);
    }, 1500);

    // Background slideshow
    const bgInterval = setInterval(() => {
      setCurrentBg(prev => (prev + 1) % backgroundImages.length);
    }, 6000);

    return () => {
      clearInterval(dropInterval);
      clearInterval(pulseInterval);
      clearInterval(bgInterval);
    };
  }, []);

  const stats = [
    { value: '36,000', label: 'Units Needed Daily', icon: AlertCircle, color: 'text-rose-500' },
    { value: 'Every 2 sec', label: 'Someone Needs Blood', icon: Clock, color: 'text-amber-500' },
    { value: '3', label: 'Lives Per Donation', icon: Users, color: 'text-emerald-500' },
    { value: '45 min', label: 'Donation Time', icon: Shield, color: 'text-blue-500' }
  ];

  const donationCenters = [
    { name: 'City Blood Bank', distance: '1.2 km', availability: 'Open Now' },
    { name: 'Community Hospital', distance: '2.5 km', availability: 'Open Now' },
    { name: 'Red Cross Center', distance: '3.8 km', availability: 'Open until 8 PM' }
  ];

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send data to backend
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormSubmitted(false);
      setShowDonationForm(false);
      setFormData({
        name: '',
        age: '',
        bloodGroup: '',
        phone: '',
        email: '',
        donationDate: '',
        address: '',
        previousDonation: 'no',
        healthCondition: ''
      });
    }, 3000);
  };

  return (
    <>
      <section className="relative min-h-screen lg:min-h-[90vh] overflow-hidden">
        
        {/* Background Slideshow */}
        <div className="absolute inset-0 z-0">
          {backgroundImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                currentBg === index ? 'opacity-30' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.9), rgba(255,255,255,0.7)), url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            />
          ))}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-rose-50/30"></div>
          
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Floating Blood Drops */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute text-rose-200/30 animate-float"
                style={{
                  left: `${10 + i * 12}%`,
                  top: `${15 + (i % 4) * 25}%`,
                  animationDelay: `${i * 0.7}s`,
                  animationDuration: `${4 + Math.random() * 4}s`
                }}
              >
                <Droplets className="h-16 w-16" fill="currentColor" />
              </div>
            ))}
            
            {/* Animated Falling Blood Drop */}
            <div
              className="absolute left-1/2 transform -translate-x-1/2 z-10"
              style={{
                top: `${bloodDropPosition}%`,
                opacity: bloodDropPosition > 90 ? 0 : 1,
                transition: 'top 0.3s linear, opacity 0.3s'
              }}
            >
              <div className="relative">
                <Droplets className="h-12 w-12 text-rose-600" fill="#dc2626" />
                <div className="absolute inset-0 bg-rose-600 rounded-full blur-sm animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column - Text Content */}
            <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              
              {/* Trust Badge */}
              <div className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-rose-100 shadow-lg">
                <Sparkles className="h-4 w-4 text-rose-500" />
                <span className="text-sm font-medium text-gray-700">Trusted by 50K+ Donors</span>
                <div className="flex -space-x-2">
                  {[1,2,3].map((i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-r from-rose-400 to-rose-300 border-2 border-white shadow-sm"></div>
                  ))}
                </div>
              </div>

              {/* Main Headline */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                  <span className="block text-gray-900">Donate Blood,</span>
                  <span className="block bg-gradient-to-r from-rose-700 via-rose-600 to-rose-500 bg-clip-text text-transparent">
                    Save Lives
                  </span>
                </h1>
                
                {/* Subtext */}
                <p className="text-lg sm:text-xl text-gray-700 max-w-xl leading-relaxed">
                  Every 2 seconds, someone needs blood. Your single donation can save up to 
                  <span className="font-semibold text-rose-600"> 3 lives</span>. Join our community of everyday heroes today.
                </p>
              </div>

              {/* Emergency Alert */}
              <div className="bg-gradient-to-r from-rose-50/90 to-pink-50/90 backdrop-blur-sm rounded-2xl p-4 border border-rose-200 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-rose-100 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-rose-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">URGENT NEED</div>
                    <div className="text-rose-600 font-semibold">O- blood type critically low</div>
                    <div className="text-sm text-gray-600 mt-1">Immediate donations needed</div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {/* Primary CTA - Donate Now */}
                <button 
                  onClick={() => setShowDonationForm(true)}
                  className="group relative px-8 py-4 bg-gradient-to-r from-rose-600 to-rose-500 text-white rounded-2xl font-semibold text-lg shadow-xl shadow-rose-300 hover:shadow-2xl hover:shadow-rose-400 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-700 to-rose-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Droplets className="h-6 w-6 relative z-10" />
                  <span className="relative z-10">Donate Now</span>
                  <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                  
                  {/* Pulse Effect */}
                  <div className={`absolute inset-0 rounded-2xl border-2 border-rose-400 transition-all duration-1000 ${
                    pulse ? 'scale-110 opacity-30' : 'scale-100 opacity-0'
                  }`}></div>
                </button>

                {/* Secondary CTA - Find Blood */}
                <button className="group px-8 py-4 bg-white/90 backdrop-blur-sm text-gray-800 rounded-2xl font-semibold text-lg border-2 border-rose-100 hover:border-rose-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center space-x-2">
                  <MapPin className="h-5 w-5 text-rose-500" />
                  <span>Find Blood</span>
                  <ChevronRight className="h-5 w-5 text-rose-500 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                {stats.map((stat, idx) => (
                  <div key={idx} className={`bg-white/90 backdrop-blur-sm p-4 rounded-xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`} 
                       style={{ transitionDelay: `${idx * 100}ms` }}>
                    <div className="flex items-center space-x-2">
                      <div className={`p-2 rounded-lg ${stat.color.replace('text-', 'bg-')}/10`}>
                        <stat.icon className={`h-5 w-5 ${stat.color}`} />
                      </div>
                      <div>
                        <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Visual Element */}
            <div className={`relative ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              
              {/* Main Illustration Container */}
              <div className="relative max-w-lg mx-auto">
                
                {/* Floating Emergency Card */}
                <div className="absolute -top-6 -left-6 z-20">
                  <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-rose-100 animate-float-slow">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-rose-50 rounded-xl">
                        <Zap className="h-6 w-6 text-rose-500" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">Emergency Ready</div>
                        <div className="text-sm text-gray-600">24/7 Blood Supply</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Impact Card */}
                <div className="absolute -bottom-6 -right-6 z-20">
                  <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-emerald-100 animate-float-delayed">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-emerald-50 rounded-xl">
                        <Users className="h-6 w-6 text-emerald-500" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">3 Lives</div>
                        <div className="text-sm text-gray-600">Per Donation</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Central Heart Illustration */}
                <div className="relative bg-gradient-to-br from-white/95 to-rose-50/70 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-rose-100/50 overflow-hidden">
                  
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full">
                      <Heart className="w-full h-full text-rose-300" fill="currentColor" />
                    </div>
                  </div>

                  {/* Animated Heart with Blood Drop */}
                  <div className="relative z-10 flex flex-col items-center justify-center py-12">
                    
                    {/* Pulsing Rings */}
                    <div className="absolute w-56 h-56 border-2 border-rose-300/30 rounded-full animate-pulse-slow"></div>
                    <div className="absolute w-64 h-64 border-2 border-rose-400/20 rounded-full animate-pulse-slower"></div>
                    
                    {/* Heart Container */}
                    <div className="relative">
                      
                      {/* Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-rose-500 rounded-full blur-xl opacity-40 animate-pulse"></div>
                      
                      {/* Heart with Blood Drop */}
                      <div className="relative bg-gradient-to-r from-rose-600 to-rose-500 w-48 h-48 rounded-3xl flex items-center justify-center shadow-2xl shadow-rose-400/50">
                        <Heart className="h-32 w-32 text-white" fill="white" />
                        
                        {/* Animated Blood Drop */}
                        <div className="absolute top-4 right-4 animate-bounce-slow">
                          <div className="relative">
                            <Droplets className="h-12 w-12 text-white" fill="white" />
                            <div className="absolute inset-0 bg-white rounded-full blur-sm"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Connection Dots */}
                    <div className="flex items-center justify-center mt-12 space-x-6">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-full ${i === 2 ? 'bg-gradient-to-r from-rose-600 to-rose-500' : 'bg-gray-400'} flex items-center justify-center shadow-lg`}>
                            {i === 2 ? (
                              <Users className="h-5 w-5 text-white" />
                            ) : (
                              <Heart className="h-5 w-5 text-gray-600" />
                            )}
                          </div>
                          <div className="h-6 w-0.5 bg-gradient-to-b from-rose-400 to-transparent mt-2"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Nearby Centers */}
              <div className="mt-8 bg-white/95 backdrop-blur-sm rounded-2xl border border-gray-100 p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">Nearby Donation Centers</h3>
                  <span className="text-sm text-rose-600 font-medium">3 available</span>
                </div>
                
                <div className="space-y-3">
                  {donationCenters.map((center, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50/80 rounded-lg hover:bg-gray-100/80 transition-colors">
                      <div>
                        <div className="font-medium text-gray-900">{center.name}</div>
                        <div className="text-sm text-gray-600">{center.distance} away</div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        center.availability.includes('Open') 
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {center.availability}
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="w-full mt-4 py-3 bg-rose-50 text-rose-600 font-medium rounded-lg hover:bg-rose-100 transition-colors flex items-center justify-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>View All Centers</span>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Quick Actions */}
          <div className="lg:hidden mt-12">
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-white/95 backdrop-blur-sm rounded-xl border border-gray-100 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-rose-50 rounded-lg">
                    <Clock className="h-5 w-5 text-rose-500" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Book Slot</div>
                    <div className="text-sm text-gray-600">Quick appointment</div>
                  </div>
                </div>
              </button>
              
              <button className="p-4 bg-white/95 backdrop-blur-sm rounded-xl border border-gray-100 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Shield className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Eligibility</div>
                    <div className="text-sm text-gray-600">Check if you can donate</div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
            <div className="flex flex-col items-center space-y-2">
              <div className="text-xs text-gray-600 font-medium">Scroll to learn more</div>
              <div className="w-6 h-10 border-2 border-rose-300 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-gradient-to-b from-rose-500 to-rose-400 rounded-full mt-2 animate-scroll"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Form Modal */}
      {showDonationForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {formSubmitted ? (
              /* Success Message */
              <div className="bg-gradient-to-br from-emerald-50 to-white rounded-2xl shadow-2xl border border-emerald-100 p-8">
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-12 w-12 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Thank You for Registering!
                    </h3>
                    <p className="text-gray-600">
                      Your donation request has been submitted successfully. 
                      Our team will contact you within 24 hours to schedule your appointment.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowDonationForm(false)}
                    className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              /* Donation Form */
              <div className="bg-gradient-to-br from-white to-rose-50/50 rounded-2xl shadow-2xl border border-rose-100 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-rose-600 to-rose-500 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white/20 rounded-lg">
                        <Droplets className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">Become a Blood Donor</h2>
                        <p className="text-rose-100">Fill the form to schedule your donation</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowDonationForm(false)}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <X className="h-6 w-6 text-white" />
                    </button>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                        <User className="h-4 w-4" />
                        <span>Full Name *</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all outline-none"
                        placeholder="Enter your full name"
                      />
                    </div>

                    {/* Age */}
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                        <Calendar className="h-4 w-4" />
                        <span>Age *</span>
                      </label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        min="18"
                        max="65"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all outline-none"
                        placeholder="Must be 18-65 years"
                      />
                    </div>

                    {/* Blood Group */}
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                        <Droplets className="h-4 w-4" />
                        <span>Blood Group *</span>
                      </label>
                      <select
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all outline-none"
                      >
                        <option value="">Select Blood Group</option>
                        {bloodGroups.map(group => (
                          <option key={group} value={group}>{group}</option>
                        ))}
                      </select>
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                        <Phone className="h-4 w-4" />
                        <span>Phone Number *</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all outline-none"
                        placeholder="Enter phone number"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                        <Mail className="h-4 w-4" />
                        <span>Email Address</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all outline-none"
                        placeholder="Enter email address"
                      />
                    </div>

                    {/* Donation Date */}
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                        <Calendar className="h-4 w-4" />
                        <span>Preferred Donation Date *</span>
                      </label>
                      <input
                        type="date"
                        name="donationDate"
                        value={formData.donationDate}
                        onChange={handleInputChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                      <MapPin className="h-4 w-4" />
                      <span>Address *</span>
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      rows="3"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all outline-none resize-none"
                      placeholder="Enter your complete address"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Previous Donation */}
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                        <FileText className="h-4 w-4" />
                        <span>Have you donated blood before? *</span>
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="previousDonation"
                            value="yes"
                            checked={formData.previousDonation === 'yes'}
                            onChange={handleInputChange}
                            className="text-rose-500"
                          />
                          <span>Yes</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="previousDonation"
                            value="no"
                            checked={formData.previousDonation === 'no'}
                            onChange={handleInputChange}
                            className="text-rose-500"
                          />
                          <span>No</span>
                        </label>
                      </div>
                    </div>

                    {/* Health Condition */}
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                        <Thermometer className="h-4 w-4" />
                        <span>Current Health Condition</span>
                      </label>
                      <input
                        type="text"
                        name="healthCondition"
                        value={formData.healthCondition}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all outline-none"
                        placeholder="Any medical conditions?"
                      />
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="flex items-start space-x-3 p-4 bg-rose-50 rounded-xl">
                    <input
                      type="checkbox"
                      required
                      className="mt-1 text-rose-500"
                    />
                    <div className="text-sm text-gray-600">
                      I confirm that I am between 18-65 years old, weigh at least 50kg, 
                      and have not donated blood in the last 3 months. I declare that I 
                      am in good health and free from any blood-borne diseases.
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 px-8 py-4 bg-gradient-to-r from-rose-600 to-rose-500 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <Droplets className="h-6 w-6" />
                      <span>Submit Donation Request</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowDonationForm(false)}
                      className="px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-gray-300 transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-12px) translateX(8px); }
          66% { transform: translateY(8px) translateX(-8px); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(15px); opacity: 0; }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 12s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animate-pulse-slower {
          animation: pulse-slower 7s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animate-scroll {
          animation: scroll 2.5s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default BloodHeroSection;