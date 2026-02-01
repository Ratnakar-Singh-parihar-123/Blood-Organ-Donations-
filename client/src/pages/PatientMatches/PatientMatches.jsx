import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMatchedDonors } from "../../api/matchDonorsApi";
import { 
  Heart, Droplets, Activity, Users, Phone, 
  MapPin, Calendar, Shield, Award, Clock,
  CheckCircle, AlertCircle, User, Star,
  Thermometer, Stethoscope, Award as AwardIcon,
  MessageSquare, Mail, Eye, Download,
  ChevronRight, Filter, Search, ExternalLink,
  Share2, Bookmark, Bell, Lock,
  MessageCircle, Video, Mail as MailIcon,
  Copy, AlertTriangle, Info
} from "lucide-react";

const PatientMatches = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [bloodDonors, setBloodDonors] = useState([]);
  const [organDonors, setOrganDonors] = useState([]);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("blood");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("all");
  const [selectedOrgan, setSelectedOrgan] = useState("all");
  const [showContactModal, setShowContactModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [isWhatsAppConnected, setIsWhatsAppConnected] = useState(false);

  const [stats, setStats] = useState({
    totalMatches: 0,
    bloodMatches: 0,
    organMatches: 0,
    urgentMatches: 0,
    verifiedMatches: 0,
    onlineDonors: 0
  });

  useEffect(() => {
    const loadMatches = async () => {
      try {
        setLoading(true);
        console.log(`🔄 Loading matches for patient: ${patientId}`);

        const data = await fetchMatchedDonors(patientId);
        console.log("✅ API Response:", data);

        const matches = data?.matches || {};
        const blood = Array.isArray(matches.bloodDonors) ? matches.bloodDonors : [];
        const organ = Array.isArray(matches.organDonors) ? matches.organDonors : [];

        setBloodDonors(blood);
        setOrganDonors(organ);

        // Calculate stats
        const urgentBlood = blood.filter(d => d.urgent || d.emergency);
        const urgentOrgan = organ.filter(d => d.urgent || d.emergency);
        const verifiedBlood = blood.filter(d => d.verified);
        const verifiedOrgan = organ.filter(d => d.verified);
        const onlineBlood = blood.filter(d => d.online || d.available);
        const onlineOrgan = organ.filter(d => d.online || d.available);
        
        setStats({
          totalMatches: blood.length + organ.length,
          bloodMatches: blood.length,
          organMatches: organ.length,
          urgentMatches: urgentBlood.length + urgentOrgan.length,
          verifiedMatches: verifiedBlood.length + verifiedOrgan.length,
          onlineDonors: onlineBlood.length + onlineOrgan.length
        });

      } catch (err) {
        console.error("❌ API Error:", err.message);
        setError("Unable to load donor matches. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (patientId) {
      loadMatches();
    } else {
      setError("Patient ID is missing");
      setLoading(false);
    }
  }, [patientId]);

  // Get blood group color
  const getBloodGroupColor = (bloodGroup) => {
    const colors = {
      'A+': 'bg-red-100 text-red-800 border-red-300',
      'A-': 'bg-red-50 text-red-700 border-red-200',
      'B+': 'bg-blue-100 text-blue-800 border-blue-300',
      'B-': 'bg-blue-50 text-blue-700 border-blue-200',
      'AB+': 'bg-purple-100 text-purple-800 border-purple-300',
      'AB-': 'bg-purple-50 text-purple-700 border-purple-200',
      'O+': 'bg-green-100 text-green-800 border-green-300',
      'O-': 'bg-green-50 text-green-700 border-green-200',
      'default': 'bg-gray-100 text-gray-800 border-gray-300'
    };
    return colors[bloodGroup] || colors.default;
  };

  // Get organ icon
  const getOrganIcon = (organ) => {
    const icons = {
      'kidney': '🫀',
      'liver': '🧠',
      'heart': '❤️',
      'lungs': '🫁',
      'pancreas': '🎗️',
      'eyes': '👁️',
      'cornea': '👁️',
      'skin': '🛡️',
      'bone': '🦴',
      'default': '🩺'
    };
    return icons[organ.toLowerCase()] || icons.default;
  };

  // Filter donors based on search and filters
  const getFilteredDonors = () => {
    const donors = activeTab === "blood" ? bloodDonors : organDonors;
    
    return donors.filter(donor => {
      // Search filter
      const matchesSearch = !searchTerm || 
        donor.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donor.bloodGroup?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donor.location?.toLowerCase().includes(searchTerm.toLowerCase());

      // Blood group filter (for blood donors)
      const matchesBloodGroup = selectedBloodGroup === "all" || 
        donor.bloodGroup === selectedBloodGroup;

      // Organ filter (for organ donors)
      const matchesOrgan = selectedOrgan === "all" ||
        (donor.organsToDonate && donor.organsToDonate.some(organ => 
          organ.toLowerCase().includes(selectedOrgan.toLowerCase())
        ));

      return matchesSearch && matchesBloodGroup && matchesOrgan;
    });
  };

  // Get unique blood groups for filter
  const bloodGroups = [...new Set(bloodDonors.map(d => d.bloodGroup).filter(Boolean))];
  
  // Get unique organs for filter
  const allOrgans = organDonors.flatMap(d => d.organsToDonate || []);
  const uniqueOrgans = [...new Set(allOrgans.filter(Boolean))];

  // Handle contact action
  const handleContact = (donor) => {
    setSelectedDonor(donor);
    setShowContactModal(true);
  };

  // Handle chat action
  const handleChat = (donor) => {
    setSelectedDonor(donor);
    setShowChatModal(true);
  };

  // Handle video call
  const handleVideoCall = (donor) => {
    if (donor.videoCallLink) {
      window.open(donor.videoCallLink, '_blank');
    } else {
      // Generate video call link or use default
      const videoLink = `https://meet.jit.si/JeevanDaan-${donor._id}-${patientId}`;
      window.open(videoLink, '_blank');
    }
  };

  // Handle WhatsApp chat
  const handleWhatsApp = (donor) => {
    if (donor.phone) {
      const message = `Hello ${donor.fullName}, I found your profile on JeevanDaan and would like to connect regarding donation.`;
      const whatsappUrl = `https://wa.me/${donor.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    } else {
      alert("Phone number not available for WhatsApp.");
    }
  };

  // Handle send message
  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // Here you would typically send to backend
      console.log(`Sending message to ${selectedDonor.fullName}: ${chatMessage}`);
      alert(`Message sent to ${selectedDonor.fullName}`);
      setChatMessage("");
      setShowChatModal(false);
    }
  };

  // Handle view details
  const handleViewDetails = (donor) => {
    navigate(`/donor-details/${donor._id}`);
  };

  // Handle export
  const handleExport = (format) => {
    const donors = getFilteredDonors();
    const data = {
      patientId,
      timestamp: new Date().toISOString(),
      donors: donors,
      stats: stats
    };

    let content, mimeType, fileName;

    if (format === 'json') {
      content = JSON.stringify(data, null, 2);
      mimeType = 'application/json';
      fileName = `donor-matches-${patientId}.json`;
    } else if (format === 'csv') {
      const headers = ['Name', 'Blood Group', 'Phone', 'Location', 'Status'];
      const rows = donors.map(d => [
        d.fullName || 'N/A',
        d.bloodGroup || 'N/A',
        d.phone || 'N/A',
        d.location || 'N/A',
        d.urgent ? 'Urgent' : 'Normal'
      ]);
      content = [headers, ...rows].map(row => row.join(',')).join('\n');
      mimeType = 'text/csv';
      fileName = `donor-matches-${patientId}.csv`;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setShowExportOptions(false);
  };

  // Handle share
  const handleShare = async (method) => {
    const donors = getFilteredDonors();
    const text = `Found ${donors.length} donor matches on JeevanDaan. Check them out!`;
    const url = window.location.href;

    try {
      if (method === 'copy') {
        await navigator.clipboard.writeText(`${text}\n${url}`);
        alert('Link copied to clipboard!');
      } else if (method === 'whatsapp') {
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`);
      } else if (method === 'email') {
        window.location.href = `mailto:?subject=Donor Matches&body=${encodeURIComponent(text + '\n\n' + url)}`;
      }
    } catch (err) {
      console.error('Share failed:', err);
    }
    setShowShareMenu(false);
  };

  // Handle bookmark
  const handleBookmark = (donor) => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedDonors') || '[]');
    const isBookmarked = bookmarks.some(b => b._id === donor._id);
    
    if (isBookmarked) {
      const updated = bookmarks.filter(b => b._id !== donor._id);
      localStorage.setItem('bookmarkedDonors', JSON.stringify(updated));
      alert('Donor removed from bookmarks');
    } else {
      bookmarks.push({ ...donor, bookmarkedAt: new Date().toISOString() });
      localStorage.setItem('bookmarkedDonors', JSON.stringify(bookmarks));
      alert('Donor bookmarked successfully');
    }
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto p-4 md:p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="bg-white p-4 rounded-xl shadow">
                  <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white p-4 rounded-xl shadow">
                  <div className="h-6 bg-gray-200 rounded w-1/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const filteredDonors = getFilteredDonors();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Header with Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-4">
              <Heart className="h-8 w-8 text-white" fill="white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Your Donor Matches
            </h1>
            <p className="text-gray-600 mt-2">
              We've found potential donors who match your requirements
            </p>
            {patientId && (
              <div className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                Patient ID: {patientId.substring(0, 8)}...
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-end">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </button>

            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </button>

            <button
              onClick={() => setShowExportOptions(!showExportOptions)}
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>

            <button
              onClick={() => navigate('/emergency')}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              <AlertCircle className="h-4 w-4" />
              <span>Emergency Help</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow border border-blue-100 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-600">Total Matches</span>
            </div>
            <div className="text-2xl font-bold text-blue-700">{stats.totalMatches}</div>
            <div className="text-xs text-gray-500 mt-1">Donors found</div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow border border-red-100 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-2 mb-2">
              <Droplets className="h-5 w-5 text-red-600" />
              <span className="text-sm font-medium text-gray-600">Blood Donors</span>
            </div>
            <div className="text-2xl font-bold text-red-700">{stats.bloodMatches}</div>
            <div className="text-xs text-gray-500 mt-1">Available now</div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow border border-green-100 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-2 mb-2">
              <Activity className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-gray-600">Organ Donors</span>
            </div>
            <div className="text-2xl font-bold text-green-700">{stats.organMatches}</div>
            <div className="text-xs text-gray-500 mt-1">Ready to help</div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow border border-orange-100 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              <span className="text-sm font-medium text-gray-600">Urgent</span>
            </div>
            <div className="text-2xl font-bold text-orange-700">{stats.urgentMatches}</div>
            <div className="text-xs text-gray-500 mt-1">Need immediate attention</div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow border border-purple-100 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-gray-600">Verified</span>
            </div>
            <div className="text-2xl font-bold text-purple-700">{stats.verifiedMatches}</div>
            <div className="text-xs text-gray-500 mt-1">Fully verified</div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow border border-cyan-100 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-2 mb-2">
              <MessageCircle className="h-5 w-5 text-cyan-600" />
              <span className="text-sm font-medium text-gray-600">Online Now</span>
            </div>
            <div className="text-2xl font-bold text-cyan-700">{stats.onlineDonors}</div>
            <div className="text-xs text-gray-500 mt-1">Available for chat</div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mb-6 p-4 bg-white rounded-xl shadow border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Filters</h3>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedBloodGroup("all");
                  setSelectedOrgan("all");
                }}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Clear all
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Donors
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name, location..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Blood Group Filter */}
              {activeTab === "blood" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Blood Group
                  </label>
                  <select
                    value={selectedBloodGroup}
                    onChange={(e) => setSelectedBloodGroup(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                  >
                    <option value="all">All Blood Groups</option>
                    {bloodGroups.map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Organ Filter */}
              {activeTab === "organ" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organ Type
                  </label>
                  <select
                    value={selectedOrgan}
                    onChange={(e) => setSelectedOrgan(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                  >
                    <option value="all">All Organs</option>
                    {uniqueOrgans.map(organ => (
                      <option key={organ} value={organ}>{organ}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Chat Modal */}
        {showChatModal && selectedDonor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Chat with {selectedDonor.fullName}</h3>
                <button
                  onClick={() => setShowChatModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Secure Chat</div>
                    <div className="text-sm text-gray-600">Messages are encrypted end-to-end</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <textarea
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent resize-none"
                    rows="4"
                  />

                  <div className="text-sm text-gray-500">
                    Suggested message: "Hello {selectedDonor.fullName}, I found your profile on JeevanDaan and would like to discuss donation possibilities."
                  </div>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Info className="h-4 w-4 text-green-600 mt-0.5" />
                    <div className="text-sm text-green-700">
                      <p className="font-medium">Chat Guidelines</p>
                      <p>• Be respectful and professional</p>
                      <p>• Discuss medical details in person</p>
                      <p>• Share contact details only when comfortable</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={handleSendMessage}
                    className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Send Message</span>
                  </button>
                  <button
                    onClick={() => handleWhatsApp(selectedDonor)}
                    className="flex-1 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Export Menu */}
        {showExportOptions && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Export Data</h3>
                <button
                  onClick={() => setShowExportOptions(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => handleExport('json')}
                  className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">{'{ }'}</span>
                    </div>
                    <div>
                      <div className="font-medium">JSON Format</div>
                      <div className="text-sm text-gray-500">For developers</div>
                    </div>
                  </div>
                  <Download className="h-4 w-4 text-gray-400" />
                </button>
                <button
                  onClick={() => handleExport('csv')}
                  className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                      <span className="text-green-600 font-semibold">CSV</span>
                    </div>
                    <div>
                      <div className="font-medium">CSV Format</div>
                      <div className="text-sm text-gray-500">For spreadsheets</div>
                    </div>
                  </div>
                  <Download className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Contact Modal */}
        {showContactModal && selectedDonor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Contact {selectedDonor.fullName}</h3>
                <button
                  onClick={() => setShowContactModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold">{selectedDonor.fullName}</div>
                    <div className="text-sm text-gray-600">{selectedDonor.bloodGroup}</div>
                  </div>
                </div>

                {/* Communication Options */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      window.open(`tel:${selectedDonor.phone}`);
                      setShowContactModal(false);
                    }}
                    className="flex flex-col items-center justify-center p-4 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                      <Phone className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium">Voice Call</span>
                    <span className="text-xs text-gray-500">Call directly</span>
                  </button>

                  <button
                    onClick={() => handleVideoCall(selectedDonor)}
                    className="flex flex-col items-center justify-center p-4 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                      <Video className="h-5 w-5 text-purple-600" />
                    </div>
                    <span className="text-sm font-medium">Video Call</span>
                    <span className="text-xs text-gray-500">Face-to-face chat</span>
                  </button>

                  <button
                    onClick={() => handleChat(selectedDonor)}
                    className="flex flex-col items-center justify-center p-4 border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2">
                      <MessageSquare className="h-5 w-5 text-green-600" />
                    </div>
                    <span className="text-sm font-medium">Secure Chat</span>
                    <span className="text-xs text-gray-500">Encrypted messages</span>
                  </button>

                  <button
                    onClick={() => handleWhatsApp(selectedDonor)}
                    className="flex flex-col items-center justify-center p-4 border border-green-300 rounded-lg hover:bg-green-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2">
                      <MessageCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <span className="text-sm font-medium">WhatsApp</span>
                    <span className="text-xs text-gray-500">Instant messaging</span>
                  </button>
                </div>

                {/* Contact Details */}
                <div className="space-y-2">
                  {selectedDonor.phone && (
                    <div className="p-3 border border-gray-200 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Phone Number</div>
                      <div className="font-medium flex items-center justify-between">
                        <span>{selectedDonor.phone}</span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(selectedDonor.phone);
                            alert('Phone number copied!');
                          }}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {selectedDonor.email && (
                    <div className="p-3 border border-gray-200 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Email</div>
                      <div className="font-medium flex items-center justify-between">
                        <span>{selectedDonor.email}</span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(selectedDonor.email);
                            alert('Email copied!');
                          }}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {selectedDonor.location && (
                    <div className="p-3 border border-gray-200 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Location</div>
                      <div className="font-medium">{selectedDonor.location}</div>
                    </div>
                  )}
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-700">
                      <p className="font-medium">Important</p>
                      <p>Always verify donor details and meet in safe, public locations for the first time.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab("blood")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${activeTab === "blood"
              ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow"
              : "bg-white text-gray-700 hover:bg-red-50 border border-gray-200"
            }`}
          >
            <Droplets className="h-4 w-4" />
            <span className="font-medium">Blood Donors</span>
            {bloodDonors.length > 0 && (
              <span className={`px-2 py-1 text-xs rounded-full ${activeTab === "blood"
                ? "bg-white text-red-600"
                : "bg-red-100 text-red-600"
              }`}>
                {bloodDonors.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("organ")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${activeTab === "organ"
              ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow"
              : "bg-white text-gray-700 hover:bg-green-50 border border-gray-200"
            }`}
          >
            <Activity className="h-4 w-4" />
            <span className="font-medium">Organ Donors</span>
            {organDonors.length > 0 && (
              <span className={`px-2 py-1 text-xs rounded-full ${activeTab === "organ"
                ? "bg-white text-green-600"
                : "bg-green-100 text-green-600"
              }`}>
                {organDonors.length}
              </span>
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-center space-x-2 text-red-700">
              <AlertCircle className="h-5 w-5" />
              <p className="font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              {activeTab === "blood" ? "Available Blood Donors" : "Available Organ Donors"}
            </h2>
            <p className="text-sm text-gray-500">
              Showing {filteredDonors.length} of {activeTab === "blood" ? bloodDonors.length : organDonors.length} donors
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                const bookmarks = JSON.parse(localStorage.getItem('bookmarkedDonors') || '[]');
                if (bookmarks.length > 0) {
                  alert(`You have ${bookmarks.length} bookmarked donors`);
                } else {
                  alert('No bookmarked donors yet');
                }
              }}
              className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800"
            >
              <Bookmark className="h-4 w-4" />
              <span className="text-sm">Bookmarks</span>
            </button>
            <button
              onClick={() => navigate('/chat')}
              className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              <MessageSquare className="h-4 w-4" />
              <span className="text-sm">My Chats</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {filteredDonors.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow border border-gray-200">
              {activeTab === "blood" ? (
                <Droplets className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              ) : (
                <Activity className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              )}
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No Donors Found</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-4">
                {searchTerm 
                  ? `No donors found for "${searchTerm}". Try different search terms.`
                  : "No donors matching your criteria were found at the moment."
                }
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedBloodGroup("all");
                  setSelectedOrgan("all");
                  setShowFilters(true);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Adjust Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDonors.map((donor, index) => (
                <div key={donor._id || index} className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
                  {/* Donor Header */}
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-r from-red-100 to-red-200 rounded-full flex items-center justify-center">
                            <User className="h-6 w-6 text-red-600" />
                          </div>
                          {(donor.online || donor.available) && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-bold text-gray-800 text-lg">{donor.fullName || "Anonymous Donor"}</h3>
                            <button
                              onClick={() => handleBookmark(donor)}
                              className="text-gray-400 hover:text-yellow-500 transition-colors"
                            >
                              <Bookmark className="h-5 w-5" />
                            </button>
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getBloodGroupColor(donor.bloodGroup)}`}>
                              {donor.bloodGroup || "Not specified"}
                            </span>
                            {donor.urgent && (
                              <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full border border-red-200">
                                Urgent
                              </span>
                            )}
                            {donor.verified && (
                              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full border border-green-200 flex items-center">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Verified
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Donor Details */}
                  <div className="p-4 space-y-3">
                    {donor.phone && (
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700 font-medium">{donor.phone}</span>
                      </div>
                    )}

                    {donor.location && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600">{donor.location}</span>
                      </div>
                    )}

                    {donor.availability && (
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600">{donor.availability}</span>
                      </div>
                    )}

                    {activeTab === "organ" && donor.organsToDonate && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {(donor.organsToDonate || []).map((organ, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-medium flex items-center space-x-1"
                          >
                            <span>{getOrganIcon(organ)}</span>
                            <span>{organ}</span>
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="pt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Match Score</span>
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${star <= (donor.matchScore || 4) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                          <span className="text-sm font-medium text-gray-700 ml-2">
                            {(donor.matchScore || 4)}/5
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Communication Buttons */}
                  <div className="px-4 pb-4 grid grid-cols-4 gap-2">
                    <button
                      onClick={() => window.open(`tel:${donor.phone}`)}
                      className="flex flex-col items-center justify-center p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                      title="Call"
                    >
                      <Phone className="h-4 w-4" />
                      <span className="text-xs mt-1">Call</span>
                    </button>
                    
                    <button
                      onClick={() => handleWhatsApp(donor)}
                      className="flex flex-col items-center justify-center p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                      title="WhatsApp"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-xs mt-1">WhatsApp</span>
                    </button>
                    
                    <button
                      onClick={() => handleChat(donor)}
                      className="flex flex-col items-center justify-center p-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
                      title="Chat"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span className="text-xs mt-1">Chat</span>
                    </button>
                    
                    <button
                      onClick={() => handleViewDetails(donor)}
                      className="flex flex-col items-center justify-center p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                      title="Details"
                    >
                      <Eye className="h-4 w-4" />
                      <span className="text-xs mt-1">Details</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Chat & Communication Section */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-800">Communication Tools</h3>
              <p className="text-gray-600">Connect with donors using our secure communication channels</p>
            </div>
            <button
              onClick={() => navigate('/chat/dashboard')}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Open Chat Dashboard</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Secure Chat</h4>
                  <p className="text-sm text-gray-600">Encrypted messaging</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/chat')}
                className="w-full py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
              >
                Start Chatting
              </button>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">WhatsApp Connect</h4>
                  <p className="text-sm text-gray-600">Instant messaging</p>
                </div>
              </div>
              <button
                onClick={() => setIsWhatsAppConnected(true)}
                className="w-full py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
              >
                Connect WhatsApp
              </button>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Video className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Video Calls</h4>
                  <p className="text-sm text-gray-600">Face-to-face meetings</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/video-calls')}
                className="w-full py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
              >
                Schedule Call
              </button>
            </div>
          </div>
        </div>

        {/* Footer Info & Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Important Information */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
            <div className="flex items-center space-x-3 mb-3">
              <AwardIcon className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-blue-800">Important Information</h3>
            </div>
            <ul className="space-y-2 text-sm text-blue-700">
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>All donor information is verified and updated regularly</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Contact donors through our secure messaging system</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>24/7 emergency support available at 1800-123-456</span>
              </li>
            </ul>
          </div>

          {/* Quick Actions */}
          <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
            <div className="flex items-center space-x-3 mb-3">
              <ExternalLink className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold text-green-800">Quick Actions</h3>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/chat')}
                className="w-full flex items-center justify-between p-3 bg-white border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-5 w-5 text-green-600" />
                  <div className="text-left">
                    <div className="font-medium text-gray-800">My Chats</div>
                    <div className="text-xs text-gray-600">View all conversations</div>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </button>
              <button
                onClick={() => navigate('/request-donor')}
                className="w-full flex items-center justify-between p-3 bg-white border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Bell className="h-5 w-5 text-green-600" />
                  <div className="text-left">
                    <div className="font-medium text-gray-800">Request New Donor</div>
                    <div className="text-xs text-gray-600">Submit a specific donor request</div>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </button>
              <button
                onClick={() => navigate('/resources')}
                className="w-full flex items-center justify-between p-3 bg-white border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Stethoscope className="h-5 w-5 text-green-600" />
                  <div className="text-left">
                    <div className="font-medium text-gray-800">Medical Resources</div>
                    <div className="text-xs text-gray-600">Access health guidelines & support</div>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Need Help Section */}
        <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-xl border border-red-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <h3 className="font-semibold text-red-800">Need Immediate Help?</h3>
              </div>
              <p className="text-sm text-red-700">
                Our emergency support team is available 24/7 to assist you
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => window.open('tel:108')}
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center space-x-2"
              >
                <Phone className="h-4 w-4" />
                <span>Call Emergency (108)</span>
              </button>
              <button
                onClick={() => navigate('/emergency-request')}
                className="px-4 py-2 bg-white border border-red-600 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors"
              >
                Submit Emergency Request
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientMatches;