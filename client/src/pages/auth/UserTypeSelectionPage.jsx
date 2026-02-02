import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Droplets,
  Activity,
  Ambulance,
  Users,
  Hospital,
  Shield,
  Sparkles,
  ArrowRight,
  Home,
  Award,
  Clock,
  CheckCircle,
  Zap,
  Stethoscope,
  FileText,
  Bell,
  Calendar,
  MapPin,
  TrendingUp,
  Star,
  BadgeCheck,
  Globe,
  Activity as ActivityIcon
} from 'lucide-react';

// logo image 
import jeevandaans from "../../../public/jeevandaan.png"
import BloodDonorAuthModal from './components/BloodDonorAuthModal';
import OrganDonorAuthModal from './components/OrganDonorAuthModal';
import PatientAuthModal from './components/PatientAuthModal';
import UserAuthModal from './components/UserAuthModal';
import HospitalAuthModal from './components/HospitalAuthModal';

const UserTypeSelectionPage = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const userTypes = [
    {
      id: 'blood-donor',
      title: 'Blood Donor',
      description: 'Donate blood, save lives',
      icon: Droplets,
      color: 'from-red-500 to-rose-500',
      gradient: 'bg-gradient-to-br from-red-500 to-rose-500',
      bgColor: 'bg-gradient-to-b from-red-50/80 to-rose-50/80',
      borderColor: 'border-red-100',
      hoverBorder: 'hover:border-red-300',
      stats: '1 donation = 3 lives saved',
      tagline: 'Be a lifesaver',
      priority: 'High Demand',
      features: [
        'Register as regular donor',
        'Get donation reminders',
        'Track donation history',
        'Earn rewards & certificates',
        'Emergency alerts',
        'Health checkups'
      ],
      benefits: [
        'Free health screening',
        'Insurance benefits',
        'Priority treatment',
        'Community recognition'
      ],
      apiEndpoint: '/api/blood-donor'
    },
    {
      id: 'organ-donor',
      title: 'Organ Donor',
      description: 'Pledge organs for transplantation',
      icon: ActivityIcon,
      color: 'from-emerald-500 to-green-500',
      gradient: 'bg-gradient-to-br from-emerald-500 to-green-500',
      bgColor: 'bg-gradient-to-b from-emerald-50/80 to-green-50/80',
      borderColor: 'border-emerald-100',
      hoverBorder: 'hover:border-emerald-300',
      stats: 'Can save 8+ lives',
      tagline: 'Leave a legacy',
      priority: 'Critical Need',
      features: [
        'Organ donor registration',
        'Family consent management',
        'Medical documentation',
        'Legal formalities',
        '24/7 coordination',
        'Posthumous support'
      ],
      benefits: [
        'Family counseling',
        'Legal assistance',
        'Medical coverage',
        'Memorial recognition'
      ],
      apiEndpoint: '/api/organ-donor'
    },
    {
      id: 'patient',
      title: 'Patient & Family',
      description: 'Find donors for your needs',
      icon: Ambulance,
      color: 'from-amber-500 to-orange-500',
      gradient: 'bg-gradient-to-br from-amber-500 to-orange-500',
      bgColor: 'bg-gradient-to-b from-amber-50/80 to-orange-50/80',
      borderColor: 'border-amber-100',
      hoverBorder: 'hover:border-amber-300',
      stats: 'Get help within hours',
      tagline: 'We are here for you',
      priority: 'Immediate Support',
      features: [
        'Emergency blood requests',
        'Find organ donors',
        'Hospital coordination',
        '24/7 support',
        'Financial assistance',
        'Counseling services'
      ],
      benefits: [
        'Priority matching',
        'Cost optimization',
        'Emotional support',
        'Network access'
      ],
      apiEndpoint: '/api/patient'
    },
    {
      id: 'hospital',
      title: 'Hospital & Clinic',
      description: 'Manage donations & patients',
      icon: Hospital,
      color: 'from-blue-500 to-indigo-500',
      gradient: 'bg-gradient-to-br from-blue-500 to-indigo-500',
      bgColor: 'bg-gradient-to-b from-blue-50/80 to-indigo-50/80',
      borderColor: 'border-blue-100',
      hoverBorder: 'hover:border-blue-300',
      stats: '500+ partners',
      tagline: 'Join our network',
      priority: 'Verified Partners',
      features: [
        'Donor database access',
        'Patient management',
        'Inventory tracking',
        'Emergency coordination',
        'Analytics dashboard',
        'Staff training'
      ],
      benefits: [
        'Verified credentials',
        'Priority allocation',
        'Training programs',
        'Marketing support'
      ],
      apiEndpoint: '/api/hospital'
    },
    {
      id: 'user',
      title: 'General User',
      description: 'Support the cause',
      icon: Users,
      color: 'from-purple-500 to-pink-500',
      gradient: 'bg-gradient-to-br from-purple-500 to-pink-500',
      bgColor: 'bg-gradient-to-b from-purple-50/80 to-pink-50/80',
      borderColor: 'border-purple-100',
      hoverBorder: 'hover:border-purple-300',
      stats: 'Join 100K+ supporters',
      tagline: 'Make a difference',
      priority: 'Community',
      features: [
        'Track donation drives',
        'Volunteer opportunities',
        'Community events',
        'Awareness programs',
        'Educational content',
        'Social sharing'
      ],
      benefits: [
        'Skill development',
        'Networking',
        'Certification',
        'Recognition'
      ],
      apiEndpoint: '/api/user'
    }
  ];

  const stats = [
    { value: '50,000+', label: 'Active Donors', icon: Users, color: 'text-red-500', bg: 'bg-red-50' },
    { value: '24/7', label: 'Emergency Support', icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50' },
    { value: '1,000+', label: 'Lives Saved Monthly', icon: Heart, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { value: '500+', label: 'Hospital Partners', icon: Hospital, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { value: '100+', label: 'Cities Covered', icon: MapPin, color: 'text-amber-500', bg: 'bg-amber-50' },
    { value: '98%', label: 'Success Rate', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-50' },
  ];

  const handleUserTypeClick = (typeId) => {
    setActiveModal(typeId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50/50 via-white to-blue-50/50">
      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-200/10 rounded-full -translate-y-48 translate-x-48 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200/10 rounded-full translate-y-48 -translate-x-48 blur-3xl"></div>
      </div>

      {/* Navigation */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          to="/"
          className="group bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-xl border border-rose-100 hover:bg-white transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center gap-2"
        >
          <Home className="h-5 w-5 text-rose-500 group-hover:text-rose-600" />
          <span className="text-sm font-medium text-gray-700 hidden sm:block">Home</span>
        </Link>
      </div>

      <div className="relative container mx-auto px-4 py-8 md:py-20">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 md:mb-20">
          {/* Logo & Title */}
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-rose-400 blur-xl opacity-70 rounded-full"></div>
              <div className="relative bg-gradient-to-r from-rose-500 to-rose-400 p-4 rounded-full shadow-2xl">
                <img
                  src={jeevandaans}
                  alt="Lung"
                  className="h-25 w-25 object-contain rounded-full"
                />
              </div>

            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-rose-500 to-rose-400 bg-clip-text text-transparent">
                JeevanDaan
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              A unified platform connecting donors, patients, hospitals, and supporters
            </p>
          </div>

          {/* Tagline Card */}
          <div className="bg-gradient-to-r from-rose-50/80 to-pink-50/80 rounded-3xl p-6 md:p-8 border border-rose-100 backdrop-blur-sm shadow-lg max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-500" fill="currentColor" />
                <span className="text-sm font-semibold text-gray-800">50,000+ lives saved</span>
                <Sparkles className="h-5 w-5 text-amber-500" fill="currentColor" />
              </div>
              <div className="hidden sm:block w-px h-6 bg-rose-200"></div>
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-5 w-5 text-emerald-500" />
                <span className="text-sm font-semibold text-gray-800">Verified & Secure</span>
              </div>
            </div>
            <p className="text-gray-700 text-center leading-relaxed">
              Select your role to join India's largest lifesaving community. Each role offers specialized features
              designed to maximize impact and provide comprehensive support.
            </p>
          </div>
        </div>

        {/* User Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto mb-16">
          {userTypes.map((type) => (
            <div
              key={type.id}
              onMouseEnter={() => setHoveredCard(type.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="relative group"
            >
              {/* Glow Effect */}
              {hoveredCard === type.id && (
                <div className={`absolute inset-0 ${type.color.replace('from-', 'bg-gradient-to-br from-')} blur-xl opacity-20 rounded-3xl -z-10`}></div>
              )}

              <button
                onClick={() => handleUserTypeClick(type.id)}
                className={`relative w-full h-full p-6 rounded-3xl border-2 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${type.bgColor} ${type.borderColor} ${type.hoverBorder} backdrop-blur-sm z-10`}
              >
                {/* Priority Badge */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${type.gradient} shadow-lg`}>
                    {type.priority}
                  </span>
                </div>

                <div className="relative z-10 h-full flex flex-col">
                  {/* Icon */}
                  <div className={`mb-6 p-4 rounded-2xl ${type.gradient} w-fit mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <type.icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Content */}
                  <div className="text-center mb-6 flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-950 transition-colors">
                      {type.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{type.description}</p>

                    {/* Tagline */}
                    <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/50 backdrop-blur-sm border border-white/50">
                      <Zap className="h-3 w-3 text-amber-500" fill="currentColor" />
                      <span className="text-xs font-semibold text-gray-800">{type.tagline}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="mb-6">
                    <div className="flex items-center justify-center space-x-2 mb-3">
                      <Award className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">{type.stats}</span>
                    </div>

                    {/* Quick Features */}
                    <div className="space-y-2">
                      {type.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-xs text-gray-600">
                          <CheckCircle className="h-3 w-3 text-emerald-500 flex-shrink-0" />
                          <span className="text-left truncate">{feature}</span>
                        </div>
                      ))}
                      <div className="text-xs text-gray-500 text-center pt-1">
                        +{type.features.length - 3} more features
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-auto pt-4 border-t border-white/30">
                    <div className="flex items-center justify-center space-x-2 font-semibold group-hover:gap-3 transition-all duration-300">
                      <span className={`bg-gradient-to-r ${type.color} bg-clip-text text-transparent`}>
                        Login / Register
                      </span>
                      <ArrowRight className={`h-4 w-4 ${type.color.replace('from-', 'text-').split(' ')[0]}`} />
                    </div>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Our Impact in Numbers
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real-time statistics showcasing our community's lifesaving achievements
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className={`${stat.bg} p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300`}
                >
                  <div className="flex flex-col items-center">
                    <div className={`p-2 rounded-lg ${stat.bg} mb-2`}>
                      <Icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-xs text-gray-600 text-center">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-r from-white to-rose-50/30 rounded-3xl p-8 md:p-12 border border-rose-100 shadow-lg max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Why Join JeevanDaan?
            </h2>
            <p className="text-gray-600">
              Comprehensive benefits for every member of our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: '100% Secure',
                description: 'Bank-level security for all your data',
                color: 'text-blue-500',
                bg: 'bg-blue-50'
              },
              {
                icon: Globe,
                title: 'Nationwide Network',
                description: 'Connect with donors across India',
                color: 'text-emerald-500',
                bg: 'bg-emerald-50'
              },
              {
                icon: Star,
                title: 'Verified Profiles',
                description: 'All members are authenticated',
                color: 'text-amber-500',
                bg: 'bg-amber-50'
              },
              {
                icon: FileText,
                title: 'Digital Records',
                description: 'Maintain secure health records',
                color: 'text-purple-500',
                bg: 'bg-purple-50'
              },
            ].map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div key={idx} className={`${benefit.bg} p-6 rounded-2xl border border-gray-100`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-xl ${benefit.bg}`}>
                      <Icon className={`h-6 w-6 ${benefit.color}`} />
                    </div>
                    <h3 className="font-bold text-gray-900">{benefit.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modals */}
      <BloodDonorAuthModal isOpen={activeModal === 'blood-donor'} onClose={closeModal} />
      <OrganDonorAuthModal isOpen={activeModal === 'organ-donor'} onClose={closeModal} />
      <PatientAuthModal isOpen={activeModal === 'patient'} onClose={closeModal} />
      <HospitalAuthModal isOpen={activeModal === 'hospital'} onClose={closeModal} />
      <UserAuthModal isOpen={activeModal === 'user'} onClose={closeModal} />
    </div>
  );
};

export default UserTypeSelectionPage;