import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Droplets, 
  ActivityIcon, 
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
  Zap
} from 'lucide-react';
import BloodDonorAuthModal from './components/BloodDonorAuthModal';
import OrganDonorAuthModal from './components/OrganDonorAuthModal';
import PatientAuthModal from './components/PatientAuthModal';
import UserAuthModal from './components/UserAuthModal';

const UserTypeSelectionPage = () => {
  const [activeModal, setActiveModal] = useState(null);

  const userTypes = [
    {
      id: 'blood-donor',
      title: 'Blood Donor',
      description: 'Donate blood and save lives',
      icon: Droplets,
      color: 'from-red-500 to-rose-500',
      bgColor: 'bg-gradient-to-br from-red-500/10 to-rose-500/10',
      borderColor: 'border-red-200',
      stats: '1 donation = 3 lives saved',
      features: [
        'Register as regular donor',
        'Get donation reminders',
        'Track donation history',
        'Earn rewards & certificates'
      ],
      apiEndpoint: '/api/blood-donor'
    },
    {
      id: 'organ-donor',
      title: 'Organ Donor',
      description: 'Pledge organs for transplantation',
      icon: ActivityIcon,
      color: 'from-emerald-500 to-green-500',
      bgColor: 'bg-gradient-to-br from-emerald-500/10 to-green-500/10',
      borderColor: 'border-emerald-200',
      stats: 'Can save 8+ lives',
      features: [
        'Organ donor registration',
        'Family consent management',
        'Medical documentation',
        'Legal formalities'
      ],
      apiEndpoint: '/api/organ-donor'
    },
    {
      id: 'patient',
      title: 'Patient & Family',
      description: 'Find donors for your needs',
      icon: Ambulance,
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-gradient-to-br from-amber-500/10 to-orange-500/10',
      borderColor: 'border-amber-200',
      stats: 'Get help within hours',
      features: [
        'Emergency blood requests',
        'Find organ donors',
        'Hospital coordination',
        '24/7 support'
      ],
      apiEndpoint: '/api/patient'
    },
    {
      id: 'user',
      title: 'General User',
      description: 'Support the cause, stay connected',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10',
      borderColor: 'border-blue-200',
      stats: 'Join 100K+ supporters',
      features: [
        'Track donation drives',
        'Volunteer opportunities',
        'Community events',
        'Awareness programs'
      ],
      apiEndpoint: '/api/user'
    }
  ];

  const handleUserTypeClick = (typeId) => {
    setActiveModal(typeId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-blue-50">
      {/* Home Button */}
      <Link 
        to="/" 
        className="fixed top-6 left-6 z-50 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg border border-rose-100 hover:bg-white transition-all duration-300 hover:scale-105"
      >
        <Home className="h-5 w-5 text-rose-500" />
      </Link>

      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-gradient-to-r from-rose-500 to-rose-400 p-3 rounded-2xl shadow-lg">
              <Heart className="h-8 w-8 text-white" fill="white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">JeevanDaan</h1>
              <p className="text-gray-600 mt-2">Uniting Donors & Patients</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-4 md:p-6 border border-rose-100 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Sparkles className="h-5 w-5 text-amber-500" />
              <span className="text-sm font-medium text-gray-700">50,000+ lives saved</span>
              <Sparkles className="h-5 w-5 text-amber-500" />
            </div>
            <p className="text-gray-600 text-sm md:text-base">
              Select your role to join our lifesaving community. Each role has specific features and requirements.
            </p>
          </div>
        </div>

        {/* User Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {userTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handleUserTypeClick(type.id)}
              className={`group relative p-6 rounded-3xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${type.bgColor} ${type.borderColor}`}
            >
              <div className="relative z-10">
                {/* Icon */}
                <div className={`mb-6 p-4 rounded-2xl bg-gradient-to-r ${type.color} w-fit mx-auto shadow-lg`}>
                  <type.icon className="h-8 w-8 text-white" />
                </div>

                {/* Content */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{type.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{type.description}</p>
                  
                  {/* Stats */}
                  <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/50 backdrop-blur-sm">
                    <Zap className="h-3 w-3 text-amber-500" />
                    <span className="text-xs font-medium text-gray-700">{type.stats}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {type.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                      <span className="text-left">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Action Button */}
                <div className="flex items-center justify-center space-x-2 text-rose-500 font-semibold">
                  <span>Login/Register</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div className="text-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="text-2xl font-bold text-rose-600">50K+</div>
            <div className="text-sm text-gray-600">Active Donors</div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="text-2xl font-bold text-blue-600">24/7</div>
            <div className="text-sm text-gray-600">Support</div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="text-2xl font-bold text-emerald-600">1000+</div>
            <div className="text-sm text-gray-600">Lives Saved</div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="text-2xl font-bold text-amber-600">500+</div>
            <div className="text-sm text-gray-600">Hospitals</div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <BloodDonorAuthModal isOpen={activeModal === 'blood-donor'} onClose={closeModal} />
      <OrganDonorAuthModal isOpen={activeModal === 'organ-donor'} onClose={closeModal} />
      <PatientAuthModal isOpen={activeModal === 'patient'} onClose={closeModal} />
      <UserAuthModal isOpen={activeModal === 'user'} onClose={closeModal} />
    </div>
  );
};

export default UserTypeSelectionPage;