import { useEffect, useState, useRef, useCallback } from "react";
import { socket } from "../socket/socket";
import { 
  Bell, X, AlertCircle, CheckCircle, Heart, Activity, 
  Droplets, MapPin, Volume2, VolumeX, UserCircle,
  Search, Trash2, Mail, MessageSquare, Clock,
  ArrowRight, Calendar, Filter, ExternalLink, 
  Shield, Star, ChevronRight, MoreVertical,
  BellRing, Zap, PhoneCall, AlertTriangle,
  Home, Hospital, Users, RefreshCw
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

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '0px';
    
    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0px';
    };
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
        
        if (unreadCount > previousUnread) {
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
      if (data.priority === 'high') {
        playUrgentNotificationSound();
      } else {
        playNotificationSound();
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
      
      setHasNewNotifications(true);
      
      // Show browser notification if permitted
      if (Notification.permission === "granted" && !document.hasFocus()) {
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
  }, [updateStats]);

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
    if (!isMuted && notificationSoundRef.current) {
      notificationSoundRef.current.currentTime = 0;
      notificationSoundRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
  };

  const playUrgentNotificationSound = () => {
    if (!isMuted && urgentSoundRef.current) {
      urgentSoundRef.current.currentTime = 0;
      urgentSoundRef.current.play().catch(e => console.log("Urgent audio play failed:", e));
    }
  };

  const playNewNotificationSound = () => {
    if (!isMuted) {
      const audio = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-happy-bell-alert-601.mp3");
      audio.volume = 0.6;
      audio.play().catch(e => console.log("New notification sound failed:", e));
    }
  };

  const handleMuteToggle = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    localStorage.setItem('notifications_muted', newMutedState.toString());
    
    // Show feedback
    if (newMutedState) {
      console.log("🔕 Notifications muted");
    } else {
      console.log("🔔 Notifications unmuted");
      playNotificationSound();
    }
  };

  const handleClose = () => {
    setHasNewNotifications(false);
    onClose();
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
      window.location.href = notification.actionUrl;
      handleClose();
    }
  };

  const scrollToBottom = () => {
    notificationsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRefresh = () => {
    setLoading(true);
    fetchNotifications();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex">
      {/* Animated Background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-gray-900/30 via-black/20 to-gray-900/30 backdrop-blur-md"
        onClick={handleClose}
      />
      
      {/* Glowing Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
            style={{
              top: `${20 + i * 30}%`,
              left: `${10 + i * 40}%`,
              animation: `float ${15 + i * 5}s infinite ease-in-out`
            }}
          />
        ))}
      </div>

      {/* Notification Modal */}
      <div 
        ref={modalRef}
        className="relative ml-auto h-full w-full max-w-lg bg-gradient-to-b from-white/95 via-white/98 to-white/95 backdrop-blur-xl shadow-2xl border-l border-gray-200/50 animate-slideInRight overflow-hidden"
      >
        {/* Header */}
        <div className="sticky top-0 z-20 bg-gradient-to-b from-white/95 to-white/80 backdrop-blur-lg border-b border-gray-200/50 px-6 pt-6 pb-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-30"></div>
                <div className="relative p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-lg">
                  <Bell className="h-6 w-6 text-white" />
                </div>
                {stats.unread > 0 && (
                  <span className="absolute -top-2 -right-2 h-6 w-6 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg animate-pulse">
                    {stats.unread}
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Notifications
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {stats.unread} unread • {stats.today} today • {stats.urgent} urgent
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleRefresh}
                className="p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 group"
                title="Refresh notifications"
              >
                <RefreshCw className={`h-5 w-5 text-gray-600 group-active:rotate-180 transition-transform ${loading ? 'animate-spin' : ''}`} />
              </button>
              
              <button
                onClick={handleMuteToggle}
                className="p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
                title={isMuted ? "Unmute sounds" : "Mute sounds"}
              >
                {isMuted ? (
                  <VolumeX className="h-5 w-5 text-gray-600" />
                ) : (
                  <Volume2 className="h-5 w-5 text-gray-600" />
                )}
              </button>
              
              <button
                onClick={handleClose}
                className="p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
                title="Close notifications"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative mb-5">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl blur"></div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notifications..."
                className="w-full pl-12 pr-12 py-3.5 bg-white/80 border border-gray-300/50 rounded-2xl 
                         focus:outline-none focus:ring-3 focus:ring-blue-400/30 focus:border-blue-400/50 text-sm
                         placeholder-gray-400 transition-all duration-300 backdrop-blur-sm shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
          
          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3">
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
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                  filter === tab.id 
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 bg-white/50 backdrop-blur-sm border border-gray-200/50'
                }`}
              >
                {tab.icon}
                {tab.label}
                {tab.count !== undefined && (
                  <span className={`text-xs px-2 py-0.5 rounded-full min-w-[24px] text-center ${
                    filter === tab.id ? 'bg-white/30' : 'bg-gray-200/80'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="overflow-y-auto h-[calc(100vh-220px)] px-4 pb-24">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full p-8">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Bell className="h-8 w-8 text-blue-500 animate-pulse" />
                </div>
              </div>
              <p className="text-gray-500 mt-4">Loading your notifications...</p>
            </div>
          ) : searchedNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mb-6 shadow-inner">
                {searchQuery ? (
                  <Search className="h-12 w-12 text-gray-400" />
                ) : (
                  <Bell className="h-12 w-12 text-gray-400" />
                )}
              </div>
              <h3 className="font-semibold text-gray-700 mb-3 text-xl">
                {searchQuery ? 'No matches found' : 'All caught up!'}
              </h3>
              <p className="text-sm text-gray-500 text-center max-w-xs mb-6">
                {searchQuery 
                  ? `No notifications match "${searchQuery}"`
                  : "You're up to date with all your notifications"}
              </p>
              {!searchQuery && (
                <button
                  onClick={handleRefresh}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4 py-4">
              {hasNewNotifications && (
                <div className="sticky top-2 z-10 flex justify-center">
                  <div className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-medium rounded-full shadow-lg shadow-green-500/30 animate-bounce">
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
                    className={`relative rounded-2xl border transition-all duration-300 hover:shadow-xl cursor-pointer transform hover:scale-[1.01] active:scale-[0.99] group ${
                      notification.isRead ? 'opacity-90' : ''
                    } ${styles.bg} ${styles.border} ${styles.ring || ''} ${styles.glow}`}
                    style={{
                      animationDelay: `${index * 50}ms`
                    }}
                  >
                    {/* New Notification Indicator */}
                    {notification.isNew && !notification.isRead && (
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-ping"></div>
                    )}
                    
                    {/* Unread indicator */}
                    {!notification.isRead && (
                      <div className="absolute left-4 top-4 w-2.5 h-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse shadow-lg"></div>
                    )}
                    
                    {/* Urgent Badge */}
                    {notification.priority === 'high' && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg z-10">
                        URGENT
                      </div>
                    )}
                    
                    <div className="p-5">
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className={`relative p-3.5 rounded-xl ${iconData.bg} shadow-md group-hover:scale-110 transition-transform duration-300`}>
                          <div className={`${iconData.color}`}>
                            {iconData.icon}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className={`font-bold ${styles.text} text-base`}>
                                  {notification.title}
                                </h4>
                                {notification.isNew && !notification.isRead && (
                                  <span className="text-xs px-2 py-0.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full">
                                    NEW
                                  </span>
                                )}
                              </div>
                              
                              {notification.sender?.name && (
                                <div className="flex items-center gap-2">
                                  {notification.sender.avatar ? (
                                    <img 
                                      src={notification.sender.avatar} 
                                      alt={notification.sender.name}
                                      className="w-5 h-5 rounded-full"
                                    />
                                  ) : (
                                    <UserCircle className="w-4 h-4 text-gray-400" />
                                  )}
                                  <p className="text-xs text-gray-500">
                                    From: {notification.sender.name}
                                  </p>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex items-start gap-2">
                              <span className="text-xs text-gray-500 whitespace-nowrap bg-white/50 px-2 py-1 rounded-lg border border-gray-200/50">
                                {getTimeAgo(notification.createdAt)}
                              </span>
                              <button
                                onClick={(e) => deleteNotification(notification._id, e)}
                                className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-gray-200/50 rounded-lg transition-all duration-200"
                                title="Delete notification"
                              >
                                <Trash2 className="h-3.5 w-3.5 text-gray-500" />
                              </button>
                            </div>
                          </div>

                          <p className={`text-sm ${styles.text.replace('900', '700')} mb-4 leading-relaxed`}>
                            {notification.message}
                          </p>

                          {/* Meta info */}
                          {(notification.location || notification.bloodGroup || notification.hospital) && (
                            <div className="flex items-center gap-2 mb-4 flex-wrap">
                              {notification.bloodGroup && (
                                <span className={`inline-flex items-center gap-2 text-xs font-semibold ${styles.badge} px-3 py-2 rounded-xl`}>
                                  <Droplets className="h-3.5 w-3.5" />
                                  {notification.bloodGroup}
                                </span>
                              )}
                              {notification.location && (
                                <span className="inline-flex items-center gap-2 text-xs text-gray-700 bg-white/80 px-3 py-2 rounded-xl border border-gray-300/50 backdrop-blur-sm">
                                  <MapPin className="h-3.5 w-3.5" />
                                  {notification.location}
                                </span>
                              )}
                              {notification.hospital && (
                                <span className="inline-flex items-center gap-2 text-xs text-gray-700 bg-white/80 px-3 py-2 rounded-xl border border-gray-300/50 backdrop-blur-sm">
                                  <Hospital className="h-3.5 w-3.5" />
                                  {notification.hospital}
                                </span>
                              )}
                            </div>
                          )}

                          {/* Action buttons */}
                          <div className="flex items-center justify-between pt-4 border-t border-gray-300/30">
                            <div className="flex items-center gap-2">
                              {!notification.isRead && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    markAsRead(notification._id);
                                  }}
                                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-green-500/20"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                  Mark as read
                                </button>
                              )}
                            </div>
                            
                            {notification.actionUrl && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(notification.actionUrl, '_blank');
                                  handleClose();
                                }}
                                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium px-4 py-2 hover:bg-blue-50 rounded-xl transition-all duration-300 group/action"
                              >
                                View details
                                <ArrowRight className="h-4 w-4 group-hover/action:translate-x-1 transition-transform" />
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

        {/* Footer Actions */}
        {notifications.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white/95 via-white/90 to-transparent backdrop-blur-lg border-t border-gray-200/50 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <span className="font-medium">{searchedNotifications.length}</span> notifications shown
              </div>
              
              <button
                onClick={clearAllNotifications}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-red-500/20"
              >
                <Trash2 className="h-4 w-4" />
                Clear all
              </button>
            </div>
          </div>
        )}
        
        {/* Audio elements */}
        <audio ref={notificationSoundRef} preload="auto">
          <source src="https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp4" type="audio/mpeg" />
        </audio>
        <audio ref={urgentSoundRef} preload="auto">
          <source src="https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp4" type="audio/mpeg" />
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
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -50px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 25px rgba(239, 68, 68, 0.2); }
          50% { box-shadow: 0 0 40px rgba(239, 68, 68, 0.3); }
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1);
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
        
        .animate-float {
          animation: float 20s infinite ease-in-out;
        }
        
        /* Custom scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 8px;
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
        
        /* Notification entry animation */
        @keyframes notificationEntry {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-notification {
          animation: notificationEntry 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
    </div>
  );
}