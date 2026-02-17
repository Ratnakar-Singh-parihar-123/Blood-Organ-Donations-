import { useEffect, useState, useRef, useCallback } from "react";
import {
  Bell,
  X,
  CheckCircle,
  Trash2,
  Volume2,
  VolumeX,
  RefreshCw,
  Search,
  AlertCircle,
  Zap,
  Calendar,
  Droplets,
  AlertTriangle,
  Heart,
  MessageSquare,
  Shield,
  Clock,
  ChevronRight,
  UserCircle,
  MapPin,
  ArrowRight,
  Filter,
  Sparkles,
  Star,
  MoreVertical,
  Eye,
  EyeOff,
  Download,
  Settings,
  ChevronUp,
  ChevronDown,
  Phone,
  Mail,
  ExternalLink,
  Menu,
  Grid,
  List,
  Sliders,
  Pin,
} from "lucide-react";

const NotificationsModal = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasNew, setHasNew] = useState(false);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMuted, setIsMuted] = useState(
    () => localStorage.getItem("notifications_muted") === "true",
  );
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [viewMode, setViewMode] = useState("compact");
  const [stats, setStats] = useState({
    total: 0,
    unread: 0,
    urgent: 0,
    today: 0,
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notificationSound, setNotificationSound] = useState("default");
  const [vibration, setVibration] = useState(true);

  const token = localStorage.getItem("token");
  const notificationSoundRef = useRef(null);
  const urgentSoundRef = useRef(null);
  const modalRef = useRef(null);
  const filterRef = useRef(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        if (selectedNotification) {
          setSelectedNotification(null);
        } else {
          handleClose();
        }
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [selectedNotification]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      fetchNotifications();
    }

    return () => {
      if (!isOpen) {
        document.body.style.overflow = "auto";
      }
    };
  }, [isOpen]);

  // Sound functions
  const playNotificationSound = useCallback(() => {
    if (!isMuted && notificationSoundRef.current) {
      notificationSoundRef.current.currentTime = 0;
      notificationSoundRef.current.play().catch(console.log);
    }
  }, [isMuted]);

  const playUrgentSound = useCallback(() => {
    if (!isMuted && urgentSoundRef.current) {
      urgentSoundRef.current.currentTime = 0;
      urgentSoundRef.current.play().catch(console.log);
    }
  }, [isMuted]);

  // Vibration function for mobile
  const vibrate = useCallback(() => {
    if (vibration && "vibrate" in navigator) {
      navigator.vibrate([100, 50, 100]);
    }
  }, [vibration]);

  const handleMuteToggle = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    localStorage.setItem("notifications_muted", newMuted.toString());
    if (!newMuted) playNotificationSound();
  };

  const handleVibrationToggle = () => {
    const newVibration = !vibration;
    setVibration(newVibration);
    localStorage.setItem("notifications_vibration", newVibration.toString());
  };

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      });
      const data = await res.json();
      if (data.success) {
        const sorted = (data.notifications || []).sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        setNotifications(sorted);

        const unreadCount = sorted.filter((n) => !n.isRead).length;
        const urgentCount = sorted.filter((n) => n.priority === "high").length;
        const todayCount = sorted.filter((n) => {
          const date = new Date(n.createdAt);
          const today = new Date();
          return date.toDateString() === today.toDateString();
        }).length;

        setStats({
          total: sorted.length,
          unread: unreadCount,
          urgent: urgentCount,
          today: todayCount,
        });

        const prevUnread = parseInt(
          localStorage.getItem("unread_count") || "0",
        );
        if (unreadCount > prevUnread) {
          setHasNew(true);
          playUrgentSound();
          vibrate();
        }
        localStorage.setItem("unread_count", unreadCount.toString());
      }
    } catch (err) {
      console.error("Fetch notifications error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Mark as read
  const markAsRead = async (id) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/notifications/${id}/read`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await res.json();
      if (data.success) {
        setNotifications((prev) =>
          prev.map((n) => (n._id === id ? { ...n, isRead: true } : n)),
        );
        const newUnread = notifications.filter(
          (n) => !n.isRead && n._id !== id,
        ).length;
        setStats((prev) => ({ ...prev, unread: newUnread }));
        localStorage.setItem("unread_count", newUnread.toString());
      }
    } catch (err) {
      console.error("Mark as read error:", err);
    }
  };

  const markAllAsRead = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/notifications/read-all`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await res.json();
      if (data.success) {
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
        setStats((prev) => ({ ...prev, unread: 0 }));
        setHasNew(false);
        localStorage.setItem("unread_count", "0");
      }
    } catch (err) {
      console.error("Mark all as read error:", err);
    }
  };

  const deleteNotification = async (id) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/notifications/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await res.json();
      if (data.success) {
        setNotifications((prev) => prev.filter((n) => n._id !== id));
        const newUnread = notifications.filter(
          (n) => !n.isRead && n._id !== id,
        ).length;
        const newTotal = notifications.filter((n) => n._id !== id).length;
        const newUrgent = notifications.filter(
          (n) => n.priority === "high" && n._id !== id,
        ).length;
        const newToday = notifications.filter((n) => {
          const date = new Date(n.createdAt);
          const today = new Date();
          return date.toDateString() === today.toDateString() && n._id !== id;
        }).length;

        setStats({
          total: newTotal,
          unread: newUnread,
          urgent: newUrgent,
          today: newToday,
        });
      }
    } catch (err) {
      console.error("Delete notification error:", err);
    }
  };

  const deleteAllNotifications = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/notifications/`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await res.json();
      if (data.success) {
        setNotifications([]);
        setStats({ total: 0, unread: 0, urgent: 0, today: 0 });
        setHasNew(false);
        localStorage.setItem("unread_count", "0");
      }
    } catch (err) {
      console.error("Delete all notifications error:", err);
    }
  };

  // Helper functions
  const getNotificationIcon = (type, priority) => {
    const icons = {
      blood: {
        icon: <Droplets className="h-5 w-5" />,
        color: priority === "high" ? "text-red-600" : "text-red-500",
        bg:
          priority === "high"
            ? "bg-gradient-to-br from-red-100 to-red-50"
            : "bg-red-50",
        ring: priority === "high" ? "ring-2 ring-red-200" : "",
      },
      organ: {
        icon: <Heart className="h-5 w-5" />,
        color: "text-purple-600",
        bg: "bg-gradient-to-br from-purple-100 to-purple-50",
        ring: "ring-2 ring-purple-100",
      },
      emergency: {
        icon: <AlertTriangle className="h-5 w-5" />,
        color: "text-amber-600",
        bg: "bg-gradient-to-br from-amber-100 to-amber-50",
        ring: "ring-2 ring-amber-100",
      },
      message: {
        icon: <MessageSquare className="h-5 w-5" />,
        color: "text-blue-600",
        bg: "bg-gradient-to-br from-blue-100 to-blue-50",
        ring: "ring-2 ring-blue-100",
      },
      system: {
        icon: <Shield className="h-5 w-5" />,
        color: "text-gray-600",
        bg: "bg-gradient-to-br from-gray-100 to-gray-50",
        ring: "ring-2 ring-gray-100",
      },
      event: {
        icon: <Calendar className="h-5 w-5" />,
        color: "text-indigo-600",
        bg: "bg-gradient-to-br from-indigo-100 to-indigo-50",
        ring: "ring-2 ring-indigo-100",
      },
      appointment: {
        icon: <Clock className="h-5 w-5" />,
        color: "text-teal-600",
        bg: "bg-gradient-to-br from-teal-100 to-teal-50",
        ring: "ring-2 ring-teal-100",
      },
    };

    return (
      icons[type] || {
        icon: <Bell className="h-5 w-5" />,
        color: "text-gray-600",
        bg: "bg-gradient-to-br from-gray-100 to-gray-50",
        ring: "ring-2 ring-gray-100",
      }
    );
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "all") return true;
    if (filter === "unread") return !n.isRead;
    if (filter === "urgent") return n.priority === "high";
    if (filter === "today") {
      const date = new Date(n.createdAt);
      const today = new Date();
      return date.toDateString() === today.toDateString();
    }
    return n.type === filter;
  });

  const searchedNotifications = searchQuery
    ? filteredNotifications.filter(
        (n) =>
          n.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          n.message?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : filteredNotifications;

  const handleClose = () => {
    setSelectedNotification(null);
    setShowSettings(false);
    setIsMobileMenuOpen(false);
    onClose();
  };

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    if (!notification.isRead) {
      markAsRead(notification._id);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-gradient-to-br from-black/50 via-black/40 to-purple-900/30 backdrop-blur-md z-50 animate-fadeIn" />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6">
        <div
          ref={modalRef}
          className="bg-gradient-to-br from-white via-white to-gray-50/50 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/50 w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden animate-scaleIn"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-gradient-to-b from-white/95 via-white/95 to-white/90 backdrop-blur-sm border-b border-gray-200/50 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl sm:rounded-2xl blur-xl opacity-30"></div>
                  <div className="relative p-2 sm:p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl sm:rounded-2xl shadow-lg">
                    <Bell className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                  </div>
                  {stats.unread > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 sm:h-6 sm:w-6 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] sm:text-xs rounded-full flex items-center justify-center font-bold shadow-lg animate-pulse">
                      {stats.unread > 99 ? "99+" : stats.unread}
                    </span>
                  )}
                </div>
                <div>
                  <h2 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Notifications
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">
                    Stay updated with important alerts
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 sm:gap-2">
                {/* Mobile menu button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 hover:bg-gray-100 rounded-xl sm:hidden transition-all duration-200"
                  title="Menu"
                >
                  <Menu className="h-5 w-5 text-gray-600" />
                </button>

                <button
                  onClick={handleMuteToggle}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-105 hidden sm:block"
                  title={isMuted ? "Unmute sounds" : "Mute sounds"}
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                  ) : (
                    <Volume2 className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                  )}
                </button>

                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-105 hidden sm:block"
                  title="Settings"
                >
                  <Settings className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                </button>

                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-105"
                  title="Close"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
              <div className="sm:hidden mb-4 p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200/50">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <button
                    onClick={handleMuteToggle}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg ${isMuted ? "bg-gray-200" : "bg-green-100 text-green-700"}`}
                  >
                    {isMuted ? (
                      <VolumeX className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                    <span className="text-xs font-medium">
                      {isMuted ? "Muted" : "Sound On"}
                    </span>
                  </button>

                  <button
                    onClick={() =>
                      setViewMode(
                        viewMode === "compact" ? "detailed" : "compact",
                      )
                    }
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg"
                  >
                    {viewMode === "compact" ? (
                      <List className="h-4 w-4" />
                    ) : (
                      <Grid className="h-4 w-4" />
                    )}
                    <span className="text-xs font-medium">
                      {viewMode === "compact" ? "List" : "Grid"}
                    </span>
                  </button>

                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg"
                  >
                    <Sliders className="h-4 w-4" />
                    <span className="text-xs font-medium">Settings</span>
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={fetchNotifications}
                    className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <RefreshCw
                      className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                    />
                    <span>Refresh</span>
                  </button>

                  <button
                    onClick={markAllAsRead}
                    disabled={stats.unread === 0}
                    className="flex-1 px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Read All</span>
                  </button>
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/30 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 border border-blue-200/50">
                <div className="text-xs text-blue-600 mb-1">Total</div>
                <div className="text-lg sm:text-xl font-bold text-gray-900">
                  {stats.total}
                </div>
              </div>
              <div className="bg-gradient-to-br from-amber-50/80 to-amber-100/30 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 border border-amber-200/50">
                <div className="text-xs text-amber-600 mb-1">Unread</div>
                <div className="text-lg sm:text-xl font-bold text-gray-900">
                  {stats.unread}
                </div>
              </div>
              <div className="bg-gradient-to-br from-red-50/80 to-red-100/30 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 border border-red-200/50">
                <div className="text-xs text-red-600 mb-1">Urgent</div>
                <div className="text-lg sm:text-xl font-bold text-gray-900">
                  {stats.urgent}
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-50/80 to-green-100/30 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 border border-green-200/50">
                <div className="text-xs text-green-600 mb-1">Today</div>
                <div className="text-lg sm:text-xl font-bold text-gray-900">
                  {stats.today}
                </div>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search notifications..."
                  className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 bg-white/80 border border-gray-300/50 rounded-xl sm:rounded-2xl 
                           focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 text-sm
                           placeholder-gray-400 transition-all duration-300"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setViewMode(viewMode === "compact" ? "detailed" : "compact")
                  }
                  className="px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-gray-300/50 rounded-xl sm:rounded-2xl text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  {viewMode === "compact" ? (
                    <>
                      <List className="h-4 w-4" />
                      <span className="hidden sm:inline">Detailed</span>
                    </>
                  ) : (
                    <>
                      <Grid className="h-4 w-4" />
                      <span className="hidden sm:inline">Compact</span>
                    </>
                  )}
                </button>

                <button
                  onClick={fetchNotifications}
                  className="px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200/50 rounded-xl sm:rounded-2xl text-sm font-medium hover:from-blue-100 hover:to-cyan-100 transition-all flex items-center gap-2"
                >
                  <RefreshCw
                    className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                  />
                  <span className="hidden sm:inline">Refresh</span>
                </button>
              </div>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="absolute top-20 sm:top-24 right-2 sm:right-6 z-20 w-56 sm:w-64 bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl border border-gray-200/50 p-3 sm:p-4 animate-slideDown">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Sounds
                  </span>
                  <button
                    onClick={handleMuteToggle}
                    className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors ${isMuted ? "bg-gray-300" : "bg-green-500"}`}
                  >
                    <div
                      className={`w-3 h-3 bg-white rounded-full transition-transform ${isMuted ? "translate-x-0" : "translate-x-5"}`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Vibration
                  </span>
                  <button
                    onClick={handleVibrationToggle}
                    className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors ${!vibration ? "bg-gray-300" : "bg-blue-500"}`}
                  >
                    <div
                      className={`w-3 h-3 bg-white rounded-full transition-transform ${!vibration ? "translate-x-0" : "translate-x-5"}`}
                    />
                  </button>
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <div className="flex gap-2">
                    <button
                      onClick={playNotificationSound}
                      className="flex-1 px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-xs sm:text-sm font-medium transition-colors"
                    >
                      Test Sound
                    </button>
                    <button
                      onClick={playUrgentSound}
                      className="flex-1 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-xs sm:text-sm font-medium transition-colors"
                    >
                      Test Urgent
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="overflow-y-auto h-[calc(95vh-220px)] sm:h-[calc(90vh-220px)] p-4 sm:p-6">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-48 sm:h-64">
                <div className="relative">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Bell className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 animate-pulse" />
                  </div>
                </div>
                <p className="mt-4 text-gray-600 text-sm sm:text-base">
                  Loading notifications...
                </p>
              </div>
            ) : searchedNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 sm:h-64">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl sm:rounded-3xl flex items-center justify-center mb-4 sm:mb-6">
                  {searchQuery ? (
                    <Search className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300" />
                  ) : (
                    <Bell className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300" />
                  )}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-700 mb-2">
                  {searchQuery ? "No matches found" : "All caught up!"}
                </h3>
                <p className="text-gray-500 text-center max-w-sm text-sm sm:text-base">
                  {searchQuery
                    ? `No notifications match "${searchQuery}"`
                    : "You're all caught up with your notifications"}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {hasNew && (
                  <div className="sticky top-0 z-10 flex justify-center -mt-3 mb-3">
                    <div className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-medium rounded-full shadow-lg shadow-green-500/30 animate-bounce flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      New notifications!
                    </div>
                  </div>
                )}

                {/* Filter Tabs */}
                <div
                  className="flex items-center gap-2 mb-4 overflow-x-auto pb-2"
                  ref={filterRef}
                >
                  {[
                    {
                      id: "all",
                      label: "All",
                      icon: <Bell className="h-3 w-3" />,
                    },
                    {
                      id: "unread",
                      label: "Unread",
                      icon: <AlertCircle className="h-3 w-3" />,
                    },
                    {
                      id: "urgent",
                      label: "Urgent",
                      icon: <Zap className="h-3 w-3" />,
                    },
                    {
                      id: "today",
                      label: "Today",
                      icon: <Calendar className="h-3 w-3" />,
                    },
                    {
                      id: "blood",
                      label: "Blood",
                      icon: <Droplets className="h-3 w-3" />,
                    },
                    {
                      id: "emergency",
                      label: "Emergency",
                      icon: <AlertTriangle className="h-3 w-3" />,
                    },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setFilter(tab.id)}
                      className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                        filter === tab.id
                          ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
                          : "bg-white border border-gray-300/50 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Notifications List */}
                <div className="grid gap-3">
                  {searchedNotifications.map((notification, index) => {
                    const iconData = getNotificationIcon(
                      notification.type,
                      notification.priority,
                    );
                    const isUrgent = notification.priority === "high";

                    return (
                      <div
                        key={notification._id}
                        className={`group bg-white rounded-xl sm:rounded-2xl border transition-all duration-300 hover:shadow-lg cursor-pointer transform hover:-translate-y-0.5 ${
                          notification.isRead
                            ? "border-gray-200"
                            : "border-blue-200"
                        } ${isUrgent ? "border-l-4 border-l-red-500 shadow-lg shadow-red-500/10" : ""}`}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className="p-3 sm:p-4">
                          <div className="flex items-start gap-3">
                            {/* Icon */}
                            <div
                              className={`relative ${iconData.bg} ${iconData.ring} p-2.5 sm:p-3 rounded-lg sm:rounded-xl flex-shrink-0`}
                            >
                              <div className={iconData.color}>
                                {iconData.icon}
                              </div>
                              {!notification.isRead && (
                                <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse"></div>
                              )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4
                                      className={`font-bold text-sm sm:text-base ${notification.isRead ? "text-gray-700" : "text-gray-900"}`}
                                    >
                                      {notification.title}
                                    </h4>
                                    {isUrgent && (
                                      <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                                        URGENT
                                      </span>
                                    )}
                                  </div>

                                  {viewMode === "detailed" &&
                                    notification.sender?.name && (
                                      <div className="flex items-center gap-2 mb-2">
                                        <UserCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400" />
                                        <p className="text-xs text-gray-500">
                                          From: {notification.sender.name}
                                        </p>
                                      </div>
                                    )}
                                </div>

                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                                    {getTimeAgo(notification.createdAt)}
                                  </span>
                                </div>
                              </div>

                              <p
                                className={`text-gray-600 mb-3 text-xs sm:text-sm line-clamp-2 ${notification.isRead ? "opacity-80" : ""}`}
                              >
                                {notification.message}
                              </p>

                              {/* Meta info */}
                              {viewMode === "detailed" &&
                                (notification.bloodGroup ||
                                  notification.location) && (
                                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                                    {notification.bloodGroup && (
                                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 text-red-700 rounded-lg text-xs">
                                        <Droplets className="h-3 w-3" />
                                        {notification.bloodGroup}
                                      </span>
                                    )}
                                    {notification.location && (
                                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs">
                                        <MapPin className="h-3 w-3" />
                                        {notification.location}
                                      </span>
                                    )}
                                  </div>
                                )}

                              {/* Quick Actions */}
                              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                <div className="flex items-center gap-2">
                                  {!notification.isRead && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        markAsRead(notification._id);
                                      }}
                                      className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg text-xs font-medium hover:shadow-lg transition-colors flex items-center gap-2"
                                    >
                                      <CheckCircle className="h-3 w-3" />
                                      <span className="hidden sm:inline">
                                        Mark Read
                                      </span>
                                    </button>
                                  )}
                                </div>

                                <div className="flex items-center gap-2">
                                  {notification.pinned && (
                                    <Pin className="h-4 w-4 text-amber-500" />
                                  )}

                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteNotification(notification._id);
                                    }}
                                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Delete"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>

                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleNotificationClick(notification);
                                    }}
                                    className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                  >
                                    <ChevronRight className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gradient-to-t from-white via-white to-white/95 backdrop-blur-sm border-t border-gray-200/50 p-3 sm:p-4">
            <div className="flex items-center justify-between flex-col sm:flex-row gap-3 sm:gap-0">
              <div className="text-sm text-gray-600 flex items-center gap-2">
                <span className="font-medium">
                  {searchedNotifications.length}
                </span>
                <span>notifications</span>
                {stats.unread > 0 && (
                  <span className="px-2 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs rounded-full">
                    {stats.unread} unread
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={markAllAsRead}
                  disabled={stats.unread === 0}
                  className="flex-1 sm:flex-none px-3 sm:px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                >
                  <CheckCircle className="h-4 w-4" />
                  <span className="hidden sm:inline">Mark All Read</span>
                  <span className="sm:hidden">Read All</span>
                </button>

                <button
                  onClick={deleteAllNotifications}
                  disabled={notifications.length === 0}
                  className="flex-1 sm:flex-none px-3 sm:px-4 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Clear All</span>
                  <span className="sm:hidden">Clear</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Detail Modal */}
      {selectedNotification && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn"
            onClick={() => setSelectedNotification(null)}
          />

          <div className="relative bg-gradient-to-br from-white via-white to-gray-50/50 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/50 w-full max-w-md max-h-[90vh] sm:max-h-[80vh] overflow-hidden animate-scaleIn">
            <div className="p-4 sm:p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  {(() => {
                    const iconData = getNotificationIcon(
                      selectedNotification.type,
                      selectedNotification.priority,
                    );
                    return (
                      <div
                        className={`p-2 sm:p-3 rounded-lg sm:rounded-xl ${iconData.bg} ${iconData.ring}`}
                      >
                        <div className={iconData.color}>{iconData.icon}</div>
                      </div>
                    );
                  })()}
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 line-clamp-1">
                      {selectedNotification.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {getTimeAgo(selectedNotification.createdAt)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedNotification(null)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                </button>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-gray-700 text-sm sm:text-base">
                    {selectedNotification.message}
                  </p>
                </div>

                {/* Sender Info */}
                {selectedNotification.sender?.name && (
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      {selectedNotification.sender.avatar ? (
                        <img
                          src={selectedNotification.sender.avatar}
                          alt={selectedNotification.sender.name}
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                        />
                      ) : (
                        <UserCircle className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
                      )}
                      <div>
                        <p className="font-medium text-gray-900 text-sm sm:text-base">
                          {selectedNotification.sender.name}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Sender
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Additional Info */}
                {(selectedNotification.bloodGroup ||
                  selectedNotification.location) && (
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    {selectedNotification.bloodGroup && (
                      <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-3">
                        <p className="text-xs text-gray-600">Blood Group</p>
                        <p className="font-bold text-red-700 text-sm sm:text-base">
                          {selectedNotification.bloodGroup}
                        </p>
                      </div>
                    )}
                    {selectedNotification.location && (
                      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-3">
                        <p className="text-xs text-gray-600">Location</p>
                        <p className="font-medium text-blue-700 text-sm sm:text-base">
                          {selectedNotification.location}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 sm:gap-3 pt-4">
                  {!selectedNotification.isRead && (
                    <button
                      onClick={() => {
                        markAsRead(selectedNotification._id);
                        setSelectedNotification(null);
                      }}
                      className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-medium hover:shadow-lg transition-all text-sm sm:text-base"
                    >
                      Mark as Read
                    </button>
                  )}
                  <button
                    onClick={() => {
                      deleteNotification(selectedNotification._id);
                      setSelectedNotification(null);
                    }}
                    className="flex-1 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg transition-all text-sm sm:text-base"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Audio elements */}
      <audio ref={notificationSoundRef} preload="auto">
        <source
          src="https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3"
          type="audio/mpeg"
        />
      </audio>
      <audio ref={urgentSoundRef} preload="auto">
        <source
          src="https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3"
          type="audio/mpeg"
        />
      </audio>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.95) translateY(10px);
            opacity: 0;
          }
          to {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideDown {
          from {
            transform: translateY(-10px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }

        .animate-bounce {
          animation: bounce 1s infinite;
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }

        /* Line clamp utility */
        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }

        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }

        /* Smooth scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(241, 241, 241, 0.5);
          border-radius: 10px;
          margin: 4px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #06b6d4);
          border-radius: 10px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #0891b2);
        }

        /* Mobile optimizations */
        @media (max-width: 640px) {
          .overflow-y-auto::-webkit-scrollbar {
            width: 4px;
          }
        }
      `}</style>
    </>
  );
};

export default NotificationsModal;
