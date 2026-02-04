import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  FaHeartbeat, 
  FaUserInjured, 
  FaTint, 
  FaHeart, 
  FaHospital, 
  FaCalendarAlt, 
  FaStethoscope, 
  FaMapMarkerAlt, 
  FaStar, 
  FaPhone, 
  FaArrowUp, 
  FaArrowDown,
  FaAmbulance,
  FaBed,
  FaUserMd,
  FaChartLine,
  FaBell,
  FaSearch,
  FaFilter,
  FaPlusCircle,
  FaHistory,
  FaUserCheck,
  FaShieldAlt
} from 'react-icons/fa';
import { 
  GiHeartBeats, 
  GiHospitalCross,
  GiMedicalPack,
  GiStethoscope
} from 'react-icons/gi';

function HeroDashboard() {
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const [scrollSpeed, setScrollSpeed] = useState(2);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications] = useState(3);
  const hospitalContainerRef = useRef(null);
  const scrollIntervalRef = useRef(null);

  // Enhanced sample data
  const patients = [
    { 
      id: 1, 
      name: "Amit Kumar", 
      age: 45, 
      department: "Cardiology", 
      bloodType: "A+", 
      avatar: "AK",
      status: "critical",
      admissionDate: "2024-01-15",
      room: "ICU-101"
    },
    { 
      id: 2, 
      name: "Priya Sharma", 
      age: 32, 
      department: "Neurology", 
      bloodType: "O-", 
      avatar: "PS",
      status: "stable",
      admissionDate: "2024-01-18",
      room: "302"
    },
    { 
      id: 3, 
      name: "Rajesh Singh", 
      age: 58, 
      department: "Orthopedics", 
      bloodType: "B+", 
      avatar: "RS",
      status: "recovering",
      admissionDate: "2024-01-10",
      room: "205"
    },
    { 
      id: 4, 
      name: "Sneha Patel", 
      age: 29, 
      department: "Pediatrics", 
      bloodType: "AB+", 
      avatar: "SP",
      status: "stable",
      admissionDate: "2024-01-20",
      room: "401"
    },
  ];

  const bloodDonors = [
    { 
      id: 1, 
      name: "Mohit Sharma", 
      bloodType: "O+", 
      lastDonation: "3 months ago", 
      avatar: "MS",
      availability: "available",
      donations: 12
    },
    { 
      id: 2, 
      name: "Neha Jain", 
      bloodType: "AB-", 
      lastDonation: "1 month ago", 
      avatar: "NJ",
      availability: "available",
      donations: 8
    },
    { 
      id: 3, 
      name: "Vikram Mehta", 
      bloodType: "A+", 
      lastDonation: "2 weeks ago", 
      avatar: "VM",
      availability: "not-available",
      donations: 15
    },
    { 
      id: 4, 
      name: "Ananya Reddy", 
      bloodType: "B-", 
      lastDonation: "4 months ago", 
      avatar: "AR",
      availability: "available",
      donations: 6
    },
  ];

  const organDonors = [
    { 
      id: 1, 
      name: "Sanjay Patel", 
      organ: "Kidney", 
      registered: "2022", 
      avatar: "SP",
      status: "verified"
    },
    { 
      id: 2, 
      name: "Anjali Desai", 
      organ: "Liver", 
      registered: "2023", 
      avatar: "AD",
      status: "pending"
    },
    { 
      id: 3, 
      name: "Rahul Gupta", 
      organ: "Heart & Lungs", 
      registered: "2021", 
      avatar: "RG",
      status: "verified"
    },
    { 
      id: 4, 
      name: "Meera Nair", 
      organ: "Cornea", 
      registered: "2023", 
      avatar: "MN",
      status: "verified"
    },
  ];

  const hospitals = [
    { 
      id: 1, 
      name: "City General Hospital", 
      location: "Mumbai, Maharashtra", 
      rating: 4.7, 
      phone: "+91 22 1234 5678", 
      speciality: "Multi-specialty",
      beds: 450,
      doctors: 120,
      emergency: true,
      distance: "2.5 km"
    },
    { 
      id: 2, 
      name: "Apollo Medical Center", 
      location: "Delhi, NCR", 
      rating: 4.9, 
      phone: "+91 11 8765 4321", 
      speciality: "Cardiology & Neurology",
      beds: 600,
      doctors: 150,
      emergency: true,
      distance: "5.1 km"
    },
    { 
      id: 3, 
      name: "LifeCare Hospital", 
      location: "Bangalore, Karnataka", 
      rating: 4.5, 
      phone: "+91 80 5555 1234", 
      speciality: "Orthopedics & Trauma",
      beds: 350,
      doctors: 85,
      emergency: true,
      distance: "3.8 km"
    },
    { 
      id: 4, 
      name: "Green Valley Hospital", 
      location: "Chennai, Tamil Nadu", 
      rating: 4.6, 
      phone: "+91 44 3333 7777", 
      speciality: "Oncology & Nephrology",
      beds: 500,
      doctors: 110,
      emergency: true,
      distance: "7.2 km"
    },
    { 
      id: 5, 
      name: "Sunshine Medical Complex", 
      location: "Kolkata, West Bengal", 
      rating: 4.4, 
      phone: "+91 33 2222 8888", 
      speciality: "Pediatrics & Gynecology",
      beds: 300,
      doctors: 75,
      emergency: false,
      distance: "1.9 km"
    },
    { 
      id: 6, 
      name: "Royal Health Institute", 
      location: "Hyderabad, Telangana", 
      rating: 4.8, 
      phone: "+91 40 4444 9999", 
      speciality: "Organ Transplant Center",
      beds: 550,
      doctors: 130,
      emergency: true,
      distance: "6.5 km"
    },
    { 
      id: 7, 
      name: "Unity Hospital", 
      location: "Pune, Maharashtra", 
      rating: 4.3, 
      phone: "+91 20 7777 2222", 
      speciality: "Emergency & Critical Care",
      beds: 400,
      doctors: 95,
      emergency: true,
      distance: "4.3 km"
    },
    { 
      id: 8, 
      name: "Hope Medical Center", 
      location: "Ahmedabad, Gujarat", 
      rating: 4.6, 
      phone: "+91 79 6666 1111", 
      speciality: "Cardiac Surgery",
      beds: 320,
      doctors: 70,
      emergency: true,
      distance: "8.1 km"
    },
  ];

  // Enhanced stats data with trends
  const stats = [
    { 
      label: "Total Patients", 
      value: "1,234", 
      icon: <FaUserInjured />, 
      color: "from-blue-500 to-cyan-500",
      trend: "+12%",
      trendUp: true
    },
    { 
      label: "Blood Donors", 
      value: "456", 
      icon: <FaTint />, 
      color: "from-red-500 to-pink-500",
      trend: "+8%",
      trendUp: true
    },
    { 
      label: "Organ Donors", 
      value: "89", 
      icon: <FaHeart />, 
      color: "from-purple-500 to-violet-500",
      trend: "+23%",
      trendUp: true
    },
    { 
      label: "Available Beds", 
      value: "142", 
      icon: <FaBed />, 
      color: "from-green-500 to-emerald-500",
      trend: "-5%",
      trendUp: false
    },
  ];

  // Auto-scroll functionality with better performance
  const startAutoScroll = useCallback(() => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
    }
    
    scrollIntervalRef.current = setInterval(() => {
      if (hospitalContainerRef.current) {
        const container = hospitalContainerRef.current;
        const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 10;
        
        if (isAtBottom) {
          container.scrollTop = 0;
        } else {
          container.scrollTop += scrollSpeed;
        }
      }
    }, 30);
  }, [scrollSpeed]);

  useEffect(() => {
    if (isAutoScroll && hospitalContainerRef.current) {
      startAutoScroll();
    } else {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    }

    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, [isAutoScroll, startAutoScroll]);

  const handleMouseEnter = () => {
    setIsAutoScroll(false);
  };

  const handleMouseLeave = () => {
    setIsAutoScroll(true);
  };

  const handleScrollUp = () => {
    if (hospitalContainerRef.current) {
      hospitalContainerRef.current.scrollTop -= 200;
      hospitalContainerRef.current.style.scrollBehavior = 'smooth';
    }
  };

  const handleScrollDown = () => {
    if (hospitalContainerRef.current) {
      hospitalContainerRef.current.scrollTop += 200;
      hospitalContainerRef.current.style.scrollBehavior = 'smooth';
    }
  };

  const handleSpeedChange = (speed) => {
    setScrollSpeed(speed);
  };

  // Render star ratings with half stars
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <FaStar 
            key={i} 
            className="text-yellow-500 fill-current"
          />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <FaStar className="text-gray-300 fill-current" />
            <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
              <FaStar className="text-yellow-500 fill-current" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <FaStar 
            key={i} 
            className="text-gray-300 fill-current"
          />
        );
      }
    }
    return stars;
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'stable': return 'bg-green-100 text-green-800';
      case 'recovering': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter hospitals based on active tab and search
  const filteredHospitals = hospitals.filter(hospital => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hospital.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hospital.speciality.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'emergency') {
      return matchesSearch && hospital.emergency;
    }
    if (activeTab === 'nearby') {
      return matchesSearch && parseFloat(hospital.distance) < 5;
    }
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-3 md:p-5 lg:p-6">
      <div className="max-w-8xl mx-auto">
        {/* Enhanced Header with Navigation */}
        <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 text-white rounded-2xl md:rounded-3xl p-5 md:p-7 mb-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/20 rounded-full translate-y-24 -translate-x-24"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                  <GiHeartBeats className="text-4xl animate-pulse" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                    Health<span className="text-cyan-300">Sync</span> Pro
                  </h1>
                  <p className="text-blue-100 mt-2 text-sm md:text-base">Integrated Healthcare Management Dashboard</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button className="bg-white/20 hover:bg-white/30 p-3 rounded-xl transition-all duration-300 backdrop-blur-sm relative">
                    <FaBell className="text-xl" />
                    {notifications > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {notifications}
                      </span>
                    )}
                  </button>
                </div>
                
                <div className="flex items-center space-x-3 bg-white/20 px-4 py-3 rounded-xl backdrop-blur-sm">
                  <div className={`w-3 h-3 rounded-full animate-pulse ${isAutoScroll ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  <span className="text-sm font-medium">{isAutoScroll ? 'Auto-Scroll ON' : 'Auto-Scroll OFF'}</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <GiMedicalPack className="text-2xl" />
                  <div>
                    <p className="text-sm text-blue-200">Active Cases</p>
                    <p className="text-xl font-bold">24</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <GiStethoscope className="text-2xl" />
                  <div>
                    <p className="text-sm text-blue-200">Doctors Online</p>
                    <p className="text-xl font-bold">18</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <GiHospitalCross className="text-2xl" />
                  <div>
                    <p className="text-sm text-blue-200">Emergency Beds</p>
                    <p className="text-xl font-bold">12</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Enhanced Stats Overview with Charts */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-xl text-white`}>
                  {stat.icon}
                </div>
                <span className={`text-sm font-semibold ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trend} <FaChartLine className="inline ml-1" />
                </span>
              </div>
              <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
              <p className="text-2xl md:text-3xl font-bold text-gray-800">{stat.value}</p>
              <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full bg-gradient-to-r ${stat.color} transition-all duration-500`}
                  style={{ width: `${Math.min(100, 70 + index * 10)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col xl:flex-row gap-6">
          {/* Left Panel - Enhanced */}
          <div className="xl:w-2/3 flex flex-col gap-6">
            {/* Patients Section with Advanced Features */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 border-b">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2.5 rounded-xl">
                      <FaUserInjured className="text-white text-xl" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">Active Patients</h2>
                      <p className="text-sm text-gray-600">Real-time monitoring</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input 
                        type="text" 
                        placeholder="Search patients..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center space-x-2">
                      <FaPlusCircle />
                      <span>Add New</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {patients.map(patient => (
                    <div 
                      key={patient.id} 
                      className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {patient.avatar}
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${getStatusColor(patient.status)} flex items-center justify-center`}>
                            <div className="w-2 h-2 rounded-full bg-current"></div>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-bold text-gray-800 text-lg">{patient.name}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(patient.status)}`}>
                              {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            <div className="flex items-center text-sm text-gray-600">
                              <FaCalendarAlt className="mr-2 text-gray-400" />
                              {patient.age} years
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <FaStethoscope className="mr-2 text-gray-400" />
                              {patient.department}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <FaBed className="mr-2 text-gray-400" />
                              {patient.room}
                            </div>
                            <div className={`px-2 py-1 rounded text-xs font-bold ${
                              patient.bloodType === 'O-' || patient.bloodType === 'AB-' 
                                ? 'bg-red-100 text-red-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {patient.bloodType}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Enhanced Donors Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Blood Donors Enhanced */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-red-50 to-rose-50 p-5 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-r from-red-500 to-rose-600 p-2.5 rounded-xl">
                        <FaTint className="text-white text-xl" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-800">Blood Donors</h2>
                        <p className="text-sm text-gray-600">Urgent requirements: O-, AB-</p>
                      </div>
                    </div>
                    <button className="text-red-600 hover:text-red-800">
                      <FaHistory className="text-lg" />
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  {bloodDonors.map(donor => (
                    <div 
                      key={donor.id} 
                      className="flex items-center space-x-4 p-4 rounded-xl hover:bg-red-50 transition-all duration-300 mb-3 last:mb-0 group"
                    >
                      <div className="relative">
                        <div className="bg-gradient-to-r from-red-500 to-rose-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold">
                          {donor.avatar}
                        </div>
                        {donor.availability === 'available' && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-white flex items-center justify-center">
                            <FaUserCheck className="text-white text-xs" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-800">{donor.name}</h3>
                          <span className="text-xs font-bold bg-red-100 text-red-800 px-2 py-1 rounded">
                            {donor.bloodType}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600 mt-1">
                          <span>{donor.donations} donations</span>
                          <span className="text-gray-500">{donor.lastDonation}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Organ Donors Enhanced */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-5 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-r from-purple-500 to-violet-600 p-2.5 rounded-xl">
                        <FaHeart className="text-white text-xl" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-800">Organ Donors</h2>
                        <p className="text-sm text-gray-600">Verified donors registry</p>
                      </div>
                    </div>
                    <button className="text-purple-600 hover:text-purple-800">
                      <FaShieldAlt className="text-lg" />
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  {organDonors.map(donor => (
                    <div 
                      key={donor.id} 
                      className="flex items-center space-x-4 p-4 rounded-xl hover:bg-purple-50 transition-all duration-300 mb-3 last:mb-0 group"
                    >
                      <div className="relative">
                        <div className="bg-gradient-to-r from-purple-500 to-violet-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold">
                          {donor.avatar}
                        </div>
                        {donor.status === 'verified' && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center">
                            <FaShieldAlt className="text-white text-xs" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-800">{donor.name}</h3>
                          <span className={`text-xs font-bold px-2 py-1 rounded ${
                            donor.status === 'verified' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {donor.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600 mt-1">
                          <span className="font-medium">{donor.organ}</span>
                          <span className="text-gray-500">Since {donor.registered}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Enhanced Hospitals Section */}
          <div className="xl:w-1/3">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-full flex flex-col">
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-5 border-b">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-2.5 rounded-xl">
                      <FaHospital className="text-white text-xl" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">Hospitals</h2>
                      <p className="text-sm text-gray-600">Nearby healthcare facilities</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                      <input 
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search hospitals..."
                        className="pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-full"
                      />
                    </div>
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <FaFilter className="text-gray-600" />
                    </button>
                  </div>
                </div>
                
                {/* Tabs and Controls */}
                <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex space-x-2 overflow-x-auto pb-2">
                    {['all', 'emergency', 'nearby'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                          activeTab === tab 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Speed:</span>
                      <div className="flex space-x-1">
                        {[1, 2, 3].map(speed => (
                          <button
                            key={speed}
                            onClick={() => handleSpeedChange(speed)}
                            className={`w-7 h-7 rounded-full text-xs font-medium transition-all duration-300 ${
                              scrollSpeed === speed 
                                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {speed}x
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => setIsAutoScroll(!isAutoScroll)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                        isAutoScroll 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {isAutoScroll ? 'Pause' : 'Play'}
                    </button>
                  </div>
                </div>
                
                {/* Auto-scroll indicator */}
                <div className="mt-4 flex items-center justify-between bg-white/80 rounded-xl py-2 px-4 border">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full animate-pulse ${isAutoScroll ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    <span className="text-sm font-medium">
                      {isAutoScroll ? 'Auto-scrolling...' : 'Scroll paused'}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {filteredHospitals.length} hospitals
                  </div>
                </div>
              </div>

              {/* Hospitals Container with Scroll - Enhanced */}
              <div 
                ref={hospitalContainerRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="flex-1 overflow-y-auto custom-scrollbar p-5"
                style={{ maxHeight: '600px' }}
              >
                {filteredHospitals.length > 0 ? (
                  filteredHospitals.map(hospital => (
                    <div 
                      key={hospital.id}
                      className="mb-5 last:mb-0 bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-4 transition-all duration-300 hover:border-green-300 hover:shadow-xl hover:-translate-y-1 group"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="relative">
                          <div className="bg-gradient-to-r from-green-500 to-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg">
                            <FaHospital className="text-2xl" />
                          </div>
                          {hospital.emergency && (
                            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                              24/7
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-bold text-gray-800 text-lg truncate">{hospital.name}</h3>
                            <div className="flex items-center text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                              <FaMapMarkerAlt className="mr-1" />
                              {hospital.distance}
                            </div>
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-600 mb-3">
                            <FaMapMarkerAlt className="mr-2 flex-shrink-0" />
                            <span className="truncate">{hospital.location}</span>
                          </div>
                          
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              {renderStars(hospital.rating)}
                              <span className="ml-2 text-sm font-medium">{hospital.rating}/5</span>
                            </div>
                            <span className="text-sm font-medium text-green-700">{hospital.speciality}</span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="bg-blue-50 p-3 rounded-xl">
                              <div className="flex items-center space-x-2">
                                <FaBed className="text-blue-600" />
                                <div>
                                  <p className="text-xs text-gray-500">Beds</p>
                                  <p className="font-bold text-gray-800">{hospital.beds}</p>
                                </div>
                              </div>
                            </div>
                            <div className="bg-green-50 p-3 rounded-xl">
                              <div className="flex items-center space-x-2">
                                <FaUserMd className="text-green-600" />
                                <div>
                                  <p className="text-xs text-gray-500">Doctors</p>
                                  <p className="font-bold text-gray-800">{hospital.doctors}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-blue-600 font-medium text-sm">
                              <FaPhone className="mr-2" />
                              {hospital.phone}
                            </div>
                            <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg text-sm hover:shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <FaHospital className="text-4xl text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No hospitals found</p>
                    <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters</p>
                  </div>
                )}
              </div>

              {/* Enhanced Scroll Controls */}
              <div className="border-t p-4 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex space-x-3">
                  <button
                    onClick={handleScrollUp}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-3 rounded-xl flex items-center justify-center space-x-2 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group"
                  >
                    <FaArrowUp className="group-hover:animate-bounce" />
                    <span className="font-medium">Scroll Up</span>
                  </button>
                  <button
                    onClick={handleScrollDown}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl flex items-center justify-center space-x-2 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group"
                  >
                    <span className="font-medium">Scroll Down</span>
                    <FaArrowDown className="group-hover:animate-bounce" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Footer */}
        <footer className="mt-8">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-2xl p-6 shadow-2xl">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-3 rounded-xl">
                  <FaAmbulance className="text-2xl" />
                </div>
                <div>
                  <p className="font-bold text-xl">HealthSync Pro Dashboard</p>
                  <p className="text-gray-300 text-sm">Advanced Healthcare Management System</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="text-center sm:text-left">
                  <p className="text-gray-400 text-xs">Auto-scroll Status</p>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${isAutoScroll ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                    <span className="font-medium">
                      {isAutoScroll ? 'Active • Auto-scrolling' : 'Paused • Manual control'}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => setIsAutoScroll(!isAutoScroll)}
                    className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 font-medium"
                  >
                    {isAutoScroll ? '⏸️ Pause Scroll' : '▶️ Start Scroll'}
                  </button>
                  <button className="px-5 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-all duration-300 font-medium">
                    Refresh Data
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-700 text-center">
              <p className="text-gray-400">
                &copy; {new Date().getFullYear()} HealthSync Pro Dashboard System. All rights reserved. | 
                <span className="text-cyan-400 ml-2">Live Data Updates • Real-time Monitoring • Secure & Compliant</span>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default HeroDashboard;