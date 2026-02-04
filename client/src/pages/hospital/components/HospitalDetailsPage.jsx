import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Phone,
  MapPin,
  Star,
  Clock,
  Heart,
  Droplets,
  Users,
  Shield,
  CheckCircle,
  Navigation,
  Calendar,
  Bed,
  Ambulance,
  Stethoscope,
  Globe,
  Share2,
  Bookmark,
  MessageCircle,
  Award,
  TrendingUp,
  Zap,
  Activity,
  UserCheck,
  ClipboardCheck,
  DollarSign,
  CreditCard,
  BriefcaseMedical,
  Car,
  Wifi,
  Coffee,
  ParkingCircle,
  ChevronRight,
  AlertCircle,
  Download,
  Printer,
  Bell,
  Mail,
  Clock4,
  Building,
  PhoneCall,
  Map,
  FileText,
  Thermometer,
  ShieldCheck
} from 'lucide-react';
import BloodRequestForm from './BloodRequestForm';

const HospitalDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showBloodRequest, setShowBloodRequest] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  // Sample hospital data - Replace with API call
  const sampleHospital = {
    id: 'h1',
    name: 'Apollo Hospitals',
    registrationNumber: 'MH-12345-2023',
    address: 'Bandra West, Mumbai, Maharashtra 400050',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050',
    phone: '+91 22 1234 5678',
    emergencyPhone: '+91 22 1234 9999',
    email: 'emergency@apollohospitals.com',
    website: 'https://www.apollohospitals.com',
    rating: 4.8,
    totalRatings: 1245,
    distance: 2.5,
    isEmergency: true,
    isVerified: true,
    is24x7: true,
    facilities: ['ICU', 'Blood Bank', '24x7 Emergency', 'Transplant Unit', 'Trauma Center', 'Dialysis', 'Pharmacy', 'Parking', 'Wi-Fi', 'Cafeteria', 'Ambulance Service'],
    availableBloodGroups: ['A+', 'B+', 'O+', 'AB+', 'O-', 'A-', 'B-', 'AB-'],
    availableOrgans: ['Kidney', 'Liver', 'Cornea', 'Bone Marrow', 'Heart', 'Lungs'],
    bedAvailability: 45,
    ambulanceCount: 12,
    waitingTime: '15 mins',
    emergencyWaitTime: '5 mins',
    consultationFee: '₹500 - ₹1500',
    images: [
      'https://images.unsplash.com/photo-1586773860418-dc22f8b874bc',
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d',
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d'
    ],
    coordinates: { lat: 19.0760, lng: 72.8777 },
    specializations: ['Cardiology', 'Oncology', 'Neurology', 'Orthopedics', 'Pediatrics', 'General Surgery'],
    doctorsCount: 120,
    established: 1983,
    insuranceAccepted: ['Arogya', 'Star Health', 'ICICI Lombard', 'HDFC Ergo', 'Max Bupa', 'Reliance General'],
    accreditation: ['NABH', 'JCI', 'ISO 9001:2015'],
    visitingHours: '24/7',
    visitingDoctors: ['Dr. Anil Sharma', 'Dr. Priya Patel', 'Dr. Rajesh Kumar'],
    bloodBankStatus: 'Operational',
    organRegistryStatus: 'Active',
    successRate: 98.5,
    patientSatisfaction: 95,
    recentAvailability: {
      blood: {
        'A+': { units: 25, status: 'Adequate' },
        'B+': { units: 18, status: 'Moderate' },
        'O+': { units: 32, status: 'Adequate' },
        'AB+': { units: 12, status: 'Low' },
        'O-': { units: 8, status: 'Critical' }
      },
      organs: {
        'Kidney': { waitlist: 45, avgWaitTime: '3 months' },
        'Liver': { waitlist: 28, avgWaitTime: '6 months' },
        'Cornea': { waitlist: 12, avgWaitTime: '1 month' }
      }
    },
    emergencyContacts: [
      { type: 'Ambulance', number: '+91 22 1234 9999' },
      { type: 'ICU', number: '+91 22 1234 8888' },
      { type: 'Blood Bank', number: '+91 22 1234 7777' }
    ]
  };

  useEffect(() => {
    // Fetch hospital data based on ID
    const fetchHospitalDetails = async () => {
      setLoading(true);
      try {
        // Simulate API call
        setTimeout(() => {
          setHospital(sampleHospital);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching hospital details:', error);
        setLoading(false);
      }
    };

    fetchHospitalDetails();
  }, [id]);

  // Get user location for directions
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => console.error('Error getting location:', error)
      );
    }
  }, []);

  const handleGetDirections = () => {
    if (hospital?.coordinates) {
      const { lat, lng } = hospital.coordinates;
      if (userLocation) {
        window.open(`https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${lat},${lng}`, '_blank');
      } else {
        window.open(`https://www.google.com/maps/search/?api=1&query=${hospital.address}`, '_blank');
      }
    }
  };

//   const handleEmergencyCall = () => {
//     window.location.href = `tel:${hospital?.emergencyPhone}`;
//   };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${hospital?.name} - Hospital Details`,
        text: `Check out ${hospital?.name} on Hospital Finder App`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleRequestBlood = () => {
    setShowBloodRequest(true);
  };

  const handleRequestOrgan = () => {
    alert('Organ request form will open soon');
  };

  const handleBookAppointment = () => {
    alert('Appointment booking will open soon');
  };

  const getBloodStatusColor = (status) => {
    switch(status) {
      case 'Adequate': return 'text-green-600 bg-green-50';
      case 'Moderate': return 'text-yellow-600 bg-yellow-50';
      case 'Low': return 'text-orange-600 bg-orange-50';
      case 'Critical': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-gray-200"></div>
            <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading hospital details...</p>
          <p className="text-sm text-gray-500 mt-2">Fetching the latest information</p>
        </div>
      </div>
    );
  }

  if (!hospital) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Hospital Not Found</h3>
          <p className="text-gray-600 mb-6">The hospital you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Back Navigation */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Hospitals</span>
            </button>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Print"
              >
                <Printer className="h-5 w-5 text-gray-600" />
              </button>
              <button
                onClick={handleShare}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Share"
              >
                <Share2 className="h-5 w-5 text-gray-600" />
              </button>
              <button
                onClick={handleBookmark}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Bookmark"
              >
                <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Hospital Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
            {/* Hospital Logo/Image */}
            <div className="lg:w-1/4">
              <div className="h-48 lg:h-56 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 mb-2">
                    {hospital.isVerified && (
                      <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                        <ShieldCheck className="h-3 w-3" />
                        Verified
                      </span>
                    )}
                    {hospital.is24x7 && (
                      <span className="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
                        24/7
                      </span>
                    )}
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                      {hospital.name.charAt(0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hospital Info */}
            <div className="lg:w-3/4">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    {hospital.name}
                  </h1>
                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <Building className="h-5 w-5" />
                    <span>{hospital.city}, {hospital.state}</span>
                    <span className="text-gray-400">•</span>
                    <Clock4 className="h-5 w-5" />
                    <span>Est. {hospital.established}</span>
                  </div>
                  
                  {/* Address */}
                  <div className="flex items-start gap-3 mb-4">
                    <MapPin className="h-5 w-5 text-gray-500 mt-1" />
                    <div>
                      <p className="text-gray-700 font-medium">{hospital.address}</p>
                      <p className="text-gray-500 text-sm">Pincode: {hospital.pincode}</p>
                    </div>
                  </div>

                  {/* Rating and Stats */}
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-lg">
                      <Star className="h-5 w-5 text-yellow-500 fill-current" />
                      <div>
                        <span className="font-bold text-gray-900 text-lg">{hospital.rating}</span>
                        <span className="text-gray-600 text-sm ml-1">/5</span>
                        <div className="text-xs text-gray-500">({hospital.totalRatings} reviews)</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <div>
                        <span className="font-bold text-gray-900">{hospital.successRate}%</span>
                        <div className="text-xs text-gray-500">Success Rate</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
                      <UserCheck className="h-5 w-5 text-blue-600" />
                      <div>
                        <span className="font-bold text-gray-900">{hospital.patientSatisfaction}%</span>
                        <div className="text-xs text-gray-500">Satisfaction</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-col gap-3">
                  {/* <button
                    onClick={handleEmergencyCall}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    <Phone className="h-5 w-5" />
                    <span className="font-semibold">Emergency Call</span>
                  </button> */}
                  
                  <button
                    onClick={handleGetDirections}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all"
                  >
                    <Navigation className="h-5 w-5" />
                    <span className="font-semibold">Get Directions</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Content */}
          <div className="lg:w-2/3">
            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-lg mb-6 border border-gray-200">
              <div className="flex overflow-x-auto border-b border-gray-200">
                {['overview', 'availability', 'facilities', 'contact'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 lg:flex-none px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                      activeTab === tab
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {tab === 'overview' && 'Overview'}
                    {tab === 'availability' && 'Availability'}
                    {tab === 'facilities' && 'Facilities'}
                    {tab === 'contact' && 'Contact Info'}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    {/* Map Section */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Map className="h-5 w-5 text-blue-600" />
                        Location & Map
                      </h3>
                      <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl p-4 h-64 flex items-center justify-center relative">
                        <div className="text-center">
                          <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                          <p className="text-gray-700 font-medium">Map Integration Available</p>
                          <p className="text-gray-500 text-sm mb-4">Click "Get Directions" to navigate</p>
                          <button
                            onClick={handleGetDirections}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Open in Google Maps
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                          <div className="flex items-center gap-2 mb-2">
                            <Bed className="h-4 w-4 text-blue-600" />
                            <span className="text-xs font-medium text-blue-700">BEDS</span>
                          </div>
                          <div className="text-2xl font-bold text-gray-900">{hospital.bedAvailability}</div>
                          <div className="text-xs text-gray-600">Available</div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl border border-red-200">
                          <div className="flex items-center gap-2 mb-2">
                            <Droplets className="h-4 w-4 text-red-600" />
                            <span className="text-xs font-medium text-red-700">BLOOD</span>
                          </div>
                          <div className="text-2xl font-bold text-gray-900">{hospital.availableBloodGroups.length}</div>
                          <div className="text-xs text-gray-600">Groups</div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                          <div className="flex items-center gap-2 mb-2">
                            <Ambulance className="h-4 w-4 text-green-600" />
                            <span className="text-xs font-medium text-green-700">AMBULANCE</span>
                          </div>
                          <div className="text-2xl font-bold text-gray-900">{hospital.ambulanceCount}</div>
                          <div className="text-xs text-gray-600">On standby</div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                          <div className="flex items-center gap-2 mb-2">
                            <Heart className="h-4 w-4 text-purple-600" />
                            <span className="text-xs font-medium text-purple-700">ORGANS</span>
                          </div>
                          <div className="text-2xl font-bold text-gray-900">{hospital.availableOrgans.length}</div>
                          <div className="text-xs text-gray-600">Available</div>
                        </div>
                      </div>
                    </div>

                    {/* About */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">About Hospital</h3>
                      <div className="bg-gray-50 rounded-xl p-5">
                        <p className="text-gray-700">
                          {hospital.name} is a leading multi-specialty hospital established in {hospital.established}. 
                          With {hospital.doctorsCount}+ specialized doctors and state-of-the-art facilities, 
                          we provide comprehensive healthcare services 24/7.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div className="flex items-center gap-3">
                            <ClipboardCheck className="h-5 w-5 text-green-600" />
                            <span className="text-gray-700">Registration: {hospital.registrationNumber}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Award className="h-5 w-5 text-blue-600" />
                            <span className="text-gray-700">{hospital.accreditation?.join(', ')}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Clock className="h-5 w-5 text-orange-600" />
                            <span className="text-gray-700">Visiting Hours: {hospital.visitingHours}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <DollarSign className="h-5 w-5 text-purple-600" />
                            <span className="text-gray-700">Consultation: {hospital.consultationFee}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'availability' && (
                  <div className="space-y-6">
                    {/* Blood Availability */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Droplets className="h-5 w-5 text-red-600" />
                        Blood Group Availability
                        <span className="ml-auto text-sm font-normal text-gray-500">
                          {hospital.bloodBankStatus}
                        </span>
                      </h3>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {hospital.availableBloodGroups.map((group) => {
                          const status = hospital.recentAvailability?.blood?.[group]?.status || 'Available';
                          const units = hospital.recentAvailability?.blood?.[group]?.units || 0;
                          return (
                            <div key={group} className="relative group">
                              <div className={`p-4 rounded-xl border transition-all ${getBloodStatusColor(status)}`}>
                                <div className="text-center">
                                  <div className="text-2xl font-bold mb-1">{group}</div>
                                  <div className="text-xs font-medium mb-1">{status}</div>
                                  <div className="text-xs text-gray-600">{units} units available</div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      <div className="mt-4 flex justify-end">
                        <button
                          onClick={handleRequestBlood}
                          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <FileText className="h-4 w-4" />
                          Request Blood
                        </button>
                      </div>
                    </div>

                    {/* Organ Availability */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Heart className="h-5 w-5 text-green-600" />
                        Organ Transplant Availability
                        <span className="ml-auto text-sm font-normal text-gray-500">
                          {hospital.organRegistryStatus}
                        </span>
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {hospital.availableOrgans.map((organ) => {
                          const waitInfo = hospital.recentAvailability?.organs?.[organ] || {};
                          return (
                            <div key={organ} className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Heart className="h-5 w-5 text-green-600" />
                                  <span className="font-semibold text-gray-900">{organ}</span>
                                </div>
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                                  Available
                                </span>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                  <div className="text-gray-500">Waitlist</div>
                                  <div className="font-semibold">{waitInfo.waitlist || 0} patients</div>
                                </div>
                                <div>
                                  <div className="text-gray-500">Avg. Wait Time</div>
                                  <div className="font-semibold">{waitInfo.avgWaitTime || 'N/A'}</div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      <div className="mt-4 flex justify-end">
                        <button
                          onClick={handleRequestOrgan}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <FileText className="h-4 w-4" />
                          Request Organ Information
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'facilities' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Specializations</h3>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {hospital.specializations.map((spec, idx) => (
                          <span key={idx} className="px-4 py-2 bg-blue-50 text-blue-700 font-medium rounded-lg border border-blue-200">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Facilities & Services</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {hospital.facilities.map((facility, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                            {facility.includes('ICU') && <Activity className="h-4 w-4 text-red-500" />}
                            {facility.includes('Blood') && <Droplets className="h-4 w-4 text-red-500" />}
                            {facility.includes('Emergency') && <Zap className="h-4 w-4 text-yellow-500" />}
                            {facility.includes('Pharmacy') && <Stethoscope className="h-4 w-4 text-green-500" />}
                            {facility.includes('Parking') && <ParkingCircle className="h-4 w-4 text-blue-500" />}
                            {facility.includes('Wi-Fi') && <Wifi className="h-4 w-4 text-blue-500" />}
                            {facility.includes('Cafeteria') && <Coffee className="h-4 w-4 text-orange-500" />}
                            {facility.includes('Ambulance') && <Car className="h-4 w-4 text-red-500" />}
                            <span className="text-sm text-gray-700">{facility}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Visiting Doctors</h3>
                      <div className="space-y-3">
                        {hospital.visitingDoctors.map((doctor, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                            <UserCheck className="h-5 w-5 text-blue-600" />
                            <div>
                              <div className="font-semibold text-gray-900">{doctor}</div>
                              <div className="text-sm text-gray-600">Available on appointment</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'contact' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Primary Contact */}
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Primary Contact</h3>
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <PhoneCall className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Main Phone</div>
                              <a href={`tel:${hospital.phone}`} className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                                {hospital.phone}
                              </a>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-red-100 rounded-lg">
                              <Phone className="h-5 w-5 text-red-600" />
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Emergency</div>
                              <a href={`tel:${hospital.emergencyPhone}`} className="font-semibold text-gray-900 hover:text-red-600 transition-colors">
                                {hospital.emergencyPhone}
                              </a>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                              <Mail className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Email</div>
                              <a href={`mailto:${hospital.email}`} className="font-semibold text-gray-900 hover:text-green-600 transition-colors">
                                {hospital.email}
                              </a>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 rounded-lg">
                              <Globe className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Website</div>
                              <a href={hospital.website} target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-900 hover:text-purple-600 transition-colors">
                                {hospital.website}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Emergency Contacts */}
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Emergency Contacts</h3>
                        <div className="space-y-3">
                          {hospital.emergencyContacts?.map((contact, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                              <div className="flex items-center gap-3">
                                <Bell className="h-4 w-4 text-red-600" />
                                <span className="font-medium text-gray-900">{contact.type}</span>
                              </div>
                              <a href={`tel:${contact.number}`} className="font-semibold text-red-600 hover:text-red-700">
                                {contact.number}
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Insurance */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Insurance Accepted</h3>
                      <div className="flex flex-wrap gap-2">
                        {hospital.insuranceAccepted.map((insurance, idx) => (
                          <span key={idx} className="px-3 py-2 bg-green-50 text-green-700 text-sm font-medium rounded-lg border border-green-200">
                            {insurance}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:w-1/3">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={handleBookAppointment}
                  className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:border-blue-300 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold text-gray-900">Book Appointment</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600" />
                </button>
                
                <button
                  onClick={handleRequestBlood}
                  className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-xl border border-red-200 hover:border-red-300 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Droplets className="h-5 w-5 text-red-600" />
                    <span className="font-semibold text-gray-900">Request Blood</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-red-600" />
                </button>
                
                <button
                  onClick={handleRequestOrgan}
                  className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200 hover:border-green-300 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Heart className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-gray-900">Organ Inquiry</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-green-600" />
                </button>
                
                <button
                  onClick={handleGetDirections}
                  className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:border-purple-300 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Navigation className="h-5 w-5 text-purple-600" />
                    <span className="font-semibold text-gray-900">Get Directions</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600" />
                </button>
              </div>
            </div>

            {/* Emergency Info */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="h-6 w-6" />
                <h3 className="text-lg font-bold">Emergency Information</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="opacity-90">Emergency Wait Time</span>
                  <span className="font-bold">{hospital.emergencyWaitTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="opacity-90">Ambulance Response</span>
                  <span className="font-bold">5-10 mins</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="opacity-90">Trauma Center</span>
                  <span className="font-bold">Available</span>
                </div>
              </div>
              
              {/* <button
                onClick={handleEmergencyCall}
                className="w-full mt-4 py-3 bg-white text-red-600 rounded-lg font-bold hover:bg-red-50 transition-colors"
              >
                Emergency Call Now
              </button> */}
            </div>

            {/* Download Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Download Info</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <Download className="h-5 w-5 text-gray-600" />
                  <span className="font-medium text-gray-900">Hospital Brochure</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <FileText className="h-5 w-5 text-gray-600" />
                  <span className="font-medium text-gray-900">Price List</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <ClipboardCheck className="h-5 w-5 text-gray-600" />
                  <span className="font-medium text-gray-900">Admission Forms</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blood Request Modal */}
      {showBloodRequest && (
        <BloodRequestForm
          hospital={hospital}
          onClose={() => setShowBloodRequest(false)}
        />
      )}

      {/* Emergency Floating Button */}
      {/* <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleEmergencyCall}
          className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 animate-pulse"
        >
          <Phone className="h-6 w-6" />
        </button>
      </div> */}
    </div>
  );
};

export default HospitalDetailsPage;