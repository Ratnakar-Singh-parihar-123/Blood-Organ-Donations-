import React, { useState, useRef, useEffect } from 'react';
import { 
  Heart,
  Users,
  Quote,
  Calendar,
  MapPin,
  Award,
  ChevronLeft,
  ChevronRight,
  PlayCircle,
  Sparkles,
  Gift,
  Droplets,
  Clock,
  Share2,
  MessageCircle,
  Star,
  Zap,
  ArrowRight
} from 'lucide-react';

const ImpactStories = () => {
  const [activeStory, setActiveStory] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const scrollRef = useRef(null);

  const stories = [
    {
      id: 1,
      type: 'recipient',
      name: 'Sarah Johnson',
      age: 32,
      location: 'Chicago, IL',
      avatarColor: 'from-rose-500 to-pink-400',
      avatarInitials: 'SJ',
      quote: "My heart donor gave me a second chance to watch my daughter grow up. Every birthday we celebrate is because of their gift.",
      story: "After 3 years on the transplant waiting list with cardiomyopathy, Sarah received a heart transplant that saved her life. She's now an advocate for organ donation.",
      impact: 'Heart transplant recipient',
      timeAgo: '2 years ago',
      before: 'Heart function: 15%',
      after: 'Heart function: 85%',
      livesTouched: 1,
      videoAvailable: true,
      tags: ['Heart', 'Mother', 'Advocate']
    },
    {
      id: 2,
      type: 'donor-family',
      name: 'The Rodriguez Family',
      age: '45',
      location: 'Miami, FL',
      avatarColor: 'from-blue-500 to-cyan-400',
      avatarInitials: 'RF',
      quote: "Our son Carlos saved 8 lives through organ donation. Knowing he lives on in others brings us comfort every day.",
      story: "After a tragic accident, the Rodriguez family honored their son's wish to be an organ donor. His organs saved 8 people across 3 states.",
      impact: 'Organ donor family',
      timeAgo: '1 year ago',
      before: 'Grief and loss',
      after: 'Purpose and legacy',
      livesTouched: 8,
      videoAvailable: true,
      tags: ['Family', 'Hero', 'Legacy']
    },
    {
      id: 3,
      type: 'living-donor',
      name: 'Michael Chen',
      age: 28,
      location: 'San Francisco, CA',
      avatarColor: 'from-emerald-500 to-green-400',
      avatarInitials: 'MC',
      quote: "Donating a kidney to my brother was the easiest decision I ever made. Seeing him healthy again is everything.",
      story: "Michael donated a kidney to his younger brother who was on dialysis for 4 years. Both are now living healthy, active lives.",
      impact: 'Living kidney donor',
      timeAgo: '6 months ago',
      before: 'Brother on dialysis',
      after: 'Both living healthy lives',
      livesTouched: 1,
      videoAvailable: false,
      tags: ['Living Donor', 'Brother', 'Kidney']
    },
    {
      id: 4,
      type: 'recipient',
      name: 'James Wilson',
      age: 58,
      location: 'Dallas, TX',
      avatarColor: 'from-amber-500 to-orange-400',
      avatarInitials: 'JW',
      quote: "After my double lung transplant, I can breathe freely for the first time in 10 years. I'm training for a 5K.",
      story: "James suffered from pulmonary fibrosis for a decade before receiving a double lung transplant. He's now an active volunteer.",
      impact: 'Double lung recipient',
      timeAgo: '3 years ago',
      before: 'Oxygen dependent',
      after: 'Training for 5K',
      livesTouched: 1,
      videoAvailable: true,
      tags: ['Lungs', 'Active', 'Volunteer']
    },
    {
      id: 5,
      type: 'donor',
      name: 'Lisa Martinez',
      age: 42,
      location: 'Phoenix, AZ',
      avatarColor: 'from-purple-500 to-violet-400',
      avatarInitials: 'LM',
      quote: "Registering as a donor was a 5-minute decision that I know will one day mean everything to someone else.",
      story: "Lisa registered as an organ donor 20 years ago and regularly encourages others to do the same through her advocacy work.",
      impact: 'Registered donor & advocate',
      timeAgo: '20 years registered',
      before: 'Unregistered',
      after: 'Potential lifesaver',
      livesTouched: 'Up to 8',
      videoAvailable: false,
      tags: ['Advocate', 'Educator', 'Registered']
    },
    {
      id: 6,
      type: 'recipient',
      name: 'Aisha Thompson',
      age: 24,
      location: 'Atlanta, GA',
      avatarColor: 'from-indigo-500 to-blue-400',
      avatarInitials: 'AT',
      quote: "Corneal transplants restored my sight. I can see my newborn's face clearly now. That's a miracle.",
      story: "Born with corneal dystrophy, Aisha received corneal transplants that restored her vision just before her first child was born.",
      impact: 'Corneal transplant recipient',
      timeAgo: '1 year ago',
      before: 'Legally blind',
      after: '20/20 vision',
      livesTouched: 2,
      videoAvailable: true,
      tags: ['Eyes', 'Mother', 'Miracle']
    }
  ];

  const activeStoryData = stories[activeStory];

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

  const typeColors = {
    recipient: 'bg-rose-100 text-rose-700',
    'donor-family': 'bg-blue-100 text-blue-700',
    'living-donor': 'bg-emerald-100 text-emerald-700',
    donor: 'bg-purple-100 text-purple-700'
  };

  const typeLabels = {
    recipient: 'Recipient',
    'donor-family': 'Donor Family',
    'living-donor': 'Living Donor',
    donor: 'Registered Donor'
  };

  const stats = [
    { value: '500+', label: 'Stories Shared', icon: MessageCircle, color: 'text-rose-500' },
    { value: '10,000+', label: 'Lives Impacted', icon: Users, color: 'text-emerald-500' },
    { value: '39,000', label: '2023 Transplants', icon: Gift, color: 'text-blue-500' },
    { value: '95%', label: 'Would Donate Again', icon: Star, color: 'text-amber-500' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Update active story based on scroll position on mobile
      if (scrollRef.current) {
        const scrollLeft = scrollRef.current.scrollLeft;
        const cardWidth = 300; // Approximate card width + gap
        const newActive = Math.round(scrollLeft / cardWidth);
        if (newActive !== activeStory && newActive >= 0 && newActive < stories.length) {
          setActiveStory(newActive);
        }
      }
    };

    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
      return () => currentRef.removeEventListener('scroll', handleScroll);
    }
  }, [activeStory]);

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-rose-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-rose-50 px-4 py-2 rounded-full mb-4">
            <Heart className="h-4 w-4 text-rose-500" fill="#f43f5e" />
            <span className="text-sm font-medium text-rose-700">Real Impact, Real People</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Stories of
            <span className="bg-gradient-to-r from-rose-600 to-rose-500 bg-clip-text text-transparent mx-2">
              Hope & Healing
            </span>
          </h2>
          
          <p className="text-lg text-gray-600">
            Meet the courageous individuals and families whose lives have been forever changed by organ donation.
          </p>
        </div>

        {/* Stats Banner */}
        <div className="mb-12 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-sm text-gray-600 flex items-center justify-center space-x-1">
                  <stat.icon className="h-4 w-4" />
                  <span>{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Impact Stories</h3>
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

        {/* Stories Grid - Desktop */}
        <div className="hidden lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
          {stories.map((story, index) => (
            <StoryCard 
              key={story.id}
              story={story}
              index={index}
              isActive={activeStory === index}
              onClick={() => setActiveStory(index)}
              typeColors={typeColors}
              typeLabels={typeLabels}
            />
          ))}
        </div>

        {/* Stories Scroll - Mobile */}
        <div className="lg:hidden relative mb-12">
          <div
            ref={scrollRef}
            className="flex space-x-4 pb-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
            style={{ scrollBehavior: 'smooth' }}
          >
            {stories.map((story, index) => (
              <div key={story.id} className="flex-shrink-0 w-80 snap-start">
                <StoryCard 
                  story={story}
                  index={index}
                  isActive={activeStory === index}
                  onClick={() => setActiveStory(index)}
                  typeColors={typeColors}
                  typeLabels={typeLabels}
                />
              </div>
            ))}
          </div>
          
          {/* Mobile Scroll Indicator */}
          <div className="flex justify-center space-x-2 mt-4">
            {stories.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveStory(index);
                  if (scrollRef.current) {
                    scrollRef.current.scrollTo({
                      left: index * 320,
                      behavior: 'smooth'
                    });
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeStory === index 
                    ? 'bg-gradient-to-r from-rose-500 to-rose-400 w-6' 
                    : 'bg-gray-300'
                }`}
                aria-label={`Go to story ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Featured Story Detail */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
            {/* Header */}
            <div className={`bg-gradient-to-r ${activeStoryData.avatarColor} p-6`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                  <div className="relative">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {activeStoryData.avatarInitials}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full border-2 border-rose-500 flex items-center justify-center">
                      {activeStoryData.type === 'recipient' && <Heart className="h-3 w-3 text-rose-500" />}
                      {activeStoryData.type === 'donor-family' && <Users className="h-3 w-3 text-blue-500" />}
                      {activeStoryData.type === 'living-donor' && <Gift className="h-3 w-3 text-emerald-500" />}
                      {activeStoryData.type === 'donor' && <Award className="h-3 w-3 text-purple-500" />}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{activeStoryData.name}</h3>
                    <div className="flex items-center space-x-3 text-white/90">
                      <span>{activeStoryData.age} years</span>
                      <span>•</span>
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {activeStoryData.location}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${typeColors[activeStoryData.type]}`}>
                    {typeLabels[activeStoryData.type]}
                  </span>
                  {activeStoryData.videoAvailable && (
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                    >
                      <PlayCircle className="h-6 w-6 text-white" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 lg:p-8">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div>
                  {/* Quote */}
                  <div className="mb-8">
                    <Quote className="h-8 w-8 text-rose-300 mb-4" />
                    <blockquote className="text-xl lg:text-2xl text-gray-700 italic leading-relaxed">
                      "{activeStoryData.quote}"
                    </blockquote>
                  </div>

                  {/* Story */}
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                      <Sparkles className="h-5 w-5 text-amber-500 mr-2" />
                      Their Story
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {activeStoryData.story}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {activeStoryData.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Column */}
                <div>
                  {/* Before/After */}
                  <div className="mb-8">
                    <h4 className="font-bold text-gray-900 mb-4">Impact Journey</h4>
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl border border-rose-100">
                        <div className="flex items-center space-x-2 mb-2">
                          <Clock className="h-5 w-5 text-rose-500" />
                          <span className="font-medium text-gray-900">Before</span>
                        </div>
                        <p className="text-gray-700">{activeStoryData.before}</p>
                      </div>
                      
                      <ArrowRight className="h-6 w-6 text-rose-400 mx-auto" />
                      
                      <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-100">
                        <div className="flex items-center space-x-2 mb-2">
                          <Gift className="h-5 w-5 text-emerald-500" />
                          <span className="font-medium text-gray-900">After</span>
                        </div>
                        <p className="text-gray-700">{activeStoryData.after}</p>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <Users className="h-6 w-6 text-blue-500" />
                        <div>
                          <div className="text-sm text-gray-500">Lives Touched</div>
                          <div className="text-2xl font-bold text-gray-900">{activeStoryData.livesTouched}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-6 w-6 text-purple-500" />
                        <div>
                          <div className="text-sm text-gray-500">Time Since</div>
                          <div className="text-xl font-bold text-gray-900">{activeStoryData.timeAgo}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 space-y-3">
                    <button className="w-full py-3 bg-gradient-to-r from-rose-500 to-rose-400 text-white font-semibold rounded-lg hover:shadow-lg transition-all flex items-center justify-center space-x-2">
                      <Share2 className="h-5 w-5" />
                      <span>Share This Story</span>
                    </button>
                    
                    <button className="w-full py-3 bg-white text-gray-800 font-medium rounded-lg border-2 border-rose-200 hover:border-rose-300 transition-colors flex items-center justify-center space-x-2">
                      <MessageCircle className="h-5 w-5 text-rose-500" />
                      <span>Send Message of Hope</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Section */}
        {activeStoryData.videoAvailable && isPlaying && (
          <div className="mb-12 bg-black/5 rounded-2xl p-8 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-bold text-gray-900">
                {activeStoryData.name}'s Story Video
              </h4>
              <button 
                onClick={() => setIsPlaying(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>
            <div className="aspect-video bg-gradient-to-br from-gray-900 to-black rounded-xl flex items-center justify-center">
              <div className="text-center">
                <PlayCircle className="h-20 w-20 text-white/50 mx-auto mb-4" />
                <div className="text-white font-medium">Video would play here</div>
                <div className="text-white/60 text-sm mt-2">(In a real implementation, this would embed a video player)</div>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-flex flex-col items-center bg-gradient-to-r from-white to-rose-50 rounded-2xl p-8 border border-rose-100 max-w-2xl">
            <div className="w-20 h-20 bg-gradient-to-r from-rose-500 to-rose-400 rounded-full flex items-center justify-center mb-6 relative">
              <Heart className="h-10 w-10 text-white" fill="white" />
              <div className="absolute inset-0 border-4 border-rose-300 rounded-full animate-ping opacity-30"></div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Inspired by These Stories?
            </h3>
            <p className="text-gray-600 mb-6 max-w-lg">
              Your story could be next. Register as an organ donor and become someone's hero.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="group px-8 py-4 bg-gradient-to-r from-rose-500 to-rose-400 text-white font-bold rounded-full shadow-2xl shadow-rose-300 hover:shadow-3xl hover:shadow-rose-400 transition-all duration-300 hover:scale-105 flex items-center space-x-3">
                <Zap className="h-6 w-6" />
                <span>Start My Donor Story</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </button>
              
              <button className="px-8 py-4 bg-white text-gray-800 font-medium rounded-full border-2 border-rose-200 hover:border-rose-300 transition-colors flex items-center space-x-2">
                <Droplets className="h-5 w-5 text-rose-500" />
                <span>Share My Story</span>
              </button>
            </div>
            
            <div className="mt-6 text-sm text-gray-500">
              <span className="flex items-center space-x-1">
                <Award className="h-4 w-4" />
                <span>All stories shared with permission and gratitude</span>
              </span>
            </div>
          </div>
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
        
        .snap-x {
          scroll-snap-type: x mandatory;
        }
        
        .snap-start {
          scroll-snap-align: start;
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

// Story Card Component
const StoryCard = ({ story, index, isActive, onClick, typeColors, typeLabels }) => {
  return (
    <div
      onClick={onClick}
      className={`group cursor-pointer bg-white rounded-2xl border p-6 shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
        isActive
          ? 'border-rose-300 shadow-xl ring-2 ring-rose-100'
          : 'border-gray-100 hover:border-rose-200'
      } animate-fade-in-up`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`relative ${story.avatarColor} w-12 h-12 rounded-full flex items-center justify-center text-white font-bold`}>
            {story.avatarInitials}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full border-2 border-rose-500 flex items-center justify-center">
              {story.type === 'recipient' && <Heart className="h-2.5 w-2.5 text-rose-500" />}
              {story.type === 'donor-family' && <Users className="h-2.5 w-2.5 text-blue-500" />}
            </div>
          </div>
          <div>
            <h3 className="font-bold text-gray-900">{story.name}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>{story.age}</span>
              <span>•</span>
              <span>{story.location}</span>
            </div>
          </div>
        </div>
        
        {/* Type Badge */}
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[story.type]}`}>
          {typeLabels[story.type]}
        </span>
      </div>

      {/* Quote Preview */}
      <div className="mb-4">
        <Quote className="h-6 w-6 text-rose-200 mb-2" />
        <p className="text-gray-600 italic line-clamp-2">"{story.quote}"</p>
      </div>

      {/* Impact Badge */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">{story.impact}</span>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4 text-rose-500" />
            <span className="text-sm font-bold text-rose-600">{story.livesTouched}</span>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-4">
        {story.tags.slice(0, 2).map((tag, idx) => (
          <span 
            key={idx}
            className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
          >
            {tag}
          </span>
        ))}
        {story.tags.length > 2 && (
          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
            +{story.tags.length - 2}
          </span>
        )}
      </div>

      {/* Time & Video Indicator */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-1 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          <span>{story.timeAgo}</span>
        </div>
        {story.videoAvailable && (
          <div className="flex items-center space-x-1 text-rose-500">
            <PlayCircle className="h-4 w-4" />
            <span className="text-sm font-medium">Video</span>
          </div>
        )}
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
    </div>
  );
};

export default ImpactStories;