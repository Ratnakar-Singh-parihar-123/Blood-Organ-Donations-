import { useEffect, useState } from "react";
import { 
  Heart, Activity, Phone, MapPin, Clock, AlertCircle,
  Users, ShieldCheck, MessageCircle, Calendar,
  Zap, Database, Star, CheckCircle, ExternalLink,
  Filter, Search, RefreshCw, ChevronRight,
  Award, Navigation, Thermometer, Crosshair
} from "lucide-react";
import { matchApi } from "../../api/matchApi";

export default function PatientMatches({ patientId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("matchScore");
  const [stats, setStats] = useState({
    bloodMatches: 0,
    organMatches: 0,
    totalMatches: 0,
    matchScore: 0,
    verifiedDonors: 0,
    nearbyDonors: 0,
    immediateAvailability: 0
  });

  // Fetch matches from backend
  useEffect(() => {
    if (patientId) fetchMatches();
  }, [patientId]);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      const result = await matchApi.getPatientMatches(patientId);
      setData(result);

      const bloodDonors = result.matches?.bloodDonors || [];
      const organDonors = result.matches?.organDonors || [];
      const allDonors = [...bloodDonors, ...organDonors];

      setStats({
        bloodMatches: bloodDonors.length,
        organMatches: organDonors.length,
        totalMatches: allDonors.length,
        matchScore: calculateMatchScore(allDonors),
        verifiedDonors: allDonors.filter(d => d.isVerified).length,
        nearbyDonors: allDonors.filter(d => d.distance <= 50).length,
        immediateAvailability: allDonors.filter(d => d.availability === "immediate").length
      });

      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load matches. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const calculateMatchScore = (donors) => {
    if (!donors || donors.length === 0) return 0;
    const scores = donors.map(d => d.matchScore || 50);
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    return Math.min(100, Math.round(avg));
  };

  const handleContactDonor = async (donorId, donorType) => {
    try {
      await matchApi.contactDonor(donorId, donorType, patientId);
      alert("Donor has been contacted successfully!");
    } catch {
      alert("Unable to contact donor at this moment.");
    }
  };

  const handleEmergencyAlert = async () => {
    if (!window.confirm("Send emergency alert to all nearby donors?")) return;
    try {
      await matchApi.sendEmergencyAlert(patientId, "URGENT: Patient requires immediate assistance");
      alert("🚨 Emergency alert sent to all nearby donors and hospitals!");
    } catch {
      alert("Failed to send emergency alert.");
    }
  };

  const handleAutoContactAll = () => {
    if (!window.confirm("Contact all matching donors automatically?")) return;
    const bloodDonors = data?.matches?.bloodDonors || [];
    const organDonors = data?.matches?.organDonors || [];
    [...bloodDonors, ...organDonors].forEach(d => handleContactDonor(d._id, d.type));
    alert(`📤 Contacting ${bloodDonors.length + organDonors.length} donors...`);
  };

  const getFilteredDonors = () => {
    if (!data) return [];
    let donors = [];
    if (activeTab === "blood") donors = data.matches?.bloodDonors || [];
    else if (activeTab === "organ") donors = data.matches?.organDonors || [];
    else donors = [...(data.matches?.bloodDonors || []), ...(data.matches?.organDonors || [])];

    if (searchQuery) {
      donors = donors.filter(d =>
        d.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (d.bloodGroup?.toLowerCase().includes(searchQuery.toLowerCase()) || false)
      );
    }

    donors.sort((a, b) => {
      if (sortBy === "matchScore") return (b.matchScore || 0) - (a.matchScore || 0);
      if (sortBy === "distance") return (a.distance || 0) - (b.distance || 0);
      if (sortBy === "verified") return (b.isVerified ? 1 : 0) - (a.isVerified ? 1 : 0);
      return 0;
    });

    return donors;
  };

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorDisplay error={error} onRetry={fetchMatches} />;
  if (!data) return <NoDataDisplay />;

  const filteredDonors = getFilteredDonors();
  const patient = data.patient || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6 lg:p-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Donor Match Results</h1>
            <p className="text-gray-600 mt-2">Find compatible donors based on medical compatibility and location</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchMatches}
              className="px-4 py-2 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 flex items-center gap-2 transition-all"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
            <button
              onClick={handleEmergencyAlert}
              className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl hover:shadow-lg flex items-center gap-2 transition-all hover:shadow-red-200"
            >
              <AlertCircle className="h-5 w-5 animate-pulse" />
              Emergency Alert
            </button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search donors by name, location, or blood group..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-300 rounded-xl appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                >
                  <option value="matchScore">Best Match First</option>
                  <option value="distance">Nearest First</option>
                  <option value="verified">Verified Donors</option>
                </select>
                <ChevronRight className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400 h-5 w-5 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Panel - Patient Info & Stats */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg overflow-hidden border border-blue-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">{patient.name || "Patient"}</h2>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Crosshair className="h-4 w-4" />
                    <span className="text-sm">Patient ID: {patientId}</span>
                  </div>
                </div>
                <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  Active
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    Blood Group
                  </div>
                  <div className="font-bold text-lg text-gray-900">{patient.bloodGroup || "N/A"}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Organ Required
                  </div>
                  <div className="font-bold text-lg text-gray-900">{patient.organRequired || "None"}</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-gray-500 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location
                </div>
                <div className="font-medium text-gray-900">{patient.city || "Location not specified"}</div>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-gray-500 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Urgency Level
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full" 
                      style={{ width: patient.urgencyLevel ? `${patient.urgencyLevel}%` : '70%' }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{patient.urgencyLevel || 70}%</span>
                </div>
              </div>
            </div>

            {/* Match Score Card */}
            <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm opacity-90">Overall Match Score</div>
                  <div className="text-3xl font-bold mt-1">{stats.matchScore}%</div>
                </div>
                <Award className="h-12 w-12 opacity-80" />
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-bold text-lg mb-4 text-gray-900 flex items-center gap-2">
              <Database className="h-5 w-5" />
              Match Statistics
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <StatCard 
                label="Total Matches" 
                value={stats.totalMatches} 
                icon={<Users className="h-5 w-5" />}
                color="blue"
              />
              <StatCard 
                label="Verified Donors" 
                value={stats.verifiedDonors} 
                icon={<ShieldCheck className="h-5 w-5" />}
                color="green"
              />
              <StatCard 
                label="Nearby Donors" 
                value={stats.nearbyDonors} 
                icon={<Navigation className="h-5 w-5" />}
                color="purple"
              />
              <StatCard 
                label="Immediate" 
                value={stats.immediateAvailability} 
                icon={<Zap className="h-5 w-5" />}
                color="orange"
              />
            </div>

            <button
              onClick={handleAutoContactAll}
              className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-xl hover:shadow-lg flex items-center justify-center gap-3 transition-all hover:shadow-blue-200"
            >
              <MessageCircle className="h-5 w-5" />
              Auto-Contact All Matches
            </button>
          </div>
        </div>

        {/* Right Panel - Donor List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <TabButton 
                active={activeTab === "all"} 
                onClick={() => setActiveTab("all")} 
                count={stats.totalMatches} 
                icon={<Users />}
                label="All Matches"
              />
              <TabButton 
                active={activeTab === "blood"} 
                onClick={() => setActiveTab("blood")} 
                count={stats.bloodMatches} 
                icon={<Heart />}
                label="Blood Donors"
              />
              <TabButton 
                active={activeTab === "organ"} 
                onClick={() => setActiveTab("organ")} 
                count={stats.organMatches} 
                icon={<Activity />}
                label="Organ Donors"
              />
            </div>

            {/* Donors List */}
            <div className="p-6">
              {filteredDonors.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredDonors.map((donor) => (
                    <DonorCard key={donor._id} donor={donor} onContact={handleContactDonor} />
                  ))}
                </div>
              ) : (
                <NoMatches searchQuery={searchQuery} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==================== Enhanced Sub-components ==================== */

const PatientCard = ({ patient, stats, onAutoContact }) => (
  <div className="bg-white rounded-2xl p-6 shadow-lg space-y-4">
    <h2 className="font-bold text-lg">{patient.name}</h2>
    <p>Blood Group: {patient.bloodGroup || "N/A"}</p>
    <p>Organ Required: {patient.organRequired || "None"}</p>
    <p>City: {patient.city || "N/A"}</p>

    <div className="grid grid-cols-2 gap-4 mt-4">
      <StatCard label="Total Matches" value={stats.totalMatches} />
      <StatCard label="Verified" value={stats.verifiedDonors} />
      <StatCard label="Nearby" value={stats.nearbyDonors} />
      <StatCard label="Immediate" value={stats.immediateAvailability} />
    </div>

    <button onClick={onAutoContact} className="w-full mt-4 bg-blue-500 text-white py-2 rounded-xl hover:shadow-lg flex items-center justify-center gap-2">
      <MessageCircle /> Auto-Contact All
    </button>
  </div>
);

const StatCard = ({ label, value, icon, color = "blue" }) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    green: "bg-green-50 text-green-600 border-green-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
    orange: "bg-orange-50 text-orange-600 border-orange-100"
  };

  return (
    <div className={`${colorClasses[color]} rounded-xl p-4 border`}>
      <div className="flex items-center justify-between mb-2">
        <div className="font-bold text-2xl">{value}</div>
        <div className="p-2 bg-white rounded-lg">
          {icon}
        </div>
      </div>
      <div className="text-sm font-medium">{label}</div>
    </div>
  );
};

const TabButton = ({ active, onClick, count, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex-1 py-4 px-6 flex items-center justify-center gap-3 transition-all ${
      active 
        ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50 font-semibold" 
        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
    }`}
  >
    <div className={`p-2 rounded-lg ${active ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"}`}>
      {icon}
    </div>
    <span>{label}</span>
    {count > 0 && (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        active ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"
      }`}>
        {count}
      </span>
    )}
  </button>
);

const DonorCard = ({ donor, onContact }) => {
  const matchScoreColor = donor.matchScore >= 90 ? "text-green-600" : 
                         donor.matchScore >= 70 ? "text-blue-600" : 
                         donor.matchScore >= 50 ? "text-yellow-600" : "text-gray-600";

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:border-blue-200">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-bold text-lg text-gray-900">{donor.name || "Anonymous Donor"}</h4>
            {donor.isVerified && (
              <ShieldCheck className="h-4 w-4 text-green-500" />
            )}
          </div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {donor.bloodGroup || donor.type || "Donor"}
            </span>
            {donor.organs && donor.organs.length > 0 && (
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                {donor.organs.join(", ")}
              </span>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className={`text-2xl font-bold ${matchScoreColor}`}>
            {donor.matchScore || 0}%
          </div>
          <div className="text-xs text-gray-500">Match Score</div>
        </div>
      </div>

      <div className="space-y-3 mb-5">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="h-4 w-4" />
          <span>{donor.city || "Location N/A"}</span>
          <span className="text-gray-400">•</span>
          <span className="font-medium">{donor.distance || 0} km away</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="h-4 w-4" />
          <span>Availability: </span>
          <span className={`font-medium ${
            donor.availability === "immediate" ? "text-green-600" :
            donor.availability === "within-week" ? "text-yellow-600" :
            donor.availability === "within-month" ? "text-blue-600" : "text-gray-600"
          }`}>
            {donor.availability || "Not specified"}
          </span>
        </div>
        {donor.lastDonation && (
          <div className="text-sm text-gray-600">
            Last donation: {donor.lastDonation}
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => onContact(donor._id, donor.type)}
          className="flex-1 bg-gradient-to-r from-rose-600 to-rose-500 text-white py-3 rounded-xl hover:shadow-lg flex items-center justify-center gap-2 transition-all hover:shadow-rose-200"
        >
          <Phone className="h-5 w-5" />
          Contact Now
        </button>
        <button className="px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
          <ExternalLink className="h-5 w-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
      <h2 className="text-xl font-semibold text-gray-700">Loading Match Results</h2>
      <p className="text-gray-500 mt-2">Searching for compatible donors...</p>
    </div>
  </div>
);

const ErrorDisplay = ({ error, onRetry }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-4">
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <AlertCircle className="h-8 w-8 text-red-600" />
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">Connection Error</h2>
      <p className="text-gray-600 mb-6">{error}</p>
      <button
        onClick={onRetry}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors w-full"
      >
        Retry Connection
      </button>
    </div>
  </div>
);

const NoDataDisplay = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
    <div className="text-center">
      <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
        <Database className="h-10 w-10 text-gray-400" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">No Patient Data Found</h2>
      <p className="text-gray-600">Please check the patient ID and try again.</p>
    </div>
  </div>
);

const NoMatches = ({ searchQuery }) => (
  <div className="text-center py-12">
    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <Search className="h-10 w-10 text-gray-400" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Donors Found</h3>
    <p className="text-gray-600">
      {searchQuery 
        ? `No matches found for "${searchQuery}"`
        : "No compatible donors found at this time"}
    </p>
    <p className="text-gray-500 mt-2 text-sm">
      Try adjusting your search criteria or check back later
    </p>
  </div>
);