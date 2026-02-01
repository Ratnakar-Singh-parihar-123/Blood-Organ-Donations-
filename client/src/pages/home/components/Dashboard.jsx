import { useEffect, useState } from "react";
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
  Award
} from "lucide-react";
import { getDashboardCounts } from "../../../api/dashboardApi";

const Dashboard = () => {
    const [counts, setCounts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [stats, setStats] = useState({
        bloodDonorsChange: 12,
        organDonorsChange: 8,
        patientsChange: -3,
        usersChange: 15
    });

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

    const handleRefresh = async () => {
        const data = await getDashboardCounts();
        setCounts(data.data);
        setLastUpdated(new Date());
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
                                    Dashboard Overview
                                </h1>
                                <p className="text-gray-600 text-sm md:text-base mt-1">
                                    Real-time insights and analytics for LifeStream Platform
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

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                    <StatCard 
                        title="Blood Donors" 
                        count={counts.bloodDonors} 
                        icon={Heart}
                        color="from-rose-500 to-pink-600"
                        change={stats.bloodDonorsChange}
                        trend="up"
                        description="Active donors"
                    />
                    <StatCard 
                        title="Organ Donors" 
                        count={counts.organDonors} 
                        icon={Activity}
                        color="from-emerald-500 to-green-600"
                        change={stats.organDonorsChange}
                        trend="up"
                        description="Registered donors"
                    />
                    <StatCard 
                        title="Patients" 
                        count={counts.patients} 
                        icon={User}
                        color="from-amber-500 to-orange-600"
                        change={stats.patientsChange}
                        trend="down"
                        description="Active patients"
                    />
                    <StatCard 
                        title="Total Users" 
                        count={counts.users} 
                        icon={Users}
                        color="from-blue-500 to-cyan-600"
                        change={stats.usersChange}
                        trend="up"
                        description="Platform users"
                    />
                </div>

                {/* Middle Section - Summary + Quick Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Summary Card */}
                    <div className="lg:col-span-2 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 p-6">
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
                                value={counts.bloodDonors + counts.organDonors}
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

                        {/* Progress Bars */}
                        <div className="mt-8 space-y-4">
                            <ProgressBar 
                                label="Blood Donors Growth"
                                percentage={75}
                                color="from-rose-500 to-pink-500"
                                value={`${stats.bloodDonorsChange}% this month`}
                            />
                            <ProgressBar 
                                label="Organ Donors Growth"
                                percentage={62}
                                color="from-emerald-500 to-green-500"
                                value={`${stats.organDonorsChange}% this month`}
                            />
                            <ProgressBar 
                                label="Platform Engagement"
                                percentage={88}
                                color="from-blue-500 to-cyan-500"
                                value="High engagement"
                            />
                        </div>
                    </div>

                    {/* Quick Stats Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg border border-gray-100 p-6">
                            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Target className="h-5 w-5 text-blue-600" />
                                Quick Stats
                            </h3>
                            <div className="space-y-4">
                                <QuickStat 
                                    icon={Hospital}
                                    label="Hospitals"
                                    value="42"
                                    color="text-blue-600"
                                />
                                <QuickStat 
                                    icon={Ambulance}
                                    label="Emergency"
                                    value="12"
                                    color="text-rose-600"
                                />
                                <QuickStat 
                                    icon={Award}
                                    label="Top Donor"
                                    value="Dr. Sarah"
                                    color="text-emerald-600"
                                />
                                <QuickStat 
                                    icon={Globe}
                                    label="Cities"
                                    value="8"
                                    color="text-amber-600"
                                />
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Clock className="h-5 w-5 text-gray-600" />
                                Recent Activity
                            </h3>
                            <div className="space-y-3">
                                <ActivityItem 
                                    time="2 min ago"
                                    action="New blood donor registered"
                                    color="bg-rose-100 text-rose-600"
                                />
                                <ActivityItem 
                                    time="15 min ago"
                                    action="Organ donation request created"
                                    color="bg-emerald-100 text-emerald-600"
                                />
                                <ActivityItem 
                                    time="1 hour ago"
                                    action="Patient profile updated"
                                    color="bg-blue-100 text-blue-600"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 mb-2">Quick Actions</h2>
                            <p className="text-gray-600">Most frequent actions for quick access</p>
                        </div>
                        <div className="flex items-center gap-2 mt-3 sm:mt-0">
                            <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                                <Filter className="h-4 w-4 text-gray-600" />
                                <span className="text-sm font-medium">Filter</span>
                            </button>
                            <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                                <Search className="h-4 w-4 text-gray-600" />
                                <span className="text-sm font-medium">Search</span>
                            </button>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                            title="Calendar"
                            description="View schedule"
                            icon={Calendar}
                            color="from-amber-600 to-orange-600"
                        />
                        <ActionButton 
                            title="Donor List"
                            description="Manage donors"
                            icon={Users}
                            color="from-rose-600 to-pink-600"
                        />
                    </div>
                </div>

                {/* Bottom Info */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <Eye className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">Live Dashboard</p>
                                <p className="text-sm text-gray-600">Data updates automatically every 2 minutes</p>
                            </div>
                        </div>
                        <div className="text-sm text-gray-500">
                            <p>Last sync: {lastUpdated?.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                            <p className="text-xs mt-1">© 2024 LifeStream • Dashboard v2.0</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, count, icon: Icon, color, change, trend, description }) => (
    <div className="group relative overflow-hidden">
        {/* Background Animation */}
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
                        <span>{Math.abs(change)}%</span>
                    </div>
                    <span className="text-xs text-gray-500">vs last month</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-transform" />
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4">
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                        className={`h-full bg-gradient-to-r ${color} transition-all duration-1000 ease-out`}
                        style={{ width: `${Math.min(change + 50, 100)}%` }}
                    ></div>
                </div>
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

const ProgressBar = ({ label, percentage, color, value }) => (
    <div className="space-y-2">
        <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">{label}</span>
            <span className="text-sm font-semibold text-gray-900">{value}</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
                className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-1000 ease-out`}
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
    </div>
);

const QuickStat = ({ icon: Icon, label, value, color }) => (
    <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
                <Icon className={`h-4 w-4 ${color}`} />
            </div>
            <span className="text-sm font-medium text-gray-700">{label}</span>
        </div>
        <span className="font-bold text-gray-900">{value}</span>
    </div>
);

const ActivityItem = ({ time, action, color }) => (
    <div className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
        <div className={`p-1.5 rounded-full ${color.split(' ')[0]} ${color.split(' ')[1]}`}>
            <div className="w-2 h-2 rounded-full bg-current"></div>
        </div>
        <div className="flex-1">
            <p className="text-sm text-gray-800">{action}</p>
            <p className="text-xs text-gray-500 mt-1">{time}</p>
        </div>
    </div>
);

const ActionButton = ({ title, description, icon: Icon, color }) => (
    <button className="group relative overflow-hidden">
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

export default Dashboard;