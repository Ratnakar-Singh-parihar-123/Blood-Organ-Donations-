import { useEffect, useState, useRef } from "react";
import { socket } from "../socket/socket";
import { 
  Bell, X, AlertCircle, CheckCircle, Heart, Activity, 
  Droplets, MapPin, Volume2, VolumeX, UserCircle,
  Search, Trash2, Settings, Mail, MessageSquare,
  ArrowRight, Bookmark, Share2, Calendar, Clock,
  Filter, ExternalLink, Shield, Star
} from "lucide-react";

export default function Notifications({ onClose, onNotificationRead }) {
  const [notifications, setNotifications] = useState([]);
  const [isMuted, setIsMuted] = useState(() => {
    return localStorage.getItem('notifications_muted') === 'true';
  });
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    unread: 0,
    today: 0
  });
  
  const modalRef = useRef(null);
  const audioRef = useRef(null);
  const notificationSoundRef = useRef(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Fetch notifications from API
  useEffect(() => {
    fetchNotifications();
    
    // Set up polling for notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/notifications`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await res.json();
      
      if (data.success) {
        setNotifications(data.notifications || []);
        updateStats(data.notifications || []);
      }
    } catch (err) {
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStats = (notificationsList) => {
    const total = notificationsList.length;
    const unread = notificationsList.filter(n => !n.isRead).length;
    const today = notificationsList.filter(n => {
      const notificationDate = new Date(n.createdAt);
      const todayDate = new Date();
      return notificationDate.toDateString() === todayDate.toDateString();
    }).length;

    setStats({ total, unread, today });
  };

  // Socket connection for real-time notifications
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      socket.auth = { token };
      socket.connect();
    }

    const handleNewNotification = (data) => {
      console.log("🔔 New real-time notification:", data);
      playNotificationSound();
      setNotifications(prev => [{ ...data, isNew: true }, ...prev]);
      updateStats([{ ...data, isNew: true }, ...notifications]);
      
      // Show browser notification if permitted
      if (Notification.permission === "granted") {
        new Notification(data.title, {
          body: data.message,
          icon: "/logo.png",
          tag: data._id
        });
      }
    };

    const handleNotificationRead = (data) => {
      setNotifications(prev =>
        prev.map(n => n._id === data.notificationId ? { ...n, isRead: true } : n)
      );
      updateStats(notifications.map(n => n._id === data.notificationId ? { ...n, isRead: true } : n));
    };

    socket.on("new-notification", handleNewNotification);
    socket.on("notification-read", handleNotificationRead);

    return () => {
      socket.off("new-notification", handleNewNotification);
      socket.off("notification-read", handleNotificationRead);
    };
  }, [notifications]);

  // Request notification permission
  useEffect(() => {
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  const playNotificationSound = () => {
    if (!isMuted && notificationSoundRef.current) {
      notificationSoundRef.current.currentTime = 0;
      notificationSoundRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
  };

  const handleMuteToggle = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    localStorage.setItem('notifications_muted', newMutedState.toString());
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
          prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
        );
        updateStats(notifications.map((n) => (n._id === id ? { ...n, isRead: true } : n)));
        
        // Emit socket event
        socket.emit("notification-read", { notificationId: id });
        
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
          prev.map((n) => ({ ...n, isRead: true }))
        );
        updateStats(notifications.map((n) => ({ ...n, isRead: true })));
        
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
        updateStats(notifications.filter(n => n._id !== id));
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
        updateStats([]);
      }
    } catch (err) {
      console.error("Error clearing notifications:", err);
    }
  };

  const getNotificationIcon = (type) => {
    const icons = {
      'blood': { icon: <Droplets className="h-5 w-5" />, color: "text-red-500" },
      'organ': { icon: <Heart className="h-5 w-5" />, color: "text-purple-500" },
      'emergency': { icon: <AlertCircle className="h-5 w-5" />, color: "text-amber-500" },
      'donation': { icon: <Activity className="h-5 w-5" />, color: "text-green-500" },
      'message': { icon: <MessageSquare className="h-5 w-5" />, color: "text-blue-500" },
      'system': { icon: <Shield className="h-5 w-5" />, color: "text-gray-500" },
      'event': { icon: <Calendar className="h-5 w-5" />, color: "text-indigo-500" },
      'update': { icon: <Bell className="h-5 w-5" />, color: "text-cyan-500" }
    };
    
    return icons[type] || { icon: <Bell className="h-5 w-5" />, color: "text-gray-500" };
  };

  const getNotificationStyle = (type, priority = 'normal') => {
    const baseStyles = {
      blood: {
        bg: "bg-red-50/80",
        border: "border-red-100",
        text: "text-red-800",
        badge: "bg-red-100 text-red-700"
      },
      organ: {
        bg: "bg-purple-50/80",
        border: "border-purple-100",
        text: "text-purple-800",
        badge: "bg-purple-100 text-purple-700"
      },
      emergency: {
        bg: "bg-amber-50/80",
        border: "border-amber-100",
        text: "text-amber-800",
        badge: "bg-amber-100 text-amber-700"
      },
      donation: {
        bg: "bg-green-50/80",
        border: "border-green-100",
        text: "text-green-800",
        badge: "bg-green-100 text-green-700"
      }
    };
    
    const style = baseStyles[type] || {
      bg: "bg-blue-50/80",
      border: "border-blue-100",
      text: "text-blue-800",
      badge: "bg-blue-100 text-blue-700"
    };
    
    if (priority === 'high') {
      return {
        ...style,
        bg: style.bg.replace('50', '100'),
        border: "border-red-200",
        ring: "ring-1 ring-red-200"
      };
    }
    
    return style;
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !n.isRead;
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
        n.sender?.name?.toLowerCase().includes(searchQuery.toLowerCase())
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
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Notification Modal */}
      <div 
        ref={modalRef}
        className="relative ml-auto h-full w-full max-w-md bg-white shadow-2xl animate-slideInRight"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-b from-white to-white/95 border-b border-gray-100 p-5">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bell className="h-7 w-7 text-blue-600" />
                {stats.unread > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {stats.unread}
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
                <p className="text-sm text-gray-500">
                  {stats.unread} unread • {stats.today} today
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <button
                onClick={handleMuteToggle}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-105"
                title={isMuted ? "Unmute sounds" : "Mute sounds"}
              >
                {isMuted ? (
                  <VolumeX className="h-5 w-5 text-gray-600" />
                ) : (
                  <Volume2 className="h-5 w-5 text-gray-600" />
                )}
              </button>
              
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-105"
                title="Close notifications"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notifications..."
              className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl 
                       focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm
                       placeholder-gray-400 transition-all duration-200"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {[
              { id: 'all', label: 'All', count: stats.total },
              { id: 'unread', label: 'Unread', count: stats.unread },
              { id: 'today', label: 'Today', count: stats.today },
              { id: 'blood', label: 'Blood', icon: <Droplets className="h-3 w-3" /> },
              { id: 'emergency', label: 'Emergency', icon: <AlertCircle className="h-3 w-3" /> },
              { id: 'donation', label: 'Donation', icon: <Activity className="h-3 w-3" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  filter === tab.id 
                    ? 'bg-blue-500 text-white shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {tab.icon}
                {tab.label}
                {tab.count !== undefined && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    filter === tab.id ? 'bg-white/20' : 'bg-gray-200'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="overflow-y-auto h-[calc(100vh-180px)]">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full p-8">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-500">Loading notifications...</p>
            </div>
          ) : searchedNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mb-4">
                {searchQuery ? (
                  <Search className="h-10 w-10 text-gray-400" />
                ) : (
                  <Bell className="h-10 w-10 text-gray-400" />
                )}
              </div>
              <h3 className="font-semibold text-gray-700 mb-2 text-lg">
                {searchQuery ? 'No results found' : 'No notifications yet'}
              </h3>
              <p className="text-sm text-gray-500 text-center max-w-xs">
                {searchQuery 
                  ? `No notifications match "${searchQuery}"`
                  : "You'll see important updates, alerts, and messages here"}
              </p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {searchedNotifications.map((notification) => {
                const iconData = getNotificationIcon(notification.type);
                const styles = getNotificationStyle(notification.type, notification.priority);
                
                return (
                  <div
                    key={notification._id}
                    onClick={() => handleNotificationClick(notification)}
                    className={`relative rounded-xl border transition-all duration-200 hover:shadow-md cursor-pointer group ${
                      notification.isRead ? 'opacity-80' : ''
                    } ${styles.bg} ${styles.border} ${styles.ring || ''}`}
                  >
                    {/* Unread indicator */}
                    {!notification.isRead && (
                      <div className="absolute left-3 top-3 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    )}
                    
                    <div className="p-4">
                      <div className="flex items-start gap-4">
                        {/* Icon with sender avatar */}
                        <div className="flex flex-col items-center">
                          <div className={`p-2.5 rounded-xl ${iconData.color} bg-white shadow-sm mb-2`}>
                            {iconData.icon}
                          </div>
                          {notification.sender?.avatar && (
                            <div className="w-6 h-6 rounded-full overflow-hidden border border-white shadow-sm">
                              <img 
                                src={notification.sender.avatar} 
                                alt={notification.sender.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <h4 className={`font-semibold ${styles.text} text-sm`}>
                                {notification.title}
                              </h4>
                              {notification.sender?.name && (
                                <p className="text-xs text-gray-500 mt-0.5">
                                  From: {notification.sender.name}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500 whitespace-nowrap">
                                {getTimeAgo(notification.createdAt)}
                              </span>
                              <button
                                onClick={(e) => deleteNotification(notification._id, e)}
                                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-all duration-200"
                                title="Delete notification"
                              >
                                <X className="h-3 w-3 text-gray-500" />
                              </button>
                            </div>
                          </div>

                          <p className={`text-sm ${styles.text.replace('800', '700')} mb-3`}>
                            {notification.message}
                          </p>

                          {/* Meta info */}
                          {(notification.location || notification.bloodGroup || notification.hospital) && (
                            <div className="flex items-center gap-2 mb-3 flex-wrap">
                              {notification.bloodGroup && (
                                <span className={`inline-flex items-center gap-1 text-xs font-medium ${styles.badge} px-3 py-1.5 rounded-lg`}>
                                  <Droplets className="h-3 w-3" />
                                  {notification.bloodGroup}
                                </span>
                              )}
                              {notification.location && (
                                <span className="inline-flex items-center gap-1 text-xs text-gray-600 bg-white px-3 py-1.5 rounded-lg border border-gray-200">
                                  <MapPin className="h-3 w-3" />
                                  {notification.location}
                                </span>
                              )}
                              {notification.hospital && (
                                <span className="inline-flex items-center gap-1 text-xs text-gray-600 bg-white px-3 py-1.5 rounded-lg border border-gray-200">
                                  <Activity className="h-3 w-3" />
                                  {notification.hospital}
                                </span>
                              )}
                            </div>
                          )}

                          {/* Action buttons */}
                          <div className="flex items-center justify-between pt-3 border-t border-gray-200/50">
                            <div className="flex items-center gap-2">
                              {!notification.isRead && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    markAsRead(notification._id);
                                  }}
                                  className="flex items-center gap-1 text-xs px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
                                >
                                  <CheckCircle className="h-3 w-3" />
                                  Mark as read
                                </button>
                              )}
                              
                              {notification.priority === 'high' && (
                                <span className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-red-100 text-red-700 rounded font-medium">
                                  <AlertCircle className="h-3 w-3" />
                                  Urgent
                                </span>
                              )}
                            </div>
                            
                            {notification.actionUrl && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(notification.actionUrl, '_blank');
                                  onClose();
                                }}
                                className="text-xs text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1 hover:gap-2 transition-all"
                              >
                                View details
                                <ArrowRight className="h-3 w-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {notifications.length > 0 && (
          <div className="sticky bottom-0 bg-gradient-to-t from-white to-white/95 border-t border-gray-100 p-4">
            <div className="flex items-center justify-between">
              <button
                onClick={markAllAsRead}
                disabled={stats.unread === 0}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  stats.unread === 0 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-sm hover:shadow'
                }`}
              >
                <CheckCircle className="h-4 w-4" />
                Mark all as read
              </button>
              
              <button
                onClick={clearAllNotifications}
                className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:from-gray-200 hover:to-gray-300 transition-all duration-200 shadow-sm hover:shadow flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Clear all
              </button>
            </div>
            
            <div className="text-xs text-gray-500 mt-3 text-center">
              Notifications are synced in real-time
            </div>
          </div>
        )}
        
        {/* Audio elements */}
        <audio ref={audioRef} preload="none">
          <source src="/notification-sound.mp3" type="audio/mpeg" />
        </audio>
        <audio ref={notificationSoundRef} preload="auto">
          <source src="https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp4" type="audio/mpeg" />
        </audio>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
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
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-pulse {
          animation: pulse 2s infinite;
        }
        
        /* Custom scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 10px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #a1a1a1;
        }
      `}</style>
    </div>
  );
}