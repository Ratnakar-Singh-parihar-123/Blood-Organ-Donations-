import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Users, 
  Heart, 
  Activity, 
  User, 
  TrendingUp, 
  AlertCircle, 
  RefreshCw,
  BarChart3,
  Clock,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Shield,
  Calendar,
  Download,
  FileText,
  Search,
  Filter,
  ChevronRight,
  Eye,
  Globe,
  Hospital,
  Ambulance,
  Zap,
  Target,
  Award,
  Bed,
  Stethoscope,
  Phone,
  MapPin,
  Star,
  Plus,
  Pause,
  Play,
  UserCheck,
} from "lucide-react";
import { getDashboardCounts } from "../../../api/dashboardApi";

const HeroDashboard = () => {
    const [counts, setCounts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [isAutoScroll, setIsAutoScroll] = useState(true);
    const [scrollSpeed, setScrollSpeed] = useState(2);
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const hospitalContainerRef = useRef(null);
    const scrollIntervalRef = useRef(null);

    // Mock data for hospitals (you can replace with API data)
    const hospitals = [
        { 
            id: 1, 
            name: "City General Hospital", 
            location: "Mumbai, Maharashtra", 
            rating: 4.7, 
            phone: "+91 22 1234 5678", 
            beds: 450,
            doctors: 120,
            emergency: true,
            speciality: "Multi-specialty"
        },
        { 
            id: 2, 
            name: "Apollo Medical Center", 
            location: "Delhi, NCR", 
            rating: 4.9, 
            phone: "+91 11 8765 4321", 
            beds: 600,
            doctors: 150,
            emergency: true,
            speciality: "Cardiology & Neurology"
        },
        { 
            id: 3, 
            name: "LifeCare Hospital", 
            location: "Bangalore, Karnataka", 
            rating: 4.5, 
            phone: "+91 80 5555 1234", 
            beds: 350,
            doctors: 85,
            emergency: true,
            speciality: "Orthopedics & Trauma"
        },
        { 
            id: 4, 
            name: "Green Valley Hospital", 
            location: "Chennai, Tamil Nadu", 
            rating: 4.6, 
            phone: "+91 44 3333 7777", 
            beds: 500,
            doctors: 110,
            emergency: true,
            speciality: "Oncology & Nephrology"
        },
        { 
            id: 5, 
            name: "Sunshine Medical Complex", 
            location: "Kolkata, West Bengal", 
            rating: 4.4, 
            phone: "+91 33 2222 8888", 
            beds: 300,
            doctors: 75,
            emergency: false,
            speciality: "Pediatrics & Gynecology"
        },
    ];

    // Mock patient data
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
    ];

    // Mock donor data
    const bloodDonors = [
        { 
            id: 1, 
            name: "Mohit Sharma", 
            bloodType: "O+", 
            lastDonation: "3 months ago", 
            avatar: "MS",
            availability: true,
            donations: 12
        },
        { 
            id: 2, 
            name: "Neha Jain", 
            bloodType: "AB-", 
            lastDonation: "1 month ago", 
            avatar: "NJ",
            availability: true,
            donations: 8
        },
        { 
            id: 3, 
            name: "Vikram Mehta", 
            bloodType: "A+", 
            lastDonation: "2 weeks ago", 
            avatar: "VM",
            availability: false,
            donations: 15
        },
    ];

    // Stats data
    const stats = [
        { 
            label: "Blood Donors", 
            value: "456", 
            icon: Heart,
            color: "from-rose-500 to-pink-600",
            change: "+12%",
            trend: "up",
            description: "Active donors"
        },
        { 
            label: "Organ Donors", 
            value: "89", 
            icon: Activity,
            color: "from-emerald-500 to-green-600",
            change: "+8%",
            trend: "up",
            description: "Registered donors"
        },
        { 
            label: "Patients", 
            value: "1,234", 
            icon: User,
            color: "from-amber-500 to-orange-600",
            change: "-3%",
            trend: "down",
            description: "Active patients"
        },
        { 
            label: "Total Users", 
            value: "2,845", 
            icon: Users,
            color: "from-blue-500 to-cyan-600",
            change: "+15%",
            trend: "up",
            description: "Platform users"
        },
    ];

    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getDashboardCounts();
                setCounts(data.data);
                setLastUpdated(new Date());
            } catch (err) {
                setError("Failed to load dashboard data");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        
        // Auto-refresh every 2 minutes
        const interval = setInterval(fetchData, 2 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    // Auto-scroll functionality for hospitals
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

    const handleMouseEnter = () => setIsAutoScroll(false);
    const handleMouseLeave = () => setIsAutoScroll(true);
    const handleScrollUp = () => {
        if (hospitalContainerRef.current) {
            hospitalContainerRef.current.scrollTop -= 200;
        }
    };
    const handleScrollDown = () => {
        if (hospitalContainerRef.current) {
            hospitalContainerRef.current.scrollTop += 200;
        }
    };

    const handleRefresh = async () => {
        try {
            const data = await getDashboardCounts();
            setCounts(data.data);
            setLastUpdated(new Date());
        } catch (err) {
            console.error("Failed to refresh data:", err);
        }
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'critical': return 'bg-red-100 text-red-800';
            case 'stable': return 'bg-green-100 text-green-800';
            case 'recovering': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getBloodColor = (type) => {
        if (type === 'O-' || type === 'AB-') return 'text-red-600';
        return 'text-blue-600';
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                );
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push(
                    <div key={i} className="relative">
                        <Star className="w-4 h-4 text-gray-300 fill-current" />
                        <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        </div>
                    </div>
                );
            } else {
                stars.push(
                    <Star key={i} className="w-4 h-4 text-gray-300 fill-current" />
                );
            }
        }
        return stars;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 p-4 md:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="animate-pulse">
                        {/* Header Skeleton */}
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <div className="h-10 bg-gray-200 rounded-xl w-64 mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-48"></div>
                            </div>
                            <div className="h-10 bg-gray-200 rounded-xl w-32"></div>
                        </div>
                        
                        {/* Stats Grid Skeleton */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                            {[1,2,3,4].map(i => (
                                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                    <div className="flex justify-between mb-4">
                                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                                        <div className="h-10 w-10 bg-gray-200 rounded-xl"></div>
                                    </div>
                                    <div className="h-8 bg-gray-300 rounded w-20 mb-3"></div>
                                    <div className="h-2 bg-gray-200 rounded-full"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50/30 p-4">
                <div className="text-center max-w-md mx-auto">
                    <div className="bg-gradient-to-r from-rose-100 to-pink-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <AlertCircle className="h-10 w-10 text-rose-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">Unable to Load Dashboard</h2>
                    <p className="text-gray-600 mb-8">{error}. Please check your connection and try again.</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
                    >
                        Refresh Page
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur-lg opacity-50"></div>
                                <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 p-2.5 rounded-xl shadow-lg">
                                    <BarChart3 className="h-6 w-6 text-white" />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                    Health Dashboard
                                </h1>
                                <p className="text-gray-600 text-sm md:text-base mt-1">
                                    Real-time healthcare management and monitoring
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        {lastUpdated && (
                            <div className="flex items-center gap-2 text-sm text-gray-600 bg-white/90 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-gray-200 shadow-sm">
                                <Clock className="h-4 w-4 text-blue-500" />
                                <span className="font-medium">Updated {formatTimeAgo(lastUpdated)}</span>
                            </div>
                        )}
                        <button
                            onClick={handleRefresh}
                            className="flex items-center justify-center gap-2 bg-gradient-to-r from-gray-50 to-white text-gray-700 px-4 py-2.5 rounded-xl border border-gray-300 hover:border-blue-300 hover:shadow-md hover:shadow-blue-500/10 transition-all duration-300 group min-w-[120px]"
                        >
                            <RefreshCw className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
                            <span className="font-semibold text-sm">Refresh</span>
                        </button>
                    </div>
                </div>

                {/* Stats Grid - Shows data from API */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <StatCard 
                            key={index}
                            title={stat.label} 
                            count={stat.value} 
                            icon={stat.icon}
                            color={stat.color}
                            change={stat.change}
                            trend={stat.trend}
                            description={stat.description}
                        />
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="flex flex-col xl:flex-row gap-6">
                    {/* Left Panel */}
                    <div className="xl:w-2/3 flex flex-col gap-6">
                        {/* Patients Section */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                            <div className="px-5 py-4 border-b border-gray-100">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <User className="text-blue-600 mr-3" />
                                        <div>
                                            <h2 className="text-lg font-semibold text-gray-800">Active Patients</h2>
                                            <p className="text-sm text-gray-600">Currently admitted patients</p>
                                        </div>
                                    </div>
                                    <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                                        <Plus className="mr-1" />
                                        Add New
                                    </button>
                                </div>
                            </div>
                            
                            <div className="p-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {patients.map(patient => (
                                        <div key={patient.id} className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all duration-300">
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
                                                        {patient.avatar}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-gray-800">{patient.name}</h3>
                                                        <p className="text-sm text-gray-600">{patient.age} years</p>
                                                    </div>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                                                    {patient.status}
                                                </span>
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <Stethoscope className="w-4 h-4 mr-2" />
                                                    {patient.department}
                                                </div>
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <Bed className="w-4 h-4 mr-2" />
                                                    Room: {patient.room}
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className={`font-bold ${getBloodColor(patient.bloodType)}`}>
                                                        {patient.bloodType}
                                                    </span>
                                                    <button className="text-sm text-blue-600 hover:text-blue-800">
                                                        View Details →
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Donors Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Blood Donors */}
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                                <div className="px-5 py-4 border-b border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <Heart className="text-rose-600 mr-3" />
                                            <div>
                                                <h2 className="text-lg font-semibold text-gray-800">Blood Donors</h2>
                                                <p className="text-sm text-gray-600">Available for donation</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-500">Urgent: O-</span>
                                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="p-4">
                                    {bloodDonors.map(donor => (
                                        <div key={donor.id} className="flex items-center justify-between p-3 hover:bg-rose-50 rounded-lg mb-2 last:mb-0 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-gradient-to-r from-rose-500 to-pink-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
                                                    {donor.avatar}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-800">{donor.name}</p>
                                                    <p className="text-sm text-gray-600">Type: {donor.bloodType}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-gray-500">{donor.lastDonation}</p>
                                                <div className="flex items-center justify-end gap-1 mt-1">
                                                    <div className={`w-2 h-2 rounded-full ${donor.availability ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                                    <span className="text-xs">{donor.donations} donations</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Organ Donors */}
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                                <div className="px-5 py-4 border-b border-gray-100">
                                    <div className="flex items-center">
                                        <Activity className="text-emerald-600 mr-3" />
                                        <div>
                                            <h2 className="text-lg font-semibold text-gray-800">Organ Donors</h2>
                                            <p className="text-sm text-gray-600">Registered organ donors</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="p-4">
                                    <div className="p-3 hover:bg-emerald-50 rounded-lg mb-2">
                                        <p className="font-medium text-gray-800">Sanjay Patel</p>
                                        <p className="text-sm text-gray-600">Kidney • Registered: 2022</p>
                                    </div>
                                    <div className="p-3 hover:bg-emerald-50 rounded-lg mb-2">
                                        <p className="font-medium text-gray-800">Anjali Desai</p>
                                        <p className="text-sm text-gray-600">Liver • Registered: 2023</p>
                                    </div>
                                    <div className="p-3 hover:bg-emerald-50 rounded-lg">
                                        <p className="font-medium text-gray-800">Rahul Gupta</p>
                                        <p className="text-sm text-gray-600">Heart & Lungs • Registered: 2021</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel - Hospitals */}
                    <div className="xl:w-1/3">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 h-full flex flex-col">
                            {/* Hospital Header */}
                            <div className="px-5 py-4 border-b border-gray-100">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center">
                                        <Hospital className="text-emerald-600 mr-3" />
                                        <div>
                                            <h2 className="text-lg font-semibold text-gray-800">Hospitals</h2>
                                            <p className="text-sm text-gray-600">Nearby healthcare facilities</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center space-x-2">
                                        <button 
                                            onClick={() => setIsAutoScroll(!isAutoScroll)}
                                            className={`p-2 rounded-lg ${isAutoScroll ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'}`}
                                        >
                                            {isAutoScroll ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>
                                
                                {/* Scroll Indicator */}
                                <div className="flex items-center justify-between text-sm mb-3">
                                    <div className="flex items-center space-x-2">
                                        <div className={`w-2 h-2 rounded-full ${isAutoScroll ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`}></div>
                                        <span className="text-gray-600">
                                            {isAutoScroll ? 'Auto-scrolling' : 'Paused'}
                                        </span>
                                    </div>
                                    <span className="text-gray-500">{hospitals.length} hospitals</span>
                                </div>
                                
                                {/* Search and Filter */}
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input 
                                            type="text"
                                            placeholder="Search hospitals..."
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                                        />
                                    </div>
                                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                        <Filter className="w-4 h-4 text-gray-600" />
                                    </button>
                                </div>
                            </div>

                            {/* Hospitals List */}
                            <div 
                                ref={hospitalContainerRef}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                className="flex-1 overflow-y-auto p-4 custom-scrollbar"
                                style={{ maxHeight: '500px' }}
                            >
                                {hospitals.map(hospital => (
                                    <div key={hospital.id} className="mb-4 last:mb-0 border border-gray-200 rounded-xl p-4 hover:border-emerald-300 hover:shadow-md transition-all duration-300">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h3 className="font-semibold text-gray-800">{hospital.name}</h3>
                                                <div className="flex items-center text-sm text-gray-600 mt-1">
                                                    <MapPin className="w-4 h-4 mr-2" />
                                                    {hospital.location}
                                                </div>
                                            </div>
                                            {hospital.emergency && (
                                                <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded">
                                                    24/7
                                                </span>
                                            )}
                                        </div>
                                        
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center">
                                                {renderStars(hospital.rating)}
                                                <span className="ml-2 text-sm font-medium">{hospital.rating}</span>
                                            </div>
                                            <span className="text-sm font-medium text-emerald-700">{hospital.speciality}</span>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-3 mb-3">
                                            <div className="bg-blue-50 p-2 rounded-lg">
                                                <div className="flex items-center">
                                                    <Bed className="w-4 h-4 text-blue-600 mr-2" />
                                                    <div>
                                                        <p className="text-xs text-gray-500">Beds</p>
                                                        <p className="font-bold text-gray-800">{hospital.beds}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-emerald-50 p-2 rounded-lg">
                                                <div className="flex items-center">
                                                    <UserCheck className="w-4 h-4 text-emerald-600 mr-2" />
                                                    <div>
                                                        <p className="text-xs text-gray-500">Doctors</p>
                                                        <p className="font-bold text-gray-800">{hospital.doctors}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center text-sm text-blue-600">
                                                <Phone className="w-4 h-4 mr-2" />
                                                {hospital.phone}
                                            </div>
                                            <button className="text-sm text-emerald-600 hover:text-emerald-800">
                                                Contact →
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Scroll Controls */}
                            <div className="border-t border-gray-100 p-4">
                                <div className="flex space-x-3">
                                    <button
                                        onClick={handleScrollUp}
                                        className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                                    >
                                        <ArrowUp className="w-4 h-4" />
                                        <span className="font-medium">Up</span>
                                    </button>
                                    <button
                                        onClick={handleScrollDown}
                                        className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                                    >
                                        <span className="font-medium">Down</span>
                                        <ArrowDown className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Stats & Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                    {/* Quick Stats */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800 mb-2">Platform Analytics</h2>
                                <p className="text-gray-600">Comprehensive overview of all activities</p>
                            </div>
                            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                                <Sparkles className="h-4 w-4 text-blue-600" />
                                <span className="text-sm font-semibold text-blue-700">Live Data</span>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <SummaryItem 
                                title="Total Donors"
                                value={456 + 89}
                                description="Blood & organ donors"
                                icon={Shield}
                                iconColor="text-blue-600"
                                bgColor="bg-blue-50"
                            />
                            <SummaryItem 
                                title="Active Today"
                                value="284"
                                description="Active users today"
                                icon={Zap}
                                iconColor="text-emerald-600"
                                bgColor="bg-emerald-50"
                            />
                            <SummaryItem 
                                title="Growth Rate"
                                value="+24%"
                                description="Monthly growth"
                                icon={TrendingUp}
                                iconColor="text-amber-600"
                                bgColor="bg-amber-50"
                            />
                        </div>
                    </div>

                    {/* Quick Actions Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Target className="h-5 w-5 text-blue-600" />
                                Quick Actions
                            </h3>
                            <div className="space-y-3">
                                <ActionButton 
                                    title="View Reports"
                                    description="Detailed analytics"
                                    icon={BarChart3}
                                    color="from-blue-600 to-cyan-600"
                                />
                                <ActionButton 
                                    title="Export Data"
                                    description="Download statistics"
                                    icon={Download}
                                    color="from-emerald-600 to-green-600"
                                />
                                <ActionButton 
                                    title="Donor List"
                                    description="Manage donors"
                                    icon={Users}
                                    color="from-rose-600 to-pink-600"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-gray-500 text-sm">
                    <p>Healthcare Dashboard • Real-time Monitoring • {new Date().getFullYear()}</p>
                    <p className="mt-1">Hover over hospitals to pause auto-scroll • Data updates every 2 minutes</p>
                </div>
            </div>
        </div>
    );
};

// Reusable Components (same as your existing ones)
const StatCard = ({ title, count, icon: Icon, color, change, trend, description }) => (
    <div className="group relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}></div>
        
        <div className="relative bg-white rounded-2xl shadow-lg border border-gray-100 p-5 md:p-6 transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
                    <p className="text-3xl md:text-4xl font-bold text-gray-900">{formatNumber(count)}</p>
                    <p className="text-xs text-gray-400 mt-1">{description}</p>
                </div>
                <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-r ${color} rounded-xl blur opacity-50 group-hover:opacity-70 transition-opacity`}></div>
                    <div className={`relative bg-gradient-to-r ${color} p-3 rounded-xl shadow-md`}>
                        <Icon className="h-6 w-6 text-white" />
                    </div>
                </div>
            </div>
            
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${
                        trend === 'up' 
                            ? 'bg-emerald-50 text-emerald-700' 
                            : 'bg-rose-50 text-rose-700'
                    }`}>
                        {trend === 'up' ? (
                            <ArrowUp className="h-3 w-3" />
                        ) : (
                            <ArrowDown className="h-3 w-3" />
                        )}
                        <span>{change}</span>
                    </div>
                    <span className="text-xs text-gray-500">vs last month</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-transform" />
            </div>
        </div>
    </div>
);

const SummaryItem = ({ title, value, description, icon: Icon, iconColor, bgColor }) => (
    <div className="group bg-white hover:bg-gray-50 rounded-xl p-4 transition-all duration-300 hover:scale-[1.02] cursor-pointer">
        <div className="flex items-center gap-3 mb-3">
            <div className={`p-2.5 rounded-lg ${bgColor} ${iconColor} shadow-sm`}>
                <Icon className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-gray-800">{title}</h3>
        </div>
        <p className="text-2xl font-bold text-gray-900 mb-1">
            {typeof value === 'number' ? formatNumber(value) : value}
        </p>
        <p className="text-sm text-gray-600">{description}</p>
    </div>
);

const ActionButton = ({ title, description, icon: Icon, color }) => (
    <button className="group relative overflow-hidden w-full">
        <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-xl`}></div>
        
        <div className="relative bg-white rounded-xl border border-gray-200 p-4 transition-all duration-300 group-hover:border-transparent group-hover:shadow-lg group-hover:-translate-y-0.5">
            <div className="flex items-start justify-between mb-3">
                <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-r ${color} rounded-lg blur opacity-50`}></div>
                    <div className={`relative bg-gradient-to-r ${color} p-2 rounded-lg shadow-sm`}>
                        <Icon className="h-5 w-5 text-white" />
                    </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-transform" />
            </div>
            
            <h3 className="font-semibold text-gray-800 text-left mb-1">{title}</h3>
            <p className="text-sm text-gray-600 text-left">{description}</p>
        </div>
    </button>
);

// Helper Functions
const formatNumber = (num) => {
    if (typeof num === 'string') return num;
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return new Intl.NumberFormat('en-US').format(num);
};

const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    }
    if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    }
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
};

export default HeroDashboard;