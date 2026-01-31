// API Configuration constants
export const API_CONFIG = {
  // API Endpoints
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      VERIFY_TOKEN: '/auth/verify-token',
      FORGOT_PASSWORD: '/auth/forgot-password',
      RESET_PASSWORD: '/auth/reset-password',
      LOGOUT: '/auth/logout',
      REFRESH_TOKEN: '/auth/refresh-token',
    },
    USERS: {
      PROFILE: '/users/profile',
      UPDATE_PROFILE: '/users/profile',
      CHANGE_PASSWORD: '/users/change-password',
      ALL_USERS: '/users',
      USER_BY_ID: '/users/:id',
    },
    DONATIONS: {
      REQUEST: '/donations/request',
      ALL_REQUESTS: '/donations/requests',
      REQUEST_BY_ID: '/donations/requests/:id',
      MY_DONATIONS: '/donations/my-donations',
      RESPOND: '/donations/:id/respond',
      UPDATE_STATUS: '/donations/:id/status',
    },
    HOSPITALS: {
      REGISTER: '/hospitals/register',
      ALL_HOSPITALS: '/hospitals',
      HOSPITAL_BY_ID: '/hospitals/:id',
      UPDATE_HOSPITAL: '/hospitals/:id',
      STATS: '/hospitals/stats',
    },
    STATS: {
      DASHBOARD: '/stats/dashboard',
      BLOOD_GROUPS: '/stats/blood-groups',
      DONATIONS: '/stats/donations',
      USERS: '/stats/users',
    },
    NOTIFICATIONS: {
      ALL: '/notifications',
      MARK_READ: '/notifications/:id/read',
      MARK_ALL_READ: '/notifications/mark-all-read',
      DELETE: '/notifications/:id',
      UNREAD_COUNT: '/notifications/unread-count',
    },
    UPLOAD: '/upload',
    SEARCH: '/search',
    LOCATION: '/location',
  },

  // HTTP Methods
  METHODS: {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH',
  },

  // HTTP Status Codes
  STATUS_CODES: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
  },

  // Error Messages
  ERROR_MESSAGES: {
    NETWORK_ERROR: 'Network error. Please check your internet connection.',
    SERVER_ERROR: 'Server error. Please try again later.',
    UNAUTHORIZED: 'Session expired. Please login again.',
    FORBIDDEN: 'You do not have permission to perform this action.',
    NOT_FOUND: 'Requested resource not found.',
    VALIDATION_ERROR: 'Please check your input.',
    DEFAULT: 'Something went wrong. Please try again.',
  },

  // Response Timeout in milliseconds
  TIMEOUT: 10000,

  // Retry configuration
  RETRY: {
    MAX_RETRIES: 3,
    RETRY_DELAY: 1000,
  },

  // Cache configuration
  CACHE: {
    ENABLED: true,
    DEFAULT_TTL: 300000, // 5 minutes in milliseconds
  },
};

// Helper function to format API errors
export const formatApiError = (error) => {
  if (!error) {
    return { message: API_CONFIG.ERROR_MESSAGES.DEFAULT };
  }

  if (error.response) {
    // Server responded with error
    const { status, data } = error.response;
    
    switch (status) {
      case API_CONFIG.STATUS_CODES.BAD_REQUEST:
        return { 
          message: data.message || API_CONFIG.ERROR_MESSAGES.VALIDATION_ERROR,
          errors: data.errors 
        };
      case API_CONFIG.STATUS_CODES.UNAUTHORIZED:
        return { 
          message: data.message || API_CONFIG.ERROR_MESSAGES.UNAUTHORIZED 
        };
      case API_CONFIG.STATUS_CODES.FORBIDDEN:
        return { 
          message: data.message || API_CONFIG.ERROR_MESSAGES.FORBIDDEN 
        };
      case API_CONFIG.STATUS_CODES.NOT_FOUND:
        return { 
          message: data.message || API_CONFIG.ERROR_MESSAGES.NOT_FOUND 
        };
      case API_CONFIG.STATUS_CODES.CONFLICT:
        return { 
          message: data.message || 'Resource already exists.' 
        };
      case API_CONFIG.STATUS_CODES.UNPROCESSABLE_ENTITY:
        return { 
          message: data.message || API_CONFIG.ERROR_MESSAGES.VALIDATION_ERROR,
          errors: data.errors 
        };
      case API_CONFIG.STATUS_CODES.INTERNAL_SERVER_ERROR:
        return { 
          message: API_CONFIG.ERROR_MESSAGES.SERVER_ERROR 
        };
      default:
        return { 
          message: data.message || API_CONFIG.ERROR_MESSAGES.DEFAULT 
        };
    }
  } else if (error.request) {
    // No response received
    return { 
      message: API_CONFIG.ERROR_MESSAGES.NETWORK_ERROR 
    };
  } else {
    // Request setup error
    return { 
      message: error.message || API_CONFIG.ERROR_MESSAGES.DEFAULT 
    };
  }
};

// Helper function to build URL with parameters
export const buildUrl = (url, params = {}) => {
  let builtUrl = url;
  
  // Replace URL parameters
  Object.keys(params).forEach(key => {
    if (builtUrl.includes(`:${key}`)) {
      builtUrl = builtUrl.replace(`:${key}`, params[key]);
      delete params[key];
    }
  });

  // Add query parameters
  const queryParams = new URLSearchParams(params);
  if (queryParams.toString()) {
    builtUrl += `?${queryParams.toString()}`;
  }

  return builtUrl;
};