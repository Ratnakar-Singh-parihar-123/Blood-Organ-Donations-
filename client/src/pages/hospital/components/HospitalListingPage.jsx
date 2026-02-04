import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  MapPin, 
  Filter, 
  Phone, 
  Star, 
  Clock,
  Droplets,
  Heart,
  Navigation,
  Shield,
  CheckCircle,
  X,
  SlidersHorizontal,
  Bed,
  Ambulance,
  User,
  Calendar,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  TrendingUp,
  Award,
  Bookmark,
  Share2
} from 'lucide-react';
import HospitalCard from './HospitalCard';

const HospitalListingPage = () => {
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [activeSort, setActiveSort] = useState('distance');
  const [showEmergencyInfo, setShowEmergencyInfo] = useState(true);
  
  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
  const [selectedOrgan, setSelectedOrgan] = useState('');
  const [distanceFilter, setDistanceFilter] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [manualLocation, setManualLocation] = useState('');
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  
  // Blood groups
  const bloodGroups = [
    { type: 'A+', color: 'bg-red-100 text-red-700 border-red-200' },
    { type: 'A-', color: 'bg-red-50 text-red-600 border-red-100' },
    { type: 'B+', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    { type: 'B-', color: 'bg-blue-50 text-blue-600 border-blue-100' },
    { type: 'AB+', color: 'bg-purple-100 text-purple-700 border-purple-200' },
    { type: 'AB-', color: 'bg-purple-50 text-purple-600 border-purple-100' },
    { type: 'O+', color: 'bg-green-100 text-green-700 border-green-200' },
    { type: 'O-', color: 'bg-green-50 text-green-600 border-green-100' }
  ];
  
  // Organs for transplant
  const organs = [
    { name: 'Heart', icon: '❤️', color: 'bg-red-50 text-red-700 border-red-100' },
    { name: 'Kidney', icon: '🫘', color: 'bg-blue-50 text-blue-700 border-blue-100' },
    { name: 'Liver', icon: '🍖', color: 'bg-yellow-50 text-yellow-700 border-yellow-100' },
    { name: 'Lungs', icon: '🫁', color: 'bg-teal-50 text-teal-700 border-teal-100' },
    { name: 'Pancreas', icon: '🥓', color: 'bg-pink-50 text-pink-700 border-pink-100' },
    { name: 'Cornea', icon: '👁️', color: 'bg-indigo-50 text-indigo-700 border-indigo-100' },
    { name: 'Bone Marrow', icon: '🦴', color: 'bg-gray-100 text-gray-700 border-gray-200' },
    { name: 'Skin', icon: '🫀', color: 'bg-orange-50 text-orange-700 border-orange-100' }
  ];
  
  // Distance options
  const distances = [
    { value: '5', label: '📍 Within 5 km', icon: '🚶' },
    { value: '10', label: '🚗 Within 10 km', icon: '🚗' },
    { value: '20', label: '🚕 Within 20 km', icon: '🚕' },
    { value: '50', label: '🚙 Within 50 km', icon: '🚙' },
    { value: '100', label: '🚁 Within 100 km', icon: '🚁' }
  ];

  // Facilities
  const facilities = [
    'ICU', 'Blood Bank', '24x7 Emergency', 'Transplant Unit', 'Trauma Center',
    'Dialysis', 'Cancer Center', 'Cardiac Care', 'NICU', 'Ambulance Service',
    'Pharmacy', 'Cafeteria', 'Parking', 'Wi-Fi', 'ATM'
  ];

  // Sort options
  const sortOptions = [
    { id: 'distance', label: 'Nearest First', icon: '📍' },
    { id: 'rating', label: 'Highest Rated', icon: '⭐' },
    { id: 'beds', label: 'Most Beds Available', icon: '🛏️' },
    { id: 'waiting', label: 'Lowest Wait Time', icon: '⏱️' },
    { id: 'emergency', label: 'Emergency Ready', icon: '🚨' }
  ];

  const filtersRef = useRef(null);

  // Get user's current location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
          setLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          // Don't alert, just show in UI
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    }
  };

  // Calculate distance between coordinates (Haversine formula)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  useEffect(() => {
    getUserLocation();
    fetchHospitals();
    
    // Close filters when clicking outside on mobile
    const handleClickOutside = (event) => {
      if (mobileFiltersOpen && filtersRef.current && !filtersRef.current.contains(event.target)) {
        setMobileFiltersOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (userLocation && hospitals.length > 0) {
      const hospitalsWithDistance = hospitals.map(hospital => ({
        ...hospital,
        distance: calculateDistance(
          userLocation.lat,
          userLocation.lng,
          hospital.coordinates.lat,
          hospital.coordinates.lng
        ).toFixed(1)
      }));
      setHospitals(hospitalsWithDistance);
      setFilteredHospitals(hospitalsWithDistance);
    }
  }, [userLocation]);

  const fetchHospitals = async () => {
    try {
      setLoading(true);
      // Enhanced mock data with more realistic information
      const mockHospitals = [
        {
          id: 'h1',
          name: 'Apollo Hospitals',
          registrationNumber: 'MH-12345-2023',
          address: 'Bandra West, Mumbai, Maharashtra 400050',
          city: 'Mumbai',
          phone: '+91 22 1234 5678',
          email: 'emergency@apollohospitals.com',
          rating: 4.8,
          totalRatings: 1245,
          distance: 2.5,
          isEmergency: true,
          isVerified: true,
          is24x7: true,
          facilities: ['ICU', 'Blood Bank', '24x7 Emergency', 'Transplant Unit', 'Trauma Center', 'Dialysis', 'Pharmacy', 'Parking', 'Wi-Fi'],
          availableBloodGroups: ['A+', 'B+', 'O+', 'AB+', 'O-', 'A-'],
          availableOrgans: ['Kidney', 'Liver', 'Cornea', 'Bone Marrow'],
          bedAvailability: 45,
          ambulanceCount: 12,
          waitingTime: '15 mins',
          emergencyWaitTime: '5 mins',
          consultationFee: '₹500 - ₹1500',
          images: ['https://images.unsplash.com/photo-1586773860418-dc22f8b874bc?auto=format&fit=crop&w=800'],
          coordinates: { lat: 19.0760, lng: 72.8777 },
          specializations: ['Cardiology', 'Oncology', 'Neurology', 'Orthopedics'],
          doctorsCount: 120,
          established: 1983,
          insuranceAccepted: ['Arogya', 'Star Health', 'ICICI Lombard', 'HDFC Ergo']
        },
        {
          id: 'h2',
          name: 'Fortis Memorial Research Institute',
          registrationNumber: 'DL-67890-2023',
          address: 'Sector 44, Gurugram, Haryana 122002',
          city: 'Gurugram',
          phone: '+91 124 567 8901',
          email: 'contact@fortishealthcare.com',
          rating: 4.7,
          totalRatings: 987,
          distance: 4.2,
          isEmergency: true,
          isVerified: true,
          is24x7: true,
          facilities: ['NICU', 'Dialysis', 'Trauma Center', 'Blood Bank', 'Cancer Center', 'Cardiac Care', 'Pharmacy', 'Cafeteria'],
          availableBloodGroups: ['A-', 'B-', 'AB-', 'O+', 'B+'],
          availableOrgans: ['Heart', 'Kidney', 'Bone Marrow', 'Liver'],
          bedAvailability: 78,
          ambulanceCount: 15,
          waitingTime: '20 mins',
          emergencyWaitTime: '8 mins',
          consultationFee: '₹700 - ₹2000',
          images: ['https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800'],
          coordinates: { lat: 28.4595, lng: 77.0266 },
          specializations: ['Cardiac Surgery', 'Neuro Sciences', 'Organ Transplant', 'Oncology'],
          doctorsCount: 95,
          established: 2001,
          insuranceAccepted: ['Max Bupa', 'Reliance General', 'Bajaj Allianz']
        },
        {
          id: 'h3',
          name: 'Manipal Hospitals',
          registrationNumber: 'KA-34567-2023',
          address: 'Old Airport Road, Bangalore, Karnataka 560017',
          city: 'Bangalore',
          phone: '+91 80 2222 3333',
          email: 'info@manipalhospitals.com',
          rating: 4.9,
          totalRatings: 1567,
          distance: 8.7,
          isEmergency: true,
          isVerified: true,
          is24x7: true,
          facilities: ['Cardiac ICU', 'Cancer Center', 'Organ Transplant', 'Robotic Surgery', 'Dialysis', 'Pharmacy', 'Parking', 'Wi-Fi'],
          availableBloodGroups: ['A+', 'B+', 'AB+', 'O-', 'AB-', 'O+'],
          availableOrgans: ['Liver', 'Lungs', 'Pancreas', 'Cornea'],
          bedAvailability: 120,
          ambulanceCount: 25,
          waitingTime: '10 mins',
          emergencyWaitTime: '3 mins',
          consultationFee: '₹600 - ₹1800',
          images: ['https://images.unsplash.com/photo-1586773860418-dc22f8b874bc?auto=format&fit=crop&w=800'],
          coordinates: { lat: 12.9716, lng: 77.5946 },
          specializations: ['Cardiology', 'Oncology', 'Transplant', 'Robotic Surgery'],
          doctorsCount: 150,
          established: 1991,
          insuranceAccepted: ['Arogya', 'Star Health', 'ICICI Lombard', 'HDFC Ergo', 'Bajaj Allianz']
        },
        {
          id: 'h4',
          name: 'Kokilaben Dhirubhai Ambani Hospital',
          registrationNumber: 'MH-78901-2023',
          address: 'Andheri West, Mumbai, Maharashtra 400053',
          city: 'Mumbai',
          phone: '+91 22 3069 6666',
          email: 'contact@kokilabenhospital.com',
          rating: 4.8,
          totalRatings: 1123,
          distance: 12.3,
          isEmergency: true,
          isVerified: true,
          is24x7: true,
          facilities: ['Advanced ICU', 'Robotic Surgery', 'Dialysis', 'Cancer Center', 'Blood Bank', 'Pharmacy', 'Cafeteria', 'Parking'],
          availableBloodGroups: ['B+', 'O+', 'A-', 'AB+', 'A+'],
          availableOrgans: ['Kidney', 'Cornea', 'Liver', 'Bone Marrow'],
          bedAvailability: 65,
          ambulanceCount: 18,
          waitingTime: '18 mins',
          emergencyWaitTime: '6 mins',
          consultationFee: '₹800 - ₹2500',
          images: ['https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800'],
          coordinates: { lat: 19.1364, lng: 72.8296 },
          specializations: ['Cardiac Sciences', 'Cancer Care', 'Neuro Sciences', 'Robotic Surgery'],
          doctorsCount: 110,
          established: 2009,
          insuranceAccepted: ['Reliance General', 'Max Bupa', 'Star Health']
        },
        {
          id: 'h5',
          name: 'Medanta - The Medicity',
          registrationNumber: 'HR-23456-2023',
          address: 'Sector 38, Gurugram, Haryana 122001',
          city: 'Gurugram',
          phone: '+91 124 4141 414',
          email: 'info@medanta.org',
          rating: 4.9,
          totalRatings: 1890,
          distance: 18.5,
          isEmergency: true,
          isVerified: true,
          is24x7: true,
          facilities: ['Heart Institute', 'Liver Transplant', 'Cancer Center', 'Neurology', 'Orthopedics', 'Pharmacy', 'Parking', 'Wi-Fi', 'ATM'],
          availableBloodGroups: ['A+', 'B-', 'AB+', 'O-', 'AB-', 'B+'],
          availableOrgans: ['Heart', 'Liver', 'Lungs', 'Kidney', 'Pancreas'],
          bedAvailability: 95,
          ambulanceCount: 22,
          waitingTime: '12 mins',
          emergencyWaitTime: '4 mins',
          consultationFee: '₹1000 - ₹3000',
          images: ['https://images.unsplash.com/photo-1586773860418-dc22f8b874bc?auto=format&fit=crop&w=800'],
          coordinates: { lat: 28.4595, lng: 77.0266 },
          specializations: ['Cardiac Sciences', 'Liver Diseases', 'Cancer', 'Neurosciences'],
          doctorsCount: 135,
          established: 2009,
          insuranceAccepted: ['Arogya', 'Star Health', 'ICICI Lombard', 'HDFC Ergo', 'Max Bupa']
        },
        {
          id: 'h6',
          name: 'AIIMS Delhi',
          registrationNumber: 'DL-11111-2023',
          address: 'Ansari Nagar, New Delhi 110029',
          city: 'Delhi',
          phone: '+91 11 2658 8500',
          email: 'director@aiims.edu',
          rating: 4.9,
          totalRatings: 2450,
          distance: 25.3,
          isEmergency: true,
          isVerified: true,
          is24x7: true,
          facilities: ['Super Specialty', 'Research Center', 'Medical College', 'Blood Bank', '24x7 Emergency', 'Pharmacy', 'Cafeteria'],
          availableBloodGroups: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
          availableOrgans: ['Heart', 'Kidney', 'Liver', 'Lungs', 'Pancreas', 'Cornea', 'Bone Marrow'],
          bedAvailability: 210,
          ambulanceCount: 35,
          waitingTime: '45 mins',
          emergencyWaitTime: '15 mins',
          consultationFee: '₹0 - ₹500',
          images: ['https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800'],
          coordinates: { lat: 28.5678, lng: 77.2090 },
          specializations: ['All Specialties', 'Research', 'Medical Education'],
          doctorsCount: 450,
          established: 1956,
          insuranceAccepted: ['Government Schemes', 'CGHS', 'ESIS']
        }
      ];
      
      setHospitals(mockHospitals);
      setFilteredHospitals(mockHospitals);
    } catch (error) {
      console.error('Error fetching hospitals:', error);
    } finally {
      setLoading(false);
    }
  };

  // Sort hospitals
  const sortHospitals = (hospitalsList, sortBy) => {
    const sorted = [...hospitalsList];
    switch(sortBy) {
      case 'distance':
        return sorted.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'beds':
        return sorted.sort((a, b) => b.bedAvailability - a.bedAvailability);
      case 'waiting':
        return sorted.sort((a, b) => 
          parseInt(a.waitingTime) - parseInt(b.waitingTime)
        );
      case 'emergency':
        return sorted.sort((a, b) => 
          parseInt(b.emergencyWaitTime) - parseInt(a.emergencyWaitTime)
        );
      default:
        return sorted;
    }
  };

  // Filter hospitals based on criteria
  const applyFilters = () => {
    let filtered = [...hospitals];
    
    // Search by name, city, or address
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(hospital =>
        hospital.name.toLowerCase().includes(query) ||
        hospital.city.toLowerCase().includes(query) ||
        hospital.address.toLowerCase().includes(query) ||
        hospital.specializations?.some(spec => spec.toLowerCase().includes(query))
      );
    }
    
    // Filter by blood group
    if (selectedBloodGroup) {
      filtered = filtered.filter(hospital =>
        hospital.availableBloodGroups.includes(selectedBloodGroup)
      );
    }
    
    // Filter by organ
    if (selectedOrgan) {
      filtered = filtered.filter(hospital =>
        hospital.availableOrgans.includes(selectedOrgan)
      );
    }
    
    // Filter by distance (if location available)
    if (distanceFilter && userLocation) {
      const maxDistance = parseFloat(distanceFilter);
      filtered = filtered.filter(hospital =>
        parseFloat(hospital.distance) <= maxDistance
      );
    }
    
    // Filter by facilities
    if (selectedFacilities.length > 0) {
      filtered = filtered.filter(hospital =>
        selectedFacilities.every(facility => hospital.facilities.includes(facility))
      );
    }
    
    // Sort the filtered results
    const sortedFiltered = sortHospitals(filtered, activeSort);
    setFilteredHospitals(sortedFiltered);
    setMobileFiltersOpen(false);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedBloodGroup('');
    setSelectedOrgan('');
    setDistanceFilter('');
    setSelectedFacilities([]);
    const sorted = sortHospitals(hospitals, activeSort);
    setFilteredHospitals(sorted);
  };

  // Handle manual location input
  const handleManualLocationSubmit = () => {
    if (manualLocation.trim()) {
      // Simulate geocoding
      setLoading(true);
      setTimeout(() => {
        alert(`Location set to: ${manualLocation}`);
        setLoading(false);
      }, 1000);
    }
  };

  // Toggle facility selection
  const toggleFacility = (facility) => {
    setSelectedFacilities(prev =>
      prev.includes(facility)
        ? prev.filter(f => f !== facility)
        : [...prev, facility]
    );
  };

  // Handle sort change
  const handleSortChange = (sortId) => {
    setActiveSort(sortId);
    const sorted = sortHospitals(filteredHospitals, sortId);
    setFilteredHospitals(sorted);
  };

  // Emergency call handler
  const handleEmergencyCall = () => {
    window.location.href = 'tel:108';
  };

  // Share location handler
  const handleShareLocation = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Find Hospitals Near Me',
        text: 'Check out this hospital finder app!',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Calculate stats
  const totalBeds = filteredHospitals.reduce((sum, hospital) => sum + hospital.bedAvailability, 0);
  const totalAmbulances = filteredHospitals.reduce((sum, hospital) => sum + hospital.ambulanceCount, 0);
  const avgRating = (filteredHospitals.reduce((sum, hospital) => sum + hospital.rating, 0) / filteredHospitals.length).toFixed(1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Hospital Finder</h1>
                <p className="text-xs text-gray-500 hidden sm:block">Find medical help nearby</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleShareLocation}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Share"
              >
                <Share2 className="h-5 w-5 text-gray-600" />
              </button>
              <button
                onClick={getUserLocation}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Refresh Location"
              >
                <Navigation className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row gap-4">
          
          {/* Mobile Filter Trigger */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <SlidersHorizontal className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-gray-900">Filter & Sort Hospitals</span>
              <span className="ml-auto px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                {selectedBloodGroup || selectedOrgan || distanceFilter ? 'Filters Active' : 'All'}
              </span>
            </button>
          </div>

          {/* Left Sidebar - Filters */}
          <div 
            ref={filtersRef}
            className={`fixed lg:sticky lg:top-24 h-[calc(100vh-80px)] lg:h-auto overflow-y-auto lg:overflow-visible bg-white lg:bg-transparent z-50 lg:z-auto w-full max-w-sm lg:w-80 transition-transform duration-300 ease-in-out ${
              mobileFiltersOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            } lg:block lg:relative`}
          >
            <div className="h-full lg:h-auto bg-white lg:rounded-2xl lg:shadow-lg lg:border lg:border-gray-200 p-5 lg:p-6">
              {/* Mobile Header */}
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              {/* Location Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    Your Location
                  </label>
                  {userLocation && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Active
                    </span>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={manualLocation}
                      onChange={(e) => setManualLocation(e.target.value)}
                      placeholder="Enter city, area or landmark"
                      className="flex-1 px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                    <button
                      onClick={handleManualLocationSubmit}
                      className="px-4 py-3 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors font-medium"
                    >
                      Set
                    </button>
                  </div>
                  
                  <button
                    onClick={getUserLocation}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm hover:shadow-md"
                  >
                    <Navigation className="h-4 w-4" />
                    Use My Current Location
                  </button>
                </div>
              </div>

              {/* Distance Filter */}
              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-3">
                  <span className="text-lg">📍</span>
                  Distance Range
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2">
                  {distances.map((distance) => (
                    <button
                      key={distance.value}
                      onClick={() => setDistanceFilter(distanceFilter === distance.value ? '' : distance.value)}
                      className={`flex flex-col items-center p-3 rounded-xl border transition-all ${distanceFilter === distance.value 
                        ? 'bg-blue-50 border-blue-300 text-blue-700 shadow-sm' 
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'}`}
                    >
                      <span className="text-lg mb-1">{distance.icon}</span>
                      <span className="text-xs font-medium">{distance.label.split(' ')[1]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Blood Group Filter */}
              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-3">
                  <Droplets className="h-4 w-4 text-red-600" />
                  Blood Group Required
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {bloodGroups.map((blood) => (
                    <button
                      key={blood.type}
                      onClick={() => setSelectedBloodGroup(selectedBloodGroup === blood.type ? '' : blood.type)}
                      className={`p-2 rounded-lg text-center font-medium transition-all ${selectedBloodGroup === blood.type 
                        ? `${blood.color} border-2 scale-105` 
                        : 'bg-gray-100 hover:bg-gray-200 border border-gray-200'}`}
                    >
                      {blood.type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Organ Filter */}
              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-3">
                  <span className="text-lg">🫀</span>
                  Organ Required
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {organs.map((organ) => (
                    <button
                      key={organ.name}
                      onClick={() => setSelectedOrgan(selectedOrgan === organ.name ? '' : organ.name)}
                      className={`flex items-center gap-2 p-3 rounded-xl border transition-all ${selectedOrgan === organ.name 
                        ? `${organ.color} border-2 scale-105` 
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
                    >
                      <span className="text-lg">{organ.icon}</span>
                      <span className="text-sm font-medium">{organ.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Facilities Filter */}
              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-3">
                  <Award className="h-4 w-4 text-purple-600" />
                  Hospital Facilities
                </label>
                <div className="space-y-2">
                  {facilities.slice(0, 8).map((facility) => (
                    <button
                      key={facility}
                      onClick={() => toggleFacility(facility)}
                      className={`w-full flex items-center justify-between px-4 py-2 rounded-lg border transition-all ${selectedFacilities.includes(facility)
                        ? 'bg-purple-50 border-purple-300 text-purple-700'
                        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'}`}
                    >
                      <span className="text-sm">{facility}</span>
                      <div className={`h-5 w-5 rounded-full border ${selectedFacilities.includes(facility) 
                        ? 'bg-purple-600 border-purple-600' 
                        : 'border-gray-300'}`}>
                        {selectedFacilities.includes(facility) && (
                          <CheckCircle className="h-5 w-5 text-white" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="sticky bottom-0 bg-white pt-4 pb-2 lg:static lg:pt-0 lg:pb-0">
                <div className="space-y-3">
                  <button
                    onClick={applyFilters}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 shadow-md"
                  >
                    Apply Filters
                  </button>
                  <button
                    onClick={clearFilters}
                    className="w-full py-3 rounded-xl font-medium text-gray-600 hover:bg-gray-100 transition-colors border border-gray-300"
                  >
                    Clear All Filters
                  </button>
                </div>

                {/* Stats */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">Search Stats</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-blue-50 p-3 rounded-xl text-center">
                      <div className="text-xl font-bold text-blue-600">{filteredHospitals.length}</div>
                      <div className="text-xs text-gray-600">Hospitals</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-xl text-center">
                      <div className="text-xl font-bold text-green-600">{totalBeds}</div>
                      <div className="text-xs text-gray-600">Beds Available</div>
                    </div>
                    <div className="bg-red-50 p-3 rounded-xl text-center">
                      <div className="text-xl font-bold text-red-600">{totalAmbulances}</div>
                      <div className="text-xs text-gray-600">Ambulances</div>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded-xl text-center">
                      <div className="text-xl font-bold text-yellow-600">{avgRating || '4.8'}</div>
                      <div className="text-xs text-gray-600">Avg Rating</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Filter Overlay */}
          {mobileFiltersOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
              onClick={() => setMobileFiltersOpen(false)}
            />
          )}

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="bg-white rounded-2xl shadow-lg p-4 mb-6 border border-gray-200">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && applyFilters()}
                    placeholder="Search hospitals, specialties, or locations..."
                    className="w-full pl-10 pr-4 py-3.5 text-sm sm:text-base rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={applyFilters}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all font-medium"
                  >
                    <Search className="h-4 w-4" />
                    <span className="hidden sm:inline">Search</span>
                  </button>
                </div>
              </div>

              {/* Active Filters */}
              {(selectedBloodGroup || selectedOrgan || distanceFilter || selectedFacilities.length > 0) && (
                <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-200">
                  <span className="text-xs text-gray-500">Active filters:</span>
                  {selectedBloodGroup && (
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                      <Droplets className="h-3 w-3" />
                      {selectedBloodGroup}
                      <button onClick={() => setSelectedBloodGroup('')} className="ml-1 hover:bg-red-200 rounded-full p-0.5">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                  {selectedOrgan && (
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      <span className="text-xs">🫀</span>
                      {selectedOrgan}
                      <button onClick={() => setSelectedOrgan('')} className="ml-1 hover:bg-green-200 rounded-full p-0.5">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                  {distanceFilter && (
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      <Navigation className="h-3 w-3" />
                      {distances.find(d => d.value === distanceFilter)?.label.split(' ')[1]}
                      <button onClick={() => setDistanceFilter('')} className="ml-1 hover:bg-blue-200 rounded-full p-0.5">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                  {selectedFacilities.map(facility => (
                    <span key={facility} className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                      {facility}
                      <button onClick={() => toggleFacility(facility)} className="ml-1 hover:bg-purple-200 rounded-full p-0.5">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  <button
                    onClick={clearFilters}
                    className="text-xs text-gray-600 hover:text-gray-900 font-medium ml-auto"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>

            {/* Sort Options - Horizontal Scroll on Mobile */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-gray-900">
                  Available Hospitals
                  <span className="ml-2 text-sm font-normal text-gray-600">
                    ({filteredHospitals.length} found)
                  </span>
                </h2>
                <div className="hidden sm:flex items-center gap-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <select 
                    value={activeSort}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                  >
                    {sortOptions.map(option => (
                      <option key={option.id} value={option.id}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Mobile Sort Options - Horizontal Scroll */}
              <div className="sm:hidden overflow-x-auto pb-2 -mx-2 px-2">
                <div className="flex space-x-2 min-w-max">
                  {sortOptions.map(option => (
                    <button
                      key={option.id}
                      onClick={() => handleSortChange(option.id)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg whitespace-nowrap transition-all ${activeSort === option.id 
                        ? 'bg-blue-100 text-blue-700 border border-blue-300' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'}`}
                    >
                      <span>{option.icon}</span>
                      <span className="text-xs font-medium">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="relative">
                  <div className="h-16 w-16 rounded-full border-4 border-gray-200"></div>
                  <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
                </div>
                <p className="mt-4 text-gray-600 font-medium">Finding hospitals near you...</p>
                <p className="text-sm text-gray-500 mt-2">Using your location to find the best matches</p>
              </div>
            ) : (
              <>
                {/* Hospitals Grid */}
                {filteredHospitals.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredHospitals.map((hospital) => (
                      <HospitalCard 
                        key={hospital.id} 
                        hospital={hospital} 
                        userLocation={userLocation}
                        onEmergencyCall={handleEmergencyCall}
                      />
                    ))}
                  </div>
                ) : (
                  // No Results State
                  <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-200">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <Search className="h-10 w-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No hospitals found
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto px-4">
                      We couldn't find any hospitals matching your current filters. Try adjusting your search criteria.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button
                        onClick={clearFilters}
                        className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-sm"
                      >
                        Clear All Filters
                      </button>
                      <button
                        onClick={() => setMobileFiltersOpen(true)}
                        className="px-6 py-3 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-colors font-medium border border-blue-200"
                      >
                        Adjust Filters
                      </button>
                    </div>
                  </div>
                )}

                {/* Results Info */}
                {filteredHospitals.length > 0 && (
                  <div className="mt-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                      <TrendingUp className="h-4 w-4" />
                      Showing {filteredHospitals.length} of {hospitals.length} hospitals
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Emergency Floating Button - Mobile Only */}
      <div className="fixed bottom-20 right-4 z-30 sm:hidden">
        <button
          onClick={handleEmergencyCall}
          className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-pulse"
        >
          <Phone className="h-6 w-6" />
        </button>
      </div>

      {/* Emergency Info Banner */}
      

      {/* Bottom Navigation - Mobile Only */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30 sm:hidden">
        <div className="flex items-center justify-around px-2 py-3">
          <button className="flex flex-col items-center p-2 text-gray-600 hover:text-blue-600">
            <MapPin className="h-5 w-5" />
            <span className="text-xs mt-1">Map</span>
          </button>
          <button className="flex flex-col items-center p-2 text-gray-600 hover:text-blue-600">
            <Heart className="h-5 w-5" />
            <span className="text-xs mt-1">Favorites</span>
          </button>
          <button 
            onClick={() => setMobileFiltersOpen(true)}
            className="flex flex-col items-center p-2 text-gray-600 hover:text-blue-600"
          >
            <Filter className="h-5 w-5" />
            <span className="text-xs mt-1">Filters</span>
          </button>
          <button className="flex flex-col items-center p-2 text-gray-600 hover:text-blue-600">
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default HospitalListingPage;