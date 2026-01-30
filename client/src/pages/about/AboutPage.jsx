import React, { useState, useEffect, useRef } from 'react';
import {
  Heart,
  Users,
  Shield,
  Clock,
  Award,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Play,
  CheckCircle2,
  Droplets,
  Stethoscope,
  HandHeart,
  Sparkles,
  TrendingUp,
  Hospital,
  Target,
  Calendar
} from 'lucide-react';

const AboutPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [counters, setCounters] = useState({
    livesSaved: 0,
    donors: 0,
    hospitals: 0,
    donations: 0
  });
  const videoRef = useRef(null);

  // Target values for counters
  const targetValues = {
    livesSaved: 25000,
    donors: 50000,
    hospitals: 250,
    donations: 100000
  };

  // Handle scroll for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate counters when in view
  useEffect(() => {
    const animateCounters = () => {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;

      Object.keys(targetValues).forEach((key) => {
        let current = 0;
        const target = targetValues[key];
        const increment = target / steps;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          setCounters(prev => ({
            ...prev,
            [key]: Math.floor(current)
          }));
        }, stepDuration);
      });
    };

    // Start animation when component mounts
    const timer = setTimeout(animateCounters, 500);
    return () => clearTimeout(timer);
  }, []);

  // Video play handler
  const handleVideoPlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const howWeHelpSteps = [
    {
      icon: Users,
      title: 'Connect Donors',
      description: 'We match willing donors with hospitals and patients in need through our intelligent matching system.',
      color: 'from-rose-500 to-pink-500'
    },
    {
      icon: Hospital,
      title: 'Support Hospitals',
      description: 'We provide hospitals with real-time donor availability and streamlined donation management tools.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Heart,
      title: 'Save Lives',
      description: 'Every connection made through our platform has the potential to save multiple lives.',
      color: 'from-emerald-500 to-green-500'
    }
  ];

  const impactStats = [
    {
      value: counters.livesSaved.toLocaleString(),
      label: 'Lives Saved',
      icon: Heart,
      color: 'text-rose-500'
    },
    {
      value: counters.donors.toLocaleString(),
      label: 'Registered Donors',
      icon: Users,
      color: 'text-blue-500'
    },
    {
      value: counters.hospitals.toLocaleString(),
      label: 'Partner Hospitals',
      icon: Hospital,
      color: 'text-emerald-500'
    },
    {
      value: counters.donations.toLocaleString() + '+',
      label: 'Donations Made',
      icon: Droplets,
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-rose-50/30">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-rose-300/20 via-rose-300/20 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full">
              <Sparkles className="h-5 w-5 text-rose-500" />
              <span className="text-sm font-medium text-gray-700">Over 50,000 Lives Impacted</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-red-500 leading-tight">
              <span className="block">Together,</span>
              <span className="block bg-gradient-to-r from-green-700 via-rose-500 to-rose-400 bg-clip-text text-transparent">
                We Save Lives
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Every drop of blood, every organ donation, every moment of compassion 
              brings hope to someone's life. Join us in this mission of humanity.
            </p>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="flex flex-col items-center space-y-3">
                <span className="text-sm text-white/80 font-medium">Scroll to continue</span>
                <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center">
                  <div className="w-1 h-4 bg-gradient-to-b from-white to-rose-200 rounded-full mt-2 animate-scroll"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center space-x-2 mb-4">
                  <Target className="h-6 w-6 text-rose-500" />
                  <span className="text-sm font-semibold text-rose-600 uppercase tracking-wider">Our Mission</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                  Connecting Compassion with Need
                </h2>
              </div>

              <p className="text-lg text-gray-600 leading-relaxed">
                We believe that no one should lose their life due to the unavailability of blood or organs. 
                Our platform serves as the vital link between compassionate donors, medical institutions, 
                and patients in desperate need.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-rose-50 rounded-xl">
                    <Heart className="h-6 w-6 text-rose-500" fill="#f43f5e" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Bridge the Gap</h4>
                    <p className="text-gray-600">Eliminate the shortage through intelligent donor matching</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-50 rounded-xl">
                    <Shield className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Ensure Safety</h4>
                    <p className="text-gray-600">Maintain the highest standards of medical safety and privacy</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-emerald-50 rounded-xl">
                    <Users className="h-6 w-6 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Build Community</h4>
                    <p className="text-gray-600">Create a nationwide network of life-saving heroes</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Illustration/Image */}
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-64 h-64 bg-gradient-to-r from-rose-200/20 to-pink-200/10 rounded-full blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-white to-rose-50 rounded-3xl p-8 shadow-2xl border border-rose-100">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img 
                    src="https://www.herzing.edu/sites/default/files/styles/fp_960_480/public/2023-05/iStock-1290139310.jpg.webp?h=f8d7f9a0&itok=7FRYz19N"
                    alt="Medical professionals working together"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-rose-100">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-rose-50 rounded-xl">
                      <CheckCircle2 className="h-6 w-6 text-rose-500" />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-900">24/7</div>
                      <div className="text-sm text-gray-600">Emergency Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Started - Storytelling Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-rose-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Emotional Image */}
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Patient receiving care"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-rose-100">
                <div className="text-center">
                  <div className="text-3xl font-bold text-rose-500">106,000+</div>
                  <div className="text-sm text-gray-600">People waiting for organs</div>
                </div>
              </div>
            </div>

            {/* Story Text */}
            <div className="space-y-8 order-1 lg:order-2">
              <div>
                <div className="inline-flex items-center space-x-2 mb-4">
                  <Heart className="h-6 w-6 text-rose-500" />
                  <span className="text-sm font-semibold text-rose-600 uppercase tracking-wider">Why We Started</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                  A Story That Changed Everything
                </h2>
              </div>

              <div className="space-y-6">
                <p className="text-lg text-gray-600 leading-relaxed">
                  It began with a personal tragedy. Our founder lost a family member who was waiting 
                  for a kidney transplant. The organ arrived just 48 hours too late.
                </p>

                <p className="text-lg text-gray-600 leading-relaxed">
                  This heartbreaking experience revealed a critical flaw in our healthcare system: 
                  thousands of willing donors existed, but there was no efficient way to connect them 
                  with those in desperate need.
                </p>

                <div className="bg-rose-50/50 border-l-4 border-rose-500 p-6 rounded-r-xl">
                  <p className="text-lg text-gray-700 italic">
                    "We realized that technology could be the bridge between compassion and need. 
                    Every day, 22 people die waiting for organs. We're here to change that."
                  </p>
                  <div className="mt-4 flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-rose-400 to-rose-300"></div>
                    <div>
                      <div className="font-semibold text-gray-900">Dr. Sarah Johnson</div>
                      <div className="text-sm text-gray-600">Founder & Medical Director</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Motivational Video Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-white to-rose-50/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div>
              <div className="inline-flex items-center space-x-2 mb-4">
                <Play className="h-6 w-6 text-rose-500" fill="#f43f5e" />
                <span className="text-sm font-semibold text-rose-600 uppercase tracking-wider">Inspiration</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                One Decision Can Save Many Lives
              </h2>
              <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
                Watch how ordinary people become extraordinary heroes through the simple act of donation.
              </p>
            </div>

            {/* Video Container */}
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl relative">
                {/* Video Placeholder with Play Button */}
                <div className="relative w-full h-full bg-gradient-to-r from-rose-500 to-rose-400 flex items-center justify-center">
                  <img 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXJKukxBs9c5-M947olMWVr4ybf4UuIVQAOw&s"
                    alt="Video thumbnail"
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                  />
                  
                  {/* YouTube Video Embed (Replace with actual video) */}
                  <div className="relative w-full h-full">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/9Tl5z5X97_0?rel=0&modestbranding=1"
                      title="Life-saving donation story"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>

                {/* Play Button Overlay (for custom video) */}
                <button
                  onClick={handleVideoPlay}
                  className="absolute inset-0 flex items-center justify-center group"
                >
                  <div className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play className="h-10 w-10 text-rose-500 ml-1" fill="#f43f5e" />
                  </div>
                </button>
              </div>

              {/* Video Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                {[
                  { value: '15M+', label: 'Views' },
                  { value: '45K+', label: 'Shares' },
                  { value: '8K+', label: 'Donors Inspired' },
                  { value: '97%', label: 'Positive Feedback' }
                ].map((stat, index) => (
                  <div key={index} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Impact Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-12">
            <div>
              <div className="inline-flex items-center space-x-2 mb-4">
                <TrendingUp className="h-6 w-6 text-rose-500" />
                <span className="text-sm font-semibold text-rose-600 uppercase tracking-wider">Our Impact</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                Making a Real Difference
              </h2>
              <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
                Every number represents a life touched, a family helped, and a community strengthened.
              </p>
            </div>

            {/* Animated Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {impactStats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white to-rose-50 rounded-2xl p-8 shadow-xl border border-rose-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="flex flex-col items-center space-y-4">
                    <div className={`p-4 rounded-xl bg-${stat.color.split('-')[1]}-50`}>
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                    <div>
                      <div className="text-3xl sm:text-4xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-gray-600 mt-2">{stat.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Impact Visualization */}
            <div className="bg-gradient-to-r from-rose-50/50 to-blue-50/50 rounded-3xl p-8 border border-rose-100">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-5xl font-bold text-rose-500">1</div>
                  <div className="text-lg font-semibold text-gray-900 mt-2">Donor</div>
                  <div className="text-gray-600">can save up to 8 lives</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold text-rose-500">45</div>
                  <div className="text-lg font-semibold text-gray-900 mt-2">Minutes</div>
                  <div className="text-gray-600">is all it takes to donate</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold text-rose-500">Every 2</div>
                  <div className="text-lg font-semibold text-gray-900 mt-2">Seconds</div>
                  <div className="text-gray-600">someone needs blood</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Help Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-white to-rose-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-12">
            <div>
              <div className="inline-flex items-center space-x-2 mb-4">
                <HandHeart className="h-6 w-6 text-rose-500" fill="#f43f5e" />
                <span className="text-sm font-semibold text-rose-600 uppercase tracking-wider">How We Help</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                Your Journey to Saving Lives
              </h2>
              <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
                We've streamlined the donation process to make it simple, safe, and impactful.
              </p>
            </div>

            {/* Steps */}
            <div className="grid md:grid-cols-3 gap-8">
              {howWeHelpSteps.map((step, index) => (
                <div
                  key={index}
                  className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-r from-rose-500 to-rose-400 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    0{index + 1}
                  </div>

                  <div className="space-y-6">
                    <div className={`p-4 rounded-xl bg-gradient-to-r ${step.color} w-16 h-16 flex items-center justify-center`}>
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <ul className="space-y-2">
                        {[
                          'Simple registration process',
                          'Verified medical partners',
                          '24/7 support available'
                        ].map((item, i) => (
                          <li key={i} className="flex items-center text-sm text-gray-600">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 mr-2" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Timeline Visualization */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-rose-100">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
                {[
                  { time: '5 min', label: 'Registration' },
                  { time: '24 hrs', label: 'Verification' },
                  { time: 'Instant', label: 'Matching' },
                  { time: '45 min', label: 'Donation' }
                ].map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-rose-500 to-rose-400 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {item.time}
                    </div>
                    <div className="mt-3 font-medium text-gray-900">{item.label}</div>
                    {index < 3 && (
                      <div className="hidden md:block absolute transform translate-x-32 w-24 h-0.5 bg-gradient-to-r from-rose-300 to-transparent"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-rose-600 via-rose-500 to-rose-400"></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '200px'
          }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-10">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <Heart className="h-5 w-5 text-white" fill="white" />
              <span className="text-sm font-medium text-white">Join Our Community of Heroes</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              Be the Reason <span className="text-rose-100">Someone Lives</span>
            </h2>

            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Your decision today can give someone a tomorrow. Join thousands of everyday heroes 
              who have chosen to make a difference.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <button className="group relative px-10 py-5 bg-white text-rose-600 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center space-x-3">
                <Heart className="h-6 w-6" fill="#f43f5e" />
                <a href="/auth"><span>Join as a Donor</span></a>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </button>

              <button className="group px-10 py-5 bg-transparent text-white rounded-2xl font-semibold text-lg border-2 border-white/50 hover:border-white hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center space-x-3">
                <Users className="h-6 w-6" />
                <span>Learn More</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12">
              {[
                { value: '100%', label: 'Safe & Secure' },
                { value: '24/7', label: 'Support' },
                { value: 'HIPAA', label: 'Compliant' },
                { value: 'No Cost', label: 'To Donors' }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-white">{item.value}</div>
                  <div className="text-sm text-white/80">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(15px); opacity: 0; }
        }
        
        .animate-bounce {
          animation: bounce 2s ease-in-out infinite;
        }
        
        .animate-scroll {
          animation: scroll 2s ease-in-out infinite;
        }
        
        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default AboutPage;