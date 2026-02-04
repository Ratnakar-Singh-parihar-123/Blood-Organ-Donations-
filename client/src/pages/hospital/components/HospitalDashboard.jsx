import React, { useState, useEffect } from 'react';
import {
  User,
  Building,
  MapPin,
  Phone,
  Mail,
  Globe,
  Shield,
  Award,
  Calendar,
  Droplets,
  Heart,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Download,
  Edit,
  Save,
  Plus,
  Trash2,
  Filter,
  Search,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  BarChart3,
  Activity,
  Thermometer,
  FileText,
  MessageSquare,
  CreditCard,
  Wifi,
  Eye,
  EyeOff,
  RefreshCw,
  Printer,
  Share2,
  Star,
  Package,
  Truck,
  Database,
  Layers,
  ShieldCheck
} from 'lucide-react';

const HospitalDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [hospitalProfile, setHospitalProfile] = useState({
    name: 'Apollo Hospitals',
    registrationNumber: 'MH-12345-2023',
    address: 'Bandra West, Mumbai, Maharashtra 400050',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050',
    phone: '+91 22 1234 5678',
    emergencyPhone: '+91 22 1234 9999',
    email: 'admin@apollohospitals.com',
    website: 'https://www.apollohospitals.com',
    established: 1983,
    accreditation: ['NABH', 'JCI', 'ISO 9001:2015'],
    totalBeds: 500,
    occupiedBeds: 320,
    availableBeds: 180,
    doctorsCount: 120,
    staffCount: 450
  });

  const [bloodInventory, setBloodInventory] = useState([
    { id: 1, bloodGroup: 'A+', unitsAvailable: 25, minThreshold: 10, status: 'Adequate', lastUpdated: '2 hours ago' },
    { id: 2, bloodGroup: 'A-', unitsAvailable: 8, minThreshold: 5, status: 'Low', lastUpdated: '1 hour ago' },
    { id: 3, bloodGroup: 'B+', unitsAvailable: 18, minThreshold: 10, status: 'Moderate', lastUpdated: '3 hours ago' },
    { id: 4, bloodGroup: 'B-', unitsAvailable: 5, minThreshold: 5, status: 'Critical', lastUpdated: '30 mins ago' },
    { id: 5, bloodGroup: 'O+', unitsAvailable: 32, minThreshold: 15, status: 'Adequate', lastUpdated: '4 hours ago' },
    { id: 6, bloodGroup: 'O-', unitsAvailable: 4, minThreshold: 5, status: 'Critical', lastUpdated: '15 mins ago' },
    { id: 7, bloodGroup: 'AB+', unitsAvailable: 12, minThreshold: 8, status: 'Moderate', lastUpdated: '2 hours ago' },
    { id: 8, bloodGroup: 'AB-', unitsAvailable: 3, minThreshold: 3, status: 'Critical', lastUpdated: '5 mins ago' }
  ]);

  const [organAvailability, setOrganAvailability] = useState([
    { id: 1, organName: 'Kidney', isAvailable: true, waitlist: 45, avgWaitTime: '3 months', lastUpdated: 'Today' },
    { id: 2, organName: 'Liver', isAvailable: true, waitlist: 28, avgWaitTime: '6 months', lastUpdated: 'Today' },
    { id: 3, organName: 'Heart', isAvailable: false, waitlist: 32, avgWaitTime: '1 year', lastUpdated: 'Yesterday' },
    { id: 4, organName: 'Lungs', isAvailable: true, waitlist: 18, avgWaitTime: '8 months', lastUpdated: 'Today' },
    { id: 5, organName: 'Pancreas', isAvailable: false, waitlist: 12, avgWaitTime: '9 months', lastUpdated: '2 days ago' },
    { id: 6, organName: 'Cornea', isAvailable: true, waitlist: 8, avgWaitTime: '1 month', lastUpdated: 'Today' },
    { id: 7, organName: 'Bone Marrow', isAvailable: true, waitlist: 25, avgWaitTime: '2 months', lastUpdated: 'Today' },
    { id: 8, organName: 'Skin', isAvailable: false, waitlist: 15, avgWaitTime: '4 months', lastUpdated: '3 days ago' }
  ]);

  const [patientRequests, setPatientRequests] = useState([
    { id: 1, patientName: 'Rahul Sharma', requiredBlood: 'B+', requiredOrgan: 'Kidney', urgency: 'Critical', status: 'Pending', date: '2024-02-05', time: '14:30' },
    { id: 2, patientName: 'Priya Patel', requiredBlood: 'O-', requiredOrgan: null, urgency: 'High', status: 'Approved', date: '2024-02-04', time: '10:15' },
    { id: 3, patientName: 'Amit Kumar', requiredBlood: 'AB+', requiredOrgan: 'Liver', urgency: 'Normal', status: 'Pending', date: '2024-02-04', time: '16:45' },
    { id: 4, patientName: 'Sneha Singh', requiredBlood: 'A+', requiredOrgan: null, urgency: 'High', status: 'Rejected', date: '2024-02-03', time: '09:20' },
    { id: 5, patientName: 'Rajesh Mehta', requiredBlood: 'B-', requiredOrgan: 'Cornea', urgency: 'Critical', status: 'Approved', date: '2024-02-03', time: '11:30' },
    { id: 6, patientName: 'Anjali Gupta', requiredBlood: 'O+', requiredOrgan: null, urgency: 'Normal', status: 'Pending', date: '2024-02-02', time: '13:45' },
    { id: 7, patientName: 'Vikram Reddy', requiredBlood: 'A-', requiredOrgan: 'Bone Marrow', urgency: 'High', status: 'Approved', date: '2024-02-02', time: '15:10' },
    { id: 8, patientName: 'Neha Joshi', requiredBlood: 'AB-', requiredOrgan: null, urgency: 'Critical', status: 'Pending', date: '2024-02-01', time: '18:20' }
  ]);

  const [editingBloodId, setEditingBloodId] = useState(null);
  const [editingUnits, setEditingUnits] = useState('');
  const [showAddBlood, setShowAddBlood] = useState(false);
  const [newBloodGroup, setNewBloodGroup] = useState('');
  const [newUnits, setNewUnits] = useState('');
  const [notifications, setNotifications] = useState(3);
  const [stats, setStats] = useState({
    totalBloodUnits: 107,
    criticalBloodGroups: 3,
    pendingRequests: 4,
    approvedToday: 2,
    organAvailability: 5,
    emergencyRequests: 3
  });

  // Calculate stats from data
  useEffect(() => {
    const totalUnits = bloodInventory.reduce((sum, item) => sum + item.unitsAvailable, 0);
    const criticalGroups = bloodInventory.filter(item => item.status === 'Critical').length;
    const pendingReqs = patientRequests.filter(req => req.status === 'Pending').length;
    const approvedToday = patientRequests.filter(req => 
      req.status === 'Approved' && req.date === '2024-02-05'
    ).length;
    const availableOrgans = organAvailability.filter(organ => organ.isAvailable).length;
    const emergencyReqs = patientRequests.filter(req => req.urgency === 'Critical').length;

    setStats({
      totalBloodUnits: totalUnits,
      criticalBloodGroups: criticalGroups,
      pendingRequests: pendingReqs,
      approvedToday: approvedToday,
      organAvailability: availableOrgans,
      emergencyRequests: emergencyReqs
    });
  }, [bloodInventory, patientRequests, organAvailability]);

  const handleBloodUpdate = (id) => {
    if (editingUnits && editingUnits > 0) {
      setBloodInventory(prev => prev.map(item => 
        item.id === id 
          ? { 
              ...item, 
              unitsAvailable: parseInt(editingUnits),
              status: getBloodStatus(parseInt(editingUnits), item.minThreshold),
              lastUpdated: 'Just now'
            }
          : item
      ));
      setEditingBloodId(null);
      setEditingUnits('');
    }
  };

  const handleAddBlood = () => {
    if (newBloodGroup && newUnits && newUnits > 0) {
      const newItem = {
        id: bloodInventory.length + 1,
        bloodGroup: newBloodGroup,
        unitsAvailable: parseInt(newUnits),
        minThreshold: 5,
        status: getBloodStatus(parseInt(newUnits), 5),
        lastUpdated: 'Just now'
      };
      setBloodInventory([...bloodInventory, newItem]);
      setNewBloodGroup('');
      setNewUnits('');
      setShowAddBlood(false);
    }
  };

  const handleDeleteBlood = (id) => {
    setBloodInventory(prev => prev.filter(item => item.id !== id));
  };

  const toggleOrganAvailability = (id) => {
    setOrganAvailability(prev => prev.map(organ => 
      organ.id === id 
        ? { ...organ, isAvailable: !organ.isAvailable, lastUpdated: 'Just now' }
        : organ
    ));
  };

  const handleRequestAction = (id, action) => {
    setPatientRequests(prev => prev.map(request => 
      request.id === id 
        ? { ...request, status: action, date: '2024-02-05', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
        : request
    ));
  };

  const getBloodStatus = (units, threshold) => {
    if (units <= threshold) return 'Critical';
    if (units <= threshold * 2) return 'Low';
    if (units <= threshold * 3) return 'Moderate';
    return 'Adequate';
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Adequate': return 'bg-green-100 text-green-700';
      case 'Moderate': return 'bg-yellow-100 text-yellow-700';
      case 'Low': return 'bg-orange-100 text-orange-700';
      case 'Critical': return 'bg-red-100 text-red-700';
      case 'Pending': return 'bg-blue-100 text-blue-700';
      case 'Approved': return 'bg-green-100 text-green-700';
      case 'Rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch(urgency) {
      case 'Critical': return 'bg-red-100 text-red-700';
      case 'High': return 'bg-orange-100 text-orange-700';
      case 'Normal': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
                <Building className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Hospital Dashboard</h1>
                <p className="text-xs text-gray-500">Welcome back, Administrator</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="h-5 w-5 text-gray-600" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="h-5 w-5 text-gray-600" />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                <LogOut className="h-4 w-4" />
                <span className="font-medium hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar */}
          <div className="lg:w-64">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-200">
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <Building className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">{hospitalProfile.name}</h2>
                <div className="flex items-center justify-center gap-1 text-sm text-gray-500">
                  <ShieldCheck className="h-3 w-3 text-green-500" />
                  <span>Verified Hospital</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{hospitalProfile.city}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{hospitalProfile.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{hospitalProfile.email}</span>
                </div>
              </div>

              <button className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors font-medium">
                <Edit className="h-4 w-4" />
                Edit Profile
              </button>
            </div>

            {/* Navigation Menu */}
            <div className="bg-white rounded-2xl shadow-lg p-4 border border-gray-200">
              <nav className="space-y-1">
                {[
                  { id: 'overview', label: 'Overview', icon: BarChart3 },
                  { id: 'blood', label: 'Blood Inventory', icon: Droplets },
                  { id: 'organs', label: 'Organ Availability', icon: Heart },
                  { id: 'requests', label: 'Patient Requests', icon: Users },
                  { id: 'reports', label: 'Reports', icon: FileText },
                  { id: 'settings', label: 'Settings', icon: Settings }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      activeTab === item.id
                        ? 'bg-blue-50 text-blue-600 border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                    {activeTab === item.id && (
                      <ChevronRight className="h-4 w-4 ml-auto" />
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Stats Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Droplets className="h-8 w-8" />
                      <TrendingUp className="h-5 w-5" />
                    </div>
                    <div className="text-3xl font-bold mb-2">{stats.totalBloodUnits}</div>
                    <div className="text-blue-100">Total Blood Units</div>
                    <div className="text-sm text-blue-200 mt-2">{stats.criticalBloodGroups} critical groups</div>
                  </div>

                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Heart className="h-8 w-8" />
                      <Activity className="h-5 w-5" />
                    </div>
                    <div className="text-3xl font-bold mb-2">{stats.organAvailability}</div>
                    <div className="text-green-100">Organs Available</div>
                    <div className="text-sm text-green-200 mt-2">For transplant</div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Users className="h-8 w-8" />
                      <AlertCircle className="h-5 w-5" />
                    </div>
                    <div className="text-3xl font-bold mb-2">{stats.pendingRequests}</div>
                    <div className="text-purple-100">Pending Requests</div>
                    <div className="text-sm text-purple-200 mt-2">{stats.emergencyRequests} emergency</div>
                  </div>
                </div>

                {/* Hospital Profile Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Hospital Profile</h2>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                      <Edit className="h-4 w-4" />
                      Edit
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Hospital Name</label>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <Building className="h-5 w-5 text-gray-400" />
                          <span className="font-medium text-gray-900">{hospitalProfile.name}</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Registration Number</label>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <Shield className="h-5 w-5 text-gray-400" />
                          <span className="font-medium text-gray-900">{hospitalProfile.registrationNumber}</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Address</label>
                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                          <div>
                            <p className="font-medium text-gray-900">{hospitalProfile.address}</p>
                            <p className="text-sm text-gray-500">{hospitalProfile.city}, {hospitalProfile.state} - {hospitalProfile.pincode}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Contact Information</label>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <Phone className="h-5 w-5 text-gray-400" />
                            <div>
                              <div className="font-medium text-gray-900">{hospitalProfile.phone}</div>
                              <div className="text-xs text-gray-500">Main Line</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <Mail className="h-5 w-5 text-gray-400" />
                            <div>
                              <div className="font-medium text-gray-900">{hospitalProfile.email}</div>
                              <div className="text-xs text-gray-500">Email</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Hospital Stats</label>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">{hospitalProfile.totalBeds}</div>
                            <div className="text-xs text-gray-600">Total Beds</div>
                          </div>
                          <div className="bg-green-50 p-3 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">{hospitalProfile.doctorsCount}</div>
                            <div className="text-xs text-gray-600">Doctors</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Blood Inventory Management */}
            {activeTab === 'blood' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Blood Inventory Management</h2>
                      <p className="text-gray-500 text-sm">Manage blood stock levels and availability</p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowAddBlood(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
                      >
                        <Plus className="h-4 w-4" />
                        Add Blood Group
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                        <RefreshCw className="h-4 w-4" />
                        Refresh
                      </button>
                    </div>
                  </div>

                  {/* Blood Inventory Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Blood Group</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Units Available</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Min Threshold</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Last Updated</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {bloodInventory.map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                                  <Droplets className="h-5 w-5 text-red-600" />
                                </div>
                                <span className="font-semibold text-gray-900">{item.bloodGroup}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              {editingBloodId === item.id ? (
                                <div className="flex items-center gap-2">
                                  <input
                                    type="number"
                                    value={editingUnits}
                                    onChange={(e) => setEditingUnits(e.target.value)}
                                    className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    min="0"
                                  />
                                  <button
                                    onClick={() => handleBloodUpdate(item.id)}
                                    className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                  >
                                    <Save className="h-4 w-4" />
                                  </button>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <span className="text-lg font-bold text-gray-900">{item.unitsAvailable}</span>
                                  <span className="text-gray-500">units</span>
                                </div>
                              )}
                            </td>
                            <td className="py-4 px-4">
                              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                {item.minThreshold} units
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                                {item.status}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-gray-500 text-sm">
                              {item.lastUpdated}
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => {
                                    setEditingBloodId(item.id);
                                    setEditingUnits(item.unitsAvailable.toString());
                                  }}
                                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                  title="Edit"
                                >
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteBlood(item.id)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Stats Summary */}
                  <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-blue-600">{bloodInventory.length}</div>
                      <div className="text-sm text-gray-600">Blood Groups</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-green-600">
                        {bloodInventory.filter(item => item.status === 'Adequate').length}
                      </div>
                      <div className="text-sm text-gray-600">Adequate Stock</div>
                    </div>
                    <div className="bg-red-50 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-red-600">
                        {bloodInventory.filter(item => item.status === 'Critical').length}
                      </div>
                      <div className="text-sm text-gray-600">Critical Low</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-purple-600">{stats.totalBloodUnits}</div>
                      <div className="text-sm text-gray-600">Total Units</div>
                    </div>
                  </div>
                </div>

                {/* Add Blood Modal */}
                {showAddBlood && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl">
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-lg font-bold text-gray-900">Add New Blood Group</h3>
                          <button
                            onClick={() => setShowAddBlood(false)}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                          >
                            <XCircle className="h-5 w-5 text-gray-500" />
                          </button>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Blood Group
                            </label>
                            <select
                              value={newBloodGroup}
                              onChange={(e) => setNewBloodGroup(e.target.value)}
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            >
                              <option value="">Select Blood Group</option>
                              {bloodGroups.map(group => (
                                <option key={group} value={group}>{group}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Units Available
                            </label>
                            <input
                              type="number"
                              value={newUnits}
                              onChange={(e) => setNewUnits(e.target.value)}
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                              placeholder="Enter number of units"
                              min="1"
                            />
                          </div>

                          <div className="flex gap-3 pt-4">
                            <button
                              onClick={handleAddBlood}
                              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
                            >
                              Add to Inventory
                            </button>
                            <button
                              onClick={() => setShowAddBlood(false)}
                              className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Organ Availability */}
            {activeTab === 'organs' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Organ Availability Management</h2>
                      <p className="text-gray-500 text-sm">Update organ availability status for transplant</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium text-green-600">{organAvailability.filter(o => o.isAvailable).length}</span> available
                        <span className="mx-2">•</span>
                        <span className="font-medium text-gray-600">{organAvailability.filter(o => !o.isAvailable).length}</span> unavailable
                      </div>
                    </div>
                  </div>

                  {/* Organ Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {organAvailability.map((organ) => (
                      <div key={organ.id} className="bg-gray-50 rounded-xl p-5 border border-gray-200 hover:border-blue-300 transition-colors">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${organ.isAvailable ? 'bg-green-100' : 'bg-red-100'}`}>
                              <Heart className={`h-5 w-5 ${organ.isAvailable ? 'text-green-600' : 'text-red-600'}`} />
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900">{organ.organName}</h3>
                              <div className="text-xs text-gray-500">
                                {organ.waitlist} on waitlist
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => toggleOrganAvailability(organ.id)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${organ.isAvailable ? 'bg-green-500' : 'bg-gray-300'}`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${organ.isAvailable ? 'translate-x-6' : 'translate-x-1'}`} />
                          </button>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Average Wait Time</span>
                            <span className="font-medium text-gray-900">{organ.avgWaitTime}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Status</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${organ.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                              {organ.isAvailable ? 'Available' : 'Unavailable'}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 pt-2">
                            Updated: {organ.lastUpdated}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Patient Requests */}
            {activeTab === 'requests' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Patient Requests</h2>
                      <p className="text-gray-500 text-sm">Manage blood and organ requests from patients</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search requests..."
                          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                      </div>
                      <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                        <option>All Status</option>
                        <option>Pending</option>
                        <option>Approved</option>
                        <option>Rejected</option>
                      </select>
                    </div>
                  </div>

                  {/* Requests Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Patient Name</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Required Blood</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Required Organ</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Urgency</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date & Time</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {patientRequests.map((request) => (
                          <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                                  <User className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                  <div className="font-semibold text-gray-900">{request.patientName}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              {request.requiredBlood ? (
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 bg-red-50 rounded flex items-center justify-center">
                                    <Droplets className="h-4 w-4 text-red-600" />
                                  </div>
                                  <span className="font-medium">{request.requiredBlood}</span>
                                </div>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </td>
                            <td className="py-4 px-4">
                              {request.requiredOrgan ? (
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 bg-green-50 rounded flex items-center justify-center">
                                    <Heart className="h-4 w-4 text-green-600" />
                                  </div>
                                  <span className="font-medium">{request.requiredOrgan}</span>
                                </div>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </td>
                            <td className="py-4 px-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getUrgencyColor(request.urgency)}`}>
                                {request.urgency}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <div className="text-sm">
                                <div className="text-gray-900">{request.date}</div>
                                <div className="text-gray-500">{request.time}</div>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                                {request.status}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                {request.status === 'Pending' && (
                                  <>
                                    <button
                                      onClick={() => handleRequestAction(request.id, 'Approved')}
                                      className="px-3 py-1 bg-green-500 text-white text-xs rounded-lg hover:bg-green-600 transition-colors"
                                    >
                                      Approve
                                    </button>
                                    <button
                                      onClick={() => handleRequestAction(request.id, 'Rejected')}
                                      className="px-3 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition-colors"
                                    >
                                      Reject
                                    </button>
                                  </>
                                )}
                                <button className="p-1 text-gray-600 hover:text-blue-600">
                                  <Eye className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Stats */}
                  <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-blue-600">{patientRequests.length}</div>
                      <div className="text-sm text-gray-600">Total Requests</div>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-yellow-600">
                        {patientRequests.filter(req => req.status === 'Pending').length}
                      </div>
                      <div className="text-sm text-gray-600">Pending</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-green-600">
                        {patientRequests.filter(req => req.status === 'Approved').length}
                      </div>
                      <div className="text-sm text-gray-600">Approved</div>
                    </div>
                    <div className="bg-red-50 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-red-600">
                        {patientRequests.filter(req => req.urgency === 'Critical').length}
                      </div>
                      <div className="text-sm text-gray-600">Critical</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Reports Tab */}
            {activeTab === 'reports' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Reports & Analytics</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { title: 'Blood Usage Report', icon: FileText, color: 'red' },
                      { title: 'Organ Transplant Report', icon: Heart, color: 'green' },
                      { title: 'Patient Statistics', icon: Users, color: 'blue' },
                      { title: 'Inventory Report', icon: Package, color: 'purple' },
                      { title: 'Financial Reports', icon: CreditCard, color: 'yellow' },
                      { title: 'Emergency Reports', icon: AlertCircle, color: 'orange' }
                    ].map((report, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-xl p-5 border border-gray-200 hover:border-blue-300 transition-colors group cursor-pointer">
                        <div className="flex items-center gap-4 mb-4">
                          <div className={`p-3 bg-${report.color}-100 rounded-lg`}>
                            <report.icon className={`h-6 w-6 text-${report.color}-600`} />
                          </div>
                          <h3 className="font-bold text-gray-900">{report.title}</h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">
                          Generate detailed reports and analytics for better decision making
                        </p>
                        <div className="flex items-center gap-2 text-blue-600">
                          <Download className="h-4 w-4" />
                          <span className="text-sm font-medium">Download PDF</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
        <div className="flex items-center justify-around px-2 py-3">
          {['overview', 'blood', 'organs', 'requests'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex flex-col items-center p-2 transition-colors ${
                activeTab === tab ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              {tab === 'overview' && <BarChart3 className="h-5 w-5" />}
              {tab === 'blood' && <Droplets className="h-5 w-5" />}
              {tab === 'organs' && <Heart className="h-5 w-5" />}
              {tab === 'requests' && <Users className="h-5 w-5" />}
              <span className="text-xs mt-1">{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
            </button>
          ))}
          <button className="flex flex-col items-center p-2 text-gray-600">
            <Settings className="h-5 w-5" />
            <span className="text-xs mt-1">More</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;