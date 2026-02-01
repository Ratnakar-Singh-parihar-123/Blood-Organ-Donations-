import { useEffect, useState, useRef } from "react";
import { socket } from "../socket/socket";
import { 
  Bell, X, AlertCircle, CheckCircle, Heart, Activity, 
  Droplets, MapPin, Volume2, VolumeX,
  Search, Trash2, Settings,
  ArrowRight, Bookmark, Share2,
  Clock, Filter
} from "lucide-react";

export default function Notifications({ onClose, onNotificationRead }) {
  const [notifications, setNotifications] = useState([
    {
      _id: "1",
      title: "Blood Donation Request",
      message: "Urgent need for O+ blood at Mumbai Hospital",
      type: "blood",
      isRead: false,
      priority: "high",
      location: "Mumbai Hospital",
      bloodGroup: "O+",
      createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      actionUrl: "/blood-request/1"
    },
    {
      _id: "2",
      title: "Organ Donation Campaign",
      message: "Join our organ donation awareness event this weekend",
      type: "organ",
      isRead: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      actionUrl: "/events/1"
    },
    {
      _id: "3",
      title: "Patient Match Found",
      message: "We found a potential match for your blood type",
      type: "emergency",
      isRead: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      actionUrl: "/matches/1"
    }
  ]);
  
  const [isMuted, setIsMuted] = useState(false);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const modalRef = useRef(null);
  const audioRef = useRef(null);

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

  // Prevent body scroll when modal is open on mobile
  useEffect(() => {
    if (window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Fetch notifications from API
  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/notifications`);
      const data = await res.json();
      if (data.success) {
        setNotifications(data.notifications);
      }
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  // Socket connection for real-time notifications
  useEffect(() => {
    socket.on("new-notification", (data) => {
      console.log("🔔 New notification:", data);
      playNotificationSound();
      setNotifications(prev => [{ ...data, isNew: true }, ...prev]);
    });

    return () => {
      socket.off("new-notification");
    };
  }, [isMuted]);

  const playNotificationSound = () => {
    if (!isMuted && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
  };

  const markAsRead = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/notifications/read/${id}`, {
        method: "PUT",
      });
      if (res.ok) {
        setNotifications(prev =>
          prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
        );
        if (onNotificationRead) onNotificationRead();
      }
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  const markAllAsRead = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/notifications/read-all`, {
        method: "PUT",
      });
      if (res.ok) {
        setNotifications(prev =>
          prev.map((n) => ({ ...n, isRead: true }))
        );
        if (onNotificationRead) onNotificationRead();
      }
    } catch (err) {
      console.error("Error marking all as read:", err);
    }
  };

  const clearAllNotifications = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/notifications/clear`, {
        method: "DELETE",
      });
      if (res.ok) {
        setNotifications([]);
      }
    } catch (err) {
      console.error("Error clearing notifications:", err);
    }
  };

  const getNotificationIcon = (notification) => {
    if (notification.type === 'blood') return <Droplets className="h-5 w-5" />;
    if (notification.type === 'organ') return <Activity className="h-5 w-5" />;
    if (notification.type === 'emergency') return <AlertCircle className="h-5 w-5" />;
    return <Bell className="h-5 w-5" />;
  };

  const getNotificationColor = (notification) => {
    if (notification.type === 'blood') return {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-900",
      icon: "text-red-600",
      badge: "bg-red-100 text-red-700"
    };
    if (notification.type === 'organ') return {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-900",
      icon: "text-green-600",
      badge: "bg-green-100 text-green-700"
    };
    if (notification.type === 'emergency') return {
      bg: "bg-amber-50",
      border: "border-amber-200",
      text: "text-amber-900",
      icon: "text-amber-600",
      badge: "bg-amber-100 text-amber-700"
    };
    return {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-900",
      icon: "text-blue-600",
      badge: "bg-blue-100 text-blue-700"
    };
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !n.isRead;
    return n.type === filter;
  });

  const searchedNotifications = searchQuery 
    ? filteredNotifications.filter(n => 
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.message.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredNotifications;

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  const handleNotificationClick = (notification) => {
    markAsRead(notification._id);
    if (notification.actionUrl) {
      window.location.href = notification.actionUrl;
      onClose();
    }
  };

  return (
    <>
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
        
        @media (max-width: 767px) {
          .notification-modal {
            width: 100%;
            max-width: 100%;
            height: 100%;
            border-radius: 0;
            margin: 0;
          }
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        /* Custom scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 2px;
        }
      `}</style>

      {/* Backdrop - Only on mobile */}
      {window.innerWidth < 768 && (
        <div className="fixed inset-0 bg-black/30 z-[9998] animate-fadeIn" onClick={onClose} />
      )}
      
      {/* Notification Modal/Popup */}
      <div 
        ref={modalRef}
        className={`notification-modal fixed top-0 right-0 h-full z-[9999] bg-white shadow-xl animate-slideInRight
          ${window.innerWidth >= 768 ? 'w-96' : 'w-full'}`}
        style={{
          boxShadow: '-5px 0 25px rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Bell className="h-6 w-6 text-blue-600" />
              <div>
                <h2 className="text-lg font-bold text-gray-900">Notifications</h2>
                <p className="text-sm text-gray-500">
                  {unreadCount} unread • {notifications.length} total
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <VolumeX className="h-5 w-5 text-gray-500" />
                ) : (
                  <Volume2 className="h-5 w-5 text-gray-500" />
                )}
              </button>
              
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notifications..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          {/* Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1">
            {[
              { id: 'all', label: 'All' },
              { id: 'unread', label: 'Unread' },
              { id: 'blood', label: 'Blood', icon: <Droplets className="h-3 w-3" /> },
              { id: 'organ', label: 'Organ', icon: <Activity className="h-3 w-3" /> },
              { id: 'emergency', label: 'Emergency', icon: <AlertCircle className="h-3 w-3" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  filter === tab.id 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="overflow-y-auto h-[calc(100vh-160px)] custom-scrollbar">
          {searchedNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Bell className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="font-semibold text-gray-700 mb-2">No notifications</h3>
              <p className="text-sm text-gray-500 text-center">
                {searchQuery 
                  ? `No results for "${searchQuery}"`
                  : "You're all caught up!"}
              </p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {searchedNotifications.map((notification) => {
                const colors = getNotificationColor(notification);
                
                return (
                  <div
                    key={notification._id}
                    onClick={() => handleNotificationClick(notification)}
                    className={`relative rounded-lg border transition-all duration-150 hover:shadow cursor-pointer ${
                      notification.isRead ? 'opacity-90' : ''
                    } ${colors.bg} ${colors.border}`}
                  >
                    {/* Unread indicator */}
                    {!notification.isRead && (
                      <div className="absolute left-3 top-3 w-2 h-2 bg-blue-500 rounded-full" />
                    )}
                    
                    <div className="p-3">
                      <div className="flex items-start gap-3">
                        {/* Icon */}
                        <div className={`p-2 rounded-lg ${colors.icon} bg-white shadow-sm`}>
                          {getNotificationIcon(notification)}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className={`font-medium ${colors.text} text-sm`}>
                              {notification.title}
                            </h4>
                            <span className="text-xs text-gray-500 whitespace-nowrap">
                              {getTimeAgo(notification.createdAt)}
                            </span>
                          </div>

                          <p className={`text-xs ${colors.text.replace('900', '700')}`}>
                            {notification.message}
                          </p>

                          {/* Meta info */}
                          {(notification.location || notification.bloodGroup) && (
                            <div className="flex items-center gap-2 mt-2 flex-wrap">
                              {notification.location && (
                                <span className="inline-flex items-center gap-1 text-xs text-gray-600 bg-white px-2 py-1 rounded border border-gray-200">
                                  <MapPin className="h-3 w-3" />
                                  {notification.location}
                                </span>
                              )}
                              {notification.bloodGroup && (
                                <span className={`inline-flex items-center gap-1 text-xs ${colors.badge} px-2 py-1 rounded font-medium`}>
                                  <Droplets className="h-3 w-3" />
                                  {notification.bloodGroup}
                                </span>
                              )}
                            </div>
                          )}

                          {/* Action buttons */}
                          <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-200/50">
                            {!notification.isRead && (
                              <span className="text-xs px-2 py-1 bg-green-500 text-white rounded font-medium">
                                New
                              </span>
                            )}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markAsRead(notification._id);
                                }}
                                className={`p-1 rounded ${
                                  notification.isRead 
                                    ? 'text-gray-400' 
                                    : 'text-green-600'
                                }`}
                                title="Mark as read"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </button>
                              {notification.actionUrl && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    window.location.href = notification.actionUrl;
                                    onClose();
                                  }}
                                  className="text-xs text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1"
                                >
                                  View
                                </button>
                              )}
                            </div>
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
          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <button
                onClick={markAllAsRead}
                className="px-3 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
              >
                Mark all read
              </button>
              
              <button
                onClick={clearAllNotifications}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors inline-flex items-center gap-1"
              >
                <Trash2 className="h-4 w-4" />
                Clear all
              </button>
            </div>
          </div>
        )}
        
        {/* Audio element */}
        <audio ref={audioRef} preload="auto">
          <source src="https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp4" type="audio/mpeg" />
        </audio>
      </div>
    </>
  );
}