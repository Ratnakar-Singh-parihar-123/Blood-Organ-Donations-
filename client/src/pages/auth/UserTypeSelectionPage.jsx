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
  FileText,
  Globe,
  Star,
  Target,
  LifeBuoy,
  ShieldCheck,
  UserCheck,
  Download,
  Smartphone,
  Cpu,
  Users as UsersIcon
} from 'lucide-react';

// Logo import
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
      description: 'Donate blood, save up to 3 lives',
      icon: Droplets,
      color: '#ef4444',
      gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      badgeColor: 'bg-red-500',
      features: ['Health screening', 'Donation tracking', 'Emergency alerts', 'Rewards'],
      stats: '1 donation = 3 lives'
    },
    {
      id: 'organ-donor',
      title: 'Organ Donor',
      description: 'Give the gift of life',
      icon: Activity,
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      badgeColor: 'bg-emerald-500',
      features: ['Legal support', 'Family consent', 'Medical docs', '24/7 coordination'],
      stats: 'Save 8+ lives'
    },
    {
      id: 'patient',
      title: 'Patient',
      description: 'Find donors quickly',
      icon: Ambulance,
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      badgeColor: 'bg-amber-500',
      features: ['Emergency requests', 'Donor matching', 'Support network', 'Counseling'],
      stats: 'Quick matching'
    },
    {
      id: 'hospital',
      title: 'Hospital',
      description: 'Manage donations efficiently',
      icon: Hospital,
      color: '#3b82f6',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      badgeColor: 'bg-blue-500',
      features: ['Donor database', 'Patient management', 'Analytics', 'Training'],
      stats: '500+ partners'
    },
    {
      id: 'user',
      title: 'Volunteer',
      description: 'Support the cause',
      icon: Users,
      color: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      badgeColor: 'bg-purple-500',
      features: ['Events', 'Awareness', 'Community', 'Certification'],
      stats: '100K+ supporters'
    }
  ];

  const stats = [
    { value: '50K+', label: 'Active Donors', icon: UsersIcon, color: 'text-red-500' },
    { value: '24/7', label: 'Support', icon: Clock, color: 'text-blue-500' },
    { value: '1K+', label: 'Lives/Month', icon: Heart, color: 'text-emerald-500' },
    { value: '500+', label: 'Hospitals', icon: Hospital, color: 'text-indigo-500' },
    { value: '100%', label: 'Secure', icon: ShieldCheck, color: 'text-amber-500' },
    { value: '98%', label: 'Success Rate', icon: Target, color: 'text-green-500' },
  ];

  const benefits = [
    {
      icon: ShieldCheck,
      title: 'Verified & Secure',
      description: 'End-to-end encrypted platform with verified profiles',
      color: 'text-blue-500'
    },
    {
      icon: Globe,
      title: 'Nationwide Reach',
      description: 'Connecting donors and recipients across India',
      color: 'text-emerald-500'
    },
    {
      icon: UserCheck,
      title: 'Easy Registration',
      description: 'Simple 5-minute signup process',
      color: 'text-purple-500'
    },
    {
      icon: LifeBuoy,
      title: '24/7 Support',
      description: 'Round-the-clock emergency assistance',
      color: 'text-amber-500'
    }
  ];

  const handleUserTypeClick = (typeId) => {
    setActiveModal(typeId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-100/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-100/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-100/10 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-rose-500 to-rose-400 p-1.5">
                <img
                  src={jeevandaans}
                  alt="JeevanDaan Logo"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-rose-500 to-rose-400 bg-clip-text text-transparent">
                JeevanDaan
              </span>
            </Link>
            
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative container mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Join India's Largest Lifesaving Community
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Choose Your{' '}
            <span className="bg-gradient-to-r from-rose-500 to-rose-400 bg-clip-text text-transparent">
              Role
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Select how you want to contribute or receive support. Each role is designed to make a real difference.
          </p>
        </div>

        {/* User Type Cards */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
            {userTypes.map((type) => {
              const Icon = type.icon;
              return (
                <div
                  key={type.id}
                  onMouseEnter={() => setHoveredCard(type.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="relative group"
                >
                  <button
                    onClick={() => handleUserTypeClick(type.id)}
                    className="relative w-full h-full p-5 rounded-2xl bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    {/* Badge */}
                    <div className={`absolute -top-2 right-4 ${type.badgeColor} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                      {type.stats}
                    </div>

                    {/* Icon */}
                    <div 
                      className="mb-5 p-3 rounded-xl w-14 h-14 flex items-center justify-center"
                      style={{ background: type.gradient }}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Content */}
                    <div className="text-left">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-950">
                        {type.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                        {type.description}
                      </p>

                      {/* Features */}
                      <div className="space-y-2 mb-6">
                        {type.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                            <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="text-sm font-semibold" style={{ color: type.color }}>
                          Get Started
                        </span>
                        <ArrowRight className="w-4 h-4" style={{ color: type.color }} />
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Making an Impact Together
            </h2>
            <p className="text-gray-600">
              Real numbers showing our collective lifesaving achievements
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="bg-gray-50 rounded-xl p-4 text-center hover:bg-white hover:shadow-md transition-all duration-300"
                >
                  <div className={`${stat.color} mb-2 flex justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-5 border border-gray-100 hover:border-gray-200 transition-all duration-300"
                >
                  <div className={`${benefit.color} mb-4`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-3xl p-8 md:p-10 border border-rose-100">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-rose-600 text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Ready to Make a Difference?
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Join 100,000+ Lifesavers Today
            </h3>
            
            <p className="text-gray-600 mb-8">
              Your registration takes less than 5 minutes but can save multiple lives.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-rose-500 to-rose-400 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-rose-200 transition-all duration-300">
                Need Help? Contact Support
              </button>
              <button className="px-8 py-3 bg-white text-rose-500 font-semibold rounded-full border border-rose-200 hover:bg-rose-50 transition-all duration-300">
                Download Mobile App
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}

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