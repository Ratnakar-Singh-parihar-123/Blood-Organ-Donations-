import React, { useState, useRef } from 'react';
import { 
  Star, 
  Quote, 
  Heart, 
  Award,
  ChevronLeft,
  ChevronRight,
  PlayCircle,
  MapPin,
  Droplets,
  Users,
  Calendar,
  Shield
} from 'lucide-react';

const Testimonials = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const scrollRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: 'Rajesh Mehta',
      role: 'Blood Donor (12 times)',
      story: 'My father needed emergency surgery last year. Thanks to anonymous donors, he got the blood he needed. Now I donate regularly to pay it forward.',
      rating: 5,
      category: 'donor',
      location: 'Mumbai',
      donations: 12,
      avatarColor: 'bg-rose-500',
      avatarInitials: 'RM',
      highlight: 'Saved 36+ lives',
      featured: true
    },
    {
      id: 2,
      name: 'Priya Sharma',
      role: 'Organ Recipient',
      story: 'After 3 years on dialysis, I received a kidney donation. My donor gave me a second chance at life. I can now watch my children grow up.',
      rating: 5,
      category: 'recipient',
      location: 'Delhi',
      donations: 0,
      avatarColor: 'bg-emerald-500',
      avatarInitials: 'PS',
      highlight: '3 years waiting ended',
      featured: true
    },
    {
      id: 3,
      name: 'Dr. Arvind Patel',
      role: 'Cardiologist',
      story: 'I\'ve witnessed countless lives saved by blood donations in my 20-year career. Each unit represents someone\'s selfless gift to a stranger.',
      rating: 5,
      category: 'expert',
      location: 'Ahmedabad',
      donations: 25,
      avatarColor: 'bg-blue-500',
      avatarInitials: 'AP',
      highlight: '20 years experience',
      featured: false
    },
    {
      id: 4,
      name: 'Anjali Kumar',
      role: 'Platelet Donor',
      story: 'Donating platelets takes a bit longer but helps cancer patients survive chemotherapy. Knowing I\'m helping children fight cancer keeps me coming back.',
      rating: 5,
      category: 'donor',
      location: 'Bangalore',
      donations: 8,
      avatarColor: 'bg-purple-500',
      avatarInitials: 'AK',
      highlight: 'Helps cancer patients',
      featured: false
    },
    {
      id: 5,
      name: 'Vikram Singh',
      role: 'Emergency Blood Recipient',
      story: 'After a major accident, I needed 7 units of blood. I wouldn\'t be here without donors. Now my entire family donates every 3 months.',
      rating: 5,
      category: 'recipient',
      location: 'Pune',
      donations: 0,
      avatarColor: 'bg-amber-500',
      avatarInitials: 'VS',
      highlight: '7 units saved his life',
      featured: false
    },
    {
      id: 6,
      name: 'Sunita Reddy',
      role: 'Regular Donor (45 times)',
      story: 'Started donating in college, now it\'s part of my routine. LifeStream makes it so easy with their app reminders and mobile donation vans.',
      rating: 5,
      category: 'donor',
      location: 'Hyderabad',
      donations: 45,
      avatarColor: 'bg-pink-500',
      avatarInitials: 'SR',
      highlight: '45 donations milestone',
      featured: false
    },
    {
      id: 7,
      name: 'Mohammed Ali',
      role: 'Bone Marrow Donor',
      story: 'Matched with a leukemia patient across the country. The procedure was simple but the impact was enormous - she\'s now cancer-free.',
      rating: 5,
      category: 'donor',
      location: 'Chennai',
      donations: 1,
      avatarColor: 'bg-indigo-500',
      avatarInitials: 'MA',
      highlight: 'Saved from leukemia',
      featured: false
    },
    {
      id: 8,
      name: 'Rohan & Meera',
      role: 'Parents of Recipient',
      story: 'Our daughter needed blood every week during her treatment. Donors kept her alive for 6 months until she could recover. We\'re forever grateful.',
      rating: 5,
      category: 'family',
      location: 'Kolkata',
      donations: 0,
      avatarColor: 'bg-teal-500',
      avatarInitials: 'RM',
      highlight: 'Weekly transfusions',
      featured: false
    }
  ];

  const categories = [
    { id: 'all', label: 'All Stories', count: 8 },
    { id: 'donor', label: 'Donors', count: 4 },
    { id: 'recipient', label: 'Recipients', count: 2 },
    { id: 'family', label: 'Families', count: 1 },
    { id: 'expert', label: 'Experts', count: 1 }
  ];

  const filteredTestimonials = testimonials.filter(testimonial => 
    activeCategory === 'all' || testimonial.category === activeCategory
  );

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`}
      />
    ));
  };

  const categoryColors = {
    donor: 'bg-rose-100 text-rose-700',
    recipient: 'bg-emerald-100 text-emerald-700',
    family: 'bg-blue-100 text-blue-700',
    expert: 'bg-amber-100 text-amber-700'
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-rose-50 px-4 py-2 rounded-full mb-4">
            <Heart className="h-4 w-4 text-rose-500" fill="#f43f5e" />
            <span className="text-sm font-medium text-rose-700">Real Stories, Real Impact</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Stories That
            <span className="bg-gradient-to-r from-rose-600 to-rose-500 bg-clip-text text-transparent mx-2">
              Inspire Hope
            </span>
          </h2>
          
          <p className="text-lg text-gray-600">
            Meet the heroes and hear from those whose lives were changed by simple acts of kindness.
          </p>
        </div>

        {/* Stats Banner */}
        <div className="mb-12 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-rose-600">500+</div>
              <div className="text-sm text-gray-600">Stories Shared</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">10,000+</div>
              <div className="text-sm text-gray-600">Lives Impacted</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">4.9/5</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">100%</div>
              <div className="text-sm text-gray-600">Verified Stories</div>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-rose-500 to-rose-400 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-rose-200'
                }`}
              >
                {category.label}
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  activeCategory === category.id
                    ? 'bg-white/30 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Scroll Controls */}
        <div className="lg:hidden flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            {activeCategory === 'all' ? 'All Stories' : categories.find(c => c.id === activeCategory)?.label}
          </h3>
          <div className="flex space-x-2">
            <button
              onClick={scrollLeft}
              className="p-2 bg-white border border-gray-200 rounded-full hover:bg-rose-50 hover:border-rose-200 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={scrollRight}
              className="p-2 bg-white border border-gray-200 rounded-full hover:bg-rose-50 hover:border-rose-200 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Testimonials Grid - Desktop */}
        <div className="hidden lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
          {filteredTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} renderStars={renderStars} categoryColors={categoryColors} />
          ))}
        </div>

        {/* Testimonials Scroll - Mobile */}
        <div className="lg:hidden relative">
          <div
            ref={scrollRef}
            className="flex space-x-4 pb-4 overflow-x-auto scrollbar-hide scroll-snap-x"
            style={{ scrollBehavior: 'smooth' }}
          >
            {filteredTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="flex-shrink-0 w-80">
                <TestimonialCard testimonial={testimonial} renderStars={renderStars} categoryColors={categoryColors} />
              </div>
            ))}
          </div>
        </div>

        {/* Featured Testimonial */}
        <div className="mt-12 mb-16">
          <div className="bg-gradient-to-r from-rose-500 to-rose-400 rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid md:grid-cols-2">
              {/* Left: Quote */}
              <div className="p-8 md:p-12 text-white">
                <Quote className="h-12 w-12 mb-6 opacity-80" />
                <blockquote className="text-xl md:text-2xl font-medium mb-6">
                  "Seeing the direct impact of donation in my hospital every day is what inspired me to become a regular donor. It's the most meaningful thing I do."
                </blockquote>
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                    <PlayCircle className="h-8 w-8" />
                  </div>
                  <div>
                    <div className="font-bold">Watch Arvind's Story</div>
                    <div className="text-white/80">2 minute video testimonial</div>
                  </div>
                </div>
              </div>
              
              {/* Right: Profile */}
              <div className="bg-white p-8 md:p-12">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    AP
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Dr. Arvind Patel</h3>
                    <p className="text-gray-600">Cardiologist & Regular Donor</p>
                    <div className="flex items-center space-x-1 mt-1">
                      {renderStars(5)}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Droplets className="h-5 w-5 text-rose-500" />
                      <span className="text-gray-700">Donations</span>
                    </div>
                    <span className="font-bold text-gray-900">25 times</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-emerald-500" />
                      <span className="text-gray-700">Lives Impacted</span>
                    </div>
                    <span className="font-bold text-gray-900">75+ lives</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-blue-500" />
                      <span className="text-gray-700">Years Donating</span>
                    </div>
                    <span className="font-bold text-gray-900">15 years</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-flex flex-col items-center bg-gradient-to-r from-white to-rose-50 rounded-2xl p-8 border border-rose-100 max-w-2xl">
            <div className="w-20 h-20 bg-gradient-to-r from-rose-500 to-rose-400 rounded-full flex items-center justify-center mb-6">
              <Heart className="h-10 w-10 text-white" fill="white" />
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Ready to Share Your Story?
            </h3>
            <p className="text-gray-600 mb-6 max-w-lg">
              Join thousands of donors and recipients who've shared their journey. Your story could inspire someone to save a life today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="px-6 py-3 bg-gradient-to-r from-rose-500 to-rose-400 text-white font-semibold rounded-full shadow-lg shadow-rose-200 hover:shadow-xl hover:shadow-rose-300 transition-all hover:scale-105 flex items-center space-x-2">
                <Heart className="h-5 w-5" />
                <span>Share Your Donation Story</span>
              </button>
              
              <button className="px-6 py-3 bg-white text-gray-800 font-medium rounded-full border-2 border-rose-200 hover:border-rose-300 transition-colors flex items-center space-x-2">
                <Award className="h-5 w-5 text-rose-500" />
                <span>Nominate a Hero</span>
              </button>
            </div>
          </div>
        </div>

        {/* Verification Badge */}
        <div className="mt-12 flex items-center justify-center space-x-2 text-sm text-gray-500">
          <Shield className="h-4 w-4" />
          <span>All stories are verified and shared with consent</span>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scroll-snap-x {
          scroll-snap-type: x mandatory;
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ testimonial, renderStars, categoryColors }) => {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up">
      {/* Quote Icon */}
      <div className="absolute top-6 right-6 opacity-10">
        <Quote className="h-12 w-12 text-gray-400" />
      </div>

      {/* Featured Badge */}
      {testimonial.featured && (
        <div className="absolute -top-2 left-6 bg-gradient-to-r from-amber-500 to-amber-400 text-white px-3 py-1 rounded-full text-xs font-bold">
          FEATURED
        </div>
      )}

      {/* Header */}
      <div className="flex items-start space-x-4 mb-4">
        {/* Avatar */}
        <div className={`${testimonial.avatarColor} w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg relative`}>
          {testimonial.avatarInitials}
          
          {/* Category Badge */}
          <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center ${categoryColors[testimonial.category]}`}>
            {testimonial.category === 'donor' && <Heart className="h-3 w-3" />}
            {testimonial.category === 'recipient' && <Users className="h-3 w-3" />}
          </div>
        </div>

        {/* Name & Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
              <p className="text-sm text-gray-600">{testimonial.role}</p>
            </div>
            
            {/* Rating */}
            <div className="flex items-center space-x-1">
              {renderStars(testimonial.rating)}
            </div>
          </div>

          {/* Location & Stats */}
          <div className="flex items-center space-x-3 mt-2">
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <MapPin className="h-3 w-3" />
              <span>{testimonial.location}</span>
            </div>
            {testimonial.donations > 0 && (
              <div className="flex items-center space-x-1 text-sm text-rose-600 font-medium">
                <Droplets className="h-3 w-3" />
                <span>{testimonial.donations} donations</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Story */}
      <div className="mb-4">
        <p className="text-gray-700 italic">"{testimonial.story}"</p>
      </div>

      {/* Highlight */}
      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-gradient-to-r from-rose-500 to-rose-400 rounded-full"></div>
            <span className="text-sm font-medium text-gray-900">{testimonial.highlight}</span>
          </div>
          
          {/* Category Tag */}
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${categoryColors[testimonial.category]}`}>
            {testimonial.category === 'donor' && 'Donor'}
            {testimonial.category === 'recipient' && 'Recipient'}
            {testimonial.category === 'family' && 'Family'}
            {testimonial.category === 'expert' && 'Expert'}
          </span>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
    </div>
  );
};

export default Testimonials;