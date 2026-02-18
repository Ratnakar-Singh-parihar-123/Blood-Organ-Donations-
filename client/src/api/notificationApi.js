const BASE_URL = `${import.meta.env.VITE_API_URL}/notifications`;

// 🔢 Unread Count
export const getUnreadNotificationCount = async (role) => {
  try {
    const res = await fetch(`${BASE_URL}/unread-count?role=${role}`);

    if (!res.ok) {
      throw new Error("Failed to fetch unread count");
    }

    const data = await res.json();
    return data.unreadCount || 0;
  } catch (err) {
    console.error("Unread count error:", err.message);
    return 0;
  }
};

// 📥 Get All Notifications
export const getAllNotifications = async (role) => {
  try {
    const res = await fetch(`${BASE_URL}?role=${role}`);

    if (!res.ok) {
      throw new Error("Failed to fetch notifications");
    }

    const data = await res.json();
    return data.notifications || [];
  } catch (err) {
    console.error("Notifications error:", err.message);
    return [];
  }
};

// ✅ Mark As Read
export const markNotificationAsRead = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/mark-read/${id}`, {
      method: "PUT",
    });

    if (!res.ok) {
      throw new Error("Failed to mark as read");
    }

    return await res.json();
  } catch (err) {
    console.error("Mark read error:", err.message);
  }
};
