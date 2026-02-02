import { useEffect, useState, useRef, useCallback } from "react";
import { socket } from "../socket/socket";
import { 
  Bell, X, AlertCircle, CheckCircle, Heart, Activity, 
  Droplets, MapPin, Volume2, VolumeX, UserCircle,
  Search, Trash2, MessageSquare, Clock,
  ArrowRight, Calendar, Filter, ExternalLink, 
  Shield, Star, ChevronRight, MoreVertical,
  BellRing, Zap, AlertTriangle,
  RefreshCw, Eye, EyeOff, Settings,
  Smartphone, Tablet, Monitor
} from "lucide-react";

export default function Notifications({ onClose, onNotificationRead }) {
  const [notifications, setNotifications] = useState([]);
  const [isMuted, setIsMuted] = useState(() => {
    return localStorage.getItem('notifications_muted') === 'true';
  });
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [hasNewNotifications, setHasNewNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    sound: true,
    vibration: true,
    popup: true,
    badge: true
  });
  const [deviceType, setDeviceType] = useState('desktop');
  const [stats, setStats] = useState({
    total: 0,
    unread: 0,
    today: 0,
    urgent: 0
  });
  
  const modalRef = useRef(null);
  const notificationsEndRef = useRef(null);
  const notificationSoundRef = useRef(null);
  const urgentSoundRef = useRef(null);
  const newNotificationSoundRef = useRef(null);

  // Detect device type
  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setDeviceType('mobile');
      } else if (width < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);
    return () => window.removeEventListener('resize', checkDeviceType);
  }, []);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('notification_settings');
    if (savedSettings) {
      setNotificationSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Fetch notifications from API
  useEffect(() => {
    fetchNotifications();
    
    // Set up polling for notifications every 20 seconds
    const interval = setInterval(fetchNotifications, 20000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/notifications`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        cache: 'no-cache'
      });
      
      const data = await res.json();
      
      if (data.success) {
        const sortedNotifications = (data.notifications || [])
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        setNotifications(sortedNotifications);
        updateStats(sortedNotifications);
        
        // Check for new notifications
        const unreadCount = sortedNotifications.filter(n => !n.isRead).length;
        const previousUnread = parseInt(localStorage.getItem('unread_count') || '0');
        
        if (unreadCount > previousUnread && notificationSettings.badge) {
          setHasNewNotifications(true);
          playNewNotificationSound();
        }
        
        localStorage.setItem('unread_count', unreadCount.toString());
      }
    } catch (err) {
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStats = useCallback((notificationsList) => {
    const total = notificationsList.length;
    const unread = notificationsList.filter(n => !n.isRead).length;
    const urgent = notificationsList.filter(n => n.priority === 'high' && !n.isRead).length;
    
    const today = notificationsList.filter(n => {
      const notificationDate = new Date(n.createdAt);
      const todayDate = new Date();
      return notificationDate.toDateString() === todayDate.toDateString();
    }).length;

    setStats({ total, unread, today, urgent });
  }, []);

  // Socket connection for real-time notifications
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      socket.auth = { token };
      socket.connect();
    }

    const handleNewNotification = (data) => {
      console.log("🎯 New real-time notification:", data);
      
      // Play appropriate sound
      if (notificationSettings.sound) {
        if (data.priority === 'high') {
          playUrgentNotificationSound();
        } else {
          playNotificationSound();
        }
      }
      
      // Vibrate if enabled
      if (notificationSettings.vibration && 'vibrate' in navigator) {
        const pattern = data.priority === 'high' ? [200, 100, 200] : [200];
        navigator.vibrate(pattern);
      }
      
      // Add notification with animation
      setNotifications(prev => {
        const newList = [{ 
          ...data, 
          isNew: true,
          _id: data._id || Date.now().toString()
        }, ...prev];
        updateStats(newList);
        return newList;
      });
      
      if (notificationSettings.badge) {
        setHasNewNotifications(true);
      }
      
      // Show browser notification if permitted
      if (notificationSettings.popup && Notification.permission === "granted" && !document.hasFocus()) {
        new Notification(data.title || "New Notification", {
          body: data.message,
          icon: "/logo.png",
          tag: data._id,
          badge: "/badge.png",
          requireInteraction: data.priority === 'high',
          vibrate: data.priority === 'high' ? [200, 100, 200] : [200]
        });
      }
    };

    const handleNotificationRead = (data) => {
      setNotifications(prev =>
        prev.map(n => n._id === data.notificationId ? { ...n, isRead: true } : n)
      );
    };

    socket.on("notification:new", handleNewNotification);
    socket.on("notification:read", handleNotificationRead);
    socket.on("notification:delete", (data) => {
      setNotifications(prev => prev.filter(n => n._id !== data.notificationId));
    });

    return () => {
      socket.off("notification:new", handleNewNotification);
      socket.off("notification:read", handleNotificationRead);
      socket.off("notification:delete");
      socket.disconnect();
    };
  }, [updateStats, notificationSettings]);

  // Request notification permission
  useEffect(() => {
    if (Notification.permission === "default") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          console.log("🔔 Notification permission granted");
        }
      });
    }
  }, []);

  const playNotificationSound = () => {
    if (!isMuted && notificationSoundRef.current && notificationSettings.sound) {
      notificationSoundRef.current.currentTime = 0;
      notificationSoundRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
  };

  const playUrgentNotificationSound = () => {
    if (!isMuted && urgentSoundRef.current && notificationSettings.sound) {
      urgentSoundRef.current.currentTime = 0;
      urgentSoundRef.current.play().catch(e => console.log("Urgent audio play failed:", e));
    }
  };

  const playNewNotificationSound = () => {
    if (!isMuted && newNotificationSoundRef.current && notificationSettings.sound) {
      newNotificationSoundRef.current.currentTime = 0;
      newNotificationSoundRef.current.play().catch(e => console.log("New notification sound failed:", e));
    }
  };

  const handleMuteToggle = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    localStorage.setItem('notifications_muted', newMutedState.toString());
    
    // Play sound when unmuting
    if (!newMutedState && notificationSettings.sound) {
      playNotificationSound();
    }
  };

  const handleClose = () => {
    setHasNewNotifications(false);
    setShowSettings(false);
    onClose();
  };

  const handleSettingsToggle = () => {
    setShowSettings(!showSettings);
  };

  const handleSettingChange = (key, value) => {
    const newSettings = {
      ...notificationSettings,
      [key]: value
    };
    setNotificationSettings(newSettings);
    localStorage.setItem('notification_settings', JSON.stringify(newSettings));
  };

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/notifications/${id}/read`, {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (res.ok) {
        setNotifications(prev =>
          prev.map((n) => (n._id === id ? { ...n, isRead: true, isNew: false } : n))
        );
        
        socket.emit("notification:read", { notificationId: id });
        
        if (onNotificationRead) onNotificationRead();
      }
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/notifications/read-all`, {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (res.ok) {
        setNotifications(prev =>
          prev.map((n) => ({ ...n, isRead: true, isNew: false }))
        );
        setHasNewNotifications(false);
        
        if (onNotificationRead) onNotificationRead();
      }
    } catch (err) {
      console.error("Error marking all as read:", err);
    }
  };

  const deleteNotification = async (id, e) => {
    e.stopPropagation();
    
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/notifications/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (res.ok) {
        setNotifications(prev => prev.filter(n => n._id !== id));
        socket.emit("notification:delete", { notificationId: id });
      }
    } catch (err) {
      console.error("Error deleting notification:", err);
    }
  };

  const clearAllNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/notifications/clear`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (res.ok) {
        setNotifications([]);
        setHasNewNotifications(false);
      }
    } catch (err) {
      console.error("Error clearing notifications:", err);
    }
  };

  const getNotificationIcon = (type, priority) => {
    const icons = {
      'blood': { 
        icon: <Droplets className="h-5 w-5" />, 
        color: priority === 'high' ? "text-red-600" : "text-red-500",
        bg: priority === 'high' ? "bg-red-100" : "bg-red-50"
      },
      'organ': { 
        icon: <Heart className="h-5 w-5" />, 
        color: "text-purple-600",
        bg: "bg-purple-50"
      },
      'emergency': { 
        icon: <AlertTriangle className="h-5 w-5" />, 
        color: "text-amber-600",
        bg: "bg-amber-50"
      },
      'donation': { 
        icon: <Activity className="h-5 w-5" />, 
        color: "text-green-600",
        bg: "bg-green-50"
      },
      'message': { 
        icon: <MessageSquare className="h-5 w-5" />, 
        color: "text-blue-600",
        bg: "bg-blue-50"
      },
      'system': { 
        icon: <Shield className="h-5 w-5" />, 
        color: "text-gray-600",
        bg: "bg-gray-50"
      },
      'event': { 
        icon: <Calendar className="h-5 w-5" />, 
        color: "text-indigo-600",
        bg: "bg-indigo-50"
      },
      'update': { 
        icon: <BellRing className="h-5 w-5" />, 
        color: "text-cyan-600",
        bg: "bg-cyan-50"
      },
      'appointment': { 
        icon: <Clock className="h-5 w-5" />, 
        color: "text-teal-600",
        bg: "bg-teal-50"
      }
    };
    
    return icons[type] || { 
      icon: <Bell className="h-5 w-5" />, 
      color: "text-gray-600",
      bg: "bg-gray-50"
    };
  };

  const getNotificationStyle = (type, priority = 'normal') => {
    const baseStyles = {
      blood: {
        bg: "bg-gradient-to-r from-red-50/90 to-red-50/60",
        border: "border-red-200",
        text: "text-red-900",
        badge: "bg-gradient-to-r from-red-100 to-red-200 text-red-800",
        glow: priority === 'high' ? "shadow-[0_0_20px_rgba(239,68,68,0.15)]" : ""
      },
      organ: {
        bg: "bg-gradient-to-r from-purple-50/90 to-purple-50/60",
        border: "border-purple-200",
        text: "text-purple-900",
        badge: "bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800",
        glow: priority === 'high' ? "shadow-[0_0_20px_rgba(168,85,247,0.15)]" : ""
      },
      emergency: {
        bg: "bg-gradient-to-r from-amber-50/90 to-amber-50/60",
        border: "border-amber-200",
        text: "text-amber-900",
        badge: "bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800",
        glow: priority === 'high' ? "shadow-[0_0_20px_rgba(245,158,11,0.15)]" : ""
      },
      donation: {
        bg: "bg-gradient-to-r from-green-50/90 to-green-50/60",
        border: "border-green-200",
        text: "text-green-900",
        badge: "bg-gradient-to-r from-green-100 to-green-200 text-green-800",
        glow: priority === 'high' ? "shadow-[0_0_20px_rgba(34,197,94,0.15)]" : ""
      }
    };
    
    const style = baseStyles[type] || {
      bg: "bg-gradient-to-r from-blue-50/90 to-blue-50/60",
      border: "border-blue-200",
      text: "text-blue-900",
      badge: "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800",
      glow: ""
    };
    
    if (priority === 'high') {
      return {
        ...style,
        bg: "bg-gradient-to-r from-red-50/95 to-red-50/70",
        border: "border-red-300",
        ring: "ring-2 ring-red-300 ring-opacity-50",
        glow: "shadow-[0_0_25px_rgba(239,68,68,0.2)] animate-pulse-glow"
      };
    }
    
    return style;
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !n.isRead;
    if (filter === 'urgent') return n.priority === 'high';
    if (filter === 'today') {
      const notificationDate = new Date(n.createdAt);
      const today = new Date();
      return notificationDate.toDateString() === today.toDateString();
    }
    return n.type === filter;
  });

  const searchedNotifications = searchQuery 
    ? filteredNotifications.filter(n => 
        n.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.message?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.sender?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.bloodGroup?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.location?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredNotifications;

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
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleNotificationClick = (notification) => {
    if (!notification.isRead) {
      markAsRead(notification._id);
    }
    
    if (notification.actionUrl) {
      window.open(notification.actionUrl, '_blank');
    }
  };

  const scrollToBottom = () => {
    notificationsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRefresh = () => {
    setLoading(true);
    fetchNotifications();
  };

  // Test notification sound button
  const testNotificationSound = () => {
    if (notificationSettings.sound && !isMuted) {
      playNotificationSound();
    }
  };

  const testUrgentSound = () => {
    if (notificationSettings.sound && !isMuted) {
      playUrgentNotificationSound();
    }
  };

  const getDeviceIcon = () => {
    switch(deviceType) {
      case 'mobile': return <Smartphone className="h-4 w-4" />;
      case 'tablet': return <Tablet className="h-4 w-4" />;
      default: return <Monitor className="h-4 w-4" />;
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex">
      {/* Animated Background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-gray-900/30 via-black/20 to-gray-900/30 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Notification Modal */}
      <div 
        ref={modalRef}
        className={`relative h-full bg-gradient-to-b from-white/95 via-white/98 to-white/95 backdrop-blur-xl shadow-2xl border-l border-gray-200/50 animate-slideInRight overflow-hidden
          ${deviceType === 'mobile' ? 'w-full' : 
            deviceType === 'tablet' ? 'w-full max-w-md' : 
            'w-full max-w-lg ml-auto'}`}
      >
        {/* Header */}
        <div className="sticky top-0 z-20 bg-gradient-to-b from-white/95 to-white/80 backdrop-blur-lg border-b border-gray-200/50 px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-30"></div>
                <div className="relative p-2.5 sm:p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-lg">
                  <Bell className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                {stats.unread > 0 && notificationSettings.badge && (
                  <span className="absolute -top-1.5 -right-1.5 h-5 w-5 sm:h-6 sm:w-6 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg animate-pulse">
                    {stats.unread > 99 ? '99+' : stats.unread}
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Notifications
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
                  {stats.unread} unread • {stats.today} today • {stats.urgent} urgent
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={handleRefresh}
                className="p-1.5 sm:p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 group"
                title="Refresh notifications"
              >
                <RefreshCw className={`h-4 w-4 sm:h-5 sm:w-5 text-gray-600 group-active:rotate-180 transition-transform ${loading ? 'animate-spin' : ''}`} />
              </button>
              
              <button
                onClick={handleSettingsToggle}
                className="p-1.5 sm:p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
                title="Notification settings"
              >
                <Settings className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
              </button>
              
              <button
                onClick={handleMuteToggle}
                className="p-1.5 sm:p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
                title={isMuted ? "Unmute sounds" : "Mute sounds"}
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                ) : (
                  <Volume2 className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                )}
              </button>
              
              <button
                onClick={handleClose}
                className="p-1.5 sm:p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
                title="Close notifications"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
              </button>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative mb-4 sm:mb-5">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl blur"></div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notifications..."
                className="w-full pl-10 pr-10 sm:pl-12 sm:pr-12 py-3 sm:py-3.5 bg-white/80 border border-gray-300/50 rounded-2xl 
                         focus:outline-none focus:ring-2 sm:focus:ring-3 focus:ring-blue-400/30 focus:border-blue-400/50 text-sm
                         placeholder-gray-400 transition-all duration-300 backdrop-blur-sm shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                >
                  <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </button>
              )}
            </div>
          </div>
          
          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 sm:pb-3 -mx-1 px-1">
            {[
              { id: 'all', label: 'All', count: stats.total, icon: <Bell className="h-3 w-3" /> },
              { id: 'unread', label: 'Unread', count: stats.unread, icon: <AlertCircle className="h-3 w-3" /> },
              { id: 'urgent', label: 'Urgent', count: stats.urgent, icon: <Zap className="h-3 w-3" /> },
              { id: 'today', label: 'Today', count: stats.today, icon: <Calendar className="h-3 w-3" /> },
              { id: 'blood', label: 'Blood', icon: <Droplets className="h-3 w-3" /> },
              { id: 'emergency', label: 'Emergency', icon: <AlertTriangle className="h-3 w-3" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                  filter === tab.id 
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 bg-white/50 backdrop-blur-sm border border-gray-200/50'
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.slice(0, 3)}</span>
                {tab.count !== undefined && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full min-w-[20px] sm:min-w-[24px] text-center ${
                    filter === tab.id ? 'bg-white/30' : 'bg-gray-200/80'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="absolute top-20 right-4 z-30 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 p-4 animate-slideDown">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Notification Settings</h3>
              <button onClick={handleSettingsToggle}>
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Volume2 className="h-4 w-4 text-gray-700" />
                  <span className="text-sm font-medium text-gray-700">Sound</span>
                </div>
                <button
                  onClick={() => handleSettingChange('sound', !notificationSettings.sound)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notificationSettings.sound ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notificationSettings.sound ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="h-4 w-4 text-gray-700" />
                  <span className="text-sm font-medium text-gray-700">Badge Counter</span>
                </div>
                <button
                  onClick={() => handleSettingChange('badge', !notificationSettings.badge)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notificationSettings.badge ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notificationSettings.badge ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BellRing className="h-4 w-4 text-gray-700" />
                  <span className="text-sm font-medium text-gray-700">Browser Popup</span>
                </div>
                <button
                  onClick={() => handleSettingChange('popup', !notificationSettings.popup)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notificationSettings.popup ? 'bg-purple-500' : 'bg-gray-300'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notificationSettings.popup ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-4 w-4 text-gray-700" />
                  <span className="text-sm font-medium text-gray-700">Vibration</span>
                </div>
                <button
                  onClick={() => handleSettingChange('vibration', !notificationSettings.vibration)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notificationSettings.vibration ? 'bg-amber-500' : 'bg-gray-300'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notificationSettings.vibration ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  {getDeviceIcon()}
                  <span className="text-sm font-medium text-gray-700">Test Sounds</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={testNotificationSound}
                    className="flex-1 px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-sm font-medium transition-colors"
                  >
                    Normal
                  </button>
                  <button
                    onClick={testUrgentSound}
                    className="flex-1 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-medium transition-colors"
                  >
                    Urgent
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notifications List */}
        <div className="overflow-y-auto h-[calc(100vh-180px)] sm:h-[calc(100vh-220px)] px-2 sm:px-4 pb-20 sm:pb-24">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full p-6 sm:p-8">
              <div className="relative">
                <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Bell className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 animate-pulse" />
                </div>
              </div>
              <p className="text-gray-500 mt-3 sm:mt-4 text-sm sm:text-base">Loading your notifications...</p>
            </div>
          ) : searchedNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-6 sm:p-8">
              <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mb-4 sm:mb-6 shadow-inner">
                {searchQuery ? (
                  <Search className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
                ) : (
                  <Bell className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
                )}
              </div>
              <h3 className="font-semibold text-gray-700 mb-2 sm:mb-3 text-lg sm:text-xl">
                {searchQuery ? 'No matches found' : 'All caught up!'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 text-center max-w-xs mb-4 sm:mb-6">
                {searchQuery 
                  ? `No notifications match "${searchQuery}"`
                  : "You're up to date with all your notifications"}
              </p>
              {!searchQuery && (
                <button
                  onClick={handleRefresh}
                  className="flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <RefreshCw className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Refresh
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4 py-3 sm:py-4">
              {hasNewNotifications && (
                <div className="sticky top-2 z-10 flex justify-center">
                  <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs sm:text-sm font-medium rounded-full shadow-lg shadow-green-500/30 animate-bounce">
                    New notifications!
                  </div>
                </div>
              )}
              
              {searchedNotifications.map((notification, index) => {
                const iconData = getNotificationIcon(notification.type, notification.priority);
                const styles = getNotificationStyle(notification.type, notification.priority);
                
                return (
                  <div
                    key={notification._id || index}
                    onClick={() => handleNotificationClick(notification)}
                    className={`relative rounded-xl sm:rounded-2xl border transition-all duration-300 hover:shadow-lg sm:hover:shadow-xl cursor-pointer transform hover:scale-[1.005] sm:hover:scale-[1.01] active:scale-[0.99] group ${
                      notification.isRead ? 'opacity-90' : ''
                    } ${styles.bg} ${styles.border} ${styles.ring || ''} ${styles.glow}`}
                    style={{
                      animationDelay: `${index * 50}ms`
                    }}
                  >
                    {/* New Notification Indicator */}
                    {notification.isNew && !notification.isRead && (
                      <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-ping"></div>
                    )}
                    
                    {/* Unread indicator */}
                    {!notification.isRead && (
                      <div className="absolute left-2 top-2 sm:left-4 sm:top-4 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse shadow-lg"></div>
                    )}
                    
                    {/* Urgent Badge */}
                    {notification.priority === 'high' && (
                      <div className="absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2 px-2 py-0.5 sm:px-3 sm:py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg z-10">
                        URGENT
                      </div>
                    )}
                    
                    <div className="p-3 sm:p-5">
                      <div className="flex items-start gap-3 sm:gap-4">
                        {/* Icon */}
                        <div className={`relative p-2.5 sm:p-3.5 rounded-lg sm:rounded-xl ${iconData.bg} shadow-md group-hover:scale-110 transition-transform duration-300`}>
                          <div className={`${iconData.color}`}>
                            {iconData.icon}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2 sm:mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                                <h4 className={`font-bold ${styles.text} text-sm sm:text-base truncate`}>
                                  {notification.title}
                                </h4>
                                {notification.isNew && !notification.isRead && (
                                  <span className="text-xs px-1.5 py-0.5 sm:px-2 sm:py-0.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full whitespace-nowrap">
                                    NEW
                                  </span>
                                )}
                              </div>
                              
                              {notification.sender?.name && (
                                <div className="flex items-center gap-1.5 sm:gap-2">
                                  {notification.sender.avatar ? (
                                    <img 
                                      src={notification.sender.avatar} 
                                      alt={notification.sender.name}
                                      className="w-4 h-4 sm:w-5 sm:h-5 rounded-full"
                                    />
                                  ) : (
                                    <UserCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                                  )}
                                  <p className="text-xs text-gray-500 truncate">
                                    From: {notification.sender.name}
                                  </p>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex items-start gap-1.5 sm:gap-2">
                              <span className="text-xs text-gray-500 whitespace-nowrap bg-white/50 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-lg border border-gray-200/50">
                                {getTimeAgo(notification.createdAt)}
                              </span>
                              <button
                                onClick={(e) => deleteNotification(notification._id, e)}
                                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200/50 rounded-lg transition-all duration-200"
                                title="Delete notification"
                              >
                                <Trash2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-gray-500" />
                              </button>
                            </div>
                          </div>

                          <p className={`text-xs sm:text-sm ${styles.text.replace('900', '700')} mb-3 sm:mb-4 leading-relaxed line-clamp-2`}>
                            {notification.message}
                          </p>

                          {/* Meta info */}
                          {(notification.location || notification.bloodGroup || notification.hospital) && (
                            <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4 flex-wrap">
                              {notification.bloodGroup && (
                                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${styles.badge} px-2 py-1 sm:px-3 sm:py-2 rounded-lg sm:rounded-xl`}>
                                  <Droplets className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                                  {notification.bloodGroup}
                                </span>
                              )}
                              {notification.location && (
                                <span className="inline-flex items-center gap-1.5 text-xs text-gray-700 bg-white/80 px-2 py-1 sm:px-3 sm:py-2 rounded-lg sm:rounded-xl border border-gray-300/50 backdrop-blur-sm">
                                  <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                                  <span className="truncate max-w-[80px] sm:max-w-none">{notification.location}</span>
                                </span>
                              )}
                              {notification.hospital && (
                                <span className="inline-flex items-center gap-1.5 text-xs text-gray-700 bg-white/80 px-2 py-1 sm:px-3 sm:py-2 rounded-lg sm:rounded-xl border border-gray-300/50 backdrop-blur-sm">
                                  <AlertTriangle className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                                  <span className="truncate max-w-[80px] sm:max-w-none">{notification.hospital}</span>
                                </span>
                              )}
                            </div>
                          )}

                          {/* Action buttons */}
                          <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-300/30">
                            <div className="flex items-center gap-1.5 sm:gap-2">
                              {!notification.isRead && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    markAsRead(notification._id);
                                  }}
                                  className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-green-500/20"
                                >
                                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                                  <span className="hidden sm:inline">Mark as read</span>
                                  <span className="sm:hidden">Read</span>
                                </button>
                              )}
                            </div>
                            
                            {notification.actionUrl && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(notification.actionUrl, '_blank');
                                }}
                                className="flex items-center gap-1.5 text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium px-3 py-1.5 hover:bg-blue-50 rounded-xl transition-all duration-300 group/action"
                              >
                                <span className="hidden sm:inline">View details</span>
                                <span className="sm:hidden">View</span>
                                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 group-hover/action:translate-x-0.5 sm:group-hover/action:translate-x-1 transition-transform" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={notificationsEndRef} />
            </div>
          )}
        </div>

        {/* Floating Action Buttons */}
        {deviceType !== 'mobile' && (
          <div className="absolute bottom-6 right-6 flex flex-col gap-3">
            <button
              onClick={scrollToBottom}
              className="p-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 active:scale-95"
              title="Scroll to bottom"
            >
              <ChevronRight className="h-5 w-5 rotate-90" />
            </button>
            
            {searchedNotifications.length > 0 && (
              <button
                onClick={markAllAsRead}
                disabled={stats.unread === 0}
                className={`p-3 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                  stats.unread === 0 
                    ? 'bg-gradient-to-r from-gray-300 to-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:shadow-blue-500/30'
                }`}
                title="Mark all as read"
              >
                <CheckCircle className="h-5 w-5 text-white" />
              </button>
            )}
          </div>
        )}

        {/* Mobile Bottom Actions */}
        {deviceType === 'mobile' && notifications.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white/95 via-white/90 to-transparent backdrop-blur-lg border-t border-gray-200/50 px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs text-gray-600">
                <span className="font-medium">{searchedNotifications.length}</span> shown
              </div>
              
              <div className="flex items-center gap-2">
                {stats.unread > 0 && (
                  <button
                    onClick={markAllAsRead}
                    disabled={stats.unread === 0}
                    className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      stats.unread === 0 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg'
                    }`}
                  >
                    <CheckCircle className="h-3.5 w-3.5 inline mr-1" />
                    Read All
                  </button>
                )}
                
                <button
                  onClick={clearAllNotifications}
                  className="px-3 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl text-xs font-medium hover:shadow-lg transition-all"
                >
                  <Trash2 className="h-3.5 w-3.5 inline mr-1" />
                  Clear
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Desktop Footer Actions */}
        {deviceType !== 'mobile' && notifications.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white/95 via-white/90 to-transparent backdrop-blur-lg border-t border-gray-200/50 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <span className="font-medium">{searchedNotifications.length}</span> notifications shown
              </div>
              
              <div className="flex items-center gap-3">
                {stats.unread > 0 && (
                  <button
                    onClick={markAllAsRead}
                    disabled={stats.unread === 0}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                      stats.unread === 0 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02]'
                    }`}
                  >
                    <CheckCircle className="h-4 w-4 inline mr-2" />
                    Mark all as read
                  </button>
                )}
                
                <button
                  onClick={clearAllNotifications}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-red-500/20"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear all
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Audio elements */}
        <audio ref={notificationSoundRef} preload="auto">
          <source src="https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3" type="audio/mpeg" />
        </audio>
        <audio ref={urgentSoundRef} preload="auto">
          <source src="https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3" type="audio/mpeg" />
        </audio>
        <audio ref={newNotificationSoundRef} preload="auto">
          <source src="https://assets.mixkit.co/sfx/preview/mixkit-happy-bell-alert-601.mp3" type="audio/mpeg" />
        </audio>
      </div>

      {/* Inline Styles */}
      <style jsx global>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideDown {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 15px rgba(239, 68, 68, 0.2); }
          50% { box-shadow: 0 0 25px rgba(239, 68, 68, 0.3); }
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .animate-slideDown {
          animation: slideDown 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .animate-pulse {
          animation: pulse 2s infinite;
        }
        
        .animate-bounce {
          animation: bounce 1s infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s infinite;
        }
        
        /* Line clamp for text truncation */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Custom scrollbar */
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
        
        /* Touch-friendly scroll on mobile */
        @media (max-width: 640px) {
          .overflow-y-auto {
            -webkit-overflow-scrolling: touch;
          }
          
          .overflow-y-auto::-webkit-scrollbar {
            display: none;
          }
        }
        
        /* Responsive touch targets */
        @media (max-width: 640px) {
          button, [role="button"] {
            min-height: 44px;
            min-width: 44px;
          }
          
          input, select, textarea {
            font-size: 16px; /* Prevents zoom on iOS */
          }
        }
        
        /* Prevent text selection on mobile */
        @media (max-width: 640px) {
          .notification-item {
            -webkit-tap-highlight-color: transparent;
            user-select: none;
          }
        }
        
        /* Optimize animations for mobile */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}