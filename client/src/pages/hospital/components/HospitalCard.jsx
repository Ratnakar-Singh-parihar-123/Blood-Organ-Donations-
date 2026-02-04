import React, { useState } from 'react';
import { 
  Phone, 
  Star, 
  MapPin, 
  Clock, 
  Heart,
  Droplets,
  Users,
  Shield,
  CheckCircle,
  Eye,
  Navigation,
  Calendar,
  Bed,
  Ambulance,
  Stethoscope,
  Pill,
  Building,
  Globe,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Share2,
  MessageCircle,
  Award,
  Zap,
  CreditCard,
  ClipboardCheck,
  BriefcaseMedical,
  Car,
  Wifi,
  Coffee,
  ParkingCircle,
  AlertCircle
} from 'lucide-react';

const HospitalCard = ({ hospital, userLocation }) => {
  // Add null check at the beginning
  if (!hospital) {
    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 p-6">
        <div className="text-center py-8">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Hospital Data Not Available</h3>
          <p className="text-gray-500">Please try again or select a different hospital.</p>
        </div>
      </div>
    );
  }

  // Safe destructuring with defaults
  const {
    name = 'Unknown Hospital',
    registrationNumber = 'N/A',
    address = 'Address not available',
    city = 'Unknown City',
    phone = '+91 00000 00000',
    email = 'info@hospital.com',
    rating = 0,
    totalRatings = 0,
    distance = 0,
    isEmergency = false,
    isVerified = false,
    is24x7 = false,
    facilities = [],
    availableBloodGroups = [],
    availableOrgans = [],
    bedAvailability = 0,
    ambulanceCount = 0,
    waitingTime = 'Unknown',
    emergencyWaitTime = 'Unknown',
    consultationFee = '₹0 - ₹0',
    coordinates = null,
    specializations = [],
    doctorsCount = 0,
    established = 'N/A',
    insuranceAccepted = []
  } = hospital;

  const [showDetails, setShowDetails] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleEmergencyCall = () => {
    window.location.href = `tel:${phone}`;
  };

  const handleGetDirections = () => {
    if (userLocation && coordinates) {
      const { lat, lng } = coordinates;
      window.open(`https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${lat},${lng}`, '_blank');
    } else {
      window.open(`https://www.google.com/maps/search/?api=1&query=${address},${city}`, '_blank');
    }
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: `${name} - Hospital Details`,
        text: `Check out ${name} on Hospital Finder App. Rating: ${rating}/5, Distance: ${distance}km`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(`${name} - ${address}\nRating: ${rating}/5\nDistance: ${distance}km`);
      alert('Hospital details copied to clipboard!');
    }
  };

  const handleQuickActions = (action) => {
    switch(action) {
      case 'appointment':
        alert(`Booking appointment at ${name}`);
        break;
      case 'blood':
        alert(`Requesting blood from ${name}`);
        break;
      case 'organ':
        alert(`Inquiring about organ availability at ${name}`);
        break;
      default:
        break;
    }
  };

  // Calculate availability percentage
  const availabilityPercentage = Math.min(100, (bedAvailability / 100) * 100);

  // Emergency level based on wait time
  const getEmergencyLevel = () => {
    const waitTime = parseInt(emergencyWaitTime) || 15;
    if (waitTime <= 5) return { level: 'Critical', color: 'bg-red-500', text: 'text-red-700' };
    if (waitTime <= 10) return { level: 'High', color: 'bg-orange-500', text: 'text-orange-700' };
    return { level: 'Moderate', color: 'bg-yellow-500', text: 'text-yellow-700' };
  };

  const emergencyLevel = getEmergencyLevel();

  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1">
      
      {/* Premium Header with Gradient */}
      <div className="relative">
        {/* Background Gradient */}
        <div className="h-48 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-300 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          </div>
          
          {/* Hospital Logo/Initial */}
          <div className="absolute top-4 left-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <span className="text-white text-xl font-bold">
                {name.charAt(0)}
              </span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={handleBookmark}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all duration-300"
            >
              <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-yellow-400 text-yellow-400' : 'text-white'}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all duration-300"
            >
              <Share2 className="h-5 w-5 text-white" />
            </button>
          </div>
          
          {/* Premium Badges */}
          <div className="absolute top-16 left-4 flex flex-wrap gap-2">
            {isEmergency && (
              <span className="px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-lg">
                <Zap className="h-3 w-3" />
                EMERGENCY READY
              </span>
            )}
            {isVerified && (
              <span className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-lg">
                <Shield className="h-3 w-3" />
                VERIFIED TRUST
              </span>
            )}
            {is24x7 && (
              <span className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-600 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-lg">
                <Clock className="h-3 w-3" />
                24/7 SERVICE
              </span>
            )}
          </div>
          
          {/* Distance Indicator with Glow */}
          <div className="absolute top-4 right-20">
            <div className="relative">
              <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full shadow-lg">
                <span className="text-white font-bold text-sm flex items-center gap-1">
                  <Navigation className="h-3 w-3" />
                  {distance} km
                </span>
              </div>
            </div>
          </div>
          
          {/* Hospital Information Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-5">
            <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-lg">
              {name}
            </h3>
            <div className="flex items-center gap-2 text-white/90">
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-medium">{address}</span>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded">
                <Building className="h-3 w-3 text-white" />
                <span className="text-xs text-white">{city}</span>
              </div>
              {specializations.length > 0 && (
                <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded">
                  <BriefcaseMedical className="h-3 w-3 text-white" />
                  <span className="text-xs text-white">{specializations.slice(0, 2).join(', ')}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-5">
        {/* Rating and Stats Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-amber-50 px-4 py-2 rounded-xl border border-yellow-200">
              <div className="relative">
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
              </div>
              <div>
                <span className="font-bold text-gray-900 text-lg">{rating}</span>
                <span className="text-gray-600 text-xs ml-1">/5</span>
                <div className="text-xs text-gray-500">({totalRatings} reviews)</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 rounded-xl border border-green-200">
              <Clock className="h-5 w-5 text-green-600" />
              <div>
                <span className="font-bold text-gray-900">{waitingTime}</span>
                <div className="text-xs text-gray-500">Wait time</div>
              </div>
            </div>
          </div>
          
          <button
            onClick={handleEmergencyCall}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Phone className="h-4 w-4" />
            <span className="font-semibold">Emergency</span>
          </button>
        </div>

        {/* Availability Progress Bar */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Bed Availability</span>
            <span className="text-sm font-bold text-blue-600">{bedAvailability} beds</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${availabilityPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Low</span>
            <span className={availabilityPercentage > 70 ? 'font-bold text-green-600' : ''}>
              {availabilityPercentage > 70 ? 'High Availability' : 'Moderate'}
            </span>
            <span>High</span>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Bed className="h-4 w-4 text-blue-600" />
              <span className="text-xs font-medium text-blue-700">BEDS</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{bedAvailability}</div>
            <div className="text-xs text-gray-600">Available</div>
          </div>
          
          <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl border border-red-200">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="h-4 w-4 text-red-600" />
              <span className="text-xs font-medium text-red-700">BLOOD</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{availableBloodGroups.length}</div>
            <div className="text-xs text-gray-600">Groups</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <Ambulance className="h-4 w-4 text-green-600" />
              <span className="text-xs font-medium text-green-700">AMBULANCE</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{ambulanceCount}</div>
            <div className="text-xs text-gray-600">On standby</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="h-4 w-4 text-purple-600" />
              <span className="text-xs font-medium text-purple-700">ORGANS</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{availableOrgans.length}</div>
            <div className="text-xs text-gray-600">Available</div>
          </div>
        </div>

        {/* Blood Groups Quick View */}
        {availableBloodGroups.length > 0 && (
          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-red-600" />
                <span className="text-sm font-semibold text-gray-900">Available Blood Groups</span>
              </div>
              <div className="text-xs text-gray-500">{availableBloodGroups.length} types</div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {availableBloodGroups.map((group, idx) => (
                <div 
                  key={idx}
                  className="relative group/blood"
                >
                  <span className="px-3 py-1.5 bg-red-100 text-red-700 text-xs font-bold rounded-lg border border-red-200 hover:bg-red-200 hover:border-red-300 transition-colors cursor-default">
                    {group}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Organs Quick View */}
        {availableOrgans.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-green-600" />
                <span className="text-sm font-semibold text-gray-900">Available Organs</span>
              </div>
              <div className="text-xs text-gray-500">For transplant</div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {availableOrgans.map((organ, idx) => (
                <div 
                  key={idx}
                  className="relative group/organ"
                >
                  <span className="px-3 py-1.5 bg-green-100 text-green-700 text-xs font-bold rounded-lg border border-green-200 hover:bg-green-200 hover:border-green-300 transition-colors cursor-default">
                    {organ}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Primary Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
          <button
            onClick={handleGetDirections}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Navigation className="h-5 w-5" />
            <span className="font-semibold">Directions</span>
          </button>
          
          <button
            onClick={() => handleQuickActions('appointment')}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Calendar className="h-5 w-5" />
            <span className="font-semibold">Book Now</span>
          </button>
          
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all duration-300 border border-gray-300"
          >
            <Eye className="h-5 w-5" />
            <span className="font-semibold">{showDetails ? 'Less' : 'More'}</span>
            {showDetails ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Quick Actions Bar */}
        <div className="flex justify-center gap-4 mb-5">
          <button
            onClick={() => handleQuickActions('blood')}
            className="flex flex-col items-center text-gray-600 hover:text-red-600 transition-colors"
          >
            <div className="p-2 bg-red-50 rounded-lg mb-1">
              <Droplets className="h-4 w-4" />
            </div>
            <span className="text-xs">Blood</span>
          </button>
          <button
            onClick={() => handleQuickActions('organ')}
            className="flex flex-col items-center text-gray-600 hover:text-green-600 transition-colors"
          >
            <div className="p-2 bg-green-50 rounded-lg mb-1">
              <Heart className="h-4 w-4" />
            </div>
            <span className="text-xs">Organ</span>
          </button>
          <button className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors">
            <div className="p-2 bg-blue-50 rounded-lg mb-1">
              <MessageCircle className="h-4 w-4" />
            </div>
            <span className="text-xs">Chat</span>
          </button>
          <button className="flex flex-col items-center text-gray-600 hover:text-purple-600 transition-colors">
            <div className="p-2 bg-purple-50 rounded-lg mb-1">
              <CreditCard className="h-4 w-4" />
            </div>
            <span className="text-xs">Estimate</span>
          </button>
        </div>

        {/* Expanded Details Section */}
        {showDetails && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-blue-600" />
              Detailed Information
            </h4>
            
            {/* Grid of Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Users className="h-4 w-4 text-gray-500" />
                  <div>
                    <div className="text-xs text-gray-500">Doctors</div>
                    <div className="font-semibold text-gray-900">{doctorsCount || 'N/A'}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Award className="h-4 w-4 text-gray-500" />
                  <div>
                    <div className="text-xs text-gray-500">Established</div>
                    <div className="font-semibold text-gray-900">{established}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Stethoscope className="h-4 w-4 text-gray-500" />
                  <div>
                    <div className="text-xs text-gray-500">Consultation</div>
                    <div className="font-semibold text-gray-900">{consultationFee}</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <CheckCircle className="h-4 w-4 text-gray-500" />
                  <div>
                    <div className="text-xs text-gray-500">Emergency Wait</div>
                    <div className={`font-semibold ${emergencyLevel.text}`}>{emergencyWaitTime}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <CreditCard className="h-4 w-4 text-gray-500" />
                  <div>
                    <div className="text-xs text-gray-500">Insurance</div>
                    <div className="font-semibold text-gray-900">
                      {insuranceAccepted.length || 0}+ accepted
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <ClipboardCheck className="h-4 w-4 text-gray-500" />
                  <div>
                    <div className="text-xs text-gray-500">Registration</div>
                    <div className="font-semibold text-gray-900 text-xs">{registrationNumber}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Specializations */}
            {specializations.length > 0 && (
              <div className="mb-6">
                <h5 className="text-sm font-semibold text-gray-900 mb-3">Specializations</h5>
                <div className="flex flex-wrap gap-2">
                  {specializations.map((spec, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg border border-blue-200">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Facilities */}
            {facilities.length > 0 && (
              <div className="mb-6">
                <h5 className="text-sm font-semibold text-gray-900 mb-3">Key Facilities</h5>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {facilities.slice(0, 6).map((facility, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      {facility.includes('ICU') && <Stethoscope className="h-3 w-3 text-red-500" />}
                      {facility.includes('Blood') && <Droplets className="h-3 w-3 text-red-500" />}
                      {facility.includes('Emergency') && <Zap className="h-3 w-3 text-yellow-500" />}
                      {facility.includes('Pharmacy') && <Pill className="h-3 w-3 text-green-500" />}
                      {facility.includes('Parking') && <ParkingCircle className="h-3 w-3 text-blue-500" />}
                      {facility.includes('Wi-Fi') && <Wifi className="h-3 w-3 text-blue-500" />}
                      {facility.includes('Cafeteria') && <Coffee className="h-3 w-3 text-orange-500" />}
                      {facility.includes('Ambulance') && <Car className="h-3 w-3 text-red-500" />}
                      <span className="text-xs text-gray-700">{facility}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Info */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
              <h5 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Globe className="h-4 w-4 text-blue-600" />
                Contact Information
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg">
                    <Phone className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Emergency Hotline</div>
                    <a href={`tel:${phone}`} className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                      {phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg">
                    <MessageCircle className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Email</div>
                    <a href={`mailto:${email}`} className="font-semibold text-gray-900 hover:text-blue-600 transition-colors text-sm">
                      {email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Stats */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xs text-gray-500">Response Time</div>
              <div className="font-bold text-gray-900">{emergencyWaitTime}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Success Rate</div>
              <div className="font-bold text-green-600">98%</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Patient Satisfaction</div>
              <div className="font-bold text-blue-600">{rating}/5</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalCard;